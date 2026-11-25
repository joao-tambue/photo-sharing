import type { IncomingOffer } from "../domain/incoming-offer";
import type { NearbyDevice } from "../domain/nearby-device";
import type {
  ProximityEvent,
  ProximityService,
  SendPhotoRequest,
} from "../domain/proximity-service";

type Listener = (event: ProximityEvent) => void;

export type SimulationScript = {
  devices: NearbyDevice[];
  incomingOffer: Omit<IncomingOffer, "id">;
};

const FIRST_DEVICE_DELAY_MS = 1200;
const NEXT_DEVICE_DELAY_MS = 1400;
const INCOMING_OFFER_DELAY_MS = 9000;
const PROGRESS_TICK_MS = 180;

/**
 * Scripted stand-in for the native module, so the UI can be built and tested
 * without two physical phones. Only used in development builds.
 */
export class SimulatedProximityService implements ProximityService {
  readonly mode = "simulated" as const;

  private readonly listeners = new Set<Listener>();
  private discoveryTimers: ReturnType<typeof setTimeout>[] = [];
  private visibleDevices: NearbyDevice[] = [];
  private offerDelivered = false;

  constructor(private readonly script: SimulationScript) {}

  start() {
    this.stop();
    this.script.devices.forEach((device, index) => {
      this.schedule(FIRST_DEVICE_DELAY_MS + index * NEXT_DEVICE_DELAY_MS, () => {
        this.visibleDevices.push(device);
        this.emit({ type: "deviceFound", device });
      });
    });

    if (!this.offerDelivered) {
      this.schedule(INCOMING_OFFER_DELAY_MS, () => {
        this.offerDelivered = true;
        this.emit({ type: "incomingOffer", offer: { ...this.script.incomingOffer, id: `offer-${Date.now()}` } });
      });
    }
  }

  stop() {
    this.discoveryTimers.forEach(clearTimeout);
    this.discoveryTimers = [];
    this.visibleDevices.forEach((device) => this.emit({ type: "deviceLost", deviceId: device.id }));
    this.visibleDevices = [];
  }

  sendPhoto({ transferId, deviceId }: SendPhotoRequest) {
    if (!this.visibleDevices.some((device) => device.id === deviceId)) {
      this.emit({ type: "transferFailed", transferId, reason: "error" });
      return;
    }

    let progress = 0;
    const tick = () => {
      progress = Math.min(1, progress + 0.08 + Math.random() * 0.06);
      this.emit({ type: "transferProgress", transferId, progress });
      if (progress >= 1) this.emit({ type: "transferCompleted", transferId });
      else setTimeout(tick, PROGRESS_TICK_MS);
    };
    setTimeout(tick, PROGRESS_TICK_MS);
  }

  respondToOffer() {
    // The simulated sender does not wait for an answer.
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private schedule(delay: number, run: () => void) {
    this.discoveryTimers.push(setTimeout(run, delay));
  }

  private emit(event: ProximityEvent) {
    this.listeners.forEach((listener) => listener(event));
  }
}

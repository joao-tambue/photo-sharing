import type {
  ProximityEvent,
  ProximityService,
  SendPhotoRequest,
} from "../domain/proximity-service";

/** Used in release builds until the native Nearby Connections module exists. */
export class UnavailableProximityService implements ProximityService {
  readonly mode = "unavailable" as const;

  private readonly listeners = new Set<(event: ProximityEvent) => void>();

  start() {}

  stop() {}

  sendPhoto({ transferId }: SendPhotoRequest) {
    this.listeners.forEach((listener) =>
      listener({ type: "transferFailed", transferId, reason: "error" }),
    );
  }

  respondToOffer() {}

  subscribe(listener: (event: ProximityEvent) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

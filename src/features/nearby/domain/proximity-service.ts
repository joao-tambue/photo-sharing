import type { Photo } from "@/features/gallery";

import type { IncomingOffer } from "./incoming-offer";
import type { NearbyDevice } from "./nearby-device";

export type ProximityEvent =
  | { type: "deviceFound"; device: NearbyDevice }
  | { type: "deviceLost"; deviceId: string }
  | { type: "transferProgress"; transferId: string; progress: number }
  | { type: "transferCompleted"; transferId: string }
  | { type: "transferFailed"; transferId: string; reason: "declined" | "error" }
  | { type: "incomingOffer"; offer: IncomingOffer };

export type SendPhotoRequest = {
  transferId: string;
  deviceId: string;
  photo: Photo;
};

/**
 * `simulated`: scripted devices for UI development.
 * `unavailable`: the native peer-to-peer module is not built yet.
 * `native`: Nearby Connections through a native module.
 */
export type ProximityMode = "simulated" | "unavailable" | "native";

/** Port to the peer-to-peer layer. The UI never talks to native code directly. */
export interface ProximityService {
  readonly mode: ProximityMode;
  start(): void;
  stop(): void;
  sendPhoto(request: SendPhotoRequest): void;
  respondToOffer(offerId: string, accepted: boolean): void;
  subscribe(listener: (event: ProximityEvent) => void): () => void;
}

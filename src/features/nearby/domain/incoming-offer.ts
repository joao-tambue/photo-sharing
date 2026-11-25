import type { PhotoSource } from "@/features/gallery";

import type { NearbyDevice } from "./nearby-device";

/** A photo another device wants to send. Nothing is stored until it is accepted. */
export type IncomingOffer = {
  id: string;
  from: NearbyDevice;
  fileName: string;
  fileSize: number;
  preview: PhotoSource;
};

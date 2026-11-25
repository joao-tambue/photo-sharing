import { samplePhotos } from "@/features/gallery";

import type { ProximityService } from "../domain/proximity-service";

import { SimulatedProximityService } from "./simulated-proximity-service";
import { UnavailableProximityService } from "./unavailable-proximity-service";

const simulation = new SimulatedProximityService({
  devices: [
    { id: "demo-ana", name: "Ana’s iPhone", platform: "ios" },
    { id: "demo-pixel", name: "Pixel 8", platform: "android" },
  ],
  incomingOffer: {
    from: { id: "demo-ana", name: "Ana’s iPhone", platform: "ios" },
    fileName: samplePhotos[1].fileName,
    fileSize: 2.4 * 1024 * 1024,
    preview: samplePhotos[1].source,
  },
});

export const proximityService: ProximityService = __DEV__
  ? simulation
  : new UnavailableProximityService();

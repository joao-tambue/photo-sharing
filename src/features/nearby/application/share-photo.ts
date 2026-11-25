import type { Photo } from "@/features/gallery";
import { useTransfersStore } from "@/features/transfers";
import { createId } from "@/shared/utils/id";

import { proximityService } from "../data/proximity-service";
import type { NearbyDevice } from "../domain/nearby-device";

/** Records an outgoing transfer and hands the photo to the proximity layer. */
export function sharePhoto(photo: Photo, device: NearbyDevice) {
  const transferId = createId("transfer");

  useTransfersStore.getState().add({
    id: transferId,
    direction: "sent",
    peerId: device.id,
    peerName: device.name,
    fileName: photo.fileName,
    fileSize: null,
    photo: photo.source,
    status: "in-progress",
    progress: 0,
    createdAt: Date.now(),
  });

  proximityService.sendPhoto({ transferId, deviceId: device.id, photo });
}

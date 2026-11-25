import { useTransfersStore } from "@/features/transfers";
import { createId } from "@/shared/utils/id";

import { proximityService } from "../data/proximity-service";
import { useProximityStore } from "../data/proximity-store";
import type { IncomingOffer } from "../domain/incoming-offer";

export function acceptOffer(offer: IncomingOffer) {
  proximityService.respondToOffer(offer.id, true);

  useTransfersStore.getState().add({
    id: createId("transfer"),
    direction: "received",
    peerId: offer.from.id,
    peerName: offer.from.name,
    fileName: offer.fileName,
    fileSize: offer.fileSize,
    photo: offer.preview,
    status: "completed",
    progress: 1,
    createdAt: Date.now(),
  });

  useProximityStore.getState().setIncomingOffer(null);
}

export function declineOffer(offer: IncomingOffer) {
  proximityService.respondToOffer(offer.id, false);
  useProximityStore.getState().setIncomingOffer(null);
}

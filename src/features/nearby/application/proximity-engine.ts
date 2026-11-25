import { useTransfersStore } from "@/features/transfers";

import { proximityService } from "../data/proximity-service";
import { useProximityStore } from "../data/proximity-store";
import type { ProximityEvent } from "../domain/proximity-service";

const handleEvent = (event: ProximityEvent) => {
  const proximity = useProximityStore.getState();
  const transfers = useTransfersStore.getState();

  switch (event.type) {
    case "deviceFound":
      proximity.addDevice(event.device);
      break;
    case "deviceLost":
      proximity.removeDevice(event.deviceId);
      break;
    case "transferProgress":
      transfers.updateProgress(event.transferId, event.progress);
      break;
    case "transferCompleted":
      transfers.finish(event.transferId, "completed");
      break;
    case "transferFailed":
      transfers.finish(
        event.transferId,
        event.reason === "declined" ? "declined" : "failed",
      );
      break;
    case "incomingOffer":
      proximity.setIncomingOffer(event.offer);
      break;
  }
};

export function connectProximityEngine(): () => void {
  return proximityService.subscribe(handleEvent);
}

/** Anuncio e descoberta só são executados enquanto o usuário optar por estar visível. */
export function setDiscoveryEnabled(enabled: boolean) {
  const proximity = useProximityStore.getState();
  if (enabled === proximity.isDiscovering) return;

  if (enabled) {
    proximityService.start();
  } else {
    proximityService.stop();
    proximity.clearDevices();
  }
  proximity.setDiscovering(enabled);
}

export const proximityMode = proximityService.mode;

import { useRouter } from "expo-router";
import { useEffect } from "react";

import { useSettingsStore } from "@/features/settings";

import { connectProximityEngine, setDiscoveryEnabled } from "../../application/proximity-engine";
import { acceptOffer } from "../../application/respond-to-offer";
import { useProximityStore } from "../../data/proximity-store";

/** App-wide wiring: discovery follows the visibility setting, offers open the incoming sheet. */
export function useProximityEngine(enabled: boolean) {
  const router = useRouter();
  const isVisible = useSettingsStore((state) => state.isVisible);
  const askBeforeReceiving = useSettingsStore((state) => state.askBeforeReceiving);
  const incomingOffer = useProximityStore((state) => state.incomingOffer);

  useEffect(() => connectProximityEngine(), []);

  useEffect(() => {
    setDiscoveryEnabled(enabled && isVisible);
  }, [enabled, isVisible]);

  useEffect(() => {
    if (!enabled || !incomingOffer) return;
    if (askBeforeReceiving) router.push("/incoming");
    else acceptOffer(incomingOffer);
  }, [enabled, incomingOffer, askBeforeReceiving, router]);
}

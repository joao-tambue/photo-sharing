import { create } from "zustand";

import type { IncomingOffer } from "../domain/incoming-offer";
import type { NearbyDevice } from "../domain/nearby-device";

type ProximityState = {
  isDiscovering: boolean;
  devices: NearbyDevice[];
  incomingOffer: IncomingOffer | null;
  setDiscovering: (isDiscovering: boolean) => void;
  addDevice: (device: NearbyDevice) => void;
  removeDevice: (deviceId: string) => void;
  clearDevices: () => void;
  setIncomingOffer: (offer: IncomingOffer | null) => void;
};

export const useProximityStore = create<ProximityState>()((set) => ({
  isDiscovering: false,
  devices: [],
  incomingOffer: null,
  setDiscovering: (isDiscovering) => set({ isDiscovering }),
  addDevice: (device) =>
    set((state) => ({
      devices: [...state.devices.filter((known) => known.id !== device.id), device],
    })),
  removeDevice: (deviceId) =>
    set((state) => ({ devices: state.devices.filter((device) => device.id !== deviceId) })),
  clearDevices: () => set({ devices: [] }),
  setIncomingOffer: (incomingOffer) => set({ incomingOffer }),
}));

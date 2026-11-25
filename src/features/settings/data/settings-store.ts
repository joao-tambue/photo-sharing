import { create } from "zustand";
import { persist } from "zustand/middleware";

import { persistStorage } from "@/core/storage";

import {
  defaultSettings,
  normalizeDeviceName,
  type DeviceSettings,
} from "../domain/settings";

type SettingsActions = {
  completeOnboarding: () => void;
  replayOnboarding: () => void;
  renameDevice: (name: string) => void;
  setVisible: (isVisible: boolean) => void;
  setAskBeforeReceiving: (askBeforeReceiving: boolean) => void;
  setSaveReceivedPhotos: (saveReceivedPhotos: boolean) => void;
};

export type SettingsStore = DeviceSettings & SettingsActions;

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...defaultSettings,
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      replayOnboarding: () => set({ hasCompletedOnboarding: false }),
      renameDevice: (name) => set({ customDeviceName: normalizeDeviceName(name) }),
      setVisible: (isVisible) => set({ isVisible }),
      setAskBeforeReceiving: (askBeforeReceiving) => set({ askBeforeReceiving }),
      setSaveReceivedPhotos: (saveReceivedPhotos) => set({ saveReceivedPhotos }),
    }),
    {
      name: "settings",
      version: 1,
      storage: persistStorage,
    },
  ),
);

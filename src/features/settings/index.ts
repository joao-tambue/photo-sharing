import { getSystemDeviceName } from "./data/device-info";
import { useSettingsStore } from "./data/settings-store";

export { MAX_DEVICE_NAME_LENGTH } from "./domain/settings";
export type { DeviceSettings, PrivacySettings } from "./domain/settings";
export { useSettingsStore };

/** função para obter o nome do dispositivo */
export function useDeviceName(): string {
  const customName = useSettingsStore((state) => state.customDeviceName);
  return customName ?? getSystemDeviceName();
}

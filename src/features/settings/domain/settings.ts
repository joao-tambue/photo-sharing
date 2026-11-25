/** Privacy choices from the product plan: visible on demand, approve before receiving. */
export type PrivacySettings = {
  isVisible: boolean;
  askBeforeReceiving: boolean;
  saveReceivedPhotos: boolean;
};

/** Everything the app remembers about this device. There are no accounts. */
export type DeviceSettings = PrivacySettings & {
  hasCompletedOnboarding: boolean;
  /** Name other people see nearby; `null` falls back to the system device name. */
  customDeviceName: string | null;
};

export const defaultSettings: DeviceSettings = {
  hasCompletedOnboarding: false,
  customDeviceName: null,
  isVisible: true,
  askBeforeReceiving: true,
  saveReceivedPhotos: true,
};

export const MAX_DEVICE_NAME_LENGTH = 30;

/** Trims user input; an empty name resets to the system name. */
export function normalizeDeviceName(input: string): string | null {
  const name = input.trim().slice(0, MAX_DEVICE_NAME_LENGTH);
  return name.length > 0 ? name : null;
}

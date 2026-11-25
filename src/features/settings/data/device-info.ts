import * as Device from "expo-device";

const FALLBACK_NAME = "My phone";

/** System name of this phone. On iOS 16+ it is the generic "iPhone" without an entitlement. */
export function getSystemDeviceName(): string {
  return Device.deviceName ?? Device.modelName ?? FALLBACK_NAME;
}

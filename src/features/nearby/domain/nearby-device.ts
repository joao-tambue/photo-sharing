export type DevicePlatform = "ios" | "android" | "unknown";

export type NearbyDevice = {
  id: string;
  name: string;
  platform: DevicePlatform;
};

export const deviceInitial = (device: NearbyDevice) => device.name.trim().charAt(0).toUpperCase() || "?";

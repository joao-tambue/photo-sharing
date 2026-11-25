export const colors = {
  background: "#FFFFFF",
  surfaceMuted: "#F5F5F5",
  text: "#000000",
  textSecondary: "#898989",
  border: "#EFEFEF",
  divider: "#F2F2F2",

  primary: "#000000",
  onPrimary: "#FFFFFF",
  accent: "#FFA738",
  accentSoft: "#FFF6EA",

  success: "#18BC41",
  danger: "#F5003B",

  tabInactive: "#A1A1AB",
  progressTrack: "#F0F0F0",
  grabber: "#E0E0E0",
  overlay: "rgba(0, 0, 0, 0.45)",

  onboardingTitle: "#171F24",
  onboardingBody: "#778087",
  dotInactive: "#AAB2B7",

  deviceIndigoStart: "#A47BFF",
  deviceIndigoEnd: "#4E7CF6",
  deviceTealStart: "#34D3C0",
  deviceTealEnd: "#1A9E8F",
} as const;

export type ColorToken = keyof typeof colors;

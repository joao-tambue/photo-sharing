import { colors } from "@/core/theme";
import type { PhotoAccess } from "@/features/gallery";
import type { ProximityMode } from "@/features/nearby";

type Label = { value: string; color: string };

export function photoAccessLabel(access: PhotoAccess | null, usesSamplePhotos: boolean): Label {
  if (usesSamplePhotos) return { value: "Sample photos", color: colors.textSecondary };
  switch (access) {
    case "granted":
      return { value: "Allowed", color: colors.success };
    case "limited":
      return { value: "Limited", color: colors.accent };
    case "denied":
      return { value: "Not allowed", color: colors.danger };
    default:
      return { value: "Not asked", color: colors.textSecondary };
  }
}

export function nearbyAccessLabel(mode: ProximityMode): Label {
  switch (mode) {
    case "native":
      return { value: "Allowed", color: colors.success };
    case "simulated":
      return { value: "Simulated", color: colors.textSecondary };
    case "unavailable":
      return { value: "Coming soon", color: colors.textSecondary };
  }
}

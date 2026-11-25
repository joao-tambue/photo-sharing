import { Linking } from "react-native";

import { EmptyState, PillButton } from "@/shared/components";

import type { PhotoAccess } from "../../domain/photo-repository";

type PhotoAccessCardProps = {
  access: PhotoAccess;
  onRequestAccess: () => void;
};

export function PhotoAccessCard({
  access,
  onRequestAccess,
}: PhotoAccessCardProps) {
  const blocked = access === "denied";

  return (
    <EmptyState
      title="Allow access to your photos"
      message="Pick the photos you want to share. Nothing leaves your phone until you send it."
      action={
        <PillButton
          size="small"
          label={blocked ? "Open Settings" : "Allow access"}
          onPress={blocked ? () => Linking.openSettings() : onRequestAccess}
        />
      }
    />
  );
}

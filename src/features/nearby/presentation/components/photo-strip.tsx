import { StyleSheet, Text, View } from "react-native";

import { colors, fonts, spacing } from "@/core/theme";
import type { Photo } from "@/features/gallery";
import { PillButton } from "@/shared/components";

import type { DragController } from "../hooks/use-drag-to-share";

import { DraggableThumbnail } from "./draggable-thumbnail";

type PhotoStripProps = {
  photos: Photo[];
  highlightedId: string | null;
  drag: DragController<Photo>;
  needsAccess: boolean;
  onRequestAccess: () => void;
};

export function PhotoStrip({ photos, highlightedId, drag, needsAccess, onRequestAccess }: PhotoStripProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Drag a photo onto a device</Text>
      {needsAccess ? (
        <PillButton size="small" variant="secondary" label="Allow photo access" onPress={onRequestAccess} />
      ) : (
        <View style={styles.row}>
          {photos.map((photo) => (
            <DraggableThumbnail
              key={photo.id}
              photo={photo}
              drag={drag}
              isHighlighted={photo.id === highlightedId}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  label: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.text,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

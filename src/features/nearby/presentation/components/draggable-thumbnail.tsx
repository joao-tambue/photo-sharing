import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { GestureDetector, usePanGesture } from "react-native-gesture-handler";
import { scheduleOnRN } from "react-native-worklets";

import { colors, radius } from "@/core/theme";
import type { Photo } from "@/features/gallery";

import type { DragController } from "../hooks/use-drag-to-share";

export const THUMBNAIL_SIZE = 74;
const LONG_PRESS_MS = 180;

type DraggableThumbnailProps = {
  photo: Photo;
  drag: DragController<Photo>;
  isHighlighted: boolean;
};

export function DraggableThumbnail({ photo, drag, isHighlighted }: DraggableThumbnailProps) {
  const isLifted = drag.dragged?.id === photo.id;
  const { begin, move, finish, startDrag } = drag;
  const handleStart = () => startDrag(photo);

  const gesture = usePanGesture({
    activateAfterLongPress: LONG_PRESS_MS,
    onActivate: (event) => {
      "worklet";
      begin(event.absoluteX, event.absoluteY);
      scheduleOnRN(handleStart);
    },
    onUpdate: (event) => {
      "worklet";
      move(event.absoluteX, event.absoluteY);
    },
    onFinalize: () => {
      "worklet";
      finish();
    },
  });

  return (
    <GestureDetector gesture={gesture}>
      <View
        accessible
        accessibilityRole="imagebutton"
        accessibilityLabel={photo.fileName}
        accessibilityHint="Hold and drag onto a nearby device to send"
      >
        {isLifted ? (
          <View style={[styles.thumbnail, styles.slot]} />
        ) : (
          <Image
            source={photo.source}
            style={[styles.thumbnail, isHighlighted && styles.highlighted]}
            contentFit="cover"
            recyclingKey={photo.id}
          />
        )}
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    width: THUMBNAIL_SIZE,
    height: THUMBNAIL_SIZE,
    borderRadius: radius.thumb,
  },
  highlighted: {
    borderWidth: 2,
    borderColor: colors.accent,
  },
  slot: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
  },
});

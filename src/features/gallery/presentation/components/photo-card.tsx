import { Image } from "expo-image";
import { Pressable, StyleSheet } from "react-native";

import { radius } from "@/core/theme";

import type { Photo } from "../../domain/photo";

type PhotoCardProps = {
  photo: Photo;
  aspectRatio: number;
  onLongPress: (photo: Photo) => void;
};

export function PhotoCard({ photo, aspectRatio, onLongPress }: PhotoCardProps) {
  return (
    <Pressable
      onLongPress={() => onLongPress(photo)}
      delayLongPress={250}
      accessibilityRole="button"
      accessibilityLabel={photo.fileName}
      accessibilityHint="Hold to share with a nearby device"
      style={({ pressed }) => [styles.card, { aspectRatio }, pressed && styles.pressed]}
    >
      <Image
        source={photo.source}
        style={styles.image}
        contentFit="cover"
        transition={150}
        recyclingKey={photo.id}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: radius.card,
    overflow: "hidden",
  },
  pressed: {
    transform: [{ scale: 0.97 }],
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

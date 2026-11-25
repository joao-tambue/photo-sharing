import { Image, type ImageContentFit, type ImageSource } from "expo-image";
import { Pressable, StyleSheet } from "react-native";

import { Radius } from "@/constants/theme";

const DESIGN_CARD_WIDTH = 164;

export type Album = {
  id: string;
  title: string;
  cover: ImageSource | number;
  height: number;
  crop: { x: number; y: number; width: number; height: number };
  fit?: ImageContentFit;
};

type AlbumCardProps = {
  album: Album;
  onPress?: () => void;
};

const percent = (value: number): `${number}%` => `${value * 100}%`;

export function AlbumCard({ album, onPress }: AlbumCardProps) {
  const { cover, height, crop, fit = "cover", title } = album;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={({ pressed }) => [
        styles.card,
        { aspectRatio: DESIGN_CARD_WIDTH / height },
        pressed && styles.pressed,
      ]}
    >
      <Image
        source={cover}
        contentFit={fit}
        transition={150}
        style={{
          position: "absolute",
          left: percent(crop.x / DESIGN_CARD_WIDTH),
          top: percent(crop.y / height),
          width: percent(crop.width / DESIGN_CARD_WIDTH),
          height: percent(crop.height / height),
        }}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: Radius.card,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.85,
  },
});

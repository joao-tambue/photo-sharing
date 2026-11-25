import { Image } from "expo-image";
import { Pressable, StyleSheet } from "react-native";

import { images } from "@/shared/assets";

type NextButtonProps = {
  label: string;
  onPress: () => void;
};

const BUTTON = 60;
// The exported artwork is 100×100 because it includes the drop shadow around the 60pt button.
const ARTWORK = 100;

export function NextButton({ label, onPress }: NextButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Image source={images.nextButton} style={styles.artwork} pointerEvents="none" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: BUTTON,
    height: BUTTON,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
  artwork: {
    position: "absolute",
    left: -20,
    top: -16,
    width: ARTWORK,
    height: ARTWORK,
  },
});

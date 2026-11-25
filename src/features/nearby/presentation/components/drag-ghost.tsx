import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, withSpring, withTiming } from "react-native-reanimated";

import { colors, radius, shadows } from "@/core/theme";
import type { Photo } from "@/features/gallery";

import type { DragController } from "../hooks/use-drag-to-share";

const GHOST_SIZE = 88;

/** The lifted photo that follows the finger (the "Dragged photo" in Figma). */
export function DragGhost({ drag }: { drag: DragController<Photo> }) {
  const { pointerX, pointerY, rootOffset, isDragging, dragged } = drag;

  const style = useAnimatedStyle(() => {
    const active = isDragging.get();
    return {
      opacity: withTiming(active ? 1 : 0, { duration: 140 }),
      transform: [
        { translateX: pointerX.get() - rootOffset.get().x - GHOST_SIZE / 2 },
        { translateY: pointerY.get() - rootOffset.get().y - GHOST_SIZE / 2 },
        { rotate: "10deg" },
        { scale: withSpring(active ? 1 : 0.85) },
      ],
    };
  });

  return (
    <Animated.View pointerEvents="none" style={[styles.ghost, style]}>
      {dragged ? <Image source={dragged.source} style={styles.image} contentFit="cover" /> : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  ghost: {
    position: "absolute",
    left: 0,
    top: 0,
    width: GHOST_SIZE,
    height: GHOST_SIZE,
    borderRadius: radius.card,
    borderWidth: 3,
    borderColor: colors.background,
    overflow: "hidden",
    boxShadow: shadows.floating,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

import { Image, type ImageSource } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors, Fonts, Radius } from "@/constants/theme";

type QuickActionProps = {
  label: string;
  icon: ImageSource | number;
  iconSize?: { width: number; height: number };
  onPress?: () => void;
};

export function QuickAction({
  label,
  icon,
  iconSize = { width: 24, height: 24 },
  onPress,
}: QuickActionProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View style={styles.iconSlot}>
        <Image source={icon} style={iconSize} />
      </View>
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 74,
    alignItems: "center",
    gap: 6,
    // 9 + 1px border = the 10px inner padding in the design (Figma strokes sit inside).
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.card,
    backgroundColor: Colors.background,
  },
  pressed: {
    opacity: 0.6,
  },
  iconSlot: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.text,
  },
});

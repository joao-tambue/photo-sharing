import { Image, type ImageSource } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, fonts, radius } from "@/core/theme";

type QuickActionProps = {
  label: string;
  icon: ImageSource | number;
  iconSize: { width: number; height: number };
  isActive?: boolean;
  onPress: () => void;
};

export function QuickAction({
  label,
  icon,
  iconSize,
  isActive = false,
  onPress,
}: QuickActionProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: isActive }}
      style={({ pressed }) => [
        styles.container,
        isActive && styles.active,
        pressed && styles.pressed,
      ]}
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
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.card,
    backgroundColor: colors.background,
  },
  active: {
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
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
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.text,
  },
});

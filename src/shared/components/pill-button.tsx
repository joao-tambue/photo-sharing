import { Pressable, StyleSheet, Text, type ViewStyle } from "react-native";

import { colors, fonts, radius } from "@/core/theme";

type PillButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "secondary";
  size?: "large" | "small";
  style?: ViewStyle;
};

export function PillButton({
  label,
  onPress,
  variant = "primary",
  size = "large",
  style,
}: PillButtonProps) {
  const primary = variant === "primary";

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.base,
        size === "large" ? styles.large : styles.small,
        primary ? styles.primary : styles.secondary,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text
        style={[
          size === "large" ? styles.labelLarge : styles.labelSmall,
          { color: primary ? colors.onPrimary : colors.text },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.pill,
  },
  large: {
    height: 52,
    paddingHorizontal: 24,
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.7,
  },
  labelLarge: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
  },
  labelSmall: {
    fontFamily: fonts.medium,
    fontSize: 13,
  },
});

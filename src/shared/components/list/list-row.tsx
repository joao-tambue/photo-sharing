import { Image } from "expo-image";
import { Pressable, StyleSheet, Text } from "react-native";

import { colors, fonts, spacing } from "@/core/theme";
import { icons, iconSizes } from "@/shared/assets";

type ListRowProps = {
  title: string;
  value?: string;
  valueColor?: string;
  onPress?: () => void;
};

export function ListRow({
  title,
  value,
  valueColor = colors.textSecondary,
  onPress,
}: ListRowProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? "button" : undefined}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <Text style={styles.title}>{title}</Text>
      {value ? (
        <Text style={[styles.value, { color: valueColor }]}>{value}</Text>
      ) : null}
      {onPress ? (
        <Image source={icons.chevronRight} style={iconSizes.chevron} />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  pressed: {
    backgroundColor: colors.surfaceMuted,
  },
  title: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.text,
  },
  value: {
    fontFamily: fonts.medium,
    fontSize: 12,
  },
});

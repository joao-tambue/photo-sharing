import { Image, type ImageSource } from "expo-image";
import type { TabTriggerSlotProps } from "expo-router/ui";
import { Pressable, StyleSheet, Text } from "react-native";

import { colors, fonts } from "@/core/theme";

export type TabSlotProps = Omit<TabTriggerSlotProps, "ref">;

type TabBarButtonProps = TabSlotProps & {
  label: string;
  icon: ImageSource | number;
  iconSize: { width: number; height: number };
};

export function TabBarButton({
  label,
  icon,
  iconSize,
  isFocused,
  style: _slotStyle,
  ...props
}: TabBarButtonProps) {
  const tint = isFocused ? colors.text : colors.tabInactive;

  return (
    <Pressable
      {...props}
      role="tab"
      aria-label={label}
      aria-selected={isFocused}
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
    >
      <Image source={icon} style={iconSize} tintColor={tint} />
      <Text style={[styles.label, { color: tint }]} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    minWidth: 36,
    alignItems: "center",
    gap: 4,
  },
  label: {
    fontFamily: fonts.tabLabel,
    fontSize: 9,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.6,
  },
});

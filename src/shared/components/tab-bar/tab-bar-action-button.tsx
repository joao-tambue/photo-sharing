import { Image } from "expo-image";
import { Pressable, StyleSheet } from "react-native";

import { colors, radius } from "@/core/theme";
import { icons, iconSizes } from "@/shared/assets";

import type { TabSlotProps } from "./tab-bar-button";

type TabBarActionButtonProps = TabSlotProps & {
  label: string;
};

export function TabBarActionButton({
  label,
  isFocused,
  style: _slotStyle,
  ...props
}: TabBarActionButtonProps) {
  return (
    <Pressable
      {...props}
      role="tab"
      aria-label={label}
      aria-selected={isFocused}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Image source={icons.plus} style={iconSizes.plus} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 39.27,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});

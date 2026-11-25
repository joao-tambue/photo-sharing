import { Image, type ImageSource } from "expo-image";
import type { TabListProps, TabTriggerSlotProps } from "expo-router/ui";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors, Fonts, Radius } from "@/constants/theme";

type SlotProps = Omit<TabTriggerSlotProps, "ref">;

export function TabBar({ style, ...props }: TabListProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      {...props}
      style={[
        style,
        styles.bar,
        {
          paddingLeft: 20 + insets.left,
          paddingRight: 20 + insets.right,
          paddingBottom: Math.max(insets.bottom - 4, 12),
        },
      ]}
    />
  );
}

type TabBarButtonProps = SlotProps & {
  label: string;
  icon: ImageSource | number;
  /** Intrinsic size of the icon artwork. */
  iconSize?: { width: number; height: number };
};

export function TabBarButton({
  label,
  icon,
  iconSize = { width: 24, height: 24 },
  isFocused,
  style: _slotStyle,
  ...props
}: TabBarButtonProps) {
  return (
    <Pressable
      {...props}
      accessibilityRole="tab"
      accessibilityLabel={label}
      aria-selected={isFocused}
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
    >
      <Image source={icon} style={iconSize} />
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

type TabBarActionButtonProps = SlotProps & {
  accessibilityLabel: string;
};

export function TabBarActionButton({
  isFocused,
  style: _slotStyle,
  ...props
}: TabBarActionButtonProps) {
  return (
    <Pressable
      {...props}
      accessibilityRole="tab"
      aria-selected={isFocused}
      style={({ pressed }) => [styles.action, pressed && styles.pressed]}
    >
      <Image source={require("@/assets/icons/plus.svg")} style={styles.plus} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingTop: 12,
    backgroundColor: Colors.background,
  },
  item: {
    minWidth: 36,
    alignItems: "center",
    gap: 4,
  },
  label: {
    fontFamily: Fonts.tabLabel,
    fontSize: 9,
    color: Colors.text,
    textAlign: "center",
  },
  action: {
    width: 39.27,
    height: 40,
    borderRadius: Radius.pill,
    backgroundColor: Colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  plus: {
    width: 16,
    height: 16,
  },
  pressed: {
    opacity: 0.6,
  },
});

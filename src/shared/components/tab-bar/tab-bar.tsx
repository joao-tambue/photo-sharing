import type { TabListProps } from "expo-router/ui";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@/core/theme";

/** sessão de abas. */
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

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingTop: 12,
    backgroundColor: colors.background,
  },
});

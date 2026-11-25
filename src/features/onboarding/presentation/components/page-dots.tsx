import { StyleSheet, View } from "react-native";

import { colors } from "@/core/theme";

type PageDotsProps = {
  count: number;
  activeIndex: number;
};

export function PageDots({ count, activeIndex }: PageDotsProps) {
  return (
    <View
      style={styles.row}
      accessibilityRole="progressbar"
      accessibilityLabel={`Step ${activeIndex + 1} of ${count}`}
    >
      {Array.from({ length: count }, (_, index) => (
        <View key={index} style={[styles.dot, index === activeIndex ? styles.active : styles.idle]} />
      ))}
    </View>
  );
}

const DOT = 10;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
  },
  dot: {
    width: DOT,
    height: DOT,
    borderRadius: DOT / 2,
  },
  active: {
    backgroundColor: colors.accent,
  },
  idle: {
    borderWidth: 1,
    borderColor: colors.dotInactive,
  },
});

import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, fonts, radius, spacing } from "@/core/theme";

import { TRANSFER_FILTERS, type TransferFilter } from "../../domain/transfer";

const LABELS: Record<TransferFilter, string> = {
  all: "All",
  sent: "Sent",
  received: "Received",
};

type TransferFiltersProps = {
  value: TransferFilter;
  onChange: (filter: TransferFilter) => void;
};

export function TransferFilters({ value, onChange }: TransferFiltersProps) {
  return (
    <View style={styles.row} accessibilityRole="tablist">
      {TRANSFER_FILTERS.map((filter) => {
        const active = filter === value;
        return (
          <Pressable
            key={filter}
            onPress={() => onChange(filter)}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            style={[styles.pill, active ? styles.pillActive : styles.pillIdle]}
          >
            <Text style={[styles.label, { color: active ? colors.onPrimary : colors.text }]}>
              {LABELS[filter]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  pill: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
  },
  pillActive: {
    backgroundColor: colors.primary,
  },
  pillIdle: {
    backgroundColor: colors.surfaceMuted,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 13,
  },
});

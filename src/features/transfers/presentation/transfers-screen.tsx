import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, fonts, spacing } from "@/core/theme";
import { EmptyState, PillButton, ScreenHeader } from "@/shared/components";

import { useTransfersStore } from "../data/transfers-store";
import { groupByDay } from "../domain/group-by-day";
import { isTransferFilter, matchesFilter, type TransferFilter } from "../domain/transfer";

import { TransferFilters } from "./components/transfer-filters";
import { TransferProgressCard } from "./components/transfer-progress-card";
import { TransferRow } from "./components/transfer-row";

export function TransfersScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ filter?: string }>();
  const filter: TransferFilter = isTransferFilter(params.filter) ? params.filter : "all";
  const transfers = useTransfersStore((state) => state.transfers);

  const visible = transfers.filter((transfer) => matchesFilter(transfer, filter));
  const inProgress = visible.filter((transfer) => transfer.status === "in-progress");
  const sections = groupByDay(visible.filter((transfer) => transfer.status !== "in-progress"));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader title="Transfers" onPressAvatar={() => router.push("/profile")} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <TransferFilters value={filter} onChange={(next) => router.setParams({ filter: next })} />

        {inProgress.map((transfer) => (
          <TransferProgressCard key={transfer.id} transfer={transfer} />
        ))}

        {sections.map((section) => (
          <View key={section.label} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.label}</Text>
            <View>
              {section.transfers.map((transfer) => (
                <TransferRow key={transfer.id} transfer={transfer} />
              ))}
            </View>
          </View>
        ))}

        {visible.length === 0 && (
          <EmptyState
            title="No transfers yet"
            message="Photos you send or receive nearby will show up here."
            action={<PillButton size="small" label="Share a photo" onPress={() => router.push("/nearby")} />}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.lg,
  },
  section: {
    gap: spacing.xs,
  },
  sectionTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.text,
  },
});

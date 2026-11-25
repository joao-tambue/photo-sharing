import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { colors, fonts, radius, spacing } from "@/core/theme";
import { Card } from "@/shared/components";

import type { Transfer } from "../../domain/transfer";
import { presentTransfer } from "../transfer-presenter";

export function TransferProgressCard({ transfer }: { transfer: Transfer }) {
  const { title, meta, status } = presentTransfer(transfer);

  return (
    <Card style={styles.card}>
      <View style={styles.row}>
        <Image source={transfer.photo} style={styles.thumbnail} contentFit="cover" />
        <View style={styles.text}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.meta} numberOfLines={1}>
            {meta}
          </Text>
        </View>
        <Text style={styles.percent}>{status}</Text>
      </View>
      <View
        style={styles.track}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: Math.round(transfer.progress * 100) }}
      >
        <View style={[styles.value, { width: `${transfer.progress * 100}%` }]} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  thumbnail: {
    width: 52,
    height: 52,
    borderRadius: radius.thumb,
  },
  text: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.text,
  },
  meta: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textSecondary,
  },
  percent: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.accent,
  },
  track: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.progressTrack,
    overflow: "hidden",
  },
  value: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.accent,
  },
});

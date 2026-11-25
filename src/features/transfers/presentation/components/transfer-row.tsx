import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { colors, fonts, radius, spacing } from "@/core/theme";

import type { Transfer } from "../../domain/transfer";
import { presentTransfer } from "../transfer-presenter";

export function TransferRow({ transfer }: { transfer: Transfer }) {
  const { title, meta, status, statusColor } = presentTransfer(transfer);

  return (
    <View style={styles.row} accessible accessibilityLabel={`${title}, ${meta}, ${status}`}>
      <Image source={transfer.photo} style={styles.thumbnail} contentFit="cover" />
      <View style={styles.text}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {meta}
        </Text>
      </View>
      <Text style={[styles.status, { color: statusColor }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: 10,
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
  status: {
    fontFamily: fonts.medium,
    fontSize: 12,
  },
});

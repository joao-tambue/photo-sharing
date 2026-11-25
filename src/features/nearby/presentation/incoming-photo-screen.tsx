import { Image } from "expo-image";
import { Redirect, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, fonts, radius, spacing } from "@/core/theme";
import { icons, iconSizes } from "@/shared/assets";
import { PillButton } from "@/shared/components";
import { formatFileSize } from "@/shared/utils/format";

import { acceptOffer, declineOffer } from "../application/respond-to-offer";
import { useProximityStore } from "../data/proximity-store";
import { deviceInitial } from "../domain/nearby-device";

export function IncomingPhotoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  // Snapshot on open: answering clears the store, but the sheet keeps showing while it closes.
  const [offer] = useState(() => useProximityStore.getState().incomingOffer);

  if (!offer) return <Redirect href="/" />;

  const answer = (accepted: boolean) => {
    if (accepted) acceptOffer(offer);
    else declineOffer(offer);
    router.back();
  };

  return (
    <View style={styles.root}>
      <Animated.View entering={FadeIn} style={styles.overlay} />
      <Animated.View
        entering={SlideInDown.springify().damping(20)}
        style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, spacing.xl) }]}
        accessibilityViewIsModal
      >
        <View style={styles.grabber} />

        <View style={styles.sender}>
          <View style={styles.avatar}>
            <Text style={styles.initial}>{deviceInitial(offer.from)}</Text>
          </View>
          <View style={styles.senderText}>
            <Text style={styles.senderName}>{offer.from.name}</Text>
            <Text style={styles.senderAction}>wants to send you a photo</Text>
          </View>
        </View>

        <Image source={offer.preview} style={styles.preview} contentFit="cover" />

        <View style={styles.fileInfo}>
          <Text style={styles.fileName} numberOfLines={1}>
            {offer.fileName}
          </Text>
          <Text style={styles.fileSize}>{formatFileSize(offer.fileSize)}</Text>
        </View>

        <View style={styles.note}>
          <Image source={icons.shield} style={iconSizes.shield} />
          <Text style={styles.noteText}>Nothing is saved unless you accept.</Text>
        </View>

        <View style={styles.actions}>
          <PillButton label="Decline" variant="secondary" onPress={() => answer(false)} style={styles.action} />
          <PillButton label="Accept" onPress={() => answer(true)} style={styles.action} />
        </View>
      </Animated.View>
    </View>
  );
}

const AVATAR = 44;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.overlay,
  },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.sheet,
    borderTopRightRadius: radius.sheet,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.xl,
    gap: spacing.lg,
  },
  grabber: {
    alignSelf: "center",
    width: 36,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.grabber,
  },
  sender: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  avatar: {
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.deviceIndigoEnd,
    experimental_backgroundImage: `linear-gradient(135deg, ${colors.deviceIndigoStart}, ${colors.deviceIndigoEnd})`,
  },
  initial: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    color: colors.onPrimary,
  },
  senderText: {
    flex: 1,
    gap: 2,
  },
  senderName: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.text,
  },
  senderAction: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textSecondary,
  },
  preview: {
    width: "100%",
    height: 220,
    borderRadius: radius.card,
  },
  fileInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  fileName: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.text,
  },
  fileSize: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textSecondary,
  },
  note: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  noteText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.md,
  },
  action: {
    flex: 1,
  },
});

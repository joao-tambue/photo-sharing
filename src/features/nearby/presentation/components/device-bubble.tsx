import type { Ref } from "react";
import type { HostInstance } from "react-native";
import { StyleSheet, Text, View } from "react-native";

import { colors, fonts, radius, shadows } from "@/core/theme";

import { deviceInitial, type NearbyDevice } from "../../domain/nearby-device";

export const BUBBLE_WIDTH = 96;
export const AVATAR_SIZE = 56;

// Solid color first, as a fallback where CSS gradients are not supported.
const FILLS = [
  {
    backgroundColor: colors.deviceIndigoEnd,
    experimental_backgroundImage: `linear-gradient(135deg, ${colors.deviceIndigoStart}, ${colors.deviceIndigoEnd})`,
  },
  {
    backgroundColor: colors.deviceTealEnd,
    experimental_backgroundImage: `linear-gradient(135deg, ${colors.deviceTealStart}, ${colors.deviceTealEnd})`,
  },
];

type DeviceBubbleProps = {
  device: NearbyDevice;
  colorIndex: number;
  isTarget: boolean;
  chipLabel?: string;
  dropTarget?: Ref<HostInstance>;
};

export function DeviceBubble({ device, colorIndex, isTarget, chipLabel, dropTarget }: DeviceBubbleProps) {
  return (
    <View style={styles.container} accessible accessibilityLabel={device.name}>
      {isTarget && <View style={styles.glow} />}
      <View
        ref={dropTarget}
        collapsable={false}
        style={[
          styles.avatar,
          FILLS[colorIndex % FILLS.length],
          isTarget && styles.avatarTarget,
        ]}
      >
        <Text style={styles.initial}>{deviceInitial(device)}</Text>
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {device.name}
      </Text>
      {chipLabel ? (
        <View style={styles.chip}>
          <Text style={styles.chipLabel}>{chipLabel}</Text>
        </View>
      ) : null}
    </View>
  );
}

const GLOW_SIZE = 84;

const styles = StyleSheet.create({
  container: {
    width: BUBBLE_WIDTH,
    alignItems: "center",
    gap: 6,
  },
  glow: {
    position: "absolute",
    top: (AVATAR_SIZE - GLOW_SIZE) / 2,
    width: GLOW_SIZE,
    height: GLOW_SIZE,
    borderRadius: GLOW_SIZE / 2,
    backgroundColor: colors.accent,
    opacity: 0.22,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 3,
    borderColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: shadows.soft,
  },
  avatarTarget: {
    borderColor: colors.accent,
  },
  initial: {
    fontFamily: fonts.semiBold,
    fontSize: 20,
    color: colors.onPrimary,
  },
  name: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.text,
  },
  chip: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
  },
  chipLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 11,
    color: colors.onPrimary,
  },
});

import { Image } from "expo-image";
import { useEffect, type ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { colors, shadows } from "@/core/theme";
import { images } from "@/shared/assets";

import type { NearbyDevice } from "../../domain/nearby-device";

import { AVATAR_SIZE, BUBBLE_WIDTH } from "./device-bubble";

// Ring sizes and device angles follow the Figma radar (300pt wide, devices on a 140pt ring).
const RINGS = [
  { scale: 1, opacity: 0.06 },
  { scale: 230 / 300, opacity: 0.1 },
  { scale: 160 / 300, opacity: 0.16 },
];
const DEVICE_RING = 140 / 300;
const DEVICE_ANGLES = [-134, 38, 160, -40, 100, -90];

type RadarProps = {
  size: number;
  isScanning: boolean;
  isDimmed: boolean;
  devices: NearbyDevice[];
  renderDevice: (device: NearbyDevice, index: number) => ReactNode;
};

export function Radar({ size, isScanning, isDimmed, devices, renderDevice }: RadarProps) {
  const pulse = useSharedValue(0);

  useEffect(() => {
    if (isScanning) {
      pulse.set(withRepeat(withTiming(1, { duration: 2400, easing: Easing.out(Easing.quad) }), -1, false));
    } else {
      cancelAnimation(pulse);
      pulse.set(0);
    }
  }, [isScanning, pulse]);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: isScanning ? 0.35 * (1 - pulse.get()) : 0,
    transform: [{ scale: 0.35 + 0.65 * pulse.get() }],
  }));

  const center = size / 2;

  return (
    <View style={[{ width: size, height: size }, isDimmed && styles.dimmed]}>
      {RINGS.map((ring) => {
        const diameter = size * ring.scale;
        return (
          <View
            key={ring.scale}
            style={[
              styles.ring,
              {
                width: diameter,
                height: diameter,
                borderRadius: diameter / 2,
                left: center - diameter / 2,
                top: center - diameter / 2,
                opacity: ring.opacity,
              },
            ]}
          />
        );
      })}
      <Animated.View
        pointerEvents="none"
        style={[styles.ring, { width: size, height: size, borderRadius: size / 2 }, pulseStyle]}
      />

      <View style={[styles.me, { left: center - ME_RING / 2, top: center - ME_RING / 2 }]}>
        <Image source={images.avatar} style={styles.meImage} contentFit="cover" />
      </View>

      {devices.map((device, index) => {
        const angle = (DEVICE_ANGLES[index % DEVICE_ANGLES.length] * Math.PI) / 180;
        const x = center + Math.cos(angle) * size * DEVICE_RING;
        const y = center + Math.sin(angle) * size * DEVICE_RING;
        return (
          <View
            key={device.id}
            style={[styles.device, { left: x - BUBBLE_WIDTH / 2, top: y - AVATAR_SIZE / 2 }]}
          >
            {renderDevice(device, index)}
          </View>
        );
      })}
    </View>
  );
}

const ME_RING = 88;
const ME_IMAGE = 76;

const styles = StyleSheet.create({
  dimmed: {
    opacity: 0.45,
  },
  ring: {
    position: "absolute",
    backgroundColor: colors.accent,
  },
  me: {
    position: "absolute",
    width: ME_RING,
    height: ME_RING,
    borderRadius: ME_RING / 2,
    borderWidth: 2,
    borderColor: colors.accent,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: shadows.soft,
  },
  meImage: {
    width: ME_IMAGE,
    height: ME_IMAGE,
    borderRadius: ME_IMAGE / 2,
  },
  device: {
    position: "absolute",
  },
});

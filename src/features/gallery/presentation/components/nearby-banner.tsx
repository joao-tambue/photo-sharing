import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, fonts, radius, spacing } from "@/core/theme";
import { icons, iconSizes } from "@/shared/assets";

type NearbyBannerProps = {
  isVisible: boolean;
  onPress: () => void;
};

export function NearbyBanner({ isVisible, onPress }: NearbyBannerProps) {
  const title = isVisible ? "Visible to nearby devices" : "Hidden from nearby devices";
  const subtitle = isVisible
    ? "Hold a photo and drag it to share"
    : "Turn on visibility to share and receive";

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${subtitle}`}
      style={({ pressed }) => [styles.banner, pressed && styles.pressed]}
    >
      <Image source={icons.radar} style={[iconSizes.radar, !isVisible && styles.dimmed]} />
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Image source={icons.chevronRight} style={iconSizes.chevron} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: 14,
    borderRadius: radius.card,
    backgroundColor: colors.accentSoft,
  },
  pressed: {
    opacity: 0.7,
  },
  dimmed: {
    opacity: 0.4,
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
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textSecondary,
  },
});

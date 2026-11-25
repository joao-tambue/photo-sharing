import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { colors, fonts, spacing } from "@/core/theme";
import { icons, iconSizes } from "@/shared/assets";
import { BrandSwitch, Card } from "@/shared/components";

type VisibilityCardProps = {
  deviceName: string;
  isVisible: boolean;
  onChange: (isVisible: boolean) => void;
};

export function VisibilityCard({ deviceName, isVisible, onChange }: VisibilityCardProps) {
  return (
    <Card style={styles.card}>
      <Image source={icons.radar} style={[iconSizes.radar, !isVisible && styles.dimmed]} />
      <View style={styles.text}>
        <Text style={styles.title} numberOfLines={1}>
          {isVisible ? `Visible as ${deviceName}` : "Hidden from nearby devices"}
        </Text>
        <Text style={styles.subtitle}>
          {isVisible ? "Nearby devices can find you" : "Turn on to share and receive"}
        </Text>
      </View>
      <BrandSwitch value={isVisible} onValueChange={onChange} accessibilityLabel="Visible to nearby devices" />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: 14,
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

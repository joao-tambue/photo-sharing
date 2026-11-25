import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { colors, fonts } from "@/core/theme";

import type { OnboardingSlide } from "../../domain/onboarding-slide";

const ILLUSTRATION_RATIO = 1125 / 1059;

type OnboardingSlideViewProps = {
  slide: OnboardingSlide;
  width: number;
  height: number;
};

export function OnboardingSlideView({ slide, width, height }: OnboardingSlideViewProps) {
  return (
    <View style={[styles.slide, { width, height }]}>
      <Image
        source={slide.illustration}
        style={styles.illustration}
        contentFit="contain"
        accessibilityIgnoresInvertColors
      />
      <View style={styles.text}>
        <Text style={styles.title} accessibilityRole="header">
          {slide.title}
        </Text>
        <Text style={styles.description}>{slide.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    justifyContent: "space-between",
    paddingTop: 46,
    paddingBottom: 29,
  },
  illustration: {
    width: "100%",
    aspectRatio: ILLUSTRATION_RATIO,
  },
  text: {
    paddingHorizontal: 30,
    gap: 6,
  },
  title: {
    fontFamily: fonts.onboarding,
    fontSize: 34,
    lineHeight: 41,
    color: colors.onboardingTitle,
  },
  description: {
    fontFamily: fonts.onboarding,
    fontSize: 16,
    lineHeight: 21,
    color: colors.onboardingBody,
  },
});

import { useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, fonts } from "@/core/theme";
import { useSettingsStore } from "@/features/settings";

import { onboardingSlides } from "../data/onboarding-slides";
import type { OnboardingSlide } from "../domain/onboarding-slide";

import { NextButton } from "./components/next-button";
import { OnboardingSlideView } from "./components/onboarding-slide-view";
import { PageDots } from "./components/page-dots";

export function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const completeOnboarding = useSettingsStore((state) => state.completeOnboarding);
  const listRef = useRef<FlatList<OnboardingSlide>>(null);
  const [index, setIndex] = useState(0);
  // Itens de uma FlatList horizontal não esticam na vertical, por isso cada slide recebe a altura do pager.
  const [pagerHeight, setPagerHeight] = useState(0);

  const isLast = index === onboardingSlides.length - 1;

  const goNext = () => {
    if (isLast) {
      completeOnboarding();
      return;
    }
    listRef.current?.scrollToIndex({ index: index + 1, animated: true });
    setIndex(index + 1);
  };

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndex(Math.round(event.nativeEvent.contentOffset.x / width));
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.nav}>
        <PageDots count={onboardingSlides.length} activeIndex={index} />
        {!isLast && (
          <Pressable onPress={completeOnboarding} accessibilityRole="button" hitSlop={12}>
            <Text style={styles.skip}>Skip</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        ref={listRef}
        data={onboardingSlides}
        keyExtractor={(slide) => slide.id}
        renderItem={({ item }) => <OnboardingSlideView slide={item} width={width} height={pagerHeight} />}
        onLayout={({ nativeEvent }) => setPagerHeight(nativeEvent.layout.height)}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        getItemLayout={(_, itemIndex) => ({ length: width, offset: width * itemIndex, index: itemIndex })}
        style={styles.pager}
      />

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom - 4, 24) }]}>
        <NextButton label={isLast ? "Get started" : "Next"} onPress={goNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 18,
    marginTop: 32,
    paddingHorizontal: 30,
  },
  skip: {
    fontFamily: fonts.onboarding,
    fontSize: 13,
    lineHeight: 18,
    color: colors.onboardingBody,
  },
  pager: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 30,
  },
});

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useAppFonts } from "@/core/fonts/use-app-fonts";
import { useProximityEngine } from "@/features/nearby";
import { useSettingsStore } from "@/features/settings";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { ready } = useAppFonts();
  const hasCompletedOnboarding = useSettingsStore((state) => state.hasCompletedOnboarding);

  useProximityEngine(hasCompletedOnboarding);

  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;

  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!hasCompletedOnboarding}>
          <Stack.Screen name="onboarding" />
        </Stack.Protected>
        <Stack.Protected guard={hasCompletedOnboarding}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="incoming"
            options={{ presentation: "transparentModal", animation: "fade" }}
          />
        </Stack.Protected>
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

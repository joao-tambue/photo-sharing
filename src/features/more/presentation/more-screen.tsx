import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, fonts, spacing } from "@/core/theme";
import { useSettingsStore } from "@/features/settings";
import { ListCard, ListRow, ScreenHeader } from "@/shared/components";

export function MoreScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const replayOnboarding = useSettingsStore((state) => state.replayOnboarding);
  const version = Constants.expoConfig?.version ?? "—";

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader
        title="More"
        onPressAvatar={() => router.push("/profile")}
        onPressNotifications={() => router.push("/transfers")}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help</Text>
          <ListCard>
            <ListRow title="How it works" onPress={replayOnboarding} />
            <ListRow title="Privacy settings" onPress={() => router.push("/profile")} />
          </ListCard>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <ListCard>
            <ListRow title="Version" value={version} />
          </ListCard>
        </View>

        <Text style={styles.footnote}>
          Photos travel straight from phone to phone. Nothing is uploaded to a server.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.lg,
  },
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.text,
  },
  footnote: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
    textAlign: "center",
    paddingHorizontal: spacing.xl,
  },
});

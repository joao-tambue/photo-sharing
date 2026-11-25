import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, fonts, spacing } from "@/core/theme";
import { proximityMode } from "@/features/nearby";
import { useDeviceName, useSettingsStore } from "@/features/settings";
import { ListCard, ListRow, ScreenHeader, SwitchRow } from "@/shared/components";

import { DeviceCard } from "./components/device-card";
import { usePhotoAccess } from "./hooks/use-photo-access";
import { nearbyAccessLabel, photoAccessLabel } from "./permission-labels";

export function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const deviceName = useDeviceName();
  const settings = useSettingsStore();
  const photos = usePhotoAccess();

  const photoLabel = photoAccessLabel(photos.access, photos.usesSamplePhotos);
  const nearbyLabel = nearbyAccessLabel(proximityMode);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader title="Profile" onPressNotifications={() => router.push("/transfers")} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <DeviceCard name={deviceName} onRename={settings.renameDevice} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <ListCard>
            <SwitchRow
              title="Visible to nearby devices"
              subtitle="Turn off to stay hidden"
              value={settings.isVisible}
              onValueChange={settings.setVisible}
            />
            <SwitchRow
              title="Ask before receiving"
              subtitle="Approve every incoming photo"
              value={settings.askBeforeReceiving}
              onValueChange={settings.setAskBeforeReceiving}
            />
            <SwitchRow
              title="Save received photos"
              subtitle="Add accepted photos to your gallery"
              value={settings.saveReceivedPhotos}
              onValueChange={settings.setSaveReceivedPhotos}
            />
          </ListCard>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Permissions</Text>
          <ListCard>
            <ListRow
              title="Photos"
              value={photoLabel.value}
              valueColor={photoLabel.color}
              onPress={photos.usesSamplePhotos ? undefined : photos.resolve}
            />
            <ListRow title="Nearby devices" value={nearbyLabel.value} valueColor={nearbyLabel.color} />
          </ListCard>
        </View>
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
});

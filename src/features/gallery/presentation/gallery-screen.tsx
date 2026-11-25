import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useSettingsStore } from "@/features/settings";
import { colors, fonts, spacing } from "@/core/theme";
import { icons, iconSizes } from "@/shared/assets";
import { EmptyState, ScreenHeader } from "@/shared/components";

import type { Photo } from "../domain/photo";
import type { PhotoFilter } from "../domain/photo-repository";

import { NearbyBanner } from "./components/nearby-banner";
import { PhotoAccessCard } from "./components/photo-access-card";
import { PhotoMasonry } from "./components/photo-masonry";
import { QuickAction } from "./components/quick-action";
import { usePhotos } from "./hooks/use-photos";

const PAGE_SIZE = 20;
const EXPANDED_SIZE = 200;

export function GalleryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const isVisible = useSettingsStore((state) => state.isVisible);
  const [filter, setFilter] = useState<PhotoFilter>("recent");
  const [expanded, setExpanded] = useState(false);
  const { state, requestAccess } = usePhotos(filter, expanded ? EXPANDED_SIZE : PAGE_SIZE);

  const openNearby = () => router.push("/nearby");
  const sharePhoto = (photo: Photo) =>
    router.push({ pathname: "/nearby", params: { photoId: photo.id } });
  const openTransfers = (direction: "sent" | "received") =>
    router.push({ pathname: "/transfers", params: { filter: direction } });
  const toggleFavorites = () => setFilter((current) => (current === "favorites" ? "recent" : "favorites"));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader
        title="Gallery"
        onPressAvatar={() => router.push("/profile")}
        onPressNotifications={() => router.push("/transfers")}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.quickActions}>
          <QuickAction label="Nearby" icon={icons.compass} iconSize={iconSizes.quickAction} onPress={openNearby} />
          <QuickAction label="Sent" icon={icons.send} iconSize={iconSizes.quickAction} onPress={() => openTransfers("sent")} />
          <QuickAction label="Received" icon={icons.folderSolid} iconSize={iconSizes.folderSolid} onPress={() => openTransfers("received")} />
          <QuickAction
            label="Favorites"
            icon={icons.heart}
            iconSize={iconSizes.quickAction}
            isActive={filter === "favorites"}
            onPress={toggleFavorites}
          />
        </View>

        <NearbyBanner isVisible={isVisible} onPress={openNearby} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{filter === "favorites" ? "Favorites" : "Recent photos"}</Text>
          {state.status === "ready" && state.photos.length >= PAGE_SIZE ? (
            <Pressable accessibilityRole="button" hitSlop={8} onPress={() => setExpanded((value) => !value)}>
              <Text style={styles.seeAll}>{expanded ? "Show less" : "See all"}</Text>
            </Pressable>
          ) : null}
        </View>

        {state.status === "loading" && <ActivityIndicator color={colors.textSecondary} style={styles.loader} />}
        {state.status === "no-access" && <PhotoAccessCard access={state.access} onRequestAccess={requestAccess} />}
        {state.status === "ready" &&
          (state.photos.length > 0 ? (
            <PhotoMasonry photos={state.photos} onLongPressPhoto={sharePhoto} />
          ) : (
            <EmptyState
              title={filter === "favorites" ? "No favorites yet" : "No photos yet"}
              message="Photos on this phone will show up here, ready to share nearby."
            />
          ))}
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
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.text,
  },
  seeAll: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textSecondary,
    textDecorationLine: "underline",
  },
  loader: {
    marginTop: 40,
  },
});

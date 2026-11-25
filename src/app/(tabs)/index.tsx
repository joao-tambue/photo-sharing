import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AlbumCard } from "@/components/album-card";
import { QuickAction } from "@/components/quick-action";
import { ScreenHeader } from "@/components/screen-header";
import { Colors, Fonts, Spacing } from "@/constants/theme";
import { albums } from "@/data/albums";

const quickActions = [
  { label: "Video", icon: require("@/assets/icons/video.svg") },
  { label: "Favorite", icon: require("@/assets/icons/heart.svg") },
  { label: "Location", icon: require("@/assets/icons/location.svg") },
  {
    label: "All Files",
    icon: require("@/assets/icons/folder-solid.svg"),
    iconSize: { width: 20, height: 18 },
  },
];

const leftColumn = albums.filter((_, index) => index % 2 === 0);
const rightColumn = albums.filter((_, index) => index % 2 === 1);

export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader
        title="Home"
        avatar={require("@/assets/images/avatar.png")}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.quickActions}>
          {quickActions.map((action) => (
            <QuickAction key={action.label} {...action} />
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Albums</Text>
          <Pressable accessibilityRole="button" hitSlop={8}>
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </View>

        <View style={styles.grid}>
          {[leftColumn, rightColumn].map((column, index) => (
            <View key={index} style={styles.column}>
              {column.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: Spacing.screen,
    paddingTop: Spacing.section,
    paddingBottom: Spacing.section,
    gap: Spacing.section,
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
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.text,
  },
  seeAll: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.textMuted,
    textDecorationLine: "underline",
  },
  grid: {
    flexDirection: "row",
    gap: 15,
  },
  column: {
    flex: 1,
    gap: 16,
  },
});

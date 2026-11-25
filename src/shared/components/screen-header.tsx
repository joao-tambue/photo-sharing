import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, fonts, spacing } from "@/core/theme";
import { icons, iconSizes, images } from "@/shared/assets";

type ScreenHeaderProps = {
  title: string;
  onPressAvatar?: () => void;
  onPressNotifications?: () => void;
};

export function ScreenHeader({
  title,
  onPressAvatar,
  onPressNotifications,
}: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPressAvatar}
        disabled={!onPressAvatar}
        accessibilityRole="button"
        accessibilityLabel="Profile"
        hitSlop={8}
      >
        <Image source={images.avatar} style={styles.avatar} contentFit="cover" />
      </Pressable>
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      <Pressable
        onPress={onPressNotifications}
        disabled={!onPressNotifications}
        accessibilityRole="button"
        accessibilityLabel="Notifications"
        hitSlop={10}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <Image source={icons.notification} style={iconSizes.header} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.screen,
    paddingVertical: spacing.sm,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.text,
  },
  pressed: {
    opacity: 0.6,
  },
});

import { Image, type ImageSource } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors, Fonts, Spacing } from "@/constants/theme";

type ScreenHeaderProps = {
  title: string;
  avatar: ImageSource | number;
  onPressNotifications?: () => void;
};

export function ScreenHeader({
  title,
  avatar,
  onPressNotifications,
}: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <Image source={avatar} style={styles.avatar} contentFit="cover" />
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      <Pressable
        onPress={onPressNotifications}
        accessibilityRole="button"
        accessibilityLabel="Notifications"
        hitSlop={10}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <Image
          source={require("@/assets/icons/notification.svg")}
          style={styles.icon}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.screen,
    paddingVertical: 8,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  title: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: Colors.text,
  },
  icon: {
    width: 24,
    height: 24,
  },
  pressed: {
    opacity: 0.6,
  },
});

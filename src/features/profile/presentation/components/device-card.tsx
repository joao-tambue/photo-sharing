import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { colors, fonts, radius, spacing } from "@/core/theme";
import { MAX_DEVICE_NAME_LENGTH } from "@/features/settings";
import { images } from "@/shared/assets";
import { Card, PillButton } from "@/shared/components";

type DeviceCardProps = {
  name: string;
  onRename: (name: string) => void;
};

export function DeviceCard({ name, onRename }: DeviceCardProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const isEditing = draft !== null;

  const save = () => {
    if (draft !== null) onRename(draft);
    setDraft(null);
  };

  return (
    <Card style={styles.card}>
      <Image source={images.avatar} style={styles.avatar} contentFit="cover" />

      {isEditing ? (
        <TextInput
          value={draft}
          onChangeText={setDraft}
          onSubmitEditing={save}
          maxLength={MAX_DEVICE_NAME_LENGTH}
          autoFocus
          returnKeyType="done"
          placeholder="Device name"
          placeholderTextColor={colors.textSecondary}
          accessibilityLabel="Device name"
          style={styles.input}
        />
      ) : (
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
      )}
      <Text style={styles.caption}>This is how nearby devices see you</Text>

      {isEditing ? (
        <View style={styles.actions}>
          <PillButton size="small" variant="secondary" label="Cancel" onPress={() => setDraft(null)} />
          <PillButton size="small" label="Save" onPress={save} />
        </View>
      ) : (
        <PillButton size="small" variant="secondary" label="Edit name" onPress={() => setDraft(name)} />
      )}
    </Card>
  );
}

const AVATAR = 64;

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: 20,
    paddingHorizontal: spacing.lg,
  },
  avatar: {
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
  },
  name: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    color: colors.text,
  },
  input: {
    alignSelf: "stretch",
    fontFamily: fonts.semiBold,
    fontSize: 18,
    color: colors.text,
    textAlign: "center",
    paddingVertical: 6,
    borderRadius: radius.thumb,
    backgroundColor: colors.surfaceMuted,
  },
  caption: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
});

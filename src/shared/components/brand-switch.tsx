import { Platform, Switch } from "react-native";

import { colors } from "@/core/theme";

const webThumbProps =
  Platform.OS === "web" ? { activeThumbColor: colors.background } : {};

type BrandSwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  accessibilityLabel: string;
};

const OFF_TRACK = "#E5E5EA";

export function BrandSwitch({
  value,
  onValueChange,
  accessibilityLabel,
}: BrandSwitchProps) {
  return (
    <Switch
      {...webThumbProps}
      value={value}
      onValueChange={onValueChange}
      accessibilityLabel={accessibilityLabel}
      trackColor={{ false: OFF_TRACK, true: colors.accent }}
      thumbColor={colors.background}
      ios_backgroundColor={OFF_TRACK}
    />
  );
}

import { Children, Fragment, type ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "@/core/theme";
import { Card } from "@/shared/components/card";

export function ListCard({ children }: { children: ReactNode }) {
  const rows = Children.toArray(children);

  return (
    <Card>
      {rows.map((row, index) => (
        <Fragment key={index}>
          {index > 0 && <View style={styles.divider} />}
          {row}
        </Fragment>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: colors.divider,
  },
});

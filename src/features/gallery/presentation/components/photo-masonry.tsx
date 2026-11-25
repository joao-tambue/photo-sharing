import { StyleSheet, View } from "react-native";

import type { Photo } from "../../domain/photo";

import { PhotoCard } from "./photo-card";

const SHORT = 164 / 157;
const TALL = 164 / 218;

type PhotoMasonryProps = {
  photos: Photo[];
  onLongPressPhoto: (photo: Photo) => void;
};

/** Dois colunas intercaladas: a esquerda começa curta, a direita começa alta. */
export function PhotoMasonry({ photos, onLongPressPhoto }: PhotoMasonryProps) {
  const columns = [0, 1].map((column) =>
    photos.filter((_, index) => index % 2 === column),
  );

  return (
    <View style={styles.grid}>
      {columns.map((column, columnIndex) => (
        <View key={columnIndex} style={styles.column}>
          {column.map((photo, rowIndex) => {
            const startsShort = columnIndex === 0;
            const isShort = rowIndex % 2 === 0 ? startsShort : !startsShort;
            return (
              <PhotoCard
                key={photo.id}
                photo={photo}
                aspectRatio={isShort ? SHORT : TALL}
                onLongPress={onLongPressPhoto}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    gap: 15,
  },
  column: {
    flex: 1,
    gap: 16,
  },
});

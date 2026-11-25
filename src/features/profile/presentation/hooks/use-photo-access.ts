import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Linking } from "react-native";

import { photoRepository, type PhotoAccess } from "@/features/gallery";

/** Current photo permission, refreshed whenever the screen regains focus (e.g. back from Settings). */
export function usePhotoAccess() {
  const [access, setAccess] = useState<PhotoAccess | null>(null);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      photoRepository.getAccess().then((value) => {
        if (active) setAccess(value);
      });
      return () => {
        active = false;
      };
    }, []),
  );

  const resolve = async () => {
    if (access === "undetermined") setAccess(await photoRepository.requestAccess());
    else await Linking.openSettings();
  };

  return { access, usesSamplePhotos: photoRepository.usesSamplePhotos, resolve };
}

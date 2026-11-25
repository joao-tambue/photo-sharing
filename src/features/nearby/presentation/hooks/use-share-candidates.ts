import { useEffect, useState } from "react";

import { photoRepository, usePhotos, type Photo } from "@/features/gallery";

const STRIP_SIZE = 4;

/** Photos offered in the drag strip: the one picked in the gallery first, then the latest. */
export function useShareCandidates(selectedPhotoId: string | undefined) {
  const { state, requestAccess } = usePhotos("recent", STRIP_SIZE + 1);
  const [selected, setSelected] = useState<{ id: string; photo: Photo | null } | null>(null);

  useEffect(() => {
    if (!selectedPhotoId) return;
    let active = true;
    photoRepository.getPhoto(selectedPhotoId).then((photo) => {
      if (active) setSelected({ id: selectedPhotoId, photo });
    });
    return () => {
      active = false;
    };
  }, [selectedPhotoId]);

  const selectedPhoto = selected && selected.id === selectedPhotoId ? selected.photo : null;
  const recent = state.status === "ready" ? state.photos : [];
  const photos = [selectedPhoto, ...recent.filter((photo) => photo.id !== selectedPhoto?.id)]
    .filter((photo): photo is Photo => photo !== null)
    .slice(0, STRIP_SIZE);

  return {
    photos,
    highlightedId: selectedPhoto?.id ?? null,
    needsAccess: state.status === "no-access",
    requestAccess,
  };
}

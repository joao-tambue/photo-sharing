import { useCallback, useEffect, useState } from "react";

import { photoRepository } from "../../data/photo-repository";
import type { Photo } from "../../domain/photo";
import {
  hasPhotoAccess,
  type PhotoAccess,
  type PhotoFilter,
} from "../../domain/photo-repository";

type PhotosState =
  | { status: "loading" }
  | { status: "no-access"; access: PhotoAccess }
  | { status: "ready"; photos: Photo[] };

/** carrega fotos do repositório e logo em seguida expõe o fluxo de permissão. */
export function usePhotos(filter: PhotoFilter, limit: number) {
  const [state, setState] = useState<PhotosState>({ status: "loading" });
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    (async () => {
      const access = await photoRepository.getAccess();
      if (!hasPhotoAccess(access)) {
        if (active) setState({ status: "no-access", access });
        return;
      }
      const photos = await photoRepository.getPhotos({ filter, limit });
      if (active) setState({ status: "ready", photos });
    })();

    return () => {
      active = false;
    };
  }, [filter, limit, reloadKey]);

  const reload = useCallback(() => setReloadKey((key) => key + 1), []);

  const requestAccess = useCallback(async () => {
    const access = await photoRepository.requestAccess();
    if (hasPhotoAccess(access)) reload();
    else setState({ status: "no-access", access });
  }, [reload]);

  return {
    state,
    reload,
    requestAccess,
    usesSamplePhotos: photoRepository.usesSamplePhotos,
  };
}

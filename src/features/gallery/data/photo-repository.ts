import type { PhotoRepository } from "../domain/photo-repository";

import { MediaLibraryPhotoRepository } from "./media-library-photo-repository";

export const photoRepository: PhotoRepository = new MediaLibraryPhotoRepository();

import type { PhotoRepository } from "../domain/photo-repository";

import { SamplePhotoRepository } from "./sample-photo-repository";

// expo-media-library has no web implementation, so the web preview uses sample photos.
export const photoRepository: PhotoRepository = new SamplePhotoRepository();

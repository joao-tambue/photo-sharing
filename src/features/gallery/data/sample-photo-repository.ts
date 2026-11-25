import { images } from "@/shared/assets";

import type { Photo } from "../domain/photo";
import type { PhotoAccess, PhotoQuery, PhotoRepository } from "../domain/photo-repository";

const HOUR_MS = 60 * 60 * 1000;

const samplePhotos: Photo[] = [
  { file: "IMG_2041.jpg", width: 2000, height: 1333, favorite: false },
  { file: "IMG_2038.jpg", width: 2000, height: 1335, favorite: true },
  { file: "IMG_1990.jpg", width: 1333, height: 2000, favorite: false },
  { file: "IMG_1987.jpg", width: 1333, height: 2000, favorite: true },
].map((sample, index) => ({
  id: `sample-${index + 1}`,
  source: images.samples[index],
  width: sample.width,
  height: sample.height,
  fileName: sample.file,
  createdAt: Date.now() - index * 5 * HOUR_MS,
  isFavorite: sample.favorite,
}));

/** Serves the bundled design photos where the device library is unavailable (web). */
export class SamplePhotoRepository implements PhotoRepository {
  readonly usesSamplePhotos = true;

  async getAccess(): Promise<PhotoAccess> {
    return "granted";
  }

  async requestAccess(): Promise<PhotoAccess> {
    return "granted";
  }

  async getPhotos({ filter, limit }: PhotoQuery): Promise<Photo[]> {
    const photos = filter === "favorites" ? samplePhotos.filter((p) => p.isFavorite) : samplePhotos;
    return photos.slice(0, limit);
  }

  async getPhoto(id: string): Promise<Photo | null> {
    return samplePhotos.find((photo) => photo.id === id) ?? null;
  }
}

export { samplePhotos };

import type { Photo } from "./photo";

export type PhotoAccess = "granted" | "limited" | "undetermined" | "denied";

export type PhotoFilter = "recent" | "favorites";

export type PhotoQuery = {
  filter: PhotoFilter;
  limit: number;
};

export interface PhotoRepository {
  readonly usesSamplePhotos: boolean;
  getAccess(): Promise<PhotoAccess>;
  requestAccess(): Promise<PhotoAccess>;
  getPhotos(query: PhotoQuery): Promise<Photo[]>;
  getPhoto(id: string): Promise<Photo | null>;
}

export const hasPhotoAccess = (access: PhotoAccess) =>
  access === "granted" || access === "limited";

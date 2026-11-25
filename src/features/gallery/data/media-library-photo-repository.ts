import {
  Asset,
  AssetField,
  MediaType,
  Query,
  getPermissionsAsync,
  requestPermissionsAsync,
  type AssetInfo,
  type PermissionResponse,
} from "expo-media-library";

import type { Photo } from "../domain/photo";
import type {
  PhotoAccess,
  PhotoQuery,
  PhotoRepository,
} from "../domain/photo-repository";

const READ_ONLY = false;
const PHOTOS_ONLY = ["photo" as const];

const toAccess = (response: PermissionResponse): PhotoAccess => {
  if (response.granted)
    return response.accessPrivileges === "limited" ? "limited" : "granted";
  return response.canAskAgain ? "undetermined" : "denied";
};

const toPhoto = (info: AssetInfo): Photo => ({
  id: info.id,
  source: info.uri,
  width: info.width,
  height: info.height,
  fileName: info.filename,
  createdAt: info.creationTime,
  isFavorite: info.isFavorite ?? false,
});

/*leitura de fotos da biblioteca do dispositivo com a API `Query` do SDK 58. */
export class MediaLibraryPhotoRepository implements PhotoRepository {
  readonly usesSamplePhotos = false;

  async getAccess(): Promise<PhotoAccess> {
    return toAccess(await getPermissionsAsync(READ_ONLY, PHOTOS_ONLY));
  }

  async requestAccess(): Promise<PhotoAccess> {
    return toAccess(await requestPermissionsAsync(READ_ONLY, PHOTOS_ONLY));
  }

  async getPhotos({ filter, limit }: PhotoQuery): Promise<Photo[]> {
    let query = new Query().eq(AssetField.MEDIA_TYPE, MediaType.IMAGE);
    if (filter === "favorites") query = query.eq(AssetField.IS_FAVORITE, true);

    const assets = await query
      .orderBy({ key: AssetField.CREATION_TIME, ascending: false })
      .limit(limit)
      .exe();

    const infos = await Promise.all(assets.map((asset) => asset.getInfo()));
    return infos.map(toPhoto);
  }

  async getPhoto(id: string): Promise<Photo | null> {
    try {
      return toPhoto(await new Asset(id).getInfo());
    } catch {
      return null;
    }
  }
}

export type PhotoSource = string | number;

export type Photo = {
  id: string;
  source: PhotoSource;
  width: number;
  height: number;
  fileName: string;
  createdAt: number | null;
  isFavorite: boolean;
};

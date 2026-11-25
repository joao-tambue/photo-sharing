import type { PhotoSource } from "@/features/gallery";

export type TransferDirection = "sent" | "received";

export type TransferStatus = "in-progress" | "completed" | "declined" | "failed";

export type Transfer = {
  id: string;
  direction: TransferDirection;
  peerId: string;
  peerName: string;
  fileName: string;
  fileSize: number | null;
  photo: PhotoSource;
  status: TransferStatus;
  progress: number;
  createdAt: number;
};

export type TransferFilter = "all" | TransferDirection;

export const TRANSFER_FILTERS: TransferFilter[] = ["all", "sent", "received"];

export const isTransferFilter = (value: unknown): value is TransferFilter =>
  TRANSFER_FILTERS.includes(value as TransferFilter);

export const matchesFilter = (transfer: Transfer, filter: TransferFilter) =>
  filter === "all" || transfer.direction === filter;

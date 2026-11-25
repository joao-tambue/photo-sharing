import { create } from "zustand";
import { persist } from "zustand/middleware";

import { persistStorage } from "@/core/storage";

import type { Transfer, TransferStatus } from "../domain/transfer";

const MAX_HISTORY = 100;

type TransfersState = {
  transfers: Transfer[];
  add: (transfer: Transfer) => void;
  updateProgress: (id: string, progress: number) => void;
  finish: (id: string, status: Exclude<TransferStatus, "in-progress">) => void;
};

const update = (transfers: Transfer[], id: string, patch: Partial<Transfer>) =>
  transfers.map((transfer) =>
    transfer.id === id ? { ...transfer, ...patch } : transfer,
  );

export const useTransfersStore = create<TransfersState>()(
  persist(
    (set) => ({
      transfers: [],
      add: (transfer) =>
        set((state) => ({
          transfers: [transfer, ...state.transfers].slice(0, MAX_HISTORY),
        })),
      updateProgress: (id, progress) =>
        set((state) => ({
          transfers: update(state.transfers, id, { progress }),
        })),
      finish: (id, status) =>
        set((state) => ({
          transfers: update(state.transfers, id, {
            status,
            progress: status === "completed" ? 1 : 0,
          }),
        })),
    }),
    {
      name: "transfers",
      version: 1,
      storage: persistStorage,
      // Uma transferência em andamento n persiste se a app for fechada ou reiniciada; portanto, apenas as concluídas são mantidas.
      // Isso também evita que o armazenamento cresça indefinidamente, caso o usuário nunca mais abra o aplicativo.
      partialize: (state) => ({
        transfers: state.transfers.filter(
          (transfer) => transfer.status !== "in-progress",
        ),
      }),
    },
  ),
);

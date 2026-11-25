import { colors } from "@/core/theme";
import { formatFileSize, formatTime, joinMeta } from "@/shared/utils/format";

import type { Transfer } from "../domain/transfer";

export type TransferViewModel = {
  title: string;
  meta: string;
  status: string;
  statusColor: string;
};

const statusOf = (transfer: Transfer): Pick<TransferViewModel, "status" | "statusColor"> => {
  switch (transfer.status) {
    case "in-progress":
      return { status: `${Math.round(transfer.progress * 100)}%`, statusColor: colors.accent };
    case "completed":
      return transfer.direction === "sent"
        ? { status: "Sent", statusColor: colors.textSecondary }
        : { status: "Saved", statusColor: colors.success };
    case "declined":
      return { status: "Declined", statusColor: colors.danger };
    case "failed":
      return { status: "Failed", statusColor: colors.danger };
  }
};

const titleOf = (transfer: Transfer) => {
  if (transfer.direction === "received") return `Received from ${transfer.peerName}`;
  return transfer.status === "in-progress"
    ? `Sending to ${transfer.peerName}`
    : `Sent to ${transfer.peerName}`;
};

export function presentTransfer(transfer: Transfer): TransferViewModel {
  const size = transfer.fileSize === null ? null : formatFileSize(transfer.fileSize);
  const time = transfer.status === "in-progress" ? null : formatTime(transfer.createdAt);

  return {
    title: titleOf(transfer),
    meta: joinMeta(transfer.fileName, size, time),
    ...statusOf(transfer),
  };
}

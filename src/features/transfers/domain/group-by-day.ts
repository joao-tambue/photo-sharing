import { formatDayLabel } from "@/shared/utils/format";

import type { Transfer } from "./transfer";

export type TransferSection = {
  label: string;
  transfers: Transfer[];
};

/** Groups transfers (newest first) under "Today", "Yesterday" or a date label. */
export function groupByDay(transfers: Transfer[], now = Date.now()): TransferSection[] {
  const sections: TransferSection[] = [];
  const sorted = [...transfers].sort((a, b) => b.createdAt - a.createdAt);

  for (const transfer of sorted) {
    const label = formatDayLabel(transfer.createdAt, now);
    const last = sections.at(-1);
    if (last?.label === label) last.transfers.push(transfer);
    else sections.push({ label, transfers: [transfer] });
  }

  return sections;
}

const DAY_MS = 24 * 60 * 60 * 1000;

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

const startOfDay = (timestamp: number) => {
  const date = new Date(timestamp);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
};

export function formatDayLabel(timestamp: number, now = Date.now()): string {
  const diffDays = Math.round(
    (startOfDay(now) - startOfDay(timestamp)) / DAY_MS,
  );
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return new Date(timestamp).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });
}

export function joinMeta(...parts: (string | null | undefined)[]): string {
  return parts.filter(Boolean).join(" · ");
}

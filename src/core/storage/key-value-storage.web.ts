import type { KeyValueStorage } from "./key-value-storage.types";

const browserStorage = (): Storage | null => {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
};

export const keyValueStorage: KeyValueStorage = {
  getItem: (key) => {
    try {
      return browserStorage()?.getItem(key) ?? null;
    } catch {
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      browserStorage()?.setItem(key, value);
    } catch {}
  },
  removeItem: (key) => {
    try {
      browserStorage()?.removeItem(key);
    } catch {
      // n preciso apresentar um erro caso falhe
    }
  },
};

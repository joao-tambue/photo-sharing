import Storage from "expo-sqlite/kv-store";

import type { KeyValueStorage } from "./key-value-storage.types";

export const keyValueStorage: KeyValueStorage = {
  getItem: (key) => Storage.getItemSync(key),
  setItem: (key, value) => Storage.setItemSync(key, value),
  removeItem: (key) => {
    Storage.removeItemSync(key);
  },
};

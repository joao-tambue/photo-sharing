import { createJSONStorage } from "zustand/middleware";

import { keyValueStorage } from "./key-value-storage";

export { keyValueStorage } from "./key-value-storage";
export type { KeyValueStorage } from "./key-value-storage.types";

export const persistStorage = createJSONStorage(() => keyValueStorage);

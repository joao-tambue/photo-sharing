import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Lexend_400Regular } from "@expo-google-fonts/lexend";
import { Roboto_400Regular } from "@expo-google-fonts/roboto";

/** Loads every font family referenced by `core/theme/fonts`. */
export function useAppFonts() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Lexend_400Regular,
    Roboto_400Regular,
  });

  return { ready: loaded || error !== null, error };
}

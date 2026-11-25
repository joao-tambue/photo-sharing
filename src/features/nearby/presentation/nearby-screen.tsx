import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, fonts, spacing } from "@/core/theme";
import type { Photo } from "@/features/gallery";
import { useDeviceName, useSettingsStore } from "@/features/settings";
import { useTransfersStore } from "@/features/transfers";
import { ScreenHeader } from "@/shared/components";

import { proximityMode } from "../application/proximity-engine";
import { sharePhoto } from "../application/share-photo";
import { useProximityStore } from "../data/proximity-store";
import type { NearbyDevice } from "../domain/nearby-device";

import { DeviceBubble } from "./components/device-bubble";
import { DragGhost } from "./components/drag-ghost";
import { PhotoStrip } from "./components/photo-strip";
import { Radar } from "./components/radar";
import { VisibilityCard } from "./components/visibility-card";
import { useDragToShare } from "./hooks/use-drag-to-share";
import { useShareCandidates } from "./hooks/use-share-candidates";

const MAX_RADAR_SIZE = 300;

type NearbyMode = "hidden" | "searching" | "found";

const STATUS_COPY: Record<Exclude<NearbyMode, "found">, { title: string; hint: string }> = {
  hidden: {
    title: "You’re hidden",
    hint: "Turn on visibility so nearby devices can find you and send you photos.",
  },
  searching:
    proximityMode === "unavailable"
      ? {
          title: "Nearby sharing is coming soon",
          hint: "Device discovery arrives with the native proximity engine.",
        }
      : {
          title: "Looking for nearby devices…",
          hint: "Ask your friend to open the app and bring the phones close together.",
        },
};

export function NearbyScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { photoId } = useLocalSearchParams<{ photoId?: string }>();
  const deviceName = useDeviceName();
  const isVisible = useSettingsStore((state) => state.isVisible);
  const setVisible = useSettingsStore((state) => state.setVisible);
  const devices = useProximityStore((state) => state.devices);
  const transfers = useTransfersStore((state) => state.transfers);
  const candidates = useShareCandidates(photoId);
  const [radarSize, setRadarSize] = useState(0);

  const { attachRoot, attachDropZone, hoveredZoneId, controller } = useDragToShare<Photo>(
    (photo, deviceId) => {
      const device = devices.find((candidate) => candidate.id === deviceId);
      if (device) sharePhoto(photo, device);
    },
  );

  const mode: NearbyMode = !isVisible ? "hidden" : devices.length === 0 ? "searching" : "found";

  const chipFor = (device: NearbyDevice) => {
    if (hoveredZoneId === device.id) return "Release to send";
    const sending = transfers.find(
      (transfer) => transfer.peerId === device.id && transfer.status === "in-progress",
    );
    return sending ? `Sending ${Math.round(sending.progress * 100)}%` : undefined;
  };

  return (
    <View ref={attachRoot} collapsable={false} style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader
        title="Nearby"
        onPressAvatar={() => router.push("/profile")}
        onPressNotifications={() => router.push("/transfers")}
      />

      <View style={styles.content}>
        <VisibilityCard deviceName={deviceName} isVisible={isVisible} onChange={setVisible} />

        {mode === "found" && (
          <Text style={styles.status}>
            {devices.length === 1 ? "1 device nearby" : `${devices.length} devices nearby`}
          </Text>
        )}

        <View
          style={styles.radarArea}
          onLayout={({ nativeEvent }) =>
            setRadarSize(Math.min(MAX_RADAR_SIZE, nativeEvent.layout.width, nativeEvent.layout.height))
          }
        >
          {radarSize > 0 && (
            <Radar
              size={radarSize}
              isScanning={mode === "searching" && proximityMode !== "unavailable"}
              isDimmed={mode === "hidden"}
              devices={devices}
              renderDevice={(device, index) => (
                <DeviceBubble
                  device={device}
                  colorIndex={index}
                  isTarget={hoveredZoneId === device.id}
                  chipLabel={chipFor(device)}
                  dropTarget={attachDropZone(device.id)}
                />
              )}
            />
          )}
        </View>

        {mode === "found" ? (
          <PhotoStrip
            photos={candidates.photos}
            highlightedId={candidates.highlightedId}
            drag={controller}
            needsAccess={candidates.needsAccess}
            onRequestAccess={candidates.requestAccess}
          />
        ) : (
          <View style={styles.message}>
            <Text style={styles.messageTitle}>{STATUS_COPY[mode].title}</Text>
            <Text style={styles.messageHint}>{STATUS_COPY[mode].hint}</Text>
          </View>
        )}
      </View>

      <DragGhost drag={controller} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.lg,
  },
  status: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.text,
  },
  radarArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  messageTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.text,
    textAlign: "center",
  },
  messageHint: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
    textAlign: "center",
  },
});

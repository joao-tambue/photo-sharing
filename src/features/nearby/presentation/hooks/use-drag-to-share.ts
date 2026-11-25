import { useCallback, useRef, useState } from "react";
import type { HostInstance } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

type Rect = { x: number; y: number; width: number; height: number };
type DropZone = { id: string; rect: Rect };

// Extra room around a drop zone so the target is easy to hit with a finger.
const HIT_SLOP = 20;

/**
 * Drag-and-drop between draggable items and drop zones, in window coordinates.
 * Pointer tracking and hit testing run on the UI thread; results reach React via `scheduleOnRN`.
 */
export function useDragToShare<T>(onDrop: (item: T, zoneId: string) => void) {
  const pointerX = useSharedValue(0);
  const pointerY = useSharedValue(0);
  const isDragging = useSharedValue(false);
  const hoveredZone = useSharedValue<string | null>(null);
  const zones = useSharedValue<DropZone[]>([]);
  const rootOffset = useSharedValue({ x: 0, y: 0 });

  const rootView = useRef<HostInstance | null>(null);
  const zoneViews = useRef(new Map<string, HostInstance>());
  const draggedRef = useRef<T | null>(null);
  const [dragged, setDragged] = useState<T | null>(null);
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);

  const measure = useCallback(() => {
    rootView.current?.measureInWindow((x, y) => rootOffset.set({ x, y }));
    const entries = [...zoneViews.current.entries()];
    const measured: DropZone[] = [];
    entries.forEach(([id, view]) =>
      view.measureInWindow((x, y, width, height) => {
        measured.push({ id, rect: { x, y, width, height } });
        if (measured.length === entries.length) zones.set(measured);
      }),
    );
  }, [rootOffset, zones]);

  // Refs de callback (e não objetos ref) para que `drag` possa ser passado como prop durante o render.
  const attachRoot = useCallback((view: HostInstance | null) => {
    rootView.current = view;
  }, []);

  const attachDropZone = useCallback(
    (id: string) => (view: HostInstance | null) => {
      if (view) zoneViews.current.set(id, view);
      else zoneViews.current.delete(id);
    },
    [],
  );

  const startDrag = useCallback(
    (item: T) => {
      draggedRef.current = item;
      setDragged(item);
      measure();
    },
    [measure],
  );

  const endDrag = useCallback(
    (zoneId: string | null) => {
      const item = draggedRef.current;
      draggedRef.current = null;
      setDragged(null);
      setHoveredZoneId(null);
      if (item !== null && zoneId) onDrop(item, zoneId);
    },
    [onDrop],
  );

  const begin = (x: number, y: number) => {
    "worklet";
    pointerX.set(x);
    pointerY.set(y);
    hoveredZone.set(null);
    isDragging.set(true);
  };

  const move = (x: number, y: number) => {
    "worklet";
    pointerX.set(x);
    pointerY.set(y);
    let hit: string | null = null;
    for (const zone of zones.get()) {
      const { rect } = zone;
      if (
        x >= rect.x - HIT_SLOP &&
        x <= rect.x + rect.width + HIT_SLOP &&
        y >= rect.y - HIT_SLOP &&
        y <= rect.y + rect.height + HIT_SLOP
      ) {
        hit = zone.id;
        break;
      }
    }
    if (hit !== hoveredZone.get()) {
      hoveredZone.set(hit);
      scheduleOnRN(setHoveredZoneId, hit);
    }
  };

  const finish = () => {
    "worklet";
    if (!isDragging.get()) return;
    isDragging.set(false);
    scheduleOnRN(endDrag, hoveredZone.get());
  };

  return {
    attachRoot,
    attachDropZone,
    hoveredZoneId,
    controller: { rootOffset, pointerX, pointerY, isDragging, dragged, startDrag, begin, move, finish },
  };
}

export type DragController<T> = ReturnType<typeof useDragToShare<T>>["controller"];

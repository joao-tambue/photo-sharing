export const images = {
  avatar: require("@/assets/images/avatar.png"),
  nextButton: require("@/assets/images/next-button.png"),
  onboarding: {
    shareNearby: require("@/assets/images/onboarding/share-nearby.png"),
    holdDragSend: require("@/assets/images/onboarding/hold-drag-send.png"),
    privateByDesign: require("@/assets/images/onboarding/private-by-design.png"),
  },
  /** Fotos agrupadas utilizadas pela pré-visualização pelo mecanismo de proximidade simulada. */
  samples: [
    require("@/assets/images/samples/sample-1.png"),
    require("@/assets/images/samples/sample-2.png"),
    require("@/assets/images/samples/sample-3.png"),
    require("@/assets/images/samples/sample-4.png"),
  ],
} as const;

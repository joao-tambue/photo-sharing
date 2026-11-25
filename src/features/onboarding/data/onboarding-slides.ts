import { images } from "@/shared/assets";

import type { OnboardingSlide } from "../domain/onboarding-slide";

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: "share-nearby",
    title: "Share nearby",
    description: "Bring two phones close and send photos instantly. No internet, no cables, no accounts.",
    illustration: images.onboarding.shareNearby,
  },
  {
    id: "hold-drag-send",
    title: "Hold, drag, send",
    description:
      "Press and hold a photo, drag it towards the nearby phone and let go. It lands on the other screen.",
    illustration: images.onboarding.holdDragSend,
  },
  {
    id: "private-by-design",
    title: "Private by design",
    description:
      "You choose what to send and the other person accepts it. Photos go straight from phone to phone.",
    illustration: images.onboarding.privateByDesign,
  },
];

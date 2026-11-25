import type { Album } from "@/components/album-card";

export const albums: Album[] = [
  {
    id: "vase",
    title: "Vase",
    cover: require("@/assets/images/albums/album-1.png"),
    height: 157,
    crop: { x: -80, y: -3, width: 244, height: 163 },
  },
  {
    id: "orange",
    title: "Orange",
    cover: require("@/assets/images/albums/album-2.png"),
    height: 218,
    crop: { x: -40, y: -3, width: 244, height: 221 },
  },
  {
    id: "sphere",
    title: "Sphere",
    cover: require("@/assets/images/albums/album-3.png"),
    height: 218,
    crop: { x: -40, y: -3, width: 244, height: 221 },
  },
  {
    id: "lamp",
    title: "Lamp",
    cover: require("@/assets/images/albums/album-4.png"),
    height: 157,
    crop: { x: -7.55, y: -22.59, width: 171.55, height: 241.55 },
    fit: "fill",
  },
];

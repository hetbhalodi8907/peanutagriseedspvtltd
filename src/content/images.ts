import type { StaticImageData } from "next/image";
import floweringPlants from "@/assets/images/home/flowering-groundnut-plants.jpg";
import freshlyDug from "@/assets/images/home/freshly-dug-groundnuts.jpg";
import podsCloseup from "@/assets/images/home/groundnut-pods-closeup.jpg";
import harvestedPods from "@/assets/images/home/harvested-groundnut-pods.jpg";
import peanutField from "@/assets/images/home/peanut-field.jpg";

/**
 * Registry of licensed agricultural photography. These are general groundnut-crop
 * images — never present them as the company's own fields, factory, people or products.
 * Full source and licence details: docs/IMAGE-CREDITS.md.
 */
export type SiteImage = {
  src: StaticImageData;
  /** Empty string when the image is purely decorative. */
  alt: string;
  credit: { author: string; organisation: string; license: "CC0 1.0"; source: string };
};

const aces = "Alabama Cooperative Extension System";

export const images = {
  peanutField: {
    src: peanutField,
    alt: "A wide field of green groundnut plants under a cloudy sky",
    credit: {
      author: "Justin Miller",
      organisation: aces,
      license: "CC0 1.0",
      source: "https://commons.wikimedia.org/wiki/File:Field_of_Peanut_Plants.jpg",
    },
  },
  harvestedPods: {
    src: harvestedPods,
    alt: "Groundnut plants lifted at harvest, with pods still attached to the roots",
    credit: {
      author: "Bruce Dupree",
      organisation: aces,
      license: "CC0 1.0",
      source: "https://commons.wikimedia.org/wiki/File:Peanut_Plant_Harvest.jpg",
    },
  },
  podsCloseup: {
    src: podsCloseup,
    alt: "Close-up of freshly harvested groundnut pods",
    credit: {
      author: "Bruce Dupree",
      organisation: aces,
      license: "CC0 1.0",
      source: "https://commons.wikimedia.org/wiki/File:Peanut_Plant_Harvest_-_49234626146.jpg",
    },
  },
  floweringPlants: {
    src: floweringPlants,
    alt: "Healthy groundnut plants with small yellow flowers",
    credit: {
      author: "Justin Miller",
      organisation: aces,
      license: "CC0 1.0",
      source: "https://commons.wikimedia.org/wiki/File:Peanut_Plants.jpg",
    },
  },
  freshlyDug: {
    src: freshlyDug,
    alt: "Freshly dug groundnut pods among the plant stems and roots",
    credit: {
      author: "Bruce Dupree",
      organisation: aces,
      license: "CC0 1.0",
      source: "https://commons.wikimedia.org/wiki/File:Peanut_Plant_Harvest_-_49234850342.jpg",
    },
  },
} satisfies Record<string, SiteImage>;

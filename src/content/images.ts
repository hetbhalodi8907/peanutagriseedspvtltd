import type { StaticImageData } from "next/image";
import seedling from "@/assets/images/about/groundnut-seedling-salem.jpg";
import sowingField from "@/assets/images/about/sowing-groundnut-field.jpg";
import floweringPlants from "@/assets/images/home/flowering-groundnut-plants.jpg";
import freshlyDug from "@/assets/images/home/freshly-dug-groundnuts.jpg";
import podsCloseup from "@/assets/images/home/groundnut-pods-closeup.jpg";
import harvestedPods from "@/assets/images/home/harvested-groundnut-pods.jpg";
import peanutField from "@/assets/images/home/peanut-field.jpg";
import hetBhalodi from "@/assets/images/leadership/het-bhalodi-chief-executive-officer.jpg";
import yogeshBhalodi from "@/assets/images/leadership/yogesh-bhalodi-managing-director.jpg";

/**
 * Registry of licensed agricultural photography. These are general groundnut-crop
 * images — never present them as the company's own fields, factory, people or products.
 * Full source and licence details: docs/IMAGE-CREDITS.md.
 */
export type SiteImage = {
  src: StaticImageData;
  /** Empty string when the image is purely decorative. */
  alt: string;
  credit: { author: string; organisation?: string; license: "CC0 1.0"; source: string };
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
  seedling: {
    src: seedling,
    alt: "A young groundnut seedling emerging from the soil",
    credit: {
      author: "Surendhar Kandasami",
      license: "CC0 1.0",
      source: "https://commons.wikimedia.org/wiki/File:Peanut_in_salem.jpg",
    },
  },
  sowingField: {
    src: sowingField,
    alt: "A tractor sowing groundnuts across a prepared field",
    credit: {
      author: "Katie Nichols",
      organisation: aces,
      license: "CC0 1.0",
      source: "https://commons.wikimedia.org/wiki/File:Planting_Peanuts_Into_the_Soil.jpg",
    },
  },
} satisfies Record<string, SiteImage>;

/**
 * Official leadership photographs supplied by the company (metadata stripped, otherwise unaltered).
 * Keyed by `siteConfig.leadership[].id` so a portrait can never be paired with the wrong person.
 */
export const leadershipPortraits = {
  md: {
    src: yogeshBhalodi,
    alt: "Mr Yogesh Bhalodi, Managing Director of PEANUT AGRI SEEDS PVT. LTD.",
  },
  ceo: {
    src: hetBhalodi,
    alt: "Mr Het Bhalodi, Chief Executive Officer of PEANUT AGRI SEEDS PVT. LTD.",
  },
} satisfies Record<string, Pick<SiteImage, "src" | "alt">>;

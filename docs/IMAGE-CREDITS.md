# Image credits and licences

All photography on the site is listed here. The registry in code is `src/content/images.ts`.

## Licensed agricultural photography (homepage, Phase 2)

All five photographs are by the **Alabama Cooperative Extension System (ACES)**, published on Wikimedia Commons under **CC0 1.0 Universal (public domain dedication)**: <https://creativecommons.org/publicdomain/zero/1.0/>. CC0 allows commercial use and modification and requires no attribution; credit is recorded here as good practice.

| File (`src/assets/images/home/`) | Used in | Photographer | Source |
| --- | --- | --- | --- |
| `peanut-field.jpg` | Hero background | Justin Miller (ACES) | <https://commons.wikimedia.org/wiki/File:Field_of_Peanut_Plants.jpg> |
| `harvested-groundnut-pods.jpg` | Company introduction | Bruce Dupree (ACES) | <https://commons.wikimedia.org/wiki/File:Peanut_Plant_Harvest.jpg> |
| `groundnut-pods-closeup.jpg` | Seed range: Premium category | Bruce Dupree (ACES) | <https://commons.wikimedia.org/wiki/File:Peanut_Plant_Harvest_-_49234626146.jpg> |
| `flowering-groundnut-plants.jpg` | Seed range: Hybrid category | Justin Miller (ACES) | <https://commons.wikimedia.org/wiki/File:Peanut_Plants.jpg> |
| `freshly-dug-groundnuts.jpg` | Quality commitment | Bruce Dupree (ACES) | <https://commons.wikimedia.org/wiki/File:Peanut_Plant_Harvest_-_49234850342.jpg> |

Processing: originals were downloaded on 2026-10-15 and resized (longest edge 2400px for the hero, 1800px for the others; JPEG quality 78). No other edits. Next.js serves AVIF/WebP versions at runtime.

## Licensed agricultural photography (About page, Phase 3)

Also **CC0 1.0** via Wikimedia Commons. Downloaded 2026-10-15, resized, converted to sRGB, and stripped of all EXIF/XMP/IPTC metadata (camera and location data).

| File (`src/assets/images/about/`) | Used in | Photographer | Source |
| --- | --- | --- | --- |
| `groundnut-seedling-salem.jpg` | About hero | Surendhar Kandasami (Salem, Tamil Nadu) | <https://commons.wikimedia.org/wiki/File:Peanut_in_salem.jpg> |
| `sowing-groundnut-field.jpg` | About brand statement | Katie Nichols (ACES) | <https://commons.wikimedia.org/wiki/File:Planting_Peanuts_Into_the_Soil.jpg> |

The About company-story section reuses `flowering-groundnut-plants.jpg` from the homepage set.

**Usage rule:** these are general groundnut-crop photographs (taken in Alabama, USA, and Tamil Nadu, India). They must never be captioned or presented as the company's own fields, factory, staff or products, and must not be assigned to a specific seed variety.

## Company assets

| File | Notes |
| --- | --- |
| `public/brand/peanut-agri-seeds-logo.png` | Official company logo, supplied by the company. Unaltered. |
| `src/app/icon.png`, `src/app/apple-icon.png` | Resized copies of the official logo (favicons). |
| `src/assets/images/leadership/yogesh-bhalodi-managing-director.jpg` | Official photograph of Mr Yogesh Bhalodi, Managing Director. Supplied by the company (960×1280). Unaltered; metadata checked (none present). |
| `src/assets/images/leadership/het-bhalodi-chief-executive-officer.jpg` | Official photograph of Mr Het Bhalodi, Chief Executive Officer. Supplied by the company. Resized from 3024×4032 to 1500×2000 and converted to sRGB; all EXIF/IPTC metadata (camera details) removed. Not otherwise altered. |

Leadership portraits are registered in `leadershipPortraits` (`src/content/images.ts`), keyed by the leader `id` in `site.ts`, so a photo cannot be paired with the wrong person. Profiles display them at their native 3:4 ratio (no cropping). The small circular thumbnails in the "Two Generations" section are face-centred crops of the same files.

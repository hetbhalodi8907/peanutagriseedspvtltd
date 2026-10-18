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

Processing: originals were downloaded on 2026-10-15 and resized (longest edge 2400px for the hero, 1800px for the others; JPEG quality 78). No other edits. Responsive WebP versions (metadata-free) are generated at build time into `public/_img` by `scripts/optimize-images.mjs`.

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
| `src/assets/images/leadership/het-bhalodi-chief-executive-officer.jpg` | Official photograph of Mr Het Bhalodi, Chief Executive Officer. Supplied by the company (replaced 16 October 2026). Converted from iPhone HEIC, turned upright using its own orientation tag, resized from 3024×4032 to 1500×2000 and converted from Display P3 to sRGB; all EXIF/XMP metadata (camera, date and face-region details) removed. Not cropped or otherwise altered. |
| `src/assets/images/seeds/*.png` (25 files) | Official packaging images for the 25 varieties, supplied by the company (11 in Phase 4, 14 added in Phase 9). Stored byte-for-byte as supplied (1024×1536 PNG), renamed by variety slug; see the mapping below. |

### Packaging image mapping (verified 2026-10-15 by reading the name printed on each package)

| Variety | File | Name printed on package |
| --- | --- | --- |
| G20 | `g20.png` | G20 |
| G22 | `g22.png` | G22 |
| TJ-37 | `tj-37.png` | TJ-37 |
| TJ-38 | `tj-38.png` | TJ-38 |
| GIRNAR-4 | `girnar-4.png` | GIRNAR 4 (printed with a space) |
| GIRNAR-5 | `girnar-5.png` | GIRNAR 5 (printed with a space) |
| MENAKSHI | `menakshi.png` | MENAKSHI |
| RED CHERRY | `red-cherry.png` | RED CHERRY |
| SONA | `sona.png` | SONA |
| VARDAN | `vardan.png` | VARDAN |
| PEANUT AGRI SEEDS SPECIAL | `peanut-agri-seeds-special.png` | PEANUT AGRI SEEDS SPECIAL |

### Added in Phase 9 (verified 2026-10-18)

Each file was matched by reading the name printed on the package, not by upload order, then cross-checked by on-device text recognition (Apple Vision) of the name banner. All 14 agree.

| Variety | File | Name printed on package |
| --- | --- | --- |
| G23 | `g23.png` | G23 |
| G45 | `g45.png` | G45 |
| G10 | `g10.png` | G10 |
| NO-39 | `no-39.png` | NO-39 |
| T-9 | `t-9.png` | T-9 |
| G41 | `g41.png` | G41 |
| SWETA | `sweta.png` | SWETA |
| SUNDRI | `sundri.png` | SUNDRI |
| NO-28 | `no-28.png` | NO-28 |
| NO-32 | `no-32.png` | NO-32 |
| 441 | `441.png` | 441 |
| NO-9 | `no-9.png` | NO-9 |
| NO-66 | `no-66.png` | NO-66 |
| REMBO | `rembo.png` | REMBO |

All 25 packaging files carry embedded C2PA Content Credentials (a provenance record signed by OpenAI, indicating they were produced with an AI image tool). It contains no personal data and has been left intact. The site presents these files as packaging designs, not as photographs of physical packs.

Leadership portraits are registered in `leadershipPortraits` (`src/content/images.ts`), keyed by the leader `id` in `site.ts`, so a photo cannot be paired with the wrong person. Profiles display them at their native 3:4 ratio (no cropping). The small circular thumbnails in the "Two Generations" section are face-centred crops of the same files.

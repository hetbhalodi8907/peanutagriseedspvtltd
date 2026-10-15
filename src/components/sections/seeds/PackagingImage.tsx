import Image from "next/image";
import { packagingAlt, type SeedVariety } from "@/content/seeds";
import { cn } from "@/lib/cn";

type PackagingImageProps = {
  seed: SeedVariety;
  sizes: string;
  priority?: boolean;
  /** Stage shape; the package is always shown whole (object-contain) inside it. */
  className?: string;
  imageClassName?: string;
};

/**
 * The official packaging image on a neutral cream stage. Always `object-contain`,
 * so the package edges, name and branding are never cropped.
 * The stage colour matches the images' own opaque cream background (#FDF6EA),
 * so the image edges disappear into it. Packaging WebP files are generated at
 * quality 85 (scripts/optimize-images.mjs) so the small package text stays crisp.
 */
export function PackagingImage({ seed, sizes, priority, className, imageClassName }: PackagingImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#fdf6ea]",
        className,
      )}
    >
      <Image
        src={seed.packaging}
        alt={packagingAlt(seed)}
        fill
        priority={priority}
        placeholder="blur"
        sizes={sizes}
        className={cn("object-contain", imageClassName)}
      />
    </div>
  );
}

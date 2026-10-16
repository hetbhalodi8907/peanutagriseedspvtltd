import Image from "next/image";
import { SproutIcon } from "@/components/icons";
import { FieldLines } from "@/components/sections/FieldLines";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { leaders, leadershipBridge } from "@/content/about";

/** Father–son leadership: complementary roles, presented as a business partnership. */
export function LeadershipBridge() {
  return (
    <section aria-labelledby="bridge-heading" className="relative isolate overflow-hidden bg-forest-900 py-20 text-cream sm:py-24 lg:py-32">
      <FieldLines className="-z-10 opacity-60" />
      <Container>
        <div className="reveal-on-scroll mx-auto max-w-3xl text-center">
          <Eyebrow tone="light" className="justify-center">
            {leadershipBridge.eyebrow}
          </Eyebrow>
          <h2 id="bridge-heading" className="mt-5 text-balance font-display text-[2.15rem] font-semibold leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
            <span className="block">{leadershipBridge.titleLead}</span>
            <span className="block italic text-gold-400">{leadershipBridge.titleAccent}</span>
          </h2>
          <div className="mt-8 space-y-5 text-left text-base leading-[1.85] text-cream/80 sm:text-center sm:text-lg">
            {leadershipBridge.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="reveal-on-scroll mx-auto mt-14 grid max-w-5xl grid-cols-1 items-stretch gap-6 lg:mt-20 lg:grid-cols-[1fr_auto_1fr] lg:gap-0">
          <RoleCard role={leadershipBridge.roles[0]} />
          <div aria-hidden="true" className="flex flex-col items-center justify-center lg:flex-row lg:px-8">
            <span className="h-8 w-px bg-gold-400/40 lg:h-px lg:w-10" />
            <span className="flex size-11 items-center justify-center rounded-full border border-gold-400/50 text-gold-400">
              <SproutIcon className="size-5" />
            </span>
            <span className="h-8 w-px bg-gold-400/40 lg:h-px lg:w-10" />
          </div>
          <RoleCard role={leadershipBridge.roles[1]} />
        </div>
      </Container>
    </section>
  );
}

/**
 * Face-centred crops for the 72px circles: each 3:4 portrait is enlarged to `width`
 * and offset so the face sits in the middle. The photograph itself is untouched.
 */
const thumbnailCrop = {
  md: { width: 116, left: -22, top: -6 },
  ceo: { width: 176, left: -68, top: -60 },
} as const;

function RoleCard({ role }: { role: (typeof leadershipBridge.roles)[number] }) {
  const leader = leaders.find((l) => l.id === role.id)!;
  const crop = thumbnailCrop[role.id];
  return (
    <div className="flex flex-col items-start gap-5 border border-cream/15 bg-forest-950/40 p-6 min-[420px]:flex-row min-[420px]:items-center sm:p-7">
      <span className="relative size-[4.5rem] shrink-0 overflow-hidden rounded-full ring-1 ring-gold-400/50">
        <Image
          src={leader.portrait.src}
          alt=""
          width={crop.width}
          height={Math.round((crop.width * 4) / 3)}
          sizes={`${crop.width}px`}
          style={{ left: crop.left, top: crop.top }}
          className="absolute max-w-none"
        />
      </span>
      <span className="min-w-0">
        <span className="block font-display text-2xl font-semibold italic text-gold-400">{role.label}</span>
        <span className="mt-1 block text-sm font-semibold text-cream">
          {leader.name} <span className="whitespace-nowrap">· {leader.roleShort}</span>
        </span>
        <span className="mt-1.5 block text-sm leading-relaxed text-cream/70">{role.summary}</span>
      </span>
    </div>
  );
}

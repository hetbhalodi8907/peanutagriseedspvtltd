"use client";

import { useId, useMemo, useRef, useState } from "react";
import { CloseIcon, SearchIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { seedCatalogue, seedVarieties, seedVarietyCount, searchSeedVarieties } from "@/content/seeds";
import { SeedCard } from "./SeedCard";

/** Official 1-based position of each variety, so card numbers stay stable while filtering. */
const officialNumber = new Map(seedVarieties.map((seed, index) => [seed.slug, index + 1]));

/**
 * Collection introduction, variety search and the product grid.
 * Server-rendered with all varieties visible; search is a client-side enhancement.
 */
export function SeedCatalogue() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const statusId = useId();

  const trimmed = query.trim();
  const results = useMemo(() => searchSeedVarieties(query), [query]);

  const clear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <section id="varieties" aria-labelledby="collection-heading" className="scroll-mt-24 bg-cream py-16 sm:py-20 lg:scroll-mt-28 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 items-end gap-8 border-b border-forest-900/10 pb-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Eyebrow>{seedCatalogue.intro.eyebrow}</Eyebrow>
            <h2 id="collection-heading" className="mt-5 font-display text-[2.4rem] font-semibold leading-none text-forest-900 lining-nums sm:text-5xl lg:text-[3.6rem]">
              <span className="text-gold-700">{seedVarietyCount}</span> Seed Varieties
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-charcoal/75 sm:text-lg">{seedCatalogue.intro.body}</p>
          </div>

          <div role="search" className="lg:col-span-5">
            <label htmlFor={inputId} className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-forest-900">
              Search seed varieties
            </label>
            <div className="relative mt-3">
              <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-forest-700" />
              <input
                ref={inputRef}
                id={inputId}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape" && query) {
                    event.preventDefault();
                    clear();
                  }
                }}
                placeholder="Search seed varieties..."
                autoComplete="off"
                spellCheck={false}
                aria-describedby={statusId}
                className="h-14 w-full rounded-md border border-forest-900/20 bg-white pl-12 pr-14 text-base text-charcoal shadow-[inset_0_1px_2px_rgb(23_59_42/0.06)] transition-colors placeholder:text-charcoal/45 hover:border-forest-900/35 focus:border-forest-700 [&::-webkit-search-cancel-button]:appearance-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={clear}
                  className="absolute right-2 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-md text-forest-900 transition-colors hover:bg-forest-900/5"
                >
                  <CloseIcon className="size-5" />
                  <span className="sr-only">Clear search</span>
                </button>
              )}
            </div>
            <p id={statusId} role="status" aria-live="polite" className="mt-3 min-h-5 text-sm text-charcoal/65">
              {trimmed
                ? `${results.length} of ${seedVarietyCount} varieties match “${trimmed}”`
                : `Showing all ${seedVarietyCount} varieties`}
            </p>
          </div>
        </div>

        {results.length > 0 ? (
          <ul className="mt-10 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 sm:gap-6 lg:mt-12 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((seed) => (
              <li key={seed.slug}>
                <SeedCard seed={seed} number={officialNumber.get(seed.slug)!} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 flex flex-col items-center rounded-sm border border-dashed border-forest-900/20 bg-paper px-6 py-16 text-center lg:mt-12">
            <SearchIcon className="size-8 text-gold-700" />
            <h3 className="mt-5 font-display text-3xl font-semibold text-forest-900">No varieties found</h3>
            <p className="mt-3 max-w-md text-charcoal/70">
              No variety name matches “{trimmed}”. Check the spelling, or clear the search to see all {seedVarietyCount} varieties.
            </p>
            <button
              type="button"
              onClick={clear}
              className={buttonClasses("forest", "md", "mt-7")}
            >
              Clear search
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}

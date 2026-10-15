import { ClockIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { factoryHoursSection } from "@/content/contact";
import { formatTime, weeklyHours } from "@/lib/business-hours";
import { cn } from "@/lib/cn";

/**
 * "Visit Our Factory": full weekly schedule from siteConfig.factoryHours.
 * Deliberately no "Open now" indicator.
 */
export function FactoryHours() {
  const rows = weeklyHours();
  const sunday = rows.find((row) => row.day === "Sunday");
  const weekdayLabel = rows.find((row) => row.day === "Monday")?.label;
  const sundayDiffers = sunday && sunday.label !== weekdayLabel;

  return (
    <section id="hours" aria-labelledby="hours-heading" className="scroll-mt-24 bg-paper py-20 sm:py-24 lg:scroll-mt-28 lg:py-28">
      <Container className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="reveal-on-scroll lg:col-span-5">
          <SectionHeading id="hours-heading" eyebrow={factoryHoursSection.eyebrow} title={factoryHoursSection.title} />
          <p className="mt-4 font-display text-2xl italic text-forest-700 sm:text-[1.7rem]">{factoryHoursSection.subtitle}</p>
          <p className="mt-6 max-w-lg leading-[1.8] text-charcoal/75">{factoryHoursSection.body}</p>
        </div>

        <div className="reveal-on-scroll lg:col-span-7">
          <div className="rounded-sm border border-forest-900/10 bg-white shadow-[0_24px_60px_-42px_rgb(23_59_42/0.5)]">
            <div className="flex items-center gap-3 border-b border-forest-900/10 px-5 py-4 sm:px-8">
              <ClockIcon className="size-5 text-gold-700" />
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-forest-900">Factory opening hours</p>
            </div>
            <table className="w-full text-left">
              <caption className="sr-only">Factory opening hours, Monday to Sunday</caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">Day</th>
                  <th scope="col">Hours</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const isSunday = row.day === "Sunday";
                  return (
                    <tr
                      key={row.day}
                      className={cn(
                        "border-b border-forest-900/8 last:border-b-0",
                        isSunday && sundayDiffers && "bg-gold-400/[0.12]",
                      )}
                    >
                      <th scope="row" className="px-5 py-4 font-semibold text-forest-900 sm:px-8">
                        {row.day}
                        {isSunday && sundayDiffers && (
                          <span className="ml-3 hidden rounded-full border border-gold-600/50 px-2 py-0.5 align-middle text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-gold-700 min-[400px]:inline-block">
                            Shorter hours
                          </span>
                        )}
                      </th>
                      <td
                        className={cn(
                          "px-5 py-4 text-right tabular-nums sm:px-8",
                          isSunday && sundayDiffers ? "font-semibold text-forest-900" : "text-charcoal/85",
                        )}
                      >
                        {row.opens && row.closes ? (
                          <>
                            <time dateTime={row.opens}>{formatTime(row.opens)}</time>
                            <span aria-hidden="true">–</span>
                            <span className="sr-only"> to </span>
                            <time dateTime={row.closes}>{formatTime(row.closes)}</time>
                          </>
                        ) : (
                          "Closed"
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-charcoal/70">{factoryHoursSection.timezoneNote}</p>
        </div>
      </Container>
    </section>
  );
}

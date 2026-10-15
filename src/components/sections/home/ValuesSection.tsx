import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { values } from "@/content/home";

/** "Quality Is in Every Detail." — brand principles as four editorial blocks. */
export function ValuesSection() {
  return (
    <section aria-labelledby="values-heading" className="bg-cream py-20 sm:py-24 lg:py-32">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="reveal-on-scroll lg:col-span-5">
          <div className="lg:sticky lg:top-36">
            <SectionHeading id="values-heading" eyebrow={values.eyebrow} title={values.title} lede={values.lede} />
            <p className="mt-8 font-display text-2xl italic text-gold-700">{siteConfig.tagline}</p>
          </div>
        </div>

        <ol className="grid grid-cols-1 gap-px self-start bg-forest-900/10 sm:grid-cols-2 lg:col-span-7">
          {values.items.map((item, index) => (
            <li key={item.title} className="reveal-on-scroll bg-cream py-8 sm:p-8 lg:p-10">
              <span aria-hidden="true" className="font-display text-5xl font-semibold leading-none text-gold-700">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-lg font-bold text-forest-900">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-charcoal/75">{item.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

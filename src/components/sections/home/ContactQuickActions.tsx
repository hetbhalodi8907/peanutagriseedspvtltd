import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { factoryAddressLine, siteConfig } from "@/config/site";
import { contactActions } from "@/content/home";
import { breakableEmail } from "@/lib/breakable-email";

const { contact } = siteConfig;

const actions = [
  { label: "Call Us", value: contact.phoneDisplay, hint: "Speak with our team", href: contact.phoneHref, icon: PhoneIcon },
  { label: "WhatsApp", value: contact.phoneDisplay, hint: "Opens a WhatsApp chat", href: contact.whatsappHref, icon: WhatsAppIcon, external: true },
  { label: "Email Us", value: contact.email, hint: "Opens your email app", href: contact.emailHref, icon: MailIcon },
];

/** Direct call / WhatsApp / email actions. The full enquiry form is a later phase. */
export function ContactQuickActions() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      data-hide-floating-contact
      className="scroll-mt-24 bg-cream pb-20 pt-14 sm:pb-24 lg:scroll-mt-28 lg:pb-32 lg:pt-20"
    >
      <Container>
        <div className="reveal-on-scroll grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <SectionHeading id="contact-heading" eyebrow={contactActions.eyebrow} title={contactActions.title} lede={contactActions.lede} className="lg:col-span-7" />
          <p className="flex items-start gap-3 text-sm leading-relaxed text-charcoal/70 lg:col-span-5 lg:justify-end lg:text-right">
            <MapPinIcon className="mt-0.5 size-4 shrink-0 text-gold-700" />
            <span>Factory: {factoryAddressLine}</span>
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          {actions.map(({ label, value, hint, href, icon: Icon, external }) => (
            <li key={label} className="reveal-on-scroll">
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex h-full items-center gap-5 rounded-sm border border-forest-900/12 bg-paper p-6 transition-colors duration-300 hover:border-forest-900 hover:bg-forest-900 sm:p-7"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-forest-900 text-gold-400 transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-forest-900">
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold-700 transition-colors group-hover:text-gold-400">
                    {label}
                  </span>
                  <span className="mt-1 block font-semibold text-forest-900 [overflow-wrap:anywhere] transition-colors group-hover:text-cream">
                    {breakableEmail(value)}
                  </span>
                  <span className="mt-0.5 block text-sm text-charcoal/65 transition-colors group-hover:text-cream/70">
                    {hint}
                    {external && <span className="sr-only"> (opens in a new tab)</span>}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

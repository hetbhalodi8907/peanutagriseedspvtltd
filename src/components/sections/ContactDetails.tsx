import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { factoryAddressLine, siteConfig } from "@/config/site";
import { breakableEmail } from "@/lib/breakable-email";
import { cn } from "@/lib/cn";

type ContactDetailsProps = {
  className?: string;
  title?: string;
  /** Use "h3" when the card sits under a section's own h2. */
  headingAs?: "h2" | "h3";
  /** Adds a WhatsApp row (opens in a new tab). */
  showWhatsApp?: boolean;
};

/** Confirmed company contact details with working call / email (and optional WhatsApp) links. */
export function ContactDetails({
  className,
  title = "Contact us directly",
  headingAs: Heading = "h2",
  showWhatsApp = false,
}: ContactDetailsProps) {
  const { contact } = siteConfig;
  const rows = [
    { icon: PhoneIcon, label: "Phone", value: contact.phoneDisplay, href: contact.phoneHref },
    ...(showWhatsApp
      ? [{ icon: WhatsAppIcon, label: "WhatsApp", value: "Chat with our team", href: contact.whatsappHref, external: true }]
      : []),
    { icon: MailIcon, label: "Email", value: contact.email, href: contact.emailHref },
    { icon: MapPinIcon, label: "Factory", value: factoryAddressLine },
  ];

  return (
    <div className={cn("rounded-xl border border-forest-900/10 bg-paper p-7 sm:p-9", className)}>
      <Heading className="font-display text-2xl font-semibold text-forest-900">{title}</Heading>
      <ul className="mt-6 space-y-5">
        {rows.map(({ icon: Icon, label, value, href, ...row }) => (
          <li key={label} className="flex gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-forest-900 text-gold-400">
              <Icon className="size-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold-700">{label}</span>
              {href ? (
                <a
                  href={href}
                  {...("external" in row ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="mt-1 block font-semibold [overflow-wrap:anywhere] text-forest-900 underline-offset-4 hover:underline"
                >
                  {breakableEmail(value)}
                  {"external" in row && <span className="sr-only"> (opens WhatsApp in a new tab)</span>}
                </a>
              ) : (
                <span className="mt-1 block text-charcoal/80">{value}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

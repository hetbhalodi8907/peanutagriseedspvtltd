import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { breakableEmail } from "@/lib/breakable-email";

/** The three direct contact actions. All values come from siteConfig. */
export function ContactActionList() {
  const { contact } = siteConfig;
  const actions = [
    { label: "Call Us", value: contact.phoneDisplay, hint: "Speak with our team", href: contact.phoneHref, icon: PhoneIcon },
    {
      label: "Chat on WhatsApp",
      value: contact.phoneDisplay,
      hint: "Opens WhatsApp with a greeting ready to send",
      href: contact.whatsappHref,
      icon: WhatsAppIcon,
      external: true,
    },
    { label: "Email Us", value: contact.email, hint: "Opens your email app", href: contact.emailHref, icon: MailIcon },
  ];

  return (
    <ul className="space-y-3">
      {actions.map(({ label, value, hint, href, icon: Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group flex min-h-[4.75rem] items-center gap-4 rounded-sm border border-forest-900/12 bg-white p-4 transition-colors duration-300 hover:border-forest-900 hover:bg-forest-900 sm:p-5"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-forest-900 text-gold-400 transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-forest-900">
              <Icon className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold-700 transition-colors group-hover:text-gold-400">
                {label}
              </span>
              <span className="mt-0.5 block font-semibold text-forest-900 [overflow-wrap:anywhere] transition-colors group-hover:text-cream">
                {breakableEmail(value)}
              </span>
              <span className="mt-0.5 block text-xs text-charcoal/60 transition-colors group-hover:text-cream/70">
                {hint}
                {external && <span className="sr-only"> (opens in a new tab)</span>}
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

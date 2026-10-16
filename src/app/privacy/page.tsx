import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { breakableEmail } from "@/lib/breakable-email";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Notice",
  // siteConfig.name already ends with a full stop.
  description: `How the ${siteConfig.name} website handles the information you share through the enquiry form and contact links.`,
  path: "/privacy",
});

/**
 * Factual description of how this website technically handles information.
 * It makes no legal assurances (retention periods, statutory rights): those must be
 * supplied or reviewed by the company before launch (docs/LAUNCH-READINESS.md).
 */
const LAST_UPDATED = "16 October 2026";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-forest-900/10 py-8 first:border-t-0 first:pt-0">
      <h2 className="font-display text-2xl font-semibold text-forest-900 sm:text-[1.7rem]">{title}</h2>
      <div className="mt-4 space-y-4 leading-[1.8] text-charcoal/80">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  const { contact } = siteConfig;

  return (
    <>
      <PageHero eyebrow="Privacy" title="Privacy Notice">
        <p>
          How the {siteConfig.name} website handles the information you share with us.
        </p>
      </PageHero>

      <section className="bg-cream py-16 sm:py-20">
        <Container className="max-w-3xl">
          <p className="text-sm text-charcoal/70">Last updated: {LAST_UPDATED}</p>
          <div className="mt-8">
            <Block title="Information you send us">
              <p>
                When you use the enquiry form on our Contact page, you provide your full name, mobile number, village or city,
                the seed variety you are interested in, the quantity you need, and any message you choose to add. We use this
                information to respond to your enquiry.
              </p>
              <p>The form does not ask for your email address, and nothing else is collected through it.</p>
            </Block>

            <Block title="How enquiries are delivered">
              <p>
                Each enquiry is sent by email to our team at {contact.email}, using our email service provider (Resend). This
                website does not keep its own database of enquiries.
              </p>
              <p>
                Our web server records technical events, such as an enquiry reference number and whether the email was
                delivered. These records do not include your name, mobile number or message.
              </p>
            </Block>

            <Block title="Phone, WhatsApp, email and map links">
              <p>
                The call, WhatsApp and email links open the app on your own device. Any conversation then takes place through
                that service. The &ldquo;Find Us on Google Maps&rdquo; button opens Google Maps in a new tab. No map is
                embedded on this website, and the website never asks for your location.
              </p>
            </Block>

            <Block title="Cookies and tracking">
              <p>
                This website does not use cookies, analytics or advertising trackers, it does not store information in your
                browser, and it does not load content from other websites.
              </p>
            </Block>

            <Block title="Questions">
              <p>
                For any question about the information you have shared with us, contact {siteConfig.name} by phone on{" "}
                <a href={contact.phoneHref} className="font-semibold text-forest-900 underline underline-offset-4">
                  {contact.phoneDisplay}
                </a>{" "}
                or by email at{" "}
                <a href={contact.emailHref} className="font-semibold text-forest-900 underline underline-offset-4 [overflow-wrap:anywhere]">
                  {breakableEmail(contact.email)}
                </a>
                .
              </p>
            </Block>
          </div>
        </Container>
      </section>
    </>
  );
}

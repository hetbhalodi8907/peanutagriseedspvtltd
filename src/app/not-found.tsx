import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="max-w-3xl text-center">
        <Eyebrow className="justify-center">Page not found</Eyebrow>
        <h1 className="mt-6 font-display text-4xl font-semibold text-forest-900 sm:text-5xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-5 text-charcoal/75">The page may have moved, or the address may be incorrect.</p>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/" variant="forest" size="lg">
            Back to Home
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

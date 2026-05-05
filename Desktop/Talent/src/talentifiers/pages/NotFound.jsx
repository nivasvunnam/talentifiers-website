import { ArrowRight } from 'lucide-react';
import { Button, Card, Container, PageHero, Section, Seo } from '../ui';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found | Talentifiers" description="The requested page could not be found." />
      <Section className="py-20 sm:py-24 lg:py-28">
        <Container>
          <Card className="overflow-hidden p-0">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="flex items-center p-8 sm:p-10 lg:p-12">
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-teal">404</p>
                  <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-text sm:text-5xl">
                    This page is not part of the Talentifiers site.
                  </h1>
                  <p className="mt-5 text-base leading-8 text-muted">
                    The link may be outdated or the page may have been moved. Use the button below to return to the site experience.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button to="/" variant="primary">
                      Back home
                    </Button>
                    <Button to="/contact" variant="secondary">
                      Contact us
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="relative min-h-[24rem] bg-brand-navy p-8 text-white sm:p-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(15,185,177,0.16),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(255,107,74,0.12),transparent_25%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="text-right">
                    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-teal">Enterprise site</p>
                    <p className="mt-3 text-sm leading-7 text-white/75">
                      Premium navigation, modern content structure, and clear calls to action.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {['Home', 'About', 'Services', 'Solutions'].map((item) => (
                      <div key={item} className="rounded-[24px] border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}

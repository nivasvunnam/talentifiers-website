import { useEffect, useState } from 'react';
import { ArrowRight, BadgeCheck, Building2, Mail, MapPin, Phone, Sparkles, Target, Workflow } from 'lucide-react';
import { contactDetails, pageMeta, timeline, trustCards, whyTalentifiers } from '../data';
import {
  AnimatePresence,
  Badge,
  Button,
  Card,
  Container,
  EnterpriseVisual,
  FeatureList,
  IconBulletList,
  PageHero,
  Reveal,
  Section,
  SectionHeading,
  Seo,
  StackCard,
  TagPill,
  cn,
  motion,
} from '../ui';

const officeMapUrl = 'https://www.google.com/maps?ll=17.440137,78.383807&z=15&t=m&hl=en&gl=IN&mapclient=embed&cid=6243383781455058652';

const accentTone = {
  teal: 'bg-brand-teal/10 text-brand-teal border-brand-teal/20',
  navy: 'bg-brand-navy/10 text-brand-navy dark:text-brand-teal border-brand-navy/20',
  coral: 'bg-brand-coral/10 text-brand-coral border-brand-coral/20',
};

const aboutMoments = [
  {
    id: 'foundation',
    label: 'Founded in 2001',
    title: 'A long-view partner, not a short-term vendor.',
    summary:
      'Talentifiers began with dependable software delivery and grew into a broader enterprise technology practice without losing that practical mindset.',
    icon: Building2,
    accent: 'teal',
    metrics: [
      { label: 'Base', value: 'Hyderabad' },
      { label: 'Legacy', value: '2001' },
    ],
    bullets: ['Enterprise delivery habits', 'Stable operating rhythm', 'Long-term client fit'],
    cta: { label: 'Contact us', href: '/contact' },
  },
  {
    id: 'delivery',
    label: 'Delivery model',
    title: 'Strategy, build, and support in one flow.',
    summary:
      'Software, cloud, analytics, consulting, testing, and packaged solutions all follow the same premium delivery system.',
    icon: Workflow,
    accent: 'navy',
    metrics: [
      { label: 'Service pillars', value: '7' },
      { label: 'Suites', value: '3' },
    ],
    bullets: ['Clear discovery', 'Disciplined implementation', 'Validation built in'],
    cta: { label: 'Explore services', href: '/services' },
  },
  {
    id: 'presence',
    label: 'Hyderabad presence',
    title: 'Rooted locally, accessible for collaboration.',
    summary:
      'The office gives clients a real place to connect, plan, and validate direction with the team.',
    icon: MapPin,
    accent: 'coral',
    metrics: [
      { label: 'Access', value: 'In-person' },
      { label: 'Map', value: 'Live link' },
    ],
    bullets: ['Easy to find', 'Client-ready meetings', 'Practical collaboration'],
    cta: { label: 'Open in Maps', href: officeMapUrl, external: true },
  },
  {
    id: 'mindset',
    label: 'Business-first',
    title: 'Technology shaped around outcomes.',
    summary:
      'The goal is not just to ship code. The goal is to improve operations, visibility, adoption, and business confidence.',
    icon: Target,
    accent: 'teal',
    metrics: [
      { label: 'Focus', value: 'Business value' },
      { label: 'Standard', value: 'Quality' },
    ],
    bullets: ['Outcome-led framing', 'Premium but practical UI', 'Enterprise-friendly detail'],
    cta: { label: 'View solutions', href: '/solutions' },
  },
];

function AboutSpotlight({ items }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % items.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [items.length, paused]);

  const current = items[active];
  const accentClass = accentTone[current.accent];
  const accentGradient =
    current.accent === 'coral'
      ? 'from-brand-coral/20 via-bg/95 to-brand-navy/15'
      : current.accent === 'navy'
        ? 'from-brand-navy/25 via-bg/95 to-brand-teal/10'
        : 'from-brand-teal/20 via-bg/95 to-brand-navy/15';
  const accentBadge =
    current.accent === 'coral'
      ? 'border-brand-coral/30 bg-brand-coral/10 text-brand-coral'
      : current.accent === 'navy'
        ? 'border-brand-navy/30 bg-brand-navy/10 text-brand-navy dark:text-brand-teal'
        : 'border-brand-teal/30 bg-brand-teal/10 text-brand-teal';

  return (
    <div
      className="grid gap-5 lg:grid-cols-[340px_minmax(0,1fr)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
    >
      <div className="grid gap-3">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={active === index}
            onClick={() => setActive(index)}
            className={cn(
              'group flex h-full min-h-[180px] flex-col rounded-[24px] border p-4 text-left transition duration-300',
              active === index
                ? 'border-brand-teal bg-surface shadow-[0_20px_60px_-40px_rgba(15,23,42,0.55)]'
                : 'border-border bg-surface/80 hover:-translate-y-0.5 hover:border-brand-teal/40'
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-h-[4.5rem]">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                  0{index + 1}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-text">{item.label}</h3>
              </div>
              <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border', accentTone[item.accent])}>
                <item.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-muted">{item.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.metrics.map((metric) => (
                <span key={metric.label} className="rounded-full border border-border bg-bg/70 px-3 py-1 text-xs font-medium text-muted">
                  {metric.value}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      <Card className="relative min-h-[40rem] p-0">
        <div className={cn('absolute inset-0 bg-gradient-to-br', accentGradient)} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(15,185,177,0.12),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(255,107,74,0.08),transparent_22%)]" />
        <div className="relative flex h-full flex-col p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <TagPill className="border-border bg-surface/80 text-muted">Company spotlight</TagPill>
            <Badge className={accentBadge}>Auto-rotating</Badge>
          </div>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-border/70">
            <motion.div
              key={current.id}
              className={cn(
                'h-full rounded-full',
                current.accent === 'coral'
                  ? 'bg-brand-coral'
                  : current.accent === 'navy'
                    ? 'bg-brand-navy dark:bg-brand-teal'
                    : 'bg-brand-teal'
              )}
              initial={{ width: '0%' }}
              animate={{ width: `${((active + 1) / items.length) * 100}%` }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
              className="mt-8 grid flex-1 gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start"
            >
              <div className="space-y-5">
                <div className={cn('flex h-14 w-14 items-center justify-center rounded-3xl border', accentClass)}>
                  <current.icon className="h-6 w-6" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-teal">Current spotlight</p>
                <h3 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                  {current.title}
                </h3>
                <p className="max-w-2xl text-base leading-8 text-muted">{current.summary}</p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {current.metrics.map((metric) => (
                    <div key={metric.label} className="rounded-[22px] border border-border bg-surface/80 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">{metric.label}</p>
                      <p className="mt-2 text-sm font-medium text-text">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[28px] border border-border bg-surface/85 p-5 shadow-[0_25px_70px_-50px_rgba(15,23,42,0.65)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">What makes it work</p>
                  <FeatureList className="mt-4" columns={1} items={current.bullets} />
                </div>

                <div className="rounded-[28px] border border-border bg-brand-navy p-5 text-white shadow-[0_25px_60px_-40px_rgba(11,31,58,0.8)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">Next step</p>
                  <p className="mt-3 text-sm leading-7 text-white/80">
                    {current.cta.external
                      ? 'Open the office location in Google Maps or get in touch with the team.'
                      : 'Take the next step and connect with the Talentifiers team.'}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {current.cta.external ? (
                      <Button
                        href={current.cta.href}
                        variant="accent"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {current.cta.label}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button to={current.cta.href} variant="accent">
                        {current.cta.label}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                    <Button to="/contact" variant="secondary" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                      Contact team
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/services" variant="secondary">
              Explore services
            </Button>
            <Button href={officeMapUrl} variant="secondary" target="_blank" rel="noreferrer">
              Open office map
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function About() {
  return (
    <>
      <Seo title={pageMeta.about.title} description={pageMeta.about.description} />

      <PageHero
        eyebrow="About Talentifiers"
        title="A long-term technology partner built on clarity, discipline, and enterprise delivery."
        description="Founded in 2001, Talentifiers combines software services, cloud capability, analytics, consulting, testing, and packaged business solutions from its Hyderabad base."
        trustLine="Established in 2001 | Hyderabad corporate presence | Enterprise solutions company"
        actions={
          <>
            <Button to="/contact" variant="accent">
              Contact us
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button to="/careers" variant="secondary">
              Explore careers
            </Button>
          </>
        }
        stats={[
          { value: 2001, label: 'Founded', suffix: '' },
          { value: 25, label: 'Years of delivery', suffix: '+' },
          { value: 7, label: 'Service pillars', suffix: '' },
          { value: 3, label: 'Solution suites', suffix: '' },
        ]}
        visual={
          <EnterpriseVisual
            title="About the company"
            subtitle="A clear view of how the company combines legacy, delivery maturity, and modern technology breadth."
            metrics={[
              { label: 'Base', value: 'Hyderabad' },
              { label: 'Focus', value: 'Enterprise delivery' },
              { label: 'Approach', value: 'Business-first' },
            ]}
          />
        }
      />

      <Section className="pt-8">
        <Container>
          <SectionHeading
            eyebrow="Company spotlight"
            title="A living snapshot of the brand, not a static biography."
            description="This rotating panel highlights the company story, service model, office presence, and delivery mindset so the About page feels active and easier to explore."
          />
          <div className="mt-12">
            <AboutSpotlight items={aboutMoments} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <div className="space-y-6">
                <SectionHeading
                  eyebrow="Company story"
                  title="A modern enterprise technology practice with a long operating history."
                  description="Talentifiers started with a practical focus: deliver reliable software for real business needs. Over time, that approach expanded into cloud services, data analytics, consulting, testing, and packaged business solutions. The through line remains the same - clear thinking, disciplined execution, and outcomes that help teams work better."
                />
                <IconBulletList items={whyTalentifiers} />
              </div>
            </Reveal>
            <div className="grid gap-5">
              {trustCards.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.05}>
                  <Card>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-teal">
                        <BadgeCheck className="h-5 w-5" />
                      </div>
                      <TagPill>{index + 1}</TagPill>
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-semibold text-text">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{item.summary}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface/40">
        <Container>
          <SectionHeading
            eyebrow="Timeline"
            title="A concise legacy story, presented with room to grow."
            description="This timeline keeps the company history elegant and accurate without inventing milestones that are not yet public."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {timeline.map((item, index) => (
              <Reveal key={item.year} delay={index * 0.05}>
                <Card className="h-full">
                  <div className="flex items-center justify-between gap-4">
                    <Badge className="bg-brand-navy/10 text-brand-navy dark:text-brand-teal">
                      {item.year}
                    </Badge>
                    <TagPill>Legacy</TagPill>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-text">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{item.summary}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal>
              <div className="space-y-6">
                <SectionHeading
                  eyebrow="Mission, vision, values"
                  title="Built around business value, quality delivery, and long-term client fit."
                  description="Talentifiers is positioned to be the dependable partner organizations want when they need a technology team that can think clearly, execute well, and stay aligned to the business."
                />
                <FeatureList
                  columns={1}
                  items={[
                    'Business-first thinking that keeps technology tied to measurable outcomes',
                    'Reliable delivery habits that support enterprise confidence',
                    'Adaptable solutions that can evolve with the operating model',
                    'Quality and testing standards that protect the user experience',
                    'Consulting-led framing that improves clarity before build work begins',
                  ]}
                />
              </div>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2">
              <StackCard
                title="Mission"
                summary="Deliver practical technology that helps organizations transform, operate, and grow with confidence."
                items={['Enterprise software', 'Cloud delivery', 'Data-driven insight']}
              />
              <StackCard
                title="Vision"
                summary="Be the premium technology partner businesses trust for software, systems, and digital modernization."
                items={['Trusted partner', 'Modern delivery', 'Long-term value']}
                accent="brand-coral"
              />
              <StackCard
                title="Values"
                summary="Quality, accountability, clarity, adaptability, and business alignment guide every engagement."
                items={['Quality', 'Accountability', 'Clarity', 'Adaptability']}
                accent="brand-navy"
              />
              <Card>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-teal">Operating style</p>
                <h3 className="mt-4 font-display text-2xl font-semibold text-text">Premium without excess.</h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  The brand should feel modern and exclusive, but the delivery style stays practical and grounded in real execution.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-brand-navy text-white">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <Reveal>
              <div className="space-y-6">
                <SectionHeading
                  eyebrow="Hyderabad presence"
                  title="A local office with a global delivery mindset."
                  description="Talentifiers operates from Hyderabad and presents itself as a credible, accessible partner for organizations seeking enterprise software and solutions support."
                  className="text-white"
                  eyebrowClassName="border-white/10 bg-white/10 text-white"
                  titleClassName="text-white"
                  descriptionClassName="text-white/75"
                />
                <div className="grid gap-4">
                  <LocationRow icon={MapPin} label="Office" value={contactDetails.address} href={officeMapUrl} />
                  <LocationRow icon={Phone} label="Phone" value={contactDetails.phone} href={`tel:${contactDetails.phone}`} />
                  <LocationRow icon={Mail} label="Email" value={contactDetails.email} href={`mailto:${contactDetails.email}`} />
                  <LocationRow icon={Building2} label="Hours" value={contactDetails.hours.join(' | ')} />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <Card className="overflow-hidden border-white/10 bg-white/5 p-0 text-white shadow-none backdrop-blur-md">
                <div className="relative min-h-[30rem] p-6 sm:p-8">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(15,185,177,0.16),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(255,107,74,0.14),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))]" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <TagPill className="border-white/10 bg-white/10 text-white">Hyderabad</TagPill>
                      <Badge className="border-white/10 bg-white/10 text-white">
                        <Sparkles className="h-3.5 w-3.5" />
                        Ready
                      </Badge>
                    </div>
                    <div className="mt-auto grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">Office vibe</p>
                        <h3 className="mt-3 font-display text-2xl font-semibold">Focused, modern, and calm.</h3>
                        <p className="mt-3 text-sm leading-7 text-white/75">
                          A visual placeholder that can later be replaced with a real office photograph or branded image.
                        </p>
                      </div>
                      <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-coral">Next step</p>
                        <h3 className="mt-3 font-display text-2xl font-semibold">Start the conversation.</h3>
                        <Button to="/contact" variant="accent" className="mt-4 w-full justify-center">
                          Contact us
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Card className="grid gap-6 p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-teal">Final note</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                Build your next enterprise solution with a partner that understands the long game.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                Talentifiers is designed to feel like a premium technology brand while staying grounded in practical business delivery.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button to="/contact" variant="accent">
                Contact us
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/services" variant="secondary">
                Explore services
              </Button>
              <Button href={officeMapUrl} variant="secondary" target="_blank" rel="noreferrer">
                Open office map
              </Button>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}

function LocationRow({ icon: IconComponent, label, value, href }) {
  const content = (
    <div className="flex items-start gap-4 rounded-[24px] border border-white/10 bg-white/5 p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-teal">
        <IconComponent className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">{label}</p>
        <p className="mt-2 text-sm leading-7 text-white/80">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block transition hover:-translate-y-0.5">
        {content}
      </a>
    );
  }

  return content;
}

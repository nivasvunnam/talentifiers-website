import { useEffect, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BadgeCheck,
  Cloud,
  Check,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import { clientSegments, contactDetails, heroStats, impactCards, pageMeta, processSteps, services, solutions, technologyCategories, trustSignals, whyTalentifiers } from '../data';
import {
  Badge,
  Button,
  Card,
  Container,
  EnterpriseVisual,
  FeatureList,
  Icon,
  IconBulletList,
  PageHero,
  Reveal,
  Section,
  SectionHeading,
  Seo,
  AnimatePresence,
  motion,
  StackCard,
  TagPill,
  TechMarquee,
  ProcessFlow,
  cn,
} from '../ui';
import { CompactLeadCard } from '../forms';
import { assetPath } from '../assets';

function ImpactCard({ item, index }) {
  const icons = [Cloud, BarChart3, ShieldCheck, Workflow];
  const IconComponent = icons[index % icons.length];

  return (
    <Reveal delay={index * 0.04}>
      <Card className="h-full">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-navy text-white">
            <IconComponent className="h-5 w-5" />
          </div>
          <TagPill>Confidence</TagPill>
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold text-text">{item.title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted">{item.summary}</p>
      </Card>
    </Reveal>
  );
}

function ClientChip({ company }) {
  const hasLogo = Boolean(company.logo);

  return (
    <span className="flex w-full items-center gap-2 rounded-full border border-border bg-bg/80 px-3 py-2 text-sm font-medium text-text sm:w-auto sm:max-w-[16rem]">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1 shadow-sm">
        {hasLogo ? (
          <img
            src={assetPath(company.logo)}
            alt={`${company.name} logo`}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        ) : (
          <span className="text-[10px] font-semibold tracking-[0.08em] text-brand-navy">
            {company.fallbackLabel || company.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </span>
      <span className="min-w-0 break-words text-sm leading-5">{company.name}</span>
    </span>
  );
}

function ClientSnapshot({ segments }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {segments.map((segment, index) => (
        <Reveal key={segment.id} delay={index * 0.05}>
          <Card className="h-full">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-teal">Client group</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-text">{segment.title}</h3>
              </div>
              <TagPill>{segment.companies.length}</TagPill>
            </div>
            <p className="mt-3 text-sm leading-7 text-muted">{segment.summary}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {segment.companies.map((company) => (
                <ClientChip key={company.name} company={company} />
              ))}
            </div>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}

function ServiceSpotlight({ items }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % items.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [items.length, paused]);

  const current = items[active];
  const progress = ((active + 1) / items.length) * 100;
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
      className="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]"
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
        {items.map((service, index) => (
          <button
            key={service.id}
            type="button"
            role="tab"
            aria-selected={active === index}
            onClick={() => setActive(index)}
            className={cn(
              'group flex h-full min-h-[220px] flex-col rounded-[24px] border p-4 text-left transition duration-300',
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
                <h3 className="mt-2 font-display text-xl font-semibold text-text">{service.title}</h3>
              </div>
              <Icon
                name={service.icon}
                className={cn(
                  'h-5 w-5 transition group-hover:scale-110',
                  active === index ? 'text-brand-teal' : 'text-muted'
                )}
              />
            </div>
            <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-muted">{service.summary}</p>
          </button>
        ))}
      </div>

      <Card className="relative min-h-[34rem] p-0">
        <div className={cn('absolute inset-0 bg-gradient-to-br', accentGradient)} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(15,185,177,0.12),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(255,107,74,0.1),transparent_22%)]" />
        <div className="relative flex h-full flex-col p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <TagPill className="border-border bg-surface/80 text-muted">{current.label}</TagPill>
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
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            />
          </div>

          <div className="mt-8 grid flex-1 gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div className="space-y-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-teal">
                    Service spotlight
                  </p>
                  <h3 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                    {current.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
                    {current.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-border bg-surface/80 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Capabilities</p>
                  <div className="mt-4 grid gap-2">
                    {current.capabilities.slice(0, 4).map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl bg-bg/60 px-3 py-2">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                        <span className="text-sm leading-6 text-text">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[24px] border border-border bg-brand-navy p-4 text-white shadow-[0_20px_60px_-40px_rgba(11,31,58,0.8)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">Business value</p>
                  <div className="mt-4 grid gap-2">
                    {current.benefits.map((item) => (
                      <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm leading-6 text-white/80">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <motion.div
                className="rounded-[28px] border border-border bg-surface/85 p-5 shadow-[0_25px_70px_-50px_rgba(15,23,42,0.65)]"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-text">Delivery rhythm</p>
                  <TagPill>{current.accent.toUpperCase()}</TagPill>
                </div>
                <div className="mt-5 grid gap-3">
                  {[
                    'Discovery and planning',
                    'Build and implementation',
                    'Validation and handoff',
                    'Optimization and support',
                  ].map((step, stepIndex) => (
                    <div key={step} className="flex items-center gap-3 rounded-2xl border border-border bg-bg/70 px-4 py-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-navy text-sm font-semibold text-white">
                        0{stepIndex + 1}
                      </span>
                      <span className="text-sm font-medium text-text">{step}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { label: 'Engagement', value: 'Enterprise-ready' },
                  { label: 'Tone', value: 'Premium and practical' },
                  { label: 'Focus', value: 'Business outcomes' },
                  { label: 'Support', value: 'Post-launch clarity' },
                ].map((metric) => (
                  <div key={metric.label} className="rounded-[22px] border border-border bg-surface/80 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">{metric.label}</p>
                    <p className="mt-2 text-sm font-medium text-text">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/services" variant="secondary">
              Open services
              <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button to="/contact" variant="accent">
              Talk to Talentifiers
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function SolutionSpotlight({ items }) {
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
  const progress = ((active + 1) / items.length) * 100;
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
      className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]"
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
        {items.map((solution, index) => (
          <button
            key={solution.id}
            type="button"
            role="tab"
            aria-selected={active === index}
            onClick={() => setActive(index)}
            className={cn(
              'group flex h-full min-h-[220px] flex-col rounded-[24px] border p-4 text-left transition duration-300',
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
                <h3 className="mt-2 font-display text-xl font-semibold text-text">{solution.title}</h3>
              </div>
              <Icon
                name={solution.icon}
                className={cn(
                  'h-5 w-5 transition group-hover:scale-110',
                  active === index ? 'text-brand-teal' : 'text-muted'
                )}
              />
            </div>
            <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-muted">{solution.summary}</p>
          </button>
        ))}
      </div>

      <Card className="relative min-h-[34rem] p-0">
        <div className={cn('absolute inset-0 bg-gradient-to-br', accentGradient)} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(255,107,74,0.08),transparent_22%),radial-gradient(circle_at_15%_25%,rgba(15,185,177,0.12),transparent_28%)]" />
        <div className="relative flex h-full flex-col p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <TagPill className="border-border bg-surface/80 text-muted">Packaged solution</TagPill>
            <Badge className={accentBadge}>Auto-rotating</Badge>
          </div>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-border/70">
            <motion.div
              key={current.id + '-solution'}
              className={cn(
                'h-full rounded-full',
                current.accent === 'coral'
                  ? 'bg-brand-coral'
                  : current.accent === 'navy'
                    ? 'bg-brand-navy dark:bg-brand-teal'
                    : 'bg-brand-teal'
              )}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
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
              className="mt-8 grid flex-1 gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-start"
            >
              <div className="space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-teal">
                  Solution spotlight
                </p>
                <h3 className="max-w-xl font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                  {current.title}
                </h3>
                <p className="max-w-2xl text-base leading-8 text-muted">
                  {current.problem}
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-border bg-surface/80 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Modules</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {current.features.slice(0, 4).map((feature) => (
                        <span
                          key={feature}
                          className="rounded-full border border-border bg-bg/70 px-3 py-1 text-xs font-medium text-muted"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[24px] border border-border bg-brand-navy p-4 text-white shadow-[0_20px_60px_-40px_rgba(11,31,58,0.8)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">Outcome</p>
                    <div className="mt-4 grid gap-2">
                      {current.benefits.map((item) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm leading-6 text-white/80"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <motion.div
                  className="rounded-[28px] border border-border bg-surface/85 p-5 shadow-[0_25px_70px_-50px_rgba(15,23,42,0.65)]"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-text">Product story</p>
                    <Badge className="border-border bg-bg/80 text-muted">Ready to demo</Badge>
                  </div>
                  <div className="mt-5 grid gap-3">
                    {[
                      'Workflow clarity',
                      'Clean handoff between teams',
                      'Role-based control',
                      'Operational visibility',
                    ].map((item, itemIndex) => (
                      <div key={item} className="flex items-center gap-3 rounded-2xl border border-border bg-bg/70 px-4 py-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-navy text-sm font-semibold text-white">
                          0{itemIndex + 1}
                        </span>
                        <span className="text-sm font-medium text-text">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
                <div className="rounded-[28px] border border-border bg-surface/80 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Delivery fit</p>
                  <p className="mt-4 text-sm leading-7 text-text">
                    {current.title} works as a packaged offering that can be tailored to the workflow, report structure, and rollout model of the client.
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/solutions" variant="secondary">
              Open solutions
              <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button to="/contact" variant="accent">
              Request demo
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function Home() {
  const featuredServices = services.slice(0, 3);
  const featuredTech = technologyCategories.slice(0, 3);
  return (
    <>
      <Seo title={pageMeta.home.title} description={pageMeta.home.description} />

      <PageHero
        eyebrow="Talentifiers"
        kicker="Established in 2001"
        title="Enterprise technology, designed to move the business forward."
        description="Talentifiers is a Hyderabad-based IT services and enterprise solutions company helping organizations modernize through software development, engineering, cloud services, data analytics, consulting, testing, and packaged business solutions."
        trustLine="Established in 2001 | Hyderabad corporate office | Enterprise solutions focus"
        actions={
          <>
            <Button to="/contact" variant="accent">
              Book a Consultation
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button to="/services" variant="secondary">
              Explore Services
            </Button>
          </>
        }
        stats={heroStats}
        visual={
          <EnterpriseVisual
            title="Talentifiers delivery cockpit"
            subtitle="A premium operating view showing how software, cloud, data, and quality come together."
            metrics={[
              { label: 'Founded', value: '2001' },
              { label: 'Core pillars', value: '7 services' },
              { label: 'Packaged offerings', value: '3 products' },
            ]}
          />
        }
      />

      <Section className="pt-12">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {trustSignals.map((signal, index) => (
              <Reveal key={signal.label} delay={index * 0.05}>
                <Card className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-teal">
                      <BadgeCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-text">{signal.label}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted">{signal.detail}</p>
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-surface/40">
        <Container>
          <SectionHeading
            eyebrow="Clients"
            title="Compact company names with small logo marks."
            description="The homepage keeps the client story compact. Open the Clients page to see larger logo tiles with hover emphasis."
            actions={
              <Button to="/clients" variant="secondary">
                Open clients page
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            }
          />
          <div className="mt-12">
            <ClientSnapshot segments={clientSegments} />
          </div>
        </Container>
      </Section>

      <Section id="services">
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="Featured service samples."
            description="The homepage now rotates through the service portfolio so visitors see the delivery model in motion before they reach the dedicated services page."
            actions={
              <Button to="/services" variant="primary">
                View all services
                <ArrowRight className="h-4 w-4" />
              </Button>
            }
          />
          <div className="mt-12">
            <ServiceSpotlight items={featuredServices} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <div className="space-y-6">
                <SectionHeading
                  eyebrow="Why Talentifiers"
                  title="A long-term partner for modern business systems."
                  description="Talentifiers brings a business-first delivery mindset, practical engineering depth, and a broad solution surface that helps organizations move from concept to live operations with confidence."
                />
                <IconBulletList items={whyTalentifiers} />
              </div>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2">
              {impactCards.map((item, index) => (
                <ImpactCard key={item.title} item={item} index={index} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Solutions"
              title="Packaged business systems rotate like premium product stories."
              description="The homepage now lets people browse supply chain, CRM, and estimating solutions through an interactive showcase instead of static tiles."
            />
            <SolutionSpotlight items={solutions} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="space-y-6">
            <SectionHeading
              eyebrow="Technology ecosystem"
              title="Featured technology samples."
              description="A concise sample of the stack appears here. The dedicated technologies page holds the full ecosystem."
            />
                <TechMarquee
                  items={[
                    'AWS',
                    'Azure',
                    'Google Cloud',
                    'Enterprise Java',
                    '.NET',
                    'Python',
                    'Kafka',
                    'Spark',
                    'TensorFlow',
                    'SCORM',
                  ]}
                />
              </div>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {featuredTech.map((category, index) => (
                <Reveal key={category.id} delay={index * 0.05}>
                  <StackCard
                    title={category.title}
                    summary={category.summary}
                    items={category.items}
                    icon={category.icon}
                    accent={index === 1 ? 'brand-coral' : index === 2 ? 'brand-navy' : 'brand-teal'}
                    className="h-full"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-brand-navy text-white">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
            <Reveal>
              <div className="space-y-5">
                <SectionHeading
                  eyebrow="Enterprise confidence"
                  title="Delivery built for teams that need clarity, not noise."
                  description="When buyers engage Talentifiers, they get a partner that values clean planning, rigorous validation, and an implementation style that respects operational realities."
                  className="text-white"
                  eyebrowClassName="border-white/10 bg-white/10 text-white"
                  titleClassName="text-white"
                  descriptionClassName="text-white/75"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  {processSteps.map((step, index) => (
                    <Card key={step.title} className="border-white/10 bg-white/5 p-5 text-white shadow-none backdrop-blur-md">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-teal">0{index + 1}</p>
                      <h3 className="mt-3 font-display text-xl font-semibold">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/75">{step.summary}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </Reveal>
            <div className="space-y-5">
              <Reveal delay={0.08}>
                <Card className="border-white/10 bg-white/5 p-6 text-white shadow-none backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-teal">Proof framework</p>
                  <h3 className="mt-4 font-display text-2xl font-semibold">A premium way to show outcomes.</h3>
                  <p className="mt-3 text-sm leading-7 text-white/75">
                    Use this section to highlight case-study outcomes, client sectors, and long-term delivery confidence without overclaiming.
                  </p>
                  <div className="mt-6 space-y-3">
                    {[
                      'Digital transformation support',
                      'Cloud modernization paths',
                      'Analytics and reporting visibility',
                      'Quality and accessibility confidence',
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                        <Check className="mt-0.5 h-4 w-4 text-brand-teal" />
                        <span className="text-sm text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </Reveal>
              <Reveal delay={0.12}>
                <Card className="border-white/10 bg-white/5 p-6 text-white shadow-none backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-coral">Talk to us</p>
                  <h3 className="mt-4 font-display text-2xl font-semibold">Ready to modernize your technology stack?</h3>
                  <p className="mt-3 text-sm leading-7 text-white/75">
                    The Talentifiers team is available to discuss software development, cloud work, analytics, testing, and business solutions.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button to="/contact" variant="accent">
                      Book a Consultation
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button href={`tel:${contactDetails.phone}`} variant="secondary" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                      Call {contactDetails.phone}
                    </Button>
                  </div>
                </Card>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal>
              <div className="space-y-6">
                <SectionHeading
                  eyebrow="Consultation"
                  title="Turn the first conversation into a clear next step."
                  description="A compact inquiry form lets prospects book a consultation, request a demo, or start a broader enterprise discussion."
                />
                <div className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <ContactInfoCard label="Phone" value={contactDetails.phone} href={`tel:${contactDetails.phone}`} />
                    <ContactInfoCard label="Email" value={contactDetails.email} href={`mailto:${contactDetails.email}`} />
                  </div>
                  <ContactInfoCard label="Office" value={contactDetails.address} />
                </div>
              </div>
            </Reveal>
            <CompactLeadCard
              title="Book a consultation"
              description="Tell us what you want to improve and we'll follow up with the right next step."
              submitLabel="Book a consultation"
              defaultInterest="Book a Consultation"
              source="home-cta"
            />
          </div>
        </Container>
      </Section>
    </>
  );
}

function ContactInfoCard({ label, value, href }) {
  return (
    <Card as="div" className="p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">{label}</p>
      {href ? (
        <a href={href} className="mt-3 block text-sm font-medium leading-6 text-text transition hover:text-brand-teal">
          {value}
        </a>
      ) : (
        <p className="mt-3 text-sm leading-7 text-text">{value}</p>
      )}
    </Card>
  );
}

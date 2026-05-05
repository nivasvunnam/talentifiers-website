import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, BadgeCheck, Cloud, Code2, ShieldCheck, BarChart3 } from 'lucide-react';
import { pageMeta, processSteps, services } from '../data';
import {
  AnimatePresence,
  Badge,
  Button,
  Card,
  Container,
  FeatureList,
  Icon,
  PageHero,
  ProcessFlow,
  Reveal,
  Section,
  SectionHeading,
  Seo,
  TagPill,
  motion,
  cn,
} from '../ui';
import { assetPath } from '../assets';

const accentTone = {
  teal: 'bg-brand-teal/10 text-brand-teal border-brand-teal/20',
  navy: 'bg-brand-navy/10 text-brand-navy dark:text-brand-teal border-brand-navy/20',
  coral: 'bg-brand-coral/10 text-brand-coral border-brand-coral/20',
};

function ServiceExplorer({ items }) {
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
        {items.map((service, index) => (
          <button
            key={service.id}
            type="button"
            role="tab"
            aria-selected={active === index}
            onClick={() => setActive(index)}
            className={cn(
              'group flex h-full min-h-[320px] flex-col rounded-[24px] border p-4 text-left transition duration-300',
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
              <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl', accentTone[service.accent])}>
                <Icon name={service.icon} className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 overflow-hidden rounded-[22px] border border-border bg-bg/60">
              <img
                src={assetPath(service.image)}
                alt={`${service.title} visual`}
                className="h-36 w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
            <p className="mt-4 min-h-[4.5rem] text-sm leading-6 text-muted">{service.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {service.capabilities.slice(0, 3).map((capability) => (
                <span key={capability} className="rounded-full border border-border bg-bg/70 px-3 py-1 text-xs font-medium text-muted">
                  {capability}
                </span>
              ))}
            </div>
            <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">
              <BadgeCheck className="h-3.5 w-3.5" />
              Enterprise-ready
            </div>
          </button>
        ))}
      </div>

      <Card className="relative min-h-[36rem] p-0">
        <div className={cn('absolute inset-0 bg-gradient-to-br', accentGradient)} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(15,185,177,0.12),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(255,107,74,0.08),transparent_22%)]" />
        <div className="relative flex h-full flex-col p-6 sm:p-8">
              <div className="mt-5 flex items-center justify-between gap-4">
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
              animate={{ width: `${((active + 1) / items.length) * 100}%` }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            />
          </div>

          <div className="mt-6 overflow-hidden rounded-[28px] border border-border bg-surface/80 shadow-[0_25px_70px_-50px_rgba(15,23,42,0.65)]">
            <img
              src={current.image}
              alt={`${current.title} visual`}
              className="h-56 w-full object-cover sm:h-64"
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
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-teal">Service spotlight</p>
                  <h3 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                    {current.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-muted">{current.description}</p>
                </motion.div>
              </AnimatePresence>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-border bg-surface/80 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">What it covers</p>
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
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
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
                  { label: 'Engagement', value: 'Consultative' },
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
            <Button to="/contact" variant="accent">
              Start a conversation
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button to={`/services#${current.id}`} variant="secondary">
              View detailed service
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ServiceSection({ service, index }) {
  const reverse = index % 2 === 1;
  const accentClass = accentTone[service.accent];
  const rightGradient =
    service.accent === 'coral'
      ? 'from-brand-coral/15 to-brand-navy/20'
      : service.accent === 'navy'
        ? 'from-brand-navy/20 to-brand-teal/10'
        : 'from-brand-teal/15 to-brand-navy/20';

  return (
    <article
      id={service.id}
      className={cn('scroll-mt-32 rounded-[32px] border border-border bg-surface/80 p-6 shadow-[0_30px_100px_-65px_rgba(15,23,42,0.65)] backdrop-blur-xl sm:p-8', reverse && 'bg-bg/70')}
    >
      <div className={cn('grid gap-8 lg:grid-cols-[1fr_0.95fr]', reverse && 'lg:grid-cols-[0.95fr_1fr]')}>
        <Reveal>
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge className={accentClass}>0{index + 1}</Badge>
                <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                  {service.title}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">{service.summary}</p>
              </div>
              <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border', accentClass)}>
                <Icon name={service.icon} className="h-5 w-5" />
              </div>
            </div>

            <div className="rounded-[24px] border border-border bg-bg/70 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-teal">What it covers</p>
              <p className="mt-3 text-sm leading-7 text-text">{service.description}</p>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Capabilities</p>
              <FeatureList columns={2} items={service.capabilities} />
            </div>

            <div className="flex flex-wrap gap-2">
              {service.benefits.map((benefit) => (
                <TagPill key={benefit}>{benefit}</TagPill>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <Card className={cn('relative overflow-hidden p-0', reverse && 'bg-surface/90')}>
            <div className={cn('absolute inset-0 bg-gradient-to-br', rightGradient)} />
            <div className="relative h-full p-6 sm:p-8">
              <div className="overflow-hidden rounded-[24px] border border-border bg-bg/70">
                <img
                src={assetPath(service.image)}
                  alt={`${service.title} artwork`}
                  className="h-56 w-full object-cover"
                />
              </div>
              <div className="mt-5 flex items-center justify-between gap-4">
                <TagPill className="border-border bg-surface/80 text-muted">Delivery view</TagPill>
                <Badge className="border-border bg-bg/80 text-muted">Enterprise-ready</Badge>
              </div>

              <div className="mt-8 grid gap-4">
                <div className="rounded-[24px] border border-border bg-surface/90 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Engagement model</p>
                  <div className="mt-4 grid gap-3">
                    {['Discover', 'Design', 'Build', 'Validate', 'Optimize'].map((step, stepIndex) => (
                      <div key={step} className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-navy text-sm font-semibold text-white">
                          0{stepIndex + 1}
                        </span>
                        <span className="text-sm font-medium text-text">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { label: 'Audience', value: 'Enterprise teams' },
                    { label: 'Outcome', value: 'More predictable delivery' },
                    { label: 'Focus', value: 'Business fit' },
                    { label: 'Quality', value: 'Testing built in' },
                  ].map((metric) => (
                    <div key={metric.label} className="rounded-[22px] border border-border bg-surface/90 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">{metric.label}</p>
                      <p className="mt-2 text-sm font-medium text-text">{metric.value}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-[24px] border border-border bg-brand-navy p-5 text-white shadow-[0_25px_60px_-40px_rgba(11,31,58,0.8)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">Business value</p>
                  <p className="mt-3 text-sm leading-7 text-white/80">
                    {service.benefits.join(' ')}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <>
      <Seo title={pageMeta.services.title} description={pageMeta.services.description} />

      <PageHero
        eyebrow="Services"
        title="Technology services built for business transformation."
        description="Talentifiers offers a complete service stack across software development, engineering, custom solutions, cloud services, data analytics, consulting, and testing."
        trustLine="Strategy, build, validation, and support delivered with one premium delivery model"
        actions={
          <>
            <Button to="/contact" variant="accent">
              Book a Consultation
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button to="/solutions" variant="secondary">
              Explore solutions
            </Button>
          </>
        }
        visual={
          <Card className="p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: 'Software', value: 'Custom applications and platforms', icon: Code2 },
                { label: 'Cloud', value: 'AWS, Azure, and Google Cloud delivery', icon: Cloud },
                { label: 'Data', value: 'Analytics and pipeline design', icon: BarChart3 },
                { label: 'Quality', value: 'Testing and accessibility', icon: ShieldCheck },
              ].map((item) => (
                <div key={item.label} className="flex h-full min-h-[170px] flex-col rounded-[24px] border border-border bg-bg/70 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-teal">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted" />
                  </div>
                  <p className="mt-4 min-h-[2.5rem] text-sm font-semibold text-text">{item.label}</p>
                  <p className="mt-2 min-h-[3.5rem] text-sm leading-6 text-muted">{item.value}</p>
                </div>
              ))}
            </div>
          </Card>
        }
      />

      <Section className="pt-8">
        <Container>
          <SectionHeading
            eyebrow="Service explorer"
            title="Browse the service stack as a live product experience."
            description="The selector on this page rotates automatically, but any service can be chosen manually to inspect the full capability set."
          />

          <div className="mt-12">
            <ServiceExplorer items={services} />
          </div>
        </Container>
      </Section>

      <Section className="bg-surface/40">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal>
              <div className="space-y-6">
                <SectionHeading
                  eyebrow="Engagement model"
                  title="A clean delivery rhythm that keeps work moving."
                  description="The process is intentionally simple. Talentifiers starts with discovery, shapes a strong plan, builds with discipline, validates carefully, and then optimizes after launch."
                />
                <div className="rounded-[28px] border border-border bg-surface/80 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-teal">What clients get</p>
                  <div className="mt-5 space-y-3">
                    {[
                      'Clear scoping and requirements alignment',
                      'A structured delivery path with fewer surprises',
                      'Testing and validation integrated into the process',
                      'Solutions that can evolve as the business changes',
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-bg/60 px-4 py-3">
                        <BadgeCheck className="mt-0.5 h-4 w-4 text-brand-teal" />
                        <span className="text-sm leading-6 text-text">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
            <ProcessFlow steps={processSteps} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Card className="grid gap-6 p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-teal">Need support?</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                Looking for a technology partner that aligns engineering with business outcomes?
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                Talk to Talentifiers about software development, cloud services, analytics, consulting, testing, or a packaged solution.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button to="/contact" variant="accent">
                Book a Consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/solutions" variant="secondary">
                Explore solutions
              </Button>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}

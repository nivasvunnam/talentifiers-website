import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, Calculator, Users, Workflow, BadgeCheck } from 'lucide-react';
import { pageMeta, solutions } from '../data';
import {
  AnimatePresence,
  Badge,
  Button,
  Card,
  Container,
  FeatureList,
  Icon,
  PageHero,
  Reveal,
  Section,
  SectionHeading,
  Seo,
  TagPill,
  motion,
  cn,
} from '../ui';
import { CompactLeadCard } from '../forms';

const accentTone = {
  navy: 'bg-brand-navy/10 text-brand-navy dark:text-brand-teal border-brand-navy/20',
  teal: 'bg-brand-teal/10 text-brand-teal border-brand-teal/20',
  coral: 'bg-brand-coral/10 text-brand-coral border-brand-coral/20',
};

function SolutionExplorer({ items }) {
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
      className="grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)]"
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
                <h3 className="mt-2 font-display text-xl font-semibold text-text">{solution.title}</h3>
              </div>
              <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl', accentTone[solution.accent])}>
                <Icon name={solution.icon} className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 overflow-hidden rounded-[22px] border border-border bg-bg/60">
              <img
                src={solution.image}
                alt={`${solution.title} visual`}
                className="h-36 w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
            <p className="mt-4 min-h-[4.5rem] text-sm leading-6 text-muted">{solution.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {solution.features.slice(0, 3).map((feature) => (
                <span key={feature} className="rounded-full border border-border bg-bg/70 px-3 py-1 text-xs font-medium text-muted">
                  {feature}
                </span>
              ))}
            </div>
            <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">
              <BadgeCheck className="h-3.5 w-3.5" />
              Demo ready
            </div>
          </button>
        ))}
      </div>

      <Card className="relative min-h-[36rem] p-0">
        <div className={cn('absolute inset-0 bg-gradient-to-br', accentGradient)} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(255,107,74,0.08),transparent_22%),radial-gradient(circle_at_15%_25%,rgba(15,185,177,0.12),transparent_28%)]" />
        <div className="relative flex h-full flex-col p-6 sm:p-8">
              <div className="mt-5 flex items-center justify-between gap-4">
            <TagPill className="border-border bg-surface/80 text-muted">Packaged solution</TagPill>
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

          <div className="mt-8 grid flex-1 gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-start">
            <div className="space-y-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-teal">Solution spotlight</p>
                  <h3 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                    {current.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-muted">{current.problem}</p>
                </motion.div>
              </AnimatePresence>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-border bg-surface/80 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Modules</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {current.features.slice(0, 4).map((feature) => (
                      <span key={feature} className="rounded-full border border-border bg-bg/70 px-3 py-1 text-xs font-medium text-muted">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-[24px] border border-border bg-brand-navy p-4 text-white shadow-[0_20px_60px_-40px_rgba(11,31,58,0.8)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">Outcome</p>
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
                  <p className="text-sm font-semibold text-text">Product story</p>
                  <Badge className="border-border bg-bg/80 text-muted">Live demo</Badge>
                </div>
                <div className="mt-5 grid gap-3">
                  {[
                    'Workflow clarity',
                    'Role-based visibility',
                    'Operational control',
                    'Faster handoff',
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
                  {current.title} is framed to reduce manual work, centralize the workflow, and make the business process easier to manage.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/contact" variant="accent">
              Request demo
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button to={`/solutions#${current.id}`} variant="secondary">
              View detailed solution
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function SolutionSection({ solution, index }) {
  const reverse = index % 2 === 1;
  const accentClass = accentTone[solution.accent];

  return (
    <article
      id={solution.id}
      className={cn('scroll-mt-32 rounded-[32px] border border-border bg-surface/80 p-6 shadow-[0_30px_100px_-65px_rgba(15,23,42,0.65)] backdrop-blur-xl sm:p-8', reverse && 'bg-bg/70')}
    >
      <div className={cn('grid gap-8 lg:grid-cols-[1fr_0.95fr]', reverse && 'lg:grid-cols-[0.95fr_1fr]')}>
        <Reveal>
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge className={accentClass}>Solution 0{index + 1}</Badge>
                <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                  {solution.title}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">{solution.summary}</p>
              </div>
              <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border', accentClass)}>
                <Icon name={solution.icon} className="h-5 w-5" />
              </div>
            </div>

            <div className="rounded-[24px] border border-border bg-bg/70 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-teal">Business problem</p>
              <p className="mt-3 text-sm leading-7 text-text">{solution.problem}</p>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Key features</p>
              <FeatureList columns={1} items={solution.features} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <Card className="relative overflow-hidden p-0">
            <div className={cn('absolute inset-0 bg-gradient-to-br', solution.accent === 'coral' ? 'from-brand-coral/15 to-brand-navy/20' : solution.accent === 'navy' ? 'from-brand-navy/20 to-brand-teal/10' : 'from-brand-teal/15 to-brand-navy/20')} />
            <div className="relative h-full p-6 sm:p-8">
              <div className="overflow-hidden rounded-[24px] border border-border bg-bg/70">
                <img
                  src={solution.image}
                  alt={`${solution.title} artwork`}
                  className="h-56 w-full object-cover"
                />
              </div>
              <div className="mt-5 flex items-center justify-between gap-4">
                <TagPill className="border-border bg-surface/80 text-muted">Product view</TagPill>
                <Badge className="border-border bg-bg/80 text-muted">Ready for demo</Badge>
              </div>

              <div className="mt-8 space-y-4">
                <div className="rounded-[24px] border border-border bg-surface/90 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Workflow modules</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {solution.features.map((feature) => (
                      <span key={feature} className="rounded-full border border-border bg-bg/70 px-3 py-1 text-xs font-medium text-muted">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { label: 'Operational value', value: 'Better visibility and control' },
                    { label: 'Adoption', value: 'Clear, user-focused workflows' },
                    { label: 'Scale', value: 'Role-based and cloud-friendly' },
                    { label: 'Delivery', value: 'Tailored to the business model' },
                  ].map((metric) => (
                    <div key={metric.label} className="rounded-[22px] border border-border bg-surface/90 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">{metric.label}</p>
                      <p className="mt-2 text-sm font-medium text-text">{metric.value}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-[24px] border border-border bg-brand-navy p-5 text-white shadow-[0_25px_60px_-40px_rgba(11,31,58,0.8)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">Value</p>
                  <p className="mt-3 text-sm leading-7 text-white/80">
                    {solution.benefits.join(' ')}
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

export default function SolutionsPage() {
  return (
    <>
      <Seo title={pageMeta.solutions.title} description={pageMeta.solutions.description} />

      <PageHero
        eyebrow="Solutions"
        title="Business solutions built for modern workflows."
        description="Talentifiers productizes core enterprise needs into packaged systems for supply chain management, CRM, and estimating workflows."
        trustLine="Designed for operational visibility, role-based control, and clean adoption"
        actions={
          <>
            <Button to="/contact" variant="accent">
              Request a demo
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button to="/services" variant="secondary">
              Explore services
            </Button>
          </>
        }
        visual={
          <Card className="grid gap-4 sm:grid-cols-2">
            {[
              { label: 'Supply chain', icon: Workflow, text: 'Visibility, scheduling, and job tracking' },
              { label: 'CRM', icon: Users, text: 'Leads, contacts, opportunities, and reporting' },
              { label: 'Estimating', icon: Calculator, text: 'Quote management and order conversion' },
              { label: 'Enterprise fit', icon: BadgeCheck, text: 'Built around business process' },
            ].map((item) => (
              <div key={item.label} className="flex h-full min-h-[170px] flex-col rounded-[24px] border border-border bg-bg/70 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-teal">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted" />
                </div>
                <p className="mt-4 min-h-[2.5rem] text-sm font-semibold text-text">{item.label}</p>
                <p className="mt-2 min-h-[3.5rem] text-sm leading-6 text-muted">{item.text}</p>
              </div>
            ))}
          </Card>
        }
      />

      <Section className="pt-8">
        <Container>
          <SectionHeading
            eyebrow="Overview"
            title="Three packaged offerings, presented like premium products."
            description="Each solution is positioned around a business problem, the modules it includes, and the operational value it creates."
          />
          <div className="mt-12">
            <SolutionExplorer items={solutions} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="space-y-6">
            {solutions.map((solution, index) => (
              <SolutionSection key={solution.id} solution={solution} index={index} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-surface/40">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal>
              <div className="space-y-6">
                <SectionHeading
                  eyebrow="Why it works"
                  title="The right solution should reduce friction, not add another system to manage."
                  description="Talentifiers designs these products around visibility, simplification, and better decision-making. The point is to help teams do more with less manual effort."
                />
                <div className="grid gap-4">
                  {[
                    'Reduce manual operations and duplicated work',
                    'Centralize data and improve visibility',
                    'Support faster quoting, tracking, and follow-up',
                    'Create a more reliable workflow for teams and managers',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-surface/80 px-4 py-3">
                      <BadgeCheck className="mt-0.5 h-4 w-4 text-brand-teal" />
                      <span className="text-sm leading-6 text-text">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Card className="grid gap-4 p-6 sm:grid-cols-2">
              {[
                { label: 'Visibility', value: 'Dashboards and status clarity' },
                { label: 'Control', value: 'User roles and permissions' },
                { label: 'Speed', value: 'Faster quotes and handoffs' },
                { label: 'Scale', value: 'Cloud-friendly architecture' },
              ].map((metric) => (
                <div key={metric.label} className="rounded-[24px] border border-border bg-bg/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">{metric.label}</p>
                  <p className="mt-2 text-sm font-medium text-text">{metric.value}</p>
                </div>
              ))}
            </Card>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="space-y-6">
                <SectionHeading
                  eyebrow="Demo request"
                  title="See the solution surface before you commit."
                  description="Use the demo request form to start a focused conversation about your workflow, business challenge, or rollout plan."
                />
                <div className="space-y-4">
                  <p className="text-sm leading-7 text-muted">
                    Talentifiers can use the form to start a product conversation, scope a custom demo, or hand the request to the right team.
                  </p>
                  <Button to="/contact" variant="secondary">
                    Contact the team
                  </Button>
                </div>
              </div>
            </Reveal>
            <CompactLeadCard
              title="Request a demo"
              description="Tell us which solution interests you and we will follow up with the right format."
              submitLabel="Request a demo"
              defaultInterest="Request a Demo"
              source="solutions-demo"
            />
          </div>
        </Container>
      </Section>
    </>
  );
}

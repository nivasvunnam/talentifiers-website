import { useMemo, useState } from 'react';
import { ArrowRight, BadgeCheck, BarChart3, Cloud, Code2, PanelsTopLeft, ShieldCheck, Workflow } from 'lucide-react';
import { pageMeta, technologyCategories } from '../data';
import {
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
  StackCard,
  TagPill,
  cn,
} from '../ui';
import { assetPath } from '../assets';

function ArchitectureMap() {
  const nodes = [
    { label: 'Frontend', icon: PanelsTopLeft, className: 'left-6 top-8' },
    { label: 'Cloud', icon: Cloud, className: 'right-8 top-8' },
    { label: 'Data', icon: BarChart3, className: 'left-10 bottom-10' },
    { label: 'QA', icon: ShieldCheck, className: 'right-10 bottom-10' },
  ];
  const platformTech = [
    { label: 'Java', image: assetPath('/tech-icons/java.png') },
    { label: 'Docker', image: assetPath('/tech-icons/docker.png') },
    { label: 'Kubernetes', image: assetPath('/tech-icons/kubernetes.png') },
    { label: 'SQL', image: assetPath('/tech-icons/sql.png') },
    { label: 'Power BI', image: assetPath('/tech-icons/power-bi.png') },
    { label: 'GitHub Actions', image: assetPath('/tech-icons/github-actions.png') },
    { label: 'Playwright', image: assetPath('/tech-icons/playwright.png') },
    { label: 'WCAG', image: assetPath('/tech-icons/wcag.png') },
  ];

  return (
    <Card className="relative overflow-hidden p-0">
      <div className="relative min-h-[30rem] bg-brand-navy p-6 text-white sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(15,185,177,0.16),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(255,107,74,0.12),transparent_25%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <TagPill className="border-white/10 bg-white/10 text-white">Architecture</TagPill>
            <Badge className="border-white/10 bg-white/10 text-white">
              <BadgeCheck className="h-3.5 w-3.5" />
              Connected
            </Badge>
          </div>

          <div className="relative mt-10 flex min-h-[20rem] items-center justify-center">
            <div className="absolute h-52 w-52 rounded-full border border-white/10" />
            <div className="absolute h-72 w-72 rounded-full border border-white/10" />
            <div className="absolute h-96 w-96 rounded-full border border-white/5" />
            <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-white/10 bg-white/10 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.5)] backdrop-blur-md">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-teal">Talentifiers</p>
                <p className="mt-2 text-sm font-medium text-white/80">Delivery core</p>
              </div>
            </div>

            {nodes.map((node) => (
              <div
                key={node.label}
                className={cn('absolute rounded-[22px] border border-white/10 bg-white/5 px-4 py-3 shadow-[0_25px_60px_-40px_rgba(0,0,0,0.45)] backdrop-blur-md', node.className)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-teal">
                    <node.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{node.label}</p>
                    <p className="text-xs text-white/60">Platform layer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {platformTech.map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-center text-xs font-medium text-white/80"
              >
                <img src={item.image} alt="" aria-hidden="true" className="h-4 w-4 rounded-full bg-white/90 p-0.5 object-contain" />
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function renderTechChip(tech) {
  const label = typeof tech === 'string' ? tech : tech.label;
  const mark = typeof tech === 'string' ? null : tech.mark;
  const image = typeof tech === 'string' ? null : tech.image;

  return (
    <span
      key={label}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-2 text-xs font-medium text-text"
    >
      {image ? (
        <span className="inline-flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-white/90 p-0.5">
          <img src={assetPath(image)} alt="" aria-hidden="true" className="h-full w-full object-contain" />
        </span>
      ) : mark ? (
        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-navy/10 px-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-brand-navy dark:bg-brand-teal/15 dark:text-brand-teal">
          {mark}
        </span>
      ) : null}
      <span>{label}</span>
    </span>
  );
}

export default function Technologies() {
  const [activeCategory, setActiveCategory] = useState('all');
  const categoryTabs = useMemo(
    () => [
      { id: 'all', label: 'All stacks' },
      ...technologyCategories.map((category) => ({ id: category.id, label: category.title })),
    ],
    []
  );
  const visibleCategories =
    activeCategory === 'all'
      ? technologyCategories
      : technologyCategories.filter((category) => category.id === activeCategory);

  return (
    <>
      <Seo title={pageMeta.technologies.title} description={pageMeta.technologies.description} />

      <PageHero
        eyebrow="Technologies"
        title="A technology ecosystem built for enterprise delivery."
        description="Talentifiers works across cloud, backend, frontend, data, DevOps, and QA tooling to support modern business solutions."
        trustLine="Cloud platforms, application stacks, data systems, and accessibility validation under one umbrella"
        actions={
          <>
            <Button to="/contact" variant="accent">
              Discuss your stack
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button to="/services" variant="secondary">
              Explore services
            </Button>
          </>
        }
        stats={[
          { value: 6, label: 'Technology categories', suffix: '' },
          { value: 3, label: 'Cloud platforms', suffix: '' },
          { value: 20, label: 'Stack tools', suffix: '+' },
          { value: 6, label: 'QA tools', suffix: '' },
        ]}
        visual={<ArchitectureMap />}
      />

      <Section className="pt-8">
        <Container>
          <SectionHeading
            eyebrow="Platform breadth"
            title="The stack reads like capability, not a random list."
            description="Use the filters to move between cloud, backend, frontend, data, DevOps, and QA capabilities."
          />

          <div className="mt-8 flex flex-wrap gap-2">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={
                  activeCategory === tab.id
                    ? 'rounded-full border border-brand-teal bg-brand-teal px-4 py-2 text-sm font-semibold text-white shadow-sm transition'
                    : 'rounded-full border border-border bg-surface/80 px-4 py-2 text-sm font-semibold text-text transition hover:border-brand-teal hover:bg-surface'
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {visibleCategories.map((category, index) => (
              <Reveal key={category.id} delay={index * 0.05}>
                <StackCard
                  title={category.title}
                  summary={category.summary}
                  items={category.items}
                  icon={category.icon}
                  accent={index % 3 === 1 ? 'brand-coral' : index % 3 === 2 ? 'brand-navy' : 'brand-teal'}
                  className="h-full"
                />
              </Reveal>
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
                  eyebrow="Technology story"
                  title="Technology is a means to an outcome, not the outcome itself."
                  description="Talentifiers uses the right stack for the problem, then layers design, delivery discipline, analytics, and quality on top. That combination helps systems stay usable and maintainable after launch."
                />
                <FeatureList
                  columns={1}
                  items={[
                    'Cloud platforms that support scale and resilience',
                    'Frontend and backend stacks that fit enterprise application needs',
                    'Data tooling that turns transactions into insight',
                    'DevOps automation that keeps releases predictable',
                    'QA and accessibility tools that support inclusive experiences',
                  ]}
                />
              </div>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { label: 'Cloud', icon: Cloud, summary: 'AWS, Azure, and Google Cloud support' },
                { label: 'Backend', icon: Code2, summary: 'Enterprise Java, .NET, Python, Node.js, and APIs' },
                { label: 'Data', icon: BarChart3, summary: 'PostgreSQL, MongoDB, Kafka, Spark, and reporting' },
                { label: 'QA & DevOps', icon: Workflow, summary: 'Playwright, Cypress, GitHub Actions, and Kubernetes' },
              ].map((item, index) => (
                <Reveal key={item.label} delay={index * 0.04}>
                  <Card className="h-full min-h-[200px]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-navy text-white">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <Badge className="bg-brand-teal/10 text-brand-teal">Reference</Badge>
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-semibold text-text">{item.label}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{item.summary}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Card className="grid gap-8 p-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-teal">Standards and testing</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                Technology choices should support both delivery and confidence.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                Beyond development and cloud, Talentifiers references learning standards and accessibility testing ecosystems where they matter to the solution.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {technologyCategories
                .slice(3)
                .concat([
                  {
                    title: 'Quality checks',
                    items: [
                      { label: 'Manual verification', mark: 'MV', image: assetPath('/tech-icons/manual-verification.png') },
                      { label: 'Automation support', mark: 'AS', image: assetPath('/tech-icons/automation-support.png') },
                      { label: 'CI-friendly testing', mark: 'CI', image: assetPath('/tech-icons/ci-friendly-testing.png') },
                    ],
                  },
                ])
                .map((item) => (
                  <div key={item.title} className="flex h-full min-h-[180px] flex-col rounded-[24px] border border-border bg-bg/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">{item.title}</p>
                    <div className="mt-3 flex flex-1 flex-wrap gap-2">
                      {item.items.map((tech) => renderTechChip(tech))}
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </Container>
      </Section>

      <Section className="bg-brand-navy text-white">
        <Container>
          <Card className="border-white/10 bg-white/5 p-8 text-white shadow-none backdrop-blur-md">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-teal">Discuss your stack</p>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  Want to align your technology choices with the business model?
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75">
                  Talentifiers can help shape the stack, frame the architecture, and connect the tools to a practical delivery plan.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button to="/contact" variant="accent">
                  Contact us
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button to="/solutions" variant="secondary" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                  Explore solutions
                </Button>
              </div>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}

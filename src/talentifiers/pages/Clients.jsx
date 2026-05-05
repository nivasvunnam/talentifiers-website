import { ArrowRight, BadgeCheck, Building2, Cloud, Gauge, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
import { clientSegments, contactDetails, impactCards, pageMeta, processSteps, trustCards } from '../data';
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
  TagPill,
  cn,
} from '../ui';
import { assetPath } from '../assets';

function ClientLogoTile({ company }) {
  const hasLogo = Boolean(company.logo);

  return (
    <article className="group relative flex min-h-[240px] flex-col overflow-hidden rounded-[28px] border border-border bg-surface/80 p-4 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-y-1 hover:border-brand-teal/40 hover:shadow-[0_28px_80px_-45px_rgba(15,23,42,0.55)]">
      <div
        className={cn(
          'flex flex-1 items-center justify-center rounded-[24px] border border-border bg-white p-6 transition duration-300',
          !hasLogo && 'bg-gradient-to-br from-brand-navy to-brand-slate text-white'
        )}
      >
        {hasLogo ? (
          <img
            src={assetPath(company.logo)}
            alt={`${company.name} logo`}
            loading="lazy"
            className="max-h-32 w-full object-contain transition-transform duration-300 ease-out group-hover:scale-110 xl:max-h-36"
          />
        ) : (
          <div className="flex min-h-28 w-full items-center justify-center px-4 text-center">
            <span className="font-display text-3xl font-semibold tracking-[0.18em] text-white">
              {company.fallbackLabel || company.name}
            </span>
          </div>
        )}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 pt-10">
        <div className="translate-y-2 rounded-[20px] border border-border bg-bg/90 px-4 py-3 opacity-0 shadow-lg backdrop-blur-md transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-center text-sm font-semibold leading-6 text-text">{company.name}</p>
        </div>
      </div>
    </article>
  );
}

export default function Clients() {
  return (
    <>
      <Seo title={pageMeta.clients.title} description={pageMeta.clients.description} />

      <PageHero
        eyebrow="Clients and trust"
        title="Trust architecture built for enterprise decision makers."
        description="Talentifiers presents a mature delivery story: established in 2001, grounded in Hyderabad, and focused on software, cloud, analytics, consulting, testing, and business solutions."
        trustLine="A broad capability surface with a premium, business-first engagement style"
        actions={
          <>
            <Button to="/contact" variant="accent">
              Start a conversation
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button to="/services" variant="secondary">
              View services
            </Button>
          </>
        }
        stats={[
          { value: 2001, label: 'Founded', suffix: '' },
          { value: 25, label: 'Years of experience', suffix: '+' },
          { value: 7, label: 'Service pillars', suffix: '' },
          { value: 3, label: 'Solution suites', suffix: '' },
        ]}
        visual={
          <EnterpriseVisual
            title="Confidence framework"
            subtitle="Use this view to communicate the company story, delivery model, and the categories of work Talentifiers is built to support."
            metrics={[
              { label: 'Office', value: 'Hyderabad' },
              { label: 'Mode', value: 'Enterprise engagements' },
              { label: 'Promise', value: 'Clear delivery' },
            ]}
          />
        }
      />

      <Section className="pt-8">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Established', value: '2001', icon: Sparkles },
              { label: 'City', value: 'Hyderabad', icon: Building2 },
              { label: 'Focus', value: 'Enterprise solutions', icon: Workflow },
              { label: 'Quality', value: 'Testing-led delivery', icon: ShieldCheck },
            ].map((item, index) => (
              <Reveal key={item.label} delay={index * 0.05}>
                <Card className="h-full">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-teal">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <TagPill>Trust</TagPill>
                  </div>
                  <p className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-muted">{item.label}</p>
                  <p className="mt-2 font-display text-3xl font-semibold text-text">{item.value}</p>
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
                  eyebrow="Delivery strengths"
                  title="The company should feel dependable before the first meeting even happens."
                  description="Talentifiers positions itself as a partner with practical breadth and strong execution habits. These strengths make the brand easier to trust for enterprise conversations."
                />
                <IconBulletList
                  items={[
                    'Strategic consulting that sharpens the problem before build work begins',
                    'Custom technology delivery shaped around business processes',
                    'Cloud modernization that supports scale and resilience',
                    'Analytics capability that improves visibility and decisions',
                    'Accessibility and testing rigor that protects the user experience',
                  ]}
                />
              </div>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2">
              {trustCards.concat(impactCards.slice(0, 2)).map((item, index) => (
                <Reveal key={item.title} delay={index * 0.05}>
                  <Card className="h-full">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-navy text-white">
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
            eyebrow="Client segments"
            title="Large logos with hover-revealed company names."
            description="The logo tiles stay prominent on the Clients page, and hovering any tile makes it lift and reveal the full company name."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {clientSegments.map((segment, index) => (
              <Reveal key={segment.id} delay={index * 0.05}>
                <Card className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-navy text-white">
                      <Icon name={segment.icon} className="h-5 w-5" />
                    </div>
                    <TagPill>{segment.companies.length} logos</TagPill>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-text">{segment.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{segment.summary}</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {segment.companies.map((company) => (
                      <ClientLogoTile key={company.name} company={company} />
                    ))}
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                    {segment.note}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <div className="space-y-6">
                <SectionHeading
                  eyebrow="Collaboration model"
                  title="A simple way to work together."
                  description="The delivery rhythm stays consistent: understand the problem, design the solution, build with discipline, validate carefully, and support after launch."
                />
                <FeatureList
                  columns={1}
                  items={[
                    'Discovery and scoping',
                    'Solution design and planning',
                    'Build and validation',
                    'Optimization and support',
                  ]}
                />
              </div>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {processSteps.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.05}>
                  <Card className="h-full">
                    <TagPill>0{index + 1}</TagPill>
                    <h3 className="mt-5 font-display text-2xl font-semibold text-text">{step.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{step.summary}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-brand-navy text-white">
        <Container>
          <Card className="border-white/10 bg-white/5 p-8 text-white shadow-none backdrop-blur-md">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-teal">Talk to the team</p>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  Need a confident delivery partner for your next initiative?
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75">
                  Talentifiers is ready to discuss software development, cloud, data, consulting, testing, or packaged business systems.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button to="/contact" variant="accent">
                  Contact us
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href={`tel:${contactDetails.phone}`} variant="secondary" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                  Call {contactDetails.phone}
                </Button>
              </div>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}

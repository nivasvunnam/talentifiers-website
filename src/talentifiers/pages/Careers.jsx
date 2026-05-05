import { ArrowRight, BadgeCheck, BriefcaseBusiness, GraduationCap, Sparkles, Users } from 'lucide-react';
import { careersValues, contactDetails, openRoles, pageMeta } from '../data';
import {
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
  TagPill,
} from '../ui';

export default function Careers() {
  return (
    <>
      <Seo title={pageMeta.careers.title} description={pageMeta.careers.description} />

      <PageHero
        eyebrow="Careers"
        title="Build what’s next with Talentifiers."
        description="Join a team that values practical engineering, learning, and business impact. Talentifiers works across software development, cloud, analytics, consulting, and testing."
        trustLine="A modern enterprise environment with room to learn, contribute, and grow"
        actions={
          <>
            <Button to="/contact" variant="accent">
              Apply or contact
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href={`mailto:${contactDetails.email}`} variant="secondary">
              Email the team
            </Button>
          </>
        }
        stats={[
          { value: 2001, label: 'Founded', suffix: '' },
          { value: 7, label: 'Service pillars', suffix: '' },
          { value: 3, label: 'Solution suites', suffix: '' },
          { value: 1, label: 'Team to join', suffix: '' },
        ]}
        visual={
          <EnterpriseVisual
            title="Talentifiers culture"
            subtitle="A calm, premium environment where the focus is on quality, delivery, and learning."
            metrics={[
              { label: 'Mindset', value: 'Curious and accountable' },
              { label: 'Work', value: 'Enterprise delivery' },
              { label: 'Growth', value: 'Skill-building on real projects' },
            ]}
          />
        }
      />

      <Section className="pt-8">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Learning', value: 'Real project exposure', icon: GraduationCap },
              { label: 'Impact', value: 'Business-facing work', icon: BriefcaseBusiness },
              { label: 'Team', value: 'Collaborative delivery', icon: Users },
              { label: 'Quality', value: 'Standards and ownership', icon: BadgeCheck },
            ].map((item, index) => (
              <Reveal key={item.label} delay={index * 0.05}>
                <Card className="h-full">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-teal">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <TagPill>Culture</TagPill>
                  </div>
                  <p className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-muted">{item.label}</p>
                  <p className="mt-2 font-display text-2xl font-semibold text-text">{item.value}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="space-y-6">
                <SectionHeading
                  eyebrow="Why join"
                  title="A place to do meaningful work, not just ship tasks."
                  description="Talentifiers is a strong fit for people who want hands-on exposure to enterprise software, cloud delivery, data, QA, and client-focused problem solving."
                />
                <IconBulletList items={careersValues} />
              </div>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                {
                  title: 'Software development',
                  summary: 'Build modern interfaces, business workflows, and platform features.',
                },
                {
                  title: 'Cloud and infrastructure',
                  summary: 'Support delivery across AWS, Azure, and Google Cloud.',
                },
                {
                  title: 'Data and analytics',
                  summary: 'Work on reporting, integration, and insight-driven systems.',
                },
                {
                  title: 'Testing and QA',
                  summary: 'Strengthen quality through manual, automated, and accessibility coverage.',
                },
              ].map((item, index) => (
                <Reveal key={item.title} delay={index * 0.04}>
                  <Card className="h-full">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">Opportunity</p>
                    <h3 className="mt-4 font-display text-2xl font-semibold text-text">{item.title}</h3>
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
            eyebrow="Open roles framework"
            title="Role areas that are ready to grow as the team expands."
            description="If live openings are not published yet, this keeps the careers page useful and professional while signaling where Talentifiers is most interested in talent."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {openRoles.map((role, index) => (
              <Reveal key={role.title} delay={index * 0.05}>
                <Card className="h-full">
                  <div className="flex items-start justify-between gap-4">
                    <Badge className="bg-brand-navy/10 text-brand-navy dark:text-brand-teal">Role 0{index + 1}</Badge>
                    <TagPill>Open to conversation</TagPill>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-text">{role.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{role.summary}</p>
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
                  eyebrow="Growth"
                  title="The environment should help people build skill and confidence quickly."
                  description="The strongest talent brands are the ones that give people real responsibility, practical mentorship, and meaningful exposure."
                />
                <FeatureList
                  columns={1}
                  items={[
                    'Work on real client problems',
                    'Learn across software, cloud, and data',
                    'Build a habit of quality and ownership',
                    'Grow through structured delivery experience',
                  ]}
                />
              </div>
            </Reveal>
            <Card className="grid gap-4 sm:grid-cols-2">
              {[
                { label: 'Curiosity', text: 'Ask good questions and keep learning.' },
                { label: 'Accountability', text: 'Own the work and the result.' },
                { label: 'Quality', text: 'Protect the user and the release.' },
                { label: 'Client value', text: 'Tie your work to the business outcome.' },
              ].map((item) => (
                <div key={item.label} className="rounded-[24px] border border-border bg-bg/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-text">{item.text}</p>
                </div>
              ))}
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-brand-navy text-white">
        <Container>
          <Card className="border-white/10 bg-white/5 p-8 text-white shadow-none backdrop-blur-md">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-teal">Join the team</p>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  If the pace and mindset feel right, let’s talk.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75">
                  Share your background through the contact page or email the team and start a conversation about current or future opportunities.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button to="/contact" variant="accent">
                  Contact us
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href={`mailto:${contactDetails.email}`} variant="secondary" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                  Email {contactDetails.email}
                </Button>
              </div>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}

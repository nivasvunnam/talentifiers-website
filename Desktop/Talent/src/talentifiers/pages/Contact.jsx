import { ArrowRight, Clock3, Mail, MapPin, Phone } from 'lucide-react';
import { contactDetails, faqs, pageMeta, socialLinks } from '../data';
import {
  Badge,
  Button,
  Card,
  Container,
  ContactCard,
  PageHero,
  Reveal,
  Section,
  SectionHeading,
  Seo,
  SocialLinks,
  TagPill,
} from '../ui';
import { InquiryForm } from '../forms';

const officeMapUrl = 'https://www.google.com/maps?ll=17.440137,78.383807&z=15&t=m&hl=en&gl=IN&mapclient=embed&cid=6243383781455058652';

export default function Contact() {
  return (
    <>
      <Seo title={pageMeta.contact.title} description={pageMeta.contact.description} />

      <PageHero
        eyebrow="Contact"
        title="Start the conversation."
        description="Reach Talentifiers for software development, cloud services, analytics, consulting, testing, packaged solutions, or a hiring conversation."
        trustLine="Hyderabad office | Monday to Sunday office hours | Multiple contact paths"
        actions={
          <>
            <Button href={`tel:${contactDetails.phone}`} variant="accent">
              Call now
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href={`mailto:${contactDetails.email}`} variant="secondary">
              Email us
            </Button>
          </>
        }
        stats={[
          { value: 2001, label: 'Founded', suffix: '' },
          { value: 1, label: 'Hyderabad office', suffix: '' },
          { value: 2, label: 'Office schedules', suffix: '' },
          { value: 3, label: 'Social channels', suffix: '' },
        ]}
        visual={
          <Card className="space-y-5 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-teal">Office</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-text">Hyderabad, India</h3>
              </div>
              <TagPill>Available</TagPill>
            </div>
            <div className="rounded-[28px] border border-border bg-brand-navy p-5 text-white shadow-[0_25px_60px_-40px_rgba(11,31,58,0.8)]">
              <p className="text-sm leading-7 text-white/80">
                Use the form, phone, or email to start a consultation, demo request, or broader enterprise discussion.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <ContactCard title="Phone" value={contactDetails.phone} href={`tel:${contactDetails.phone}`} icon={Phone} />
              <ContactCard title="Email" value={contactDetails.email} href={`mailto:${contactDetails.email}`} icon={Mail} />
              <ContactCard title="Office" value="Hyderabad, Telangana" icon={MapPin} />
              <ContactCard title="Hours" value={contactDetails.hours[0]} icon={Clock3} />
            </div>
          </Card>
        }
      />

      <Section className="pt-8">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <ContactCard title="Address" value={contactDetails.address} icon={MapPin} />
            <ContactCard title="Phone" value={contactDetails.phone} href={`tel:${contactDetails.phone}`} icon={Phone} />
            <ContactCard title="Email" value={contactDetails.email} href={`mailto:${contactDetails.email}`} icon={Mail} />
            <ContactCard title="Hours" value={contactDetails.hours.join(' | ')} icon={Clock3} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal>
              <div className="space-y-6">
                <SectionHeading
                  eyebrow="Inquiry form"
                  title="Send a brief and we will take it from there."
                  description="The form is built to support consultation requests, demo requests, and general contact without making the user do unnecessary work."
                />
                <div className="rounded-[28px] border border-border bg-surface/80 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-teal">What to include</p>
                  <div className="mt-5 grid gap-3">
                    {[
                      'The service or solution you need',
                      'Your approximate timeline',
                      'The business problem you want to solve',
                      'Any platform or integration context',
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-bg/60 px-4 py-3">
                        <Badge className="bg-brand-teal/10 text-brand-teal">Info</Badge>
                        <span className="text-sm leading-6 text-text">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
            <InquiryForm
              title="Contact Talentifiers"
              description="Share your need and the team will respond with a focused next step."
              submitLabel="Send message"
              source="contact-page"
              defaultInterest="General Contact"
              interests={[
                'Book a Consultation',
                'Request a Demo',
                'Software Development',
                'Cloud Services',
                'Data Analytics',
                'Consulting',
                'Testing',
                'Careers Inquiry',
                'General Contact',
              ]}
            />
          </div>
        </Container>
      </Section>

      <Section className="bg-surface/40">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
            <Reveal>
              <Card className="overflow-hidden p-0">
                <div className="relative min-h-[26rem] bg-brand-navy p-4 text-white sm:p-5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(15,185,177,0.14),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(255,107,74,0.12),transparent_25%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />
                  <div className="relative flex h-full flex-col gap-4">
                    <div className="flex items-center justify-between gap-4">
                      <TagPill className="border-white/10 bg-white/10 text-white">Google Maps</TagPill>
                      <Button
                        href={officeMapUrl}
                        variant="secondary"
                        className="border-white/15 bg-white/5 text-white hover:bg-white/10"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open in Maps
                      </Button>
                    </div>
                    <a
                      href={officeMapUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Open Talentifiers Hyderabad office in Google Maps"
                      className="group relative flex-1 overflow-hidden rounded-[28px] border border-white/10 bg-black/20 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.7)]"
                    >
                      <img
                        src="/map-images/office-map.png"
                        alt="Talentifiers Hyderabad office map"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/75 via-transparent to-transparent" />
                      <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-brand-navy/80 to-transparent px-4 py-4">
                        <div className="flex items-center justify-between gap-4">
                          <Badge className="border-white/10 bg-white/10 text-white">
                            <MapPin className="h-3.5 w-3.5" />
                            Hyderabad office
                          </Badge>
                          <Badge className="border-white/10 bg-white/10 text-white">
                            <Clock3 className="h-3.5 w-3.5" />
                            Click to open
                          </Badge>
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                        <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white">
                          Open in Google Maps
                        </span>
                        <span className="rounded-full bg-brand-teal px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white">
                          Map link
                        </span>
                      </div>
                    </a>
                    <p className="text-sm leading-7 text-white/75">
                      The map is now connected to the provided Google Maps location for accurate office navigation.
                    </p>
                  </div>
                </div>
              </Card>
            </Reveal>

            <div className="space-y-6">
              <SectionHeading
                eyebrow="Social and support"
                title="Stay connected across the channels people expect."
                description="The social links are present as replaceable placeholders so the site can launch now and still be easy to update later."
              />
              <SocialLinks links={socialLinks} />

              <Card className="space-y-4 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-teal">Helpful notes</p>
                <p className="text-sm leading-7 text-muted">
                  Enterprise buyers usually want a concise reply, a clear next step, and a simple way to continue the conversation. The form and contact data above are built for that.
                </p>
                <Button to="/services" variant="secondary">
                  Explore services
                </Button>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions, answered briefly."
            description="These help reduce hesitation and keep the contact page feeling complete without adding clutter."
          />
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {faqs.map((faq, index) => (
              <Reveal key={faq.question} delay={index * 0.05}>
                <Card className="h-full">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Question 0{index + 1}</p>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-text">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{faq.answer}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-brand-navy text-white">
        <Container>
          <Card className="border-white/10 bg-white/5 p-8 text-white shadow-none backdrop-blur-md">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-teal">Final CTA</p>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  Let’s discuss your next digital initiative.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75">
                  Whether you need a consultation, a demo, or a broader enterprise technology discussion, the Talentifiers team is ready.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href={`tel:${contactDetails.phone}`} variant="accent">
                  Call now
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href={`mailto:${contactDetails.email}`} variant="secondary" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                  Email us
                </Button>
              </div>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}

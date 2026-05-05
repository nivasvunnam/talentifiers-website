import { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { Badge, Button, Card, cn, SectionHeading } from './ui';
import { contactDetails } from './data';

const DEFAULT_INTERESTS = [
  'Book a Consultation',
  'Request a Demo',
  'Software Development',
  'Cloud Services',
  'Data Analytics',
  'Consulting',
  'Testing',
  'Careers Inquiry',
  'General Contact',
];

function buildInitialValues({ compact, defaultInterest }) {
  return {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    interest: defaultInterest || DEFAULT_INTERESTS[0],
    message: '',
    compact: compact ? 'yes' : 'no',
  };
}

function validate(values, { compact }) {
  const next = {};

  if (!values.firstName.trim()) next.firstName = 'First name is required.';
  if (!compact && !values.lastName.trim()) next.lastName = 'Last name is required.';
  if (!values.email.trim()) {
    next.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    next.email = 'Enter a valid email address.';
  }
  if (!compact && !values.phone.trim()) next.phone = 'Phone number is required.';
  if (!values.company.trim()) next.company = 'Company name is required.';
  if (!values.interest.trim()) next.interest = 'Choose an inquiry type.';
  if (!values.message.trim()) next.message = 'Please add a short message.';

  return next;
}

async function submitLead(values, context) {
  const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
  const endpoint = `${apiBase.replace(/\/$/, '')}/api/auth/contact`;
  const payload = {
    source: context.source || 'talentifiers-website',
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    phone: values.phone,
    company: values.company,
    interest: values.interest,
    message: values.message,
    pageTitle: context.title,
    submittedAt: new Date().toISOString(),
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Submission failed');
  }

  return data;
}

function FieldLabel({ children, required }) {
  return (
    <label className="mb-2 block text-sm font-medium text-text">
      {children}
      {required ? <span className="ml-1 text-brand-coral">*</span> : null}
    </label>
  );
}

function TextInput({ error, className, ...props }) {
  return (
    <div className={className}>
      <input
        {...props}
        className={cn(
          'w-full rounded-2xl border border-border bg-bg/70 px-4 py-3 text-sm text-text outline-none transition placeholder:text-muted focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20',
          error && 'border-brand-coral focus:border-brand-coral focus:ring-brand-coral/20'
        )}
      />
      {error ? <p className="mt-2 text-xs text-brand-coral">{error}</p> : null}
    </div>
  );
}

function SelectInput({ error, className, children, ...props }) {
  return (
    <div className={className}>
      <select
        {...props}
        className={cn(
          'w-full rounded-2xl border border-border bg-bg/70 px-4 py-3 text-sm text-text outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20',
          error && 'border-brand-coral focus:border-brand-coral focus:ring-brand-coral/20'
        )}
      >
        {children}
      </select>
      {error ? <p className="mt-2 text-xs text-brand-coral">{error}</p> : null}
    </div>
  );
}

function TextArea({ error, className, ...props }) {
  return (
    <div className={className}>
      <textarea
        {...props}
        className={cn(
          'min-h-32 w-full rounded-2xl border border-border bg-bg/70 px-4 py-3 text-sm text-text outline-none transition placeholder:text-muted focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20',
          error && 'border-brand-coral focus:border-brand-coral focus:ring-brand-coral/20'
        )}
      />
      {error ? <p className="mt-2 text-xs text-brand-coral">{error}</p> : null}
    </div>
  );
}

export function InquiryForm({
  title = 'Book a consultation',
  description = 'Share a few details and the Talentifiers team will respond with the next step.',
  submitLabel = 'Send inquiry',
  compact = false,
  defaultInterest,
  source = 'contact',
  className,
  interests = DEFAULT_INTERESTS,
  showIntro = true,
}) {
  const initialValues = useMemo(() => buildInitialValues({ compact, defaultInterest }), [compact, defaultInterest]);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(values, { compact });

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus('idle');
      return;
    }

    setStatus('submitting');
    setFeedback('');

    try {
      const result = await submitLead(values, { source, title });
      setStatus('success');
      setFeedback(result?.message || 'Thanks. Talentifiers has received your request and will follow up shortly.');
      setValues(initialValues);
      setErrors({});
    } catch (error) {
      setStatus('error');
      setFeedback(error instanceof Error ? error.message : 'We could not send your request right now.');
    }
  };

  if (status === 'success') {
    return (
      <Card className={cn('p-7', className)}>
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-teal">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <Badge className="border-brand-teal/30 bg-brand-teal/10 text-brand-teal">Submitted</Badge>
            <h3 className="mt-4 font-display text-2xl font-semibold text-text">
              Request received
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted">{feedback}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="primary" onClick={() => setStatus('idle')}>
                Send another inquiry
              </Button>
              <Button href={`tel:${contactDetails.phone}`} variant="secondary">
                Call {contactDetails.phone}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn('p-7', className)}>
      {showIntro ? (
        <SectionHeading
          eyebrow="Lead form"
          title={title}
          description={description}
          className="mb-8"
        />
      ) : null}

      <form onSubmit={handleSubmit} noValidate className="grid gap-4">
        {!compact ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel required>First name</FieldLabel>
              <TextInput
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                autoComplete="given-name"
                placeholder="Aarav"
                error={errors.firstName}
              />
            </div>
            <div>
              <FieldLabel required>Last name</FieldLabel>
              <TextInput
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                autoComplete="family-name"
                placeholder="Sharma"
                error={errors.lastName}
              />
            </div>
          </div>
        ) : (
          <div>
            <FieldLabel required>Name</FieldLabel>
            <TextInput
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              autoComplete="name"
              placeholder="Your name"
              error={errors.firstName}
            />
          </div>
        )}

        <div className={cn('grid gap-4', compact ? 'sm:grid-cols-2' : 'sm:grid-cols-2')}>
          <div>
            <FieldLabel required>Email</FieldLabel>
            <TextInput
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="you@company.com"
              error={errors.email}
            />
          </div>
          <div>
            <FieldLabel required={compact ? false : true}>Phone</FieldLabel>
            <TextInput
              name="phone"
              type="tel"
              value={values.phone}
              onChange={handleChange}
              autoComplete="tel"
              placeholder="+91"
              error={errors.phone}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel required>Company / organization</FieldLabel>
            <TextInput
              name="company"
              value={values.company}
              onChange={handleChange}
              autoComplete="organization"
              placeholder="Company name"
              error={errors.company}
            />
          </div>
          <div>
            <FieldLabel required>Inquiry type</FieldLabel>
            <SelectInput name="interest" value={values.interest} onChange={handleChange} error={errors.interest}>
              {interests.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </SelectInput>
          </div>
        </div>

        <div>
          <FieldLabel required>Message</FieldLabel>
          <TextArea
            name="message"
            value={values.message}
            onChange={handleChange}
            placeholder="Tell us about your goals, timeline, or challenge."
            error={errors.message}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <p className="text-sm leading-6 text-muted">
            By submitting, you agree to be contacted by the Talentifiers team regarding your inquiry.
          </p>
          <Button type="submit" variant="accent" disabled={status === 'submitting'}>
            {status === 'submitting' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending
              </>
            ) : (
              <>
                {submitLabel}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
        {status === 'error' && feedback ? (
          <div className="rounded-2xl border border-brand-coral/20 bg-brand-coral/10 px-4 py-3 text-sm leading-6 text-brand-coral">
            {feedback}
          </div>
        ) : null}
      </form>
    </Card>
  );
}

export function CompactLeadCard({
  title,
  description,
  submitLabel,
  defaultInterest,
  source,
  interests,
  className,
}) {
  return (
    <InquiryForm
      title={title}
      description={description}
      submitLabel={submitLabel}
      compact
      defaultInterest={defaultInterest}
      source={source}
      interests={interests}
      className={className}
      showIntro
    />
  );
}

export { DEFAULT_INTERESTS };

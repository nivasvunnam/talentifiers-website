import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';
import { assetPath } from './assets';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Calculator,
  CalendarClock,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Cloud,
  Code2,
  Compass,
  Building2,
  Globe2,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Moon,
  PanelsTopLeft,
  Phone,
  Settings2,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  Workflow,
  X,
} from 'lucide-react';

const THEME_STORAGE_KEY = 'talentifiers-theme';

const ICON_MAP = {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Calculator,
  CalendarClock,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Cloud,
  Code2,
  Compass,
  Building2,
  Globe2,
  Layers3,
  Linkedin: Workflow,
  Mail,
  MapPin,
  Menu,
  Moon,
  PanelsTopLeft,
  Phone,
  Settings2,
  ShieldCheck,
  Sparkles,
  Sun,
  Twitter: ArrowUpRight,
  Users,
  Workflow,
  X,
};

export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function Icon({ name, className }) {
  const Component = ICON_MAP[name] || Sparkles;
  return <Component aria-hidden="true" className={className} />;
}

export function useThemeMode() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';

    try {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
      return stored === 'dark' || stored === 'light' ? stored : prefersDark ? 'dark' : 'light';
    } catch (_error) {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return [theme, setTheme];
}

export function ThemeToggle({ theme, setTheme, className }) {
  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-2 text-sm font-medium text-text transition hover:border-brand-teal hover:bg-surface shadow-sm backdrop-blur-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60',
        className
      )}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <>
          <Sun className="h-4 w-4 text-brand-amber" />
          <span className="hidden sm:inline">Light</span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4 text-brand-teal" />
          <span className="hidden sm:inline">Dark</span>
        </>
      )}
    </button>
  );
}

export function Container({ children, className, as: Tag = 'div' }) {
  return <Tag className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>{children}</Tag>;
}

export function Section({ children, className, id, as: Tag = 'section' }) {
  return (
    <Tag id={id} className={cn('relative py-20 sm:py-24 lg:py-28', className)}>
      {children}
    </Tag>
  );
}

export function Badge({ children, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted backdrop-blur-xl',
        className
      )}
    >
      {children}
    </span>
  );
}

const buttonStyles = {
  primary:
    'bg-brand-navy text-white shadow-[0_20px_50px_-20px_rgba(11,31,58,0.7)] hover:translate-y-[-1px] hover:bg-brand-slate',
  secondary:
    'border border-border bg-surface/80 text-text hover:border-brand-teal hover:bg-surface hover:translate-y-[-1px]',
  ghost: 'text-text hover:bg-surface-2 hover:text-text',
  accent:
    'bg-brand-coral text-white shadow-[0_20px_50px_-20px_rgba(255,107,74,0.5)] hover:translate-y-[-1px] hover:opacity-95',
};

export function Button({ to, href, variant = 'primary', className, children, ...props }) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
    buttonStyles[variant],
    className
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}

export function Card({ children, className, as: Tag = 'article' }) {
  return (
    <Tag
      className={cn(
        'group relative h-full min-w-0 overflow-hidden rounded-[28px] border border-border bg-surface/85 p-6 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.5)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-brand-teal/40 hover:shadow-[0_40px_100px_-55px_rgba(15,23,42,0.65)]',
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function Reveal({ children, className, delay = 0, as: Tag = motion.div }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  actions,
  align = 'left',
  className,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      {eyebrow ? <Badge className={eyebrowClassName}>{eyebrow}</Badge> : null}
      <div className={cn('max-w-3xl', align === 'center' && 'mx-auto')}>
        <h2 className={cn('font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl lg:text-5xl', titleClassName)}>
          {title}
        </h2>
        {description ? (
          <p className={cn('mt-4 text-base leading-7 text-muted sm:text-lg', descriptionClassName)}>
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}

export function Breadcrumbs({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href ? (
              <Link to={item.href} className="transition hover:text-text">
                {item.label}
              </Link>
            ) : (
              <span className="text-text">{item.label}</span>
            )}
            {index < items.length - 1 ? <ChevronRight className="h-3.5 w-3.5" /> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  stats,
  visual,
  breadcrumbs,
  trustLine,
  kicker,
  className,
  tone = 'default',
}) {
  return (
    <section className={cn('relative overflow-hidden pt-10 sm:pt-14 lg:pt-16', className)}>
      <Container>
        <div className="relative overflow-hidden rounded-[36px] border border-border bg-surface/75 px-6 py-10 shadow-[0_40px_120px_-70px_rgba(15,23,42,0.55)] backdrop-blur-xl sm:px-8 sm:py-12 lg:px-10 lg:py-14">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-brand-teal/10 blur-3xl" />
            <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-brand-coral/10 blur-3xl" />
            <div className="absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-brand-navy/10 blur-3xl" />
          </div>
          <div
            className={cn(
              'relative grid items-center gap-12 lg:gap-10',
              visual ? 'lg:grid-cols-[1.05fr_0.95fr]' : 'lg:grid-cols-1'
            )}
          >
            <div className="max-w-3xl">
              <Breadcrumbs items={breadcrumbs} />
              {eyebrow ? <Badge>{eyebrow}</Badge> : null}
              {kicker ? <p className="mt-4 text-sm font-semibold uppercase tracking-[0.28em] text-brand-teal">{kicker}</p> : null}
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[0.95] tracking-tight text-text sm:text-5xl lg:text-7xl">
                {title}
              </h1>
              {description ? (
                <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
                  {description}
                </p>
              ) : null}
              {trustLine ? (
                <div className="mt-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-border bg-bg/80 px-4 py-2 text-sm text-muted">
                  <BadgeCheck className="h-4 w-4 text-brand-teal" />
                  <span>{trustLine}</span>
                </div>
              ) : null}
              {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
              {stats?.length ? (
                <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {stats.map((stat) => (
                    <Card key={stat.label} className="p-4">
                      <StatCounter
                        value={stat.value}
                        suffix={stat.suffix}
                        label={stat.label}
                        prefix={stat.prefix}
                        description={stat.description}
                        size="lg"
                      />
                    </Card>
                  ))}
                </div>
              ) : null}
            </div>
            {visual ? <div className="relative">{visual}</div> : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function StatCounter({
  value,
  label,
  suffix = '',
  prefix = '',
  description,
  size = 'md',
  className,
}) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(shouldReduceMotion ? value : 0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        const start = performance.now();
        const duration = 1500;

        const frame = (time) => {
          const progress = Math.min((time - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(Math.round(value * eased));
          if (progress < 1) {
            requestAnimationFrame(frame);
          } else {
            setDisplayValue(value);
          }
        };

        requestAnimationFrame(frame);
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldReduceMotion, value]);

  useEffect(() => {
    if (shouldReduceMotion) setDisplayValue(value);
  }, [shouldReduceMotion, value]);

  return (
    <div ref={ref} className={cn('space-y-2', className)}>
      <p className={cn('font-display font-semibold tracking-tight text-text', size === 'lg' ? 'text-3xl sm:text-4xl' : 'text-2xl')}>
        <span>{prefix}</span>
        <span>{displayValue}</span>
        <span>{suffix}</span>
      </p>
      <p className="text-sm font-medium text-text">{label}</p>
      {description ? <p className="text-sm leading-6 text-muted">{description}</p> : null}
    </div>
  );
}

export function TechMarquee({ items = [] }) {
  const shouldReduceMotion = useReducedMotion();
  const loopItems = useMemo(() => [...items, ...items], [items]);

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-border bg-surface/80 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-surface to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-surface to-transparent" />
      <motion.div
        className="flex min-w-max gap-3 px-4"
        animate={shouldReduceMotion ? undefined : { x: ['0%', '-50%'] }}
        transition={shouldReduceMotion ? undefined : { duration: 24, repeat: Infinity, ease: 'linear' }}
      >
        {loopItems.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center rounded-full border border-border bg-bg/90 px-4 py-2 text-sm font-medium text-text shadow-sm"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function ProcessFlow({ steps = [] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {steps.map((step, index) => (
        <Card key={step.title} className="relative p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-sm font-semibold text-white">
              0{index + 1}
            </span>
            <ArrowRight className={cn('h-4 w-4 text-brand-teal', index === steps.length - 1 && 'opacity-0')} />
          </div>
          <h3 className="font-display text-xl font-semibold text-text">{step.title}</h3>
          <p className="mt-3 text-sm leading-6 text-muted">{step.summary}</p>
        </Card>
      ))}
    </div>
  );
}

export function FeatureList({ items = [], columns = 1, className }) {
  return (
    <div className={cn('grid gap-3', columns === 2 && 'sm:grid-cols-2', columns === 3 && 'md:grid-cols-3', className)}>
      {items.map((item) => (
        <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-bg/60 px-4 py-3 text-sm text-text">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

export function SocialLinks({ links = {}, className }) {
  const items = [
    { label: 'Facebook', href: links.facebook, icon: Globe2 },
    { label: 'LinkedIn', href: links.linkedin, icon: Workflow },
    { label: 'Twitter/X', href: links.x, icon: ArrowUpRight },
  ];

  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      {items.map((item) => {
        const IconComponent = item.icon;
        return (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-2 text-sm font-medium text-text transition hover:border-brand-teal hover:bg-surface"
            aria-label={item.label}
          >
            <IconComponent className="h-4 w-4" />
            <span>{item.label}</span>
          </a>
        );
      })}
    </div>
  );
}

export function ContactCard({ title, value, href, icon: IconComponent }) {
  const content = (
    <div className="flex items-start gap-4 rounded-3xl border border-border bg-surface/80 p-5 transition hover:border-brand-teal/40">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-navy text-white shadow-sm">
        <IconComponent className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">{title}</p>
        <p className="mt-2 break-words text-base font-medium text-text">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
}

export function EnterpriseVisual({
  title = 'Enterprise delivery surface',
  subtitle = 'A premium operating view that blends software, cloud, analytics, and quality.',
  metrics = [
    { label: 'Delivery focus', value: 'Software + cloud + data' },
    { label: 'Quality layer', value: 'Testing built in' },
    { label: 'Business fit', value: 'Customized workflows' },
  ],
  className,
}) {
  const shouldReduceMotion = useReducedMotion();
  const chartPath = 'M 0 78 C 18 70, 30 92, 50 82 S 90 48, 120 58 S 165 98, 200 64 S 250 28, 300 44 S 360 94, 420 40';

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-[32px] border border-border bg-surface/90 p-5 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.7)] backdrop-blur-xl',
        className
      )}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-15%] top-0 h-64 w-64 rounded-full bg-brand-teal/10 blur-3xl" />
        <div className="absolute bottom-0 right-[-20%] h-72 w-72 rounded-full bg-brand-coral/10 blur-3xl" />
      </div>
      <div className="relative space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-teal">{title}</p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{subtitle}</p>
          </div>
          <Badge className="border-brand-teal/30 bg-brand-teal/10 text-brand-teal">
            <Sparkles className="h-3.5 w-3.5" />
            Live
          </Badge>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-border bg-bg/70 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-text">Delivery snapshot</p>
              <Badge className="bg-surface text-muted">Q3 pipeline</Badge>
            </div>
            <div className="mt-4 overflow-hidden rounded-[24px] border border-border bg-surface p-4">
              <svg viewBox="0 0 420 130" className="h-32 w-full">
                <defs>
                  <linearGradient id="chartStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0FB9B1" />
                    <stop offset="100%" stopColor="#FF6B4A" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 100 L 420 100"
                  stroke="currentColor"
                  strokeOpacity="0.12"
                  strokeWidth="1"
                />
                <path
                  d="M 0 78 C 18 70, 30 92, 50 82 S 90 48, 120 58 S 165 98, 200 64 S 250 28, 300 44 S 360 94, 420 40"
                  fill="none"
                  stroke="url(#chartStroke)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-border bg-surface/80 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{metric.label}</p>
                  <p className="mt-2 text-sm font-medium text-text">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <motion.div
              className="rounded-[28px] border border-border bg-brand-navy px-5 py-6 text-white shadow-[0_30px_80px_-45px_rgba(11,31,58,0.75)]"
              animate={shouldReduceMotion ? undefined : { y: [0, -6, 0] }}
              transition={shouldReduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-teal/90">Cloud posture</p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">Architecture ready for scale</h3>
              <p className="mt-3 text-sm leading-6 text-white/75">
                Enterprise systems, cloud platforms, and data layers presented in one cohesive delivery model.
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: 'Software', value: 'Custom applications' },
                { label: 'Cloud', value: 'AWS / Azure / GCP' },
                { label: 'Data', value: 'Streaming and insight' },
                { label: 'Quality', value: 'Testing and accessibility' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="rounded-[24px] border border-border bg-surface/80 p-4"
                  animate={shouldReduceMotion ? undefined : { y: index % 2 === 0 ? [0, -4, 0] : [0, 4, 0] }}
                  transition={shouldReduceMotion ? undefined : { duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{item.label}</p>
                  <p className="mt-2 text-sm font-medium text-text">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function PageSectionIntro({ eyebrow, title, description, actions, align = 'left' }) {
  return (
    <SectionHeading
      eyebrow={eyebrow}
      title={title}
      description={description}
      actions={actions}
      align={align}
    />
  );
}

export function InlineIcon({ name, className }) {
  return <Icon name={name} className={className} />;
}

export function SocialIconButton({ href, label, icon: IconComponent }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/80 text-text transition hover:border-brand-teal hover:bg-surface"
    >
      <IconComponent className="h-4 w-4" />
    </a>
  );
}

export function Seo({ title, description, image = '/og-image.svg' }) {
  const location = useLocation();
  const currentUrl = typeof window !== 'undefined' ? window.location.href : location.pathname;
  const resolvedImage = assetPath(image);

  return (
    <Helmet>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
      <meta name="robots" content="index,follow" />
      <meta name="theme-color" content="#0B1F3A" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      {description ? <meta property="og:description" content={description} /> : null}
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:url" content={currentUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description ? <meta name="twitter:description" content={description} /> : null}
      <meta name="twitter:image" content={resolvedImage} />
    </Helmet>
  );
}

export function TagPill({ children, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-border bg-bg/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted',
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionLabel({ children, className }) {
  return (
    <p className={cn('text-sm font-semibold uppercase tracking-[0.28em] text-brand-teal', className)}>
      {children}
    </p>
  );
}

export function IconBulletList({ items = [], className }) {
  return (
    <div className={cn('grid gap-3', className)}>
      {items.map((item) => (
        <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-bg/60 px-4 py-3">
          <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal">
            <Check className="h-3.5 w-3.5" />
          </div>
          <span className="text-sm leading-6 text-text">{item}</span>
        </div>
      ))}
    </div>
  );
}

export function FadedEdge({ side = 'left' }) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-y-0 w-16',
        side === 'left'
          ? 'left-0 bg-gradient-to-r from-surface to-transparent'
          : 'right-0 bg-gradient-to-l from-surface to-transparent'
      )}
    />
  );
}

export function StackCard({ title, summary, items = [], accent = 'brand-teal', icon, className }) {
  const accentClass =
    accent === 'brand-coral'
      ? 'bg-brand-coral/10 text-brand-coral'
      : accent === 'brand-navy'
        ? 'bg-brand-navy/10 text-brand-navy dark:text-brand-teal'
        : 'bg-brand-teal/10 text-brand-teal';
  const normalizedItems = items.map((item) =>
    typeof item === 'string'
      ? { label: item }
      : item
  );

  return (
    <Card className={className}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl', accentClass)}>
            <Icon name={icon || 'PanelsTopLeft'} className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-2xl font-semibold text-text">{title}</h3>
            {summary ? <p className="mt-3 text-sm leading-6 text-muted">{summary}</p> : null}
          </div>
        </div>
        <Badge className="shrink-0 border-border bg-bg/80 text-muted">
          <ArrowUpRight className="h-3.5 w-3.5" />
          {items.length}
        </Badge>
      </div>
      {normalizedItems.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {normalizedItems.map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-bg/80 px-3 py-2 text-xs font-medium text-text"
            >
              {item.image ? (
                <span className="inline-flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-white/90 p-0.5">
                  <img src={assetPath(item.image)} alt="" aria-hidden="true" className="h-full w-full object-contain" />
                </span>
              ) : item.mark ? (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-navy/10 px-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-brand-navy dark:bg-brand-teal/15 dark:text-brand-teal">
                  {item.mark}
                </span>
              ) : null}
              <span>{item.label}</span>
            </span>
          ))}
        </div>
      ) : null}
    </Card>
  );
}

export function CTAButtonRow({ primary, secondary, tertiary, className }) {
  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      {primary}
      {secondary}
      {tertiary}
    </div>
  );
}

export function Divider() {
  return <div className="h-px w-full bg-border" />;
}

export function NotionLikeList({ items = [] }) {
  return (
    <div className="grid gap-3">
      {items.map((item, index) => (
        <div key={`${item.title}-${index}`} className="rounded-2xl border border-border bg-bg/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{item.label || `0${index + 1}`}</p>
          <h3 className="mt-2 font-display text-xl font-semibold text-text">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{item.summary}</p>
        </div>
      ))}
    </div>
  );
}

export function ListCard({ title, items = [], accent = 'brand-teal', className }) {
  return (
    <Card className={className}>
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-2xl font-semibold text-text">{title}</h3>
        <Badge className={cn('border-border bg-bg/80', accent === 'brand-coral' && 'text-brand-coral', accent === 'brand-navy' && 'text-brand-navy dark:text-brand-teal', accent === 'brand-teal' && 'text-brand-teal')}>
          <PanelsTopLeft className="h-3.5 w-3.5" />
          Premium
        </Badge>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className={cn(
              'rounded-full border border-border px-3 py-1 text-xs font-medium',
              accent === 'brand-coral'
                ? 'bg-brand-coral/10 text-brand-coral'
                : accent === 'brand-navy'
                  ? 'bg-brand-navy/10 text-brand-navy dark:text-brand-teal'
                  : 'bg-brand-teal/10 text-brand-teal'
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </Card>
  );
}

export function AccentStrip({ children, className }) {
  return (
    <div className={cn('rounded-[32px] border border-border bg-brand-navy px-6 py-8 text-white shadow-[0_40px_100px_-55px_rgba(11,31,58,0.8)]', className)}>
      {children}
    </div>
  );
}

export { AnimatePresence, motion };

import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useScroll, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  BadgeCheck,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Clock3,
  ArrowUpRight,
} from 'lucide-react';
import { contactDetails, navItems, services, socialLinks, solutions } from './data';
import {
  Badge,
  Button,
  Card,
  Container,
  ContactCard,
  Icon,
  SocialIconButton,
  SocialLinks,
  TagPill,
  ThemeToggle,
  cn,
  useThemeMode,
  AnimatePresence,
} from './ui';
import { assetPath } from './assets';

function LogoMark() {
  return (
    <div className="inline-flex items-center gap-3 rounded-2xl border border-border bg-surface/90 px-3 py-2 shadow-sm backdrop-blur-xl dark:bg-surface/80">
      <img
        src={assetPath('/favicon.svg')}
        alt=""
        aria-hidden="true"
        className="h-10 w-10 shrink-0 rounded-xl"
        loading="eager"
        decoding="async"
      />
      <div className="min-w-0">
        <p className="font-display text-[1.05rem] font-semibold tracking-tight text-text">
          Talentifiers
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted">
          Enterprise technology
        </p>
      </div>
    </div>
  );
}

function InteractiveCursor() {
  useReducedMotion();
  return null;
}

function DesktopDropdown({ item, activePath, onNavigate }) {
  const [open, setOpen] = useState(false);
  const hasChildren = Array.isArray(item.dropdown) && item.dropdown.length > 0;

  if (!hasChildren) {
    return (
      <NavLink
        to={item.href}
        end={item.href === '/'}
        className={({ isActive }) =>
          cn(
            'rounded-full px-3 py-2 text-sm font-medium transition',
            isActive || activePath === item.href
              ? 'bg-surface text-text shadow-sm'
              : 'text-muted hover:bg-surface/70 hover:text-text'
          )
        }
      >
        {item.label}
      </NavLink>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        className={cn(
          'inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition',
          activePath.startsWith(item.href) || open
            ? 'bg-surface text-text shadow-sm'
            : 'text-muted hover:bg-surface/70 hover:text-text'
        )}
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown className={cn('h-4 w-4 transition', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 top-full z-50 mt-4 w-[min(48rem,calc(100vw-2rem))] -translate-x-1/2"
          >
            <Card className="grid gap-4 p-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-teal">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      Premium capability routing for enterprise buyers and technical teams.
                    </p>
                  </div>
                  <TagPill>Explore</TagPill>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {item.dropdown.map((child) => (
                    <Link
                      key={child.href}
                      to={child.href}
                      onClick={() => {
                        onNavigate?.();
                        setOpen(false);
                      }}
                      className="group rounded-2xl border border-border bg-bg/60 px-4 py-3 transition hover:border-brand-teal hover:bg-surface"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-text">{child.label}</span>
                        <ArrowUpRight className="h-4 w-4 text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-teal" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="rounded-[24px] border border-border bg-brand-navy p-5 text-white shadow-[0_25px_70px_-40px_rgba(11,31,58,0.8)]">
                <Badge className="border-white/10 bg-white/10 text-white">
                  <Sparkles className="h-3.5 w-3.5" />
                  Premium delivery
                </Badge>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">
                  From strategy to launch, without friction.
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/75">
                  Use Talentifiers to design, build, validate, and support the technology systems that power your operations.
                </p>
                <Button to="/contact" variant="accent" className="mt-5 w-full justify-center" onClick={() => setOpen(false)}>
                  Book a Consultation
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function DesktopNav({ activePath, onNavigate }) {
  return (
    <div className="hidden items-center gap-1 lg:flex">
      {navItems.map((item) => (
        <DesktopDropdown key={item.href} item={item} activePath={activePath} onNavigate={onNavigate} />
      ))}
    </div>
  );
}

function MobileNavLink({ item, onNavigate }) {
  const hasChildren = Array.isArray(item.dropdown) && item.dropdown.length > 0;

  if (!hasChildren) {
    return (
      <NavLink
        to={item.href}
        end={item.href === '/'}
        onClick={onNavigate}
        className={({ isActive }) =>
          cn(
            'block rounded-2xl px-4 py-3 text-base font-medium transition',
            isActive ? 'bg-brand-navy text-white' : 'text-text hover:bg-surface'
          )
        }
      >
        {item.label}
      </NavLink>
    );
  }

  return (
    <div className="space-y-3 rounded-2xl border border-border bg-bg/60 p-4">
      <Link
        to={item.href}
        onClick={onNavigate}
        className="flex items-center justify-between text-base font-semibold text-text"
      >
        {item.label}
        <ArrowRight className="h-4 w-4 text-brand-teal" />
      </Link>
      <div className="grid gap-2">
        {item.dropdown.map((child) => (
          <Link
            key={child.href}
            to={child.href}
            onClick={onNavigate}
            className="rounded-xl border border-border bg-surface/80 px-3 py-2 text-sm font-medium text-muted transition hover:border-brand-teal hover:bg-surface hover:text-text"
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileMenu({ open, onClose, theme, setTheme }) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-[2px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-x-4 top-24 z-50 overflow-hidden rounded-[28px] border border-border bg-surface/95 p-5 shadow-[0_30px_100px_-40px_rgba(15,23,42,0.8)] backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-5 flex items-center justify-between">
              <LogoMark />
              <div className="flex items-center gap-2">
                <ThemeToggle theme={theme} setTheme={setTheme} className="md:hidden" />
                <Button to="/contact" variant="accent" className="px-4 py-2 text-xs" onClick={onClose}>
                  Consultation
                </Button>
              </div>
            </div>
            <div className="grid gap-3">
              {navItems.map((item) => (
                <MobileNavLink key={item.href} item={item} onNavigate={onClose} />
              ))}
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function Header({ theme, setTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const activePath = useMemo(() => location.pathname, [location.pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/75 backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-teal/60 to-transparent" />
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link to="/" className="shrink-0">
          <LogoMark />
        </Link>

        <DesktopNav activePath={activePath} onNavigate={() => {}} />

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} setTheme={setTheme} className="hidden md:inline-flex" />
          <Button
            to="/contact"
            variant="primary"
            className="hidden md:inline-flex"
          >
            Book a Consultation
            <ArrowRight className="h-4 w-4" />
          </Button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/80 text-text transition hover:border-brand-teal hover:bg-surface lg:hidden"
            onClick={() => setMobileOpen((current) => !current)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} theme={theme} setTheme={setTheme} />
    </header>
  );
}

function Footer() {
  const linkGroups = [
    {
      title: 'Company',
      links: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Services',
      links: services.map((service) => ({ label: service.title, href: `/services#${service.id}` })),
    },
    {
      title: 'Solutions',
      links: solutions.map((solution) => ({ label: solution.title, href: `/solutions#${solution.id}` })),
    },
  ];

  return (
    <footer className="border-t border-border bg-surface/70">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <LogoMark />
            <p className="max-w-xl text-sm leading-7 text-muted">
              Talentifiers is a Hyderabad-based IT services and enterprise solutions company established in 2001.
              The team combines software development, cloud services, analytics, consulting, testing, and packaged business solutions.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button to="/contact" variant="accent">
                Start a Conversation
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/services" variant="secondary">
                Explore Services
              </Button>
            </div>
            <SocialLinks links={socialLinks} />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {linkGroups.map((group) => (
              <div key={group.title} className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                  {group.title}
                </p>
                <div className="grid gap-2">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="group inline-flex items-center justify-between rounded-2xl border border-border bg-bg/60 px-4 py-3 text-sm font-medium text-text transition hover:border-brand-teal hover:bg-surface"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="h-4 w-4 text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-teal" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 rounded-[32px] border border-border bg-bg/70 p-6 lg:grid-cols-[1fr_1fr_1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted">Address</p>
            <p className="mt-3 text-sm leading-7 text-text">{contactDetails.address}</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted">Phone</p>
            <a href={`tel:${contactDetails.phone}`} className="mt-3 block text-sm font-medium text-text transition hover:text-brand-teal">
              {contactDetails.phone}
            </a>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted">Email</p>
            <a href={`mailto:${contactDetails.email}`} className="mt-3 block text-sm font-medium text-text transition hover:text-brand-teal">
              {contactDetails.email}
            </a>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted">Office hours</p>
            <div className="mt-3 space-y-2 text-sm text-text">
              {contactDetails.hours.map((hour) => (
                <p key={hour} className="leading-6 text-muted">
                  {hour}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {new Date().getFullYear()} Talentifiers. All rights reserved.</p>
          <p>Premium enterprise technology design system.</p>
        </div>
      </Container>
    </footer>
  );
}

export function SiteLayout({ children }) {
  const [theme, setTheme] = useThemeMode();
  const { scrollYProgress } = useScroll();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-bg text-text">
      <a
        href="#main-content"
        className="sr-only z-[70] rounded-full bg-brand-teal px-4 py-2 font-medium text-brand-navy focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <motion.div
        className="fixed left-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-brand-teal via-brand-navy to-brand-coral"
        style={{ scaleX: scrollYProgress, width: '100%' }}
      />
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-12%] top-0 h-[32rem] w-[32rem] rounded-full bg-brand-teal/10 blur-[100px]" />
        <div className="absolute right-[-10%] top-[15%] h-[30rem] w-[30rem] rounded-full bg-brand-coral/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-1/3 h-[26rem] w-[26rem] rounded-full bg-brand-navy/10 blur-[120px]" />
      </div>
      <InteractiveCursor />
      <Header theme={theme} setTheme={setTheme} />
      <main id="main-content" className="relative">
        {children}
      </main>
      <Footer />
    </div>
  );
}

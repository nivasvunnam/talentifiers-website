export const contactDetails = {
  companyName: 'Talentifiers',
  address: '320/24-c, 4th Floor, Nmrs Padma Ave, Third Avenue, Road No 1, Pathrika Nagar, Hyderabad, Telangana, India - 500081',
  phone: '04071327521',
  email: 'info@talentifiers.com',
  hours: [
    'Monday - Friday: 09:00 - 18:00',
    'Saturday - Sunday: 10:00 - 16:00',
  ],
};

export const socialLinks = {
  facebook: 'https://www.facebook.com/your-company-placeholder',
  linkedin: 'https://www.linkedin.com/company/your-company-placeholder',
  x: 'https://x.com/your-company-placeholder',
};

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    dropdown: [
      { label: 'Software Development', href: '/services#software-development' },
      { label: 'Engineering', href: '/services#engineering' },
      { label: 'Custom Solutions', href: '/services#custom-solutions' },
      { label: 'Cloud Services', href: '/services#cloud-services' },
      { label: 'Data Analytics', href: '/services#data-analytics' },
      { label: 'Consulting', href: '/services#consulting' },
      { label: 'Testing', href: '/services#testing' },
    ],
  },
  {
    label: 'Solutions',
    href: '/solutions',
    dropdown: [
      { label: 'Supply Chain Management', href: '/solutions#supply-chain-management' },
      { label: 'CRM', href: '/solutions#crm' },
      { label: 'Estimating Software', href: '/solutions#estimating-software' },
    ],
  },
  { label: 'Technologies', href: '/technologies' },
  { label: 'Clients', href: '/clients' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export const heroStats = [
  { value: 2001, label: 'Founded', suffix: '' },
  { value: 25, label: 'Years of experience', suffix: '+' },
  { value: 7, label: 'Service pillars', suffix: '' },
  { value: 3, label: 'Packaged solutions', suffix: '' },
];

export const trustSignals = [
  { label: 'Established in 2001', detail: 'Two decades of enterprise technology delivery' },
  { label: 'Hyderabad presence', detail: 'Corporate office in a major Indian technology hub' },
  { label: 'Process-driven', detail: 'Structured delivery across build, validation, and support' },
  { label: 'Business-first', detail: 'Technology aligned to measurable operational outcomes' },
];

export const services = [
  {
    id: 'software-development',
    label: '01',
    icon: 'Code2',
    title: 'Software Development',
    summary: 'Custom web, platform, and application development shaped around real business needs.',
    image: '/service-images/software-development.png',
    description:
      'Talentifiers builds software that is designed for longevity, clarity, and adoption. From customer portals to internal business systems, each delivery is tailored to the operating model, data flow, and growth goals of the organization.',
    capabilities: [
      'Discovery and requirement analysis',
      'Application architecture and delivery',
      'Modern interface design and implementation',
      'Knowledge transfer and handover',
    ],
    benefits: [
      'Faster delivery with less rework',
      'Solutions that fit the business instead of forcing process change',
      'Maintainable systems built for growth',
    ],
    accent: 'teal',
  },
  {
    id: 'engineering',
    label: '02',
    icon: 'Settings2',
    title: 'Engineering',
    summary: 'Engineering discipline for complex environments, integrations, and implementation quality.',
    image: '/service-images/engineering.png',
    description:
      'This capability emphasizes systems thinking and disciplined execution. It is ideal for organizations that need reliable implementation across multiple stakeholders, legacy dependencies, and evolving product requirements.',
    capabilities: [
      'Solution engineering and technical planning',
      'Integration-aware delivery',
      'Scalable implementation patterns',
      'Structured collaboration across teams',
    ],
    benefits: [
      'Lower delivery risk',
      'Cleaner implementation paths',
      'A stronger bridge between strategy and production',
    ],
    accent: 'navy',
  },
  {
    id: 'custom-solutions',
    label: '03',
    icon: 'Layers3',
    title: 'Custom Solutions',
    summary: 'Business-specific platforms and workflow solutions built for unique operational needs.',
    image: '/service-images/custom-solutions.png',
    description:
      'When off-the-shelf software is not enough, Talentifiers designs and builds custom solutions that connect data, people, and processes. The result is a more natural fit for the way teams already work.',
    capabilities: [
      'Tailored workflow design',
      'Integrations and data exchange',
      'Role-based access and controls',
      'Web, mobile, and cloud-first delivery',
    ],
    benefits: [
      'Higher adoption through familiar workflows',
      'Better visibility across operations',
      'A platform that can evolve with the business',
    ],
    accent: 'coral',
  },
  {
    id: 'cloud-services',
    label: '04',
    icon: 'Cloud',
    title: 'Cloud Services',
    summary: 'Assessment, migration, modernization, and operational support across major cloud platforms.',
    image: '/service-images/cloud-services.png',
    description:
      'Cloud work at Talentifiers spans planning through optimization. The approach balances architecture, cost, resilience, and security so that cloud becomes an enabling platform instead of just an infrastructure change.',
    capabilities: [
      'AWS, Azure, and Google Cloud support',
      'Cloud migration and modernization',
      'Hybrid and private cloud models',
      'Operational tuning and optimization',
    ],
    benefits: [
      'Greater scalability',
      'More resilient operations',
      'A clearer path to cloud-native delivery',
    ],
    accent: 'teal',
  },
  {
    id: 'data-analytics',
    label: '05',
    icon: 'BarChart3',
    title: 'Data Analytics',
    summary: 'Data engineering and analytics that turn operational complexity into usable insight.',
    image: '/service-images/data-analytics.png',
    description:
      'Talentifiers works with structured and unstructured data pipelines, analytics platforms, and machine learning tools to help teams understand performance, demand, and operational patterns more clearly.',
    capabilities: [
      'Data integration and pipeline design',
      'Streaming and batch analytics',
      'Reporting and visualization',
      'ML-ready platform support',
    ],
    benefits: [
      'Better decision-making',
      'Unified access to key data',
      'Stronger reporting and operational visibility',
    ],
    accent: 'navy',
  },
  {
    id: 'consulting',
    label: '06',
    icon: 'Compass',
    title: 'Consulting',
    summary: 'Technology and product guidance that helps teams make better platform and delivery decisions.',
    image: '/service-images/consulting.png',
    description:
      'Consulting engagements focus on shaping the right approach before heavy build effort begins. That includes technical advisory, solution framing, platform evaluation, and delivery planning that reduce downstream friction.',
    capabilities: [
      'Solution conceptualization',
      'Platform and architecture advisory',
      'Open-source and standards guidance',
      'Delivery planning and prioritization',
    ],
    benefits: [
      'Clearer technical direction',
      'Reduced platform risk',
      'Faster alignment among stakeholders',
    ],
    accent: 'coral',
  },
  {
    id: 'testing',
    label: '07',
    icon: 'ShieldCheck',
    title: 'Testing',
    summary: 'Manual, automated, and accessibility-aware testing that strengthens release confidence.',
    image: '/service-images/testing.png',
    description:
      'Testing is treated as a core quality layer, not a final step. Talentifiers supports functional validation, regression coverage, and accessibility-aware verification so teams can release with more confidence.',
    capabilities: [
      'Manual and automated validation',
      'Accessibility testing and support',
      'Regression and release checks',
      'CI-aligned quality workflows',
    ],
    benefits: [
      'Fewer production surprises',
      'More inclusive digital experiences',
      'A measurable quality standard',
    ],
    accent: 'teal',
  },
];

export const solutions = [
  {
    id: 'supply-chain-management',
    icon: 'Workflow',
    title: 'Supply Chain Management',
    summary: 'A central operational system for visibility, scheduling, job tracking, and coordination.',
    image: '/service-images/supply-chain-management.png',
    problem:
      'Operations teams often work across disconnected tools, manual updates, and limited status visibility.',
    features: [
      'Dashboard visibility and centralized data access',
      'Employee management and role-based permissions',
      'Prepress management and scheduling',
      'Customer management and job tracking',
      'Automation for repeatable operational tasks',
    ],
    benefits: [
      'Improved coordination across teams',
      'Faster access to operational status',
      'Better control over work in progress',
    ],
    accent: 'navy',
  },
  {
    id: 'crm',
    icon: 'Users',
    title: 'CRM',
    summary: 'A cloud-based CRM designed for leads, contacts, opportunities, and measurable sales flow.',
    image: '/service-images/crm.png',
    problem:
      'Sales teams need one place to manage contact data, pipeline stages, follow-ups, and performance reporting.',
    features: [
      'Lead and contact management',
      'Opportunities, stages, and forecasting',
      'Quotes, tasks, events, campaigns, and reports',
      'Integrations with operational workflows',
      'Flexible support for print-oriented and service-led teams',
    ],
    benefits: [
      'More predictable sales processes',
      'Cleaner customer visibility',
      'A better view of pipeline health',
    ],
    accent: 'teal',
  },
  {
    id: 'estimating-software',
    icon: 'Calculator',
    title: 'Estimating Software',
    summary: 'A quote-to-order system that helps teams manage estimates, approvals, and conversion.',
    image: '/service-images/estimating-software.png',
    problem:
      'Estimating work can become slow and inconsistent when templates, approvals, and pricing data are spread out.',
    features: [
      'Online quote management and templates',
      'Quote history and customer visibility',
      'Order conversion, purchase orders, and invoicing',
      'Inventory and status tracking',
      'SaaS-friendly pay-as-you-use positioning',
    ],
    benefits: [
      'Faster quote turnaround',
      'Lower administrative overhead',
      'More reliable handoff from estimate to order',
    ],
    accent: 'coral',
  },
];

export const technologyCategories = [
  {
    id: 'cloud',
    title: 'Cloud Platforms',
    icon: 'Cloud',
    summary: 'AWS, Azure, and Google Cloud for scalable, resilient delivery.',
    items: [
      { label: 'AWS', mark: 'A' },
      { label: 'Azure', mark: 'Az' },
      { label: 'Google Cloud', mark: 'G' },
      { label: 'Docker', mark: 'D', image: '/tech-icons/docker.png' },
      { label: 'Kubernetes', mark: 'K8', image: '/tech-icons/kubernetes.png' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Engineering',
    icon: 'Code2',
    summary: 'Enterprise APIs and services that power complex business workflows.',
    items: [
      { label: 'Java', mark: '☕', image: '/tech-icons/java.png' },
      { label: 'Spring Boot', mark: 'SB' },
      { label: '.NET', mark: '.NET' },
      { label: 'Node.js', mark: 'N' },
      { label: 'Python', mark: 'Py' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Systems',
    icon: 'PanelsTopLeft',
    summary: 'Responsive interfaces, application shells, and design-system delivery.',
    items: [
      { label: 'React', mark: '⚛' },
      { label: 'Next.js', mark: '▲' },
      { label: 'TypeScript', mark: 'TS' },
      { label: 'JavaScript', mark: 'JS' },
      { label: 'Tailwind CSS', mark: 'TW' },
    ],
  },
  {
    id: 'data',
    title: 'Data & Analytics',
    icon: 'BarChart3',
    summary: 'Databases, streaming, and reporting layers that turn transactions into insight.',
    items: [
      { label: 'PostgreSQL', mark: 'Pg', image: '/tech-icons/postgresql.png' },
      { label: 'MongoDB', mark: 'Mo' },
      { label: 'Kafka', mark: 'K' },
      { label: 'Spark', mark: 'Sp' },
      { label: 'SQL', mark: 'SQL', image: '/tech-icons/sql.png' },
      { label: 'Power BI', mark: 'BI', image: '/tech-icons/power-bi.png' },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Delivery',
    icon: 'Workflow',
    summary: 'Automation and release tooling that keeps delivery predictable.',
    items: [
      { label: 'GitHub Actions', mark: 'GA', image: '/tech-icons/github-actions.png' },
      { label: 'Jenkins', mark: 'Jk', image: '/tech-icons/jenkins.png' },
      { label: 'Docker', mark: 'D', image: '/tech-icons/docker.png' },
      { label: 'Kubernetes', mark: 'K8', image: '/tech-icons/kubernetes.png' },
      { label: 'Terraform', mark: 'Tf', image: '/tech-icons/terraform.png' },
    ],
  },
  {
    id: 'qa-accessibility',
    title: 'QA & Accessibility',
    icon: 'ShieldCheck',
    summary: 'Testing, validation, and inclusive experience tooling.',
    items: [
      { label: 'Playwright', mark: 'Pw', image: '/tech-icons/playwright.png' },
      { label: 'Cypress', mark: 'Cy', image: '/tech-icons/cypress.png' },
      { label: 'Selenium', mark: 'Se', image: '/tech-icons/selenium.png' },
      { label: 'WCAG', mark: 'A11Y', image: '/tech-icons/wcag.png' },
      { label: 'JAWS', mark: 'J', image: '/tech-icons/jaws.png' },
      { label: 'NVDA', mark: 'NV', image: '/tech-icons/nvda.png' },
    ],
  },
];

export const processSteps = [
  { title: 'Discover', summary: 'Clarify the business problem, users, and constraints.' },
  { title: 'Design', summary: 'Shape the solution architecture, interface, and delivery plan.' },
  { title: 'Build', summary: 'Implement with disciplined engineering and a clean release path.' },
  { title: 'Validate', summary: 'Test, review, and confirm quality across devices and users.' },
  { title: 'Optimize', summary: 'Refine, support, and improve after launch.' },
];

export const whyTalentifiers = [
  'Established technology partner with a long operating history',
  'Business-first delivery focused on outcomes, not just outputs',
  'Custom solutions adapted to real operational workflows',
  'Cloud and analytics capabilities under one delivery umbrella',
  'Quality, testing, and accessibility treated as core standards',
];

export const trustCards = [
  {
    title: 'Enterprise credibility',
    summary: 'A mature technology partner with breadth across software, cloud, data, consulting, and testing.',
  },
  {
    title: 'Delivery clarity',
    summary: 'Structured engagement models that keep strategy, engineering, and quality aligned.',
  },
  {
    title: 'Long-term fit',
    summary: 'Solutions designed to grow with the business instead of becoming a maintenance burden.',
  },
];

export const clientSegments = [
  {
    id: 'tech-consulting-other',
    title: 'Tech / Consulting / Other Companies',
    icon: 'Layers3',
    summary: 'Flexible digital and advisory teams that value responsive delivery and polished presentation.',
    companies: [
      { name: 'Petral Capital', logo: '/client-logos/petral-capital.png' },
      { name: 'Avenue', logo: '/client-logos/avenue.png' },
      { name: 'Circle', logo: '/client-logos/circle.png' },
      { name: 'Expert', logo: '/client-logos/expert.png' },
      { name: 'Petal', logo: '/client-logos/petal.png' },
      { name: 'Amara', logo: '/client-logos/amara.png' },
      { name: 'Eventify', logo: '/client-logos/eventify.png' },
      { name: 'Aria', logo: '/client-logos/aria.png' },
    ],
    note: 'Presentation-led delivery and fast-moving implementation',
  },
  {
    id: 'it-mnc',
    title: 'IT / MNC Companies',
    icon: 'Building2',
    summary: 'Large-scale enterprise environments with governance, integration, and delivery discipline.',
    companies: [
      { name: 'Tata Consultancy Services', logo: '/client-logos/tcs.png' },
      { name: 'Deloitte', logo: '/client-logos/deloitte.png' },
      { name: 'JPMorgan Chase', logo: '/client-logos/jpmorgan-chase.png' },
      { name: 'Polaris', logo: '/client-logos/polaris.png' },
      { name: 'Infosys', logo: '/client-logos/infosys.png' },
      { name: 'Tech Mahindra', logo: '/client-logos/tech-mahindra.png' },
      { name: 'HSBC', logo: '/client-logos/hsbc.png' },
    ],
    note: 'Structured programs, global teams, and scale',
  },
  {
    id: 'pharma-healthcare',
    title: 'Pharmaceutical / Healthcare Companies',
    icon: 'ShieldCheck',
    summary: 'Regulated and mission-critical organizations that demand precision, trust, and quality.',
    companies: [
      { name: 'Sun Pharmaceutical Industries', logo: '/client-logos/sun-pharmaceutical-industries.png' },
      { name: "Dr. Reddy's Laboratories", logo: '/client-logos/dr-reddys-laboratories.png' },
      { name: "Divi's Laboratories", logo: '/client-logos/divis-laboratories.png' },
      { name: 'Aurobindo Pharma', logo: '/client-logos/aurobindo-pharma.png' },
      { name: 'UnitedHealth Group', logo: '/client-logos/unitedhealth-group.png' },
      { name: 'Quest Diagnostics', logo: '/client-logos/quest-diagnostics.png' },
    ],
    note: 'Quality-first delivery with compliance sensitivity',
  },
];

export const impactCards = [
  {
    title: 'Cloud modernization',
    summary: 'Architecture and migration support that improves resilience and scaling potential.',
  },
  {
    title: 'Operational visibility',
    summary: 'Dashboards and workflows that make work easier to track and manage.',
  },
  {
    title: 'Analytics enablement',
    summary: 'Data pipelines and reporting that help teams make better decisions.',
  },
  {
    title: 'Quality assurance',
    summary: 'Testing practices that reduce release risk and protect the user experience.',
  },
];

export const timeline = [
  {
    year: '2001',
    title: 'Founded in Hyderabad',
    summary: 'Talentifiers begins with a focus on reliable software delivery and enterprise support.',
  },
  {
    year: 'Mid growth',
    title: 'Expanded capability',
    summary: 'The company broadens into consulting, engineering, analytics, and cloud-enabled delivery.',
  },
  {
    year: 'Today',
    title: 'Enterprise solutions partner',
    summary: 'Talentifiers presents a stronger blend of software services and packaged business solutions.',
  },
];

export const careersValues = [
  'Learn through real client work and practical delivery',
  'Collaborate with a team that values clarity and accountability',
  'Contribute to software, cloud, analytics, and testing workstreams',
  'Build solutions that have visible business impact',
];

export const openRoles = [
  { title: 'Software Engineer', summary: 'Web and platform delivery across modern front-end and back-end stacks.' },
  { title: 'Cloud Consultant', summary: 'Architecture, migration, and cloud operations support.' },
  { title: 'Data Analyst', summary: 'Reporting, pipelines, and analytics enablement work.' },
  { title: 'QA / Testing Specialist', summary: 'Manual, automated, and accessibility-focused quality coverage.' },
  { title: 'Business Analyst', summary: 'Requirements, workflows, and solution definition.' },
  { title: 'Internships', summary: 'Entry-level opportunities for motivated early-career talent.' },
];

export const faqs = [
  {
    question: 'What kinds of projects does Talentifiers handle?',
    answer:
      'Talentifiers supports custom software, cloud services, analytics, consulting, testing, and packaged business solutions for enterprise and growth-stage organizations.',
  },
  {
    question: 'Can the company help with both strategy and implementation?',
    answer:
      'Yes. The team is positioned to advise on solution design, then continue through build, validation, and support.',
  },
  {
    question: 'Is the website ready for lead capture integration?',
    answer:
      'Yes. The forms are production-ready on the front end and can post to a webhook or API endpoint when you connect one.',
  },
];

export const pageMeta = {
  home: {
    title: 'Talentifiers | Premium Enterprise IT Services and Solutions',
    description:
      'Talentifiers is a Hyderabad-based IT services and enterprise solutions company delivering software development, cloud, analytics, consulting, testing, and packaged business solutions.',
  },
  about: {
    title: 'About Talentifiers | Established in 2001',
    description:
      'Learn how Talentifiers blends long-term technology experience with enterprise delivery, consulting, and custom solution development.',
  },
  services: {
    title: 'Services | Talentifiers',
    description:
      'Explore Talentifiers services across software development, engineering, custom solutions, cloud, analytics, consulting, and testing.',
  },
  solutions: {
    title: 'Solutions | Talentifiers',
    description:
      'Discover Talentifiers packaged solutions for supply chain management, CRM, and estimating workflows.',
  },
  technologies: {
    title: 'Technologies | Talentifiers',
    description:
      'See the cloud, backend, frontend, data, DevOps, QA, and accessibility technologies Talentifiers works with.',
  },
  clients: {
    title: 'Clients and Trust | Talentifiers',
    description:
      'See the Talentifiers client story through large logo-led tiles grouped by industry segment.',
  },
  careers: {
    title: 'Careers | Talentifiers',
    description:
      'Explore career opportunities at Talentifiers and join a team focused on enterprise software, cloud, data, and testing.',
  },
  contact: {
    title: 'Contact Talentifiers',
    description:
      'Start a conversation with Talentifiers for software development, cloud, analytics, consulting, testing, or business solutions.',
  },
};

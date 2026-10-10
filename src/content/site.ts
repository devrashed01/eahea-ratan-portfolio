// ---------------------------------------------------------------------------
// Single source of truth for everything on the site. Edit here, not in JSX.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Eahea Ratan',
  first: 'Eahea',
  last: 'Ratan',
  initials: 'ER',
  role: 'Senior Frontend Engineer',
  stackLine: 'React · TypeScript · Next.js',
  location: 'Dhaka, Bangladesh',
  timezone: 'Asia/Dhaka',
  openTo: 'Open to remote (EU / US) and on-site roles',
  siteUrl: 'https://eahearatan.netlify.app/',
  email: 'devrashed01@gmail.com',
  phone: '+880 1616 021140',
  cvUrl: `${import.meta.env.BASE_URL}Eahea-Ratan-CV.pdf`,
  socials: [
    { label: 'GitHub', handle: 'devrashed01', href: 'https://github.com/devrashed01' },
    { label: 'LinkedIn', handle: 'rashadul-islam12345', href: 'https://www.linkedin.com/in/rashadul-islam12345' },
    { label: 'ThemeForest', handle: 'codexfusion', href: 'https://themeforest.net/user/codexfusion' },
  ],
  summary:
    'Frontend engineer with 9+ years building production web apps in React, Next.js and TypeScript. Currently Software Engineer II at Strativ, shipping booking and admin products for European clients. I lead features from API contract to release, review code, mentor developers, and build the internal tools and AI-assisted workflows that take repetitive work off the whole team.',
}

export const stats = [
  { value: 9, suffix: '+', label: 'years shipping production frontends' },
  { value: 830, suffix: '+', label: 'commits on a live multi-tenant booking SaaS since 2025' },
  { value: 56, suffix: 'k', label: 'lines of native Swift across two macOS apps I ship solo' },
  { value: 325, suffix: '+', label: 'sales of my ThemeForest template, rated 5.0' },
]

export interface Role {
  hash: string
  title: string
  company: string
  place: string
  start: string
  end: string
  year: number
  tags: string[]
  points: string[]
}

export const career: Role[] = [
  {
    hash: 'a9f3c21',
    title: 'Software Engineer II (Frontend)',
    company: 'Strativ',
    place: 'Dhaka · Strativ AB, Sweden',
    start: 'May 2024',
    end: 'Present',
    year: 2024,
    tags: ['React', 'TypeScript', 'React Query', 'Ant Design', 'Lead', 'AI tooling'],
    points: [
      'Lead features end to end — API contract to release — across customer-facing booking products: admin dashboard, embeddable booking widget and tour customer portal.',
      'Shipped the Gift Card Widget end to end and extended waitlist booking logic across the admin app and booking widget.',
      'Own frontend architecture decisions, review pull requests, and mentor and onboard new developers.',
      'Built and maintain a reusable component library; improved Core Web Vitals and fixed WCAG issues on customer-facing pages.',
      'Built a Timetables page from Figma against a mock API so UI work never waited on the backend; traced and fixed a Sentry-flagged production RangeError in the customer portal.',
      'Rolled out AI-assisted development across projects: agent rule files, a codebase knowledge graph, an LLM output-filtering CLI, a pre-commit AI code-review hook, and standups generated automatically from Jira data.',
    ],
  },
  {
    hash: '7c0de42',
    title: 'Frontend Software Engineer',
    company: 'NexusLab',
    place: 'Mirpur DOHS, Dhaka',
    start: '2022',
    end: 'Apr 2024',
    year: 2022,
    tags: ['Next.js', 'Web3', 'Material UI', 'Tailwind'],
    points: [
      'Built frontend applications for crypto and blockchain clients with React, Next.js, TypeScript, Material UI and Tailwind CSS.',
      'Shipped Next.js apps on the App Router and Server Components for international businesses, focused on secure, responsive UI.',
    ],
  },
  {
    hash: 'f2e1b08',
    title: 'Freelance Frontend Developer',
    company: 'Upwork & early-stage startup',
    place: 'Remote',
    start: 'Oct 2021',
    end: '2022',
    year: 2021,
    tags: ['React', 'Freelance', 'Startup'],
    points: [
      'Delivered frontend projects for international clients on Upwork.',
      'Built the frontend for an early-stage startup whose main client was a large overseas youth football academy.',
    ],
  },
  {
    hash: '3b8d5e9',
    title: 'Senior Frontend Software Developer',
    company: 'ItechSoft Solutions',
    place: 'Khulna, Bangladesh',
    start: 'May 2018',
    end: 'Sep 2021',
    year: 2018,
    tags: ['Team lead', 'React', 'Next.js', 'Envato'],
    points: [
      'Led and mentored a team of frontend developers, owning code reviews and delivery for client projects.',
      'Built React and Next.js applications for top clients, including products sold on the Envato marketplace.',
      "Moved the team's stack toward React, Next.js and Node.js.",
    ],
  },
  {
    hash: 'c0d3f05',
    title: 'Freelance Developer & ThemeForest Author',
    company: 'Self-employed · codexfusion',
    place: 'Remote',
    start: 'Nov 2017',
    end: 'May 2018',
    year: 2017,
    tags: ['HTML5', 'Templates', 'Product'],
    points: [
      'Delivered frontend projects for international clients on PeoplePerHour.',
      'Built and sold HTML5 templates on ThemeForest, with documentation and buyer support for each.',
      'Rokstar, a one-page portfolio template, passed 325 sales with a 5.0 buyer rating.',
    ],
  },
  {
    hash: '1n1t000',
    title: 'Frontend Developer',
    company: 'ByteCode (digital marketing)',
    place: 'Gulshan-1, Dhaka',
    start: 'May 2017',
    end: 'Nov 2017',
    year: 2017,
    tags: ['First commit'],
    points: ['Built responsive marketing websites and landing pages — where it all started.'],
  },
]

export const education = [
  { degree: 'BSc in Computer Science & Engineering', school: 'World University of Bangladesh', when: '2023 – Present' },
  { degree: 'Diploma in Computer Engineering', school: 'Saic Institute of Management & Technology', when: '2017' },
]

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['TypeScript', 'JavaScript (ES2023)', 'HTML5', 'CSS3', 'Swift'] },
  {
    group: 'Frontend',
    items: ['React', 'Next.js (App Router, RSC)', 'TanStack Query', 'Redux', 'Zustand', 'React Hook Form', 'Zod', 'Ant Design', 'Material UI', 'Tailwind CSS', 'Vite'],
  },
  { group: 'Quality', items: ['Core Web Vitals', 'Bundle & render optimization', 'WCAG', 'Jest', 'Vitest', 'Testing Library', 'Playwright', 'Cypress', 'Storybook'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'Prisma', 'PostgreSQL', 'MongoDB', 'SQLite', 'REST APIs'] },
  { group: 'Tooling', items: ['Git (worktrees, hooks)', 'GitHub Actions', 'Vercel', 'Jira', 'Sentry', 'Figma', 'Chrome Extensions API'] },
  { group: 'AI-assisted dev', items: ['Claude Code', 'Cursor', 'Codex', 'Agent rule files (CLAUDE.md)', 'LLM context tooling'] },
]

export interface Project {
  slug: string
  name: string
  kind: string
  year: string
  stack: string[]
  blurb: string
  details: string[]
  links?: { label: string; href: string }[]
}

export const flagships = {
  workpilot: {
    name: 'WorkPilot',
    tagline: 'Your workday, remembered.',
    kind: 'Native macOS app · public beta',
    year: '2026',
    stack: ['Swift', 'SwiftUI', 'AppKit', 'SQLite', 'Keychain', 'Apple Intelligence', 'Claude CLI'],
    blurb:
      'The timesheet that fills itself in. WorkPilot quietly records commits, branches, pull requests, meetings and Jira activity into an on-device work memory — then writes worklogs, standups and sprint views from real evidence.',
    facts: [
      { k: '43.6k', v: 'lines of Swift' },
      { k: 'v0.35', v: 'shipped, self-updating' },
      { k: '6', v: 'integrations' },
      { k: '0', v: 'servers — all on-device' },
    ],
    details: [
      'Suggests hours per ticket with comments drawn from your own commit messages — nothing hits Jira until you confirm.',
      '“Fix my wording” runs Apple’s on-device model and rejects any rewrite that changes numbers, ticket keys, links or names.',
      'Integrates GitHub, Bitbucket, Jira, Google Calendar (loopback OAuth + PKCE), Slack and an Odoo ERP over JSON-RPC.',
      'Self-updater with no Developer ID: reads a latest.json manifest, verifies SHA-256, swaps its own bundle.',
      'Built with SwiftPM and shell scripts, no Xcode project. Secrets live in the Keychain; file contents are never read.',
      'Shipped with its own landing site and a 49-second launch film rendered frame-by-frame from HTML via headless Chrome + ffmpeg.',
    ],
    links: [
      { label: 'Website', href: 'https://devrashed01.github.io/workpilot/' },
      { label: 'Releases', href: 'https://github.com/devrashed01/workpilot-releases' },
    ],
  },
  agentboy: {
    name: 'AgentBoy',
    tagline: 'Every Claude Code agent, one glance away.',
    kind: 'Native macOS app',
    year: '2026',
    stack: ['SwiftUI', 'AppKit', 'Unix sockets', 'Claude Code hooks'],
    blurb:
      'A floating pill at the top of the Mac screen that shows every running Claude Code session — working, thinking, waiting, done — plus live usage limits. Answer an agent’s questions and permission prompts inline, without switching to the terminal.',
    facts: [
      { k: '12k', v: 'lines of Swift, zero deps' },
      { k: '~8ms', v: 'fail-safe hook exit' },
      { k: '60fps', v: 'film-tested UI' },
    ],
    details: [
      'A helper binary forwards Claude Code hook events to the app over an owner-only Unix socket.',
      'Fails safe: if the app isn’t running the hook exits in ~8 ms and Claude Code behaves normally.',
      'Backs up settings.json before connecting and restores it byte-for-byte on disconnect.',
      'A debug “film” mode records every UI transition at 60 fps and fails the run on any snap or jump.',
    ],
    links: [
      { label: 'Website', href: 'https://devrashed01.github.io/agentboy/' },
      { label: 'Releases', href: 'https://github.com/devrashed01/agentboy-releases' },
    ],
  },
}

export const projects: Project[] = [
  {
    slug: 'booking-saas',
    name: 'Tour & transport booking SaaS',
    kind: 'Production · Strativ',
    year: '2025–',
    stack: ['React 19', 'TypeScript', 'TanStack Query', 'Redux Toolkit', 'Ant Design', 'i18next', 'Vitest'],
    blurb: 'Multi-tenant booking platform for European operators: admin panel, embeddable booking widget, gift-card widget, customer portal.',
    details: [
      '560+ commits on the admin frontend and 270+ on the embeddable booking widget.',
      'Timetable and shuttle-transfer modules wired to the real API, with PDF export and import.',
      'Gift Card Widget shipped end to end; waitlist logic extended across admin and widget.',
    ],
  },
  {
    slug: 'traffic',
    name: 'AI-Driven Traffic Control',
    kind: 'Computer vision · thesis',
    year: '2026',
    stack: ['Python', 'YOLOv8', 'OpenCV', 'pytest'],
    blurb: 'Detects vehicles across multiple lane feeds and sets green-light time by lane density. Emergency vehicles get an immediate green.',
    details: ['Fine-tuning pipeline on the UA-DETRAC dataset, with mAP / precision / recall evaluation.', 'CSV/JSON analytics with matplotlib reports, backed by 22 pytest tests.'],
  },
  {
    slug: 'handctl',
    name: 'handctl',
    kind: 'macOS · gesture control',
    year: '2026',
    stack: ['Python', 'MediaPipe', 'OpenCV', 'Quartz'],
    blurb: 'Control your Mac with your hands through the webcam: fist for Mission Control, a peace sign for a screenshot, swipes to switch desktops.',
    details: ['Hold-to-fire debouncing and two-hand support.', 'Runs fully on-device on Apple Silicon.'],
  },
  {
    slug: 'futsal',
    name: 'Futsal Formation Builder',
    kind: 'Web app · live',
    year: '2026',
    stack: ['React 19', 'TypeScript', 'Vite 8'],
    blurb: 'A visual tactics board: 3D-tilted pitch, jersey tokens, squad sheets, drawing layer, zoom, local saves and export to image.',
    details: ['Built and deployed in a day.'],
    links: [{ label: 'Live', href: 'https://futsal-formation-builder.vercel.app' }],
  },
  {
    slug: 'modheader',
    name: 'Mod Header',
    kind: 'Chrome extension · MV3',
    year: '2026',
    stack: ['Manifest V3', 'declarativeNetRequest', 'TypeScript'],
    blurb: 'A privacy-first replacement for a pulled header-modding tool: set, append or remove request/response headers with minimal permissions.',
    details: ['Grouped configs, URL and initiator-domain filters, history suggestions, master switch.', 'Local-only storage; used by teammates daily.'],
  },
  {
    slug: 'school',
    name: 'Cadet academy website',
    kind: 'Client work · Next.js',
    year: '2026',
    stack: ['Next.js 15', 'Tailwind', 'HeroUI', 'Framer Motion', 'Supabase'],
    blurb: 'Full school site with admissions, academics, gallery, news, notice board, staff directory and an admin panel.',
    details: ['App Router with a Supabase-backed admin for staff to publish notices and news.'],
  },
  {
    slug: 'fatima',
    name: 'FATIMA',
    kind: 'iOS app · SwiftUI',
    year: '2026',
    stack: ['SwiftUI', 'AVFoundation'],
    blurb: 'An alphabet-learning app for kids: letters, illustrated stories, games, achievements, voice playback and progress tracking.',
    details: ['Tested on device on iPhone 16.'],
  },
  {
    slug: 'attendance',
    name: 'Student Attendance System',
    kind: 'Full stack · live',
    year: '2025',
    stack: ['React', 'Ant Design', 'Express 5', 'Prisma', 'PostgreSQL', 'Docker'],
    blurb: 'Attendance management with a React/Ant Design frontend and an Express 5 + Prisma API, deployed with Docker and CI pipelines.',
    details: ['Frontend and backend both deployed on Vercel.'],
    links: [{ label: 'Live', href: 'https://attendance-project-omega.vercel.app' }],
  },
  {
    slug: 'go-api',
    name: 'Go Task Manager API',
    kind: 'Backend · Go',
    year: '2026',
    stack: ['Go 1.22', 'pgx', 'PostgreSQL', 'goose', 'Docker', 'GitHub Actions'],
    blurb: 'A production-style REST API: net/http, structured slog logging, migrations, httptest coverage, golangci-lint and CI.',
    details: ['Built to go deep on Go idioms and production hygiene.'],
    links: [{ label: 'Code', href: 'https://github.com/devrashed01/go-project' }],
  },
  {
    slug: 'proximity',
    name: 'Proximity auto-lock',
    kind: 'Swift package',
    year: '2026',
    stack: ['Swift', 'CoreBluetooth'],
    blurb: 'Locks the Mac when your paired iPhone walks away, using BLE signal strength.',
    details: ['Small, sharp utility — part of a habit of building the tools I wish existed.'],
  },
  {
    slug: 'rokstar',
    name: 'Rokstar',
    kind: 'ThemeForest template',
    year: '2018',
    stack: ['HTML5', 'CSS3', 'jQuery'],
    blurb: 'A one-page portfolio template sold on ThemeForest under my author name codexfusion. 325+ sales, 5.0 buyer rating.',
    details: ['Shipped with full documentation and buyer support.'],
    links: [{ label: 'ThemeForest', href: 'https://themeforest.net/item/rokstar-onepage-portfolio-html5-template/21522392' }],
  },
]

export const achievements = [
  { k: '325+', title: 'sales, 5.0 rating', body: 'Rokstar sold on ThemeForest in my first year as an author — real buyers, real support tickets.' },
  { k: '2', title: 'native macOS apps shipped solo', body: 'WorkPilot and AgentBoy: landing sites, release pipelines, self-updaters, in daily use.' },
  { k: 'Lead', title: 'ran a frontend team', body: 'Led and mentored developers at ItechSoft; today I review PRs and onboard engineers at Strativ.' },
  { k: 'AI', title: 'rolled out AI-assisted dev', body: 'Agent rules, a codebase knowledge graph, AI pre-commit review and auto standups — across a whole team.' },
]

// Recruiter fit check: each requirement maps to concrete evidence on this site.
export const requirements: { key: string; label: string; evidence: string[] }[] = [
  { key: 'react', label: 'React / TypeScript', evidence: ['9+ years of React; TypeScript in every production codebase since 2020.', '830+ commits on a multi-tenant React 19 booking SaaS.'] },
  { key: 'next', label: 'Next.js', evidence: ['Shipped App Router + Server Components apps at NexusLab.', 'Built a Next.js 15 + Supabase school platform.'] },
  { key: 'lead', label: 'Tech lead / mentoring', evidence: ['Led a frontend team at ItechSoft (2018–2021).', 'Owns architecture decisions, PR reviews and onboarding at Strativ.'] },
  { key: 'perf', label: 'Performance & a11y', evidence: ['Improved Core Web Vitals and fixed WCAG issues on customer-facing pages.', 'This site: instanced WebGL, reduced-motion fallbacks, keyboard-first.'] },
  { key: 'remote', label: 'Remote / async', evidence: ['Works async daily with a team in Sweden.', 'Freelanced for international clients on Upwork and PeoplePerHour.'] },
  { key: 'product', label: 'Product ownership', evidence: ['Designed, built, released and supports WorkPilot and AgentBoy end to end.', 'Ran a ThemeForest product with 325+ customers.'] },
  { key: 'ai', label: 'AI / LLM tooling', evidence: ['Claude-powered features in WorkPilot; AgentBoy integrates Claude Code hooks.', 'Rolled out AI-assisted workflows across a team.'] },
  { key: 'fullstack', label: 'Full-stack range', evidence: ['Node/Express + Prisma, Django REST, Go + Postgres APIs.', 'Swift/SwiftUI native apps and Python computer vision.'] },
  { key: 'testing', label: 'Testing culture', evidence: ['Jest, Vitest, Testing Library, Playwright, Cypress, Storybook.', '22-test pytest suite on the CV thesis; 60fps UI film tests in AgentBoy.'] },
]

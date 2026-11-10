import type { Project } from '../types';

const recoverySpace: Project = {
    slug: 'recovery-space',
    name: 'Recovery Space',
    tagline:
        'A bilingual coaching app and website for an eating-disorder recovery coach and her clients.',
    status: 'live',
    dates: 'March 2025 – present',
    order: 1,

    links: [
        { label: 'asmaagad.com', href: 'https://www.asmaagad.com' },
        {
            label: 'App Store',
            href: 'https://apps.apple.com/us/app/recovery-space-by-asmaa-gad/id6778065708',
        },
        {
            label: 'Google Play',
            href: 'https://play.google.com/store/apps/details?id=com.coachasmaa.recovery',
        },
    ],

    facts: [
        'Runs on three platforms: web, iPhone and Android',
        'Fully bilingual — Arabic, right-to-left, and English',
        'One codebase serves all three',
        'Listed in both app stores under my own name',
    ],

    stack: [
        'TypeScript',
        'Next.js',
        'React Native',
        'Expo',
        'Supabase',
        'PostgreSQL',
        'Stripe',
        'Resend',
        'Upstash Redis',
        'i18next',
        'Sentry',
        'Vercel',
        'Turborepo',
        'Vitest',
        'GitHub Actions',
    ],

    problem: [
        'Asmaa coaches people recovering from eating disorders. Her clients are Arabic speakers across the Middle East and the diaspora, plus English speakers. Before this, she sold her programs through payment links she made by hand, and clients found her through Instagram.',
        'They needed one place to buy a program, book a session, do a short daily check-in and message her — all of it working properly in Arabic, which reads right to left. She needed to see her clients, sessions and messages from her phone, not only from a desktop admin page.',
    ],

    architecture: [
        {
            title: 'One codebase for web and mobile',
            body: "The website and the phone app live in one repository and share their types and database code. When the data model changes, one fix updates both, so they can't quietly drift apart.",
        },
        {
            title: 'The database holds the rules that must always be true',
            body: 'The phone app writes some data straight to the database instead of going through the website’s server. So any rule that can never be broken — the 18-or-older check, for one — is written into the database itself. It then applies no matter which app does the writing.',
        },
        {
            title: 'The coach’s text lives in the database, not the code',
            body: 'Reminder and welcome messages are rows she can edit. Changing them doesn’t need a new app release.',
        },
    ],

    tradeoffs: [
        'I chose not to sell programs inside the iPhone app. Apple rejected showing prices alongside an outside checkout, so iPhone users tap “Ask about this program” and message the coach instead. I gave up one-tap buying on iPhone; she arranges payment herself and assigns the program. Android keeps its normal buy button.',
        'I put Arabic at /ar and left English at the root, rather than giving both languages a prefix. I gave up a symmetric design, but every existing link and app deep link kept working.',
        'I count blog likes per device rather than per account, because most readers arrive from Instagram without one. I gave up exact counts — someone who clears their browser data can like a post twice.',
    ],

    hardest: [
        'Arabic article text in the mobile app kept lining up on the left, and it survived two rounds of fixes.',
        'React Native deliberately swaps “left” and “right” in right-to-left mode, so writing “align right” for Arabic actually pushed the text left. That part I could have reasoned out. The real problem was my check: I was testing with long paragraphs, and a long Arabic line fills the whole width, so it looks correctly aligned either way. My test could not fail. Every wrong fix looked like it worked.',
        'So I stopped patching and built a throwaway screen showing every alignment option side by side on one short Arabic line. One look told me which setting actually meant “start of the line” — it was left, which React Native treats as the start. I confirmed it on a real phone, then checked the other places using right and found they genuinely belonged at the end of the line, so I left them alone.',
    ],

    testing: [
        'Every pull request runs lint, type-checking and a full build. Web changes run a Vitest suite. For the checks that matter, I break the code on purpose to confirm the test actually fails — a test I haven’t seen fail isn’t a test.',
        'Database changes run against a throwaway local database first, then go to production one at a time, each with a query before and after proving it landed. Phone updates ship over the air only after confirming the native code is unchanged, and each one has a stated way back.',
    ],

    diagram: {
        columns: [
            {
                title: 'Clients',
                nodes: [
                    { id: 'mobile', label: 'Mobile app', role: 'iPhone & Android, plus a coach view' },
                    { id: 'web', label: 'Website', role: 'Public site, dashboard, admin' },
                ],
            },
            {
                title: 'Server',
                nodes: [
                    { id: 'server', label: 'Server routes', role: 'Checks and writes on Vercel' },
                    { id: 'eas', label: 'EAS Update', role: 'Ships app code without a store release' },
                ],
            },
            {
                title: 'Data & services',
                nodes: [
                    { id: 'supabase', label: 'Supabase', role: 'Database, sign-in, storage, jobs' },
                    { id: 'stripe', label: 'Stripe', role: 'Takes payments' },
                    { id: 'push', label: 'Expo Push', role: 'Delivers notifications' },
                    { id: 'resend', label: 'Resend', role: 'Sends email' },
                    { id: 'redis', label: 'Upstash Redis', role: 'Counts requests for rate limits' },
                ],
            },
        ],
        edges: [
            { from: 'mobile', to: 'supabase', label: 'Sign-in, reads, and some direct writes' },
            { from: 'mobile', to: 'server', label: 'Messages and anything needing a check' },
            { from: 'web', to: 'server', label: 'Dashboard and admin actions' },
            { from: 'server', to: 'stripe', label: 'Buyer sent to checkout with their user ID' },
            { from: 'stripe', to: 'server', label: 'Signed “payment completed” event' },
            { from: 'server', to: 'supabase', label: 'Enrollments, sessions, messages' },
            { from: 'supabase', to: 'mobile', label: 'Live messages and typing indicator' },
            { from: 'server', to: 'push', label: 'Notifications out to phones' },
            { from: 'server', to: 'resend', label: 'Transactional email' },
            { from: 'server', to: 'redis', label: 'Is this user over the limit?' },
            { from: 'eas', to: 'mobile', label: 'New app code, over the air' },
        ],
    },
};

export default recoverySpace;

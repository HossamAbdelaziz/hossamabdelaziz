import type { Project } from '../types';

// White-label. Alrahden and Firoz have approved use of their names, but
// nothing identifying either client's own setup or processes goes here:
// no screenshots, no links, no domains, no document formats, no workflows.
const fieldbase: Project = {
    slug: 'fieldbase',
    name: 'FieldBase',
    tagline:
        'A white-label field-service platform that runs the office and the technicians for service companies.',
    status: 'live',
    dates: 'June 2026 – present',
    order: 2,

    facts: [
        'One codebase, two client companies — each on its own server and database',
        'Adding a client needs no code changes: branding and domain load as data',
        'Every table holding client data has row-level security, checked on every push',
        'In daily production use in Saudi Arabia and Egypt',
    ],

    stack: [
        'TypeScript',
        'NestJS',
        'PostgreSQL',
        'Prisma',
        'Next.js',
        'React',
        'Redis',
        'BullMQ',
        'Dexie',
        'Docker',
        'Caddy',
        'AWS',
        'GitHub Actions',
        'Vitest',
    ],

    problem: [
        'Service companies send technicians out to maintain equipment at customer sites, and the office has to know where everyone is and what was done. Without software, an office staff member builds the schedule in spreadsheets, chases technicians by phone, and retypes paper reports into documents for the customer.',
        'The technician has the worse end of it. They carry paper forms, often work in buildings with no signal, and arrive with no record of what was done to a machine last time. FieldBase gives the office one live view of the work and gives the technician a phone app that keeps working when the signal does not.',
    ],

    architecture: [
        {
            title: 'One codebase, a separate deployment for each client',
            body: 'Each client gets its own server, its own database and its own domain, all running the same code. They wanted their data physically separate, and it means a problem on one client’s server cannot reach another’s.',
        },
        {
            title: 'The database refuses to hand over another company’s rows',
            body: 'Inside a deployment, row-level security means the database itself will not return rows belonging to a different company, even when the application code has a bug. An application has hundreds of entry points. The database has one.',
        },
        {
            title: 'The rules that must never break live in the database',
            body: 'A signed document can never be edited. Document numbers can never skip or repeat. Those live as database constraints rather than application checks, so a new screen or endpoint cannot bypass them by accident.',
        },
    ],

    tradeoffs: [
        'I chose a separate stack for each client over one shared server. I gave up cost and simplicity: every release has to be deployed and verified once per client, and each server is paid for separately.',
        'I chose to load each client’s branding at runtime rather than building a separate version per client. I gave up page speed, because branded pages are rendered on each request instead of being built ahead of time.',
        'I put the core rules in the database instead of in application code. I gave up easy changes and fast tests — those rules need hand-written migrations, and testing them means running against a real Postgres rather than a stub.',
    ],

    hardest: [
        'Numbering documents without gaps or duplicates when several people finalise at the same moment.',
        'Businesses read a missing number as a lost or deleted document, and a repeated number is worse. The obvious approaches both fail: if two staff finalise at the same instant, each can read the same “last number” and issue it twice. If a save fails after a number has been taken, that number is gone and leaves a gap. Postgres’s own sequences have exactly that second flaw — they do not give a number back when a transaction fails.',
        'So the number is drawn from a counter row inside the same transaction that marks the document final. The row lock makes simultaneous requests queue up, and if anything fails afterwards the number and the “final” status are undone together. Drafts get no number at all, so they can be thrown away freely; cancelled documents keep theirs. The database rejects any counter change that skips or goes backwards, and a test scans the codebase to prove only one function is allowed to write that counter.',
        'I know it works because a test fires twenty finalisations at the same moment against a real Postgres database and checks for twenty consecutive numbers with no repeats. A second test checks the year rolls over by the client’s local time zone rather than the server’s.',
    ],

    testing: [
        'Every push runs formatting, lint, type checks, the build, and a test suite that includes tests against a real Postgres database in containers. Before I trust a new safety test, I break the code on purpose to prove that the test can fail.',
        'Merges to main are gated, and release images are built once in CI rather than on the server. Deploying means the server pulls that prebuilt image and applies migrations in order. New features ship switched off behind flags and are turned on per client after the client has accepted them.',
    ],

    diagrams: [
        {
            kind: 'flow',
            title: 'One release, two separate deployments',
            caption:
                'The same code runs for both clients, but nothing is shared at run time — separate server, separate database, separate domain.',
            columns: [
                {
                    title: 'Source',
                    nodes: [
                        {
                            id: 'repo',
                            label: 'FieldBase',
                            role: 'One codebase, one pipeline',
                        },
                    ],
                },
                {
                    title: 'Build',
                    nodes: [
                        {
                            id: 'ci',
                            label: 'CI',
                            role: 'Checks, then packages a release',
                        },
                    ],
                },
                {
                    title: 'Deployments',
                    nodes: [
                        {
                            id: 'alrahden',
                            label: 'Alrahden',
                            role: 'Own server and database',
                        },
                        {
                            id: 'firoz',
                            label: 'Firoz',
                            role: 'Own server and database',
                        },
                    ],
                },
            ],
            edges: [
                {
                    from: 'repo',
                    to: 'ci',
                    label: 'Every push runs lint, types and tests against a real Postgres',
                },
                {
                    from: 'ci',
                    to: 'alrahden',
                    label: 'The server pulls the prebuilt release and applies migrations',
                },
                {
                    from: 'ci',
                    to: 'firoz',
                    label: 'The same release, deployed and verified separately',
                },
            ],
        },

        {
            kind: 'flow',
            title: 'Inside one deployment',
            caption:
                'Everything the office changes goes through the API, and the database decides which company’s rows it is allowed to return.',
            columns: [
                {
                    title: 'Clients',
                    nodes: [
                        {
                            id: 'office',
                            label: 'Office browser',
                            role: 'Jobs, customers, documents',
                        },
                        {
                            id: 'tech',
                            label: 'Technician app',
                            role: 'Installable, queues work offline',
                        },
                    ],
                },
                {
                    title: 'Server',
                    nodes: [
                        {
                            id: 'web',
                            label: 'Web app',
                            role: 'Next.js pages, behind Caddy',
                        },
                        { id: 'api', label: 'API', role: 'NestJS: rules, auth, PDFs' },
                    ],
                },
                {
                    title: 'Data & services',
                    nodes: [
                        {
                            id: 'db',
                            label: 'PostgreSQL',
                            role: 'Enforces company boundaries',
                        },
                        { id: 'queue', label: 'Job queue', role: 'Redis: background work' },
                        {
                            id: 'files',
                            label: 'File storage',
                            role: 'Photos, signatures, PDFs',
                        },
                        { id: 'mail', label: 'Email', role: 'Outgoing mail over SMTP' },
                    ],
                },
            ],
            edges: [
                { from: 'office', to: 'web', label: 'Pages over HTTPS' },
                { from: 'office', to: 'api', label: 'Everything the office changes' },
                {
                    from: 'tech',
                    to: 'api',
                    label: 'Queued work, synced when back online',
                },
                { from: 'api', to: 'db', label: 'Queries scoped to one company' },
                {
                    from: 'api',
                    to: 'queue',
                    label: 'Reminders, email, re-rendering PDFs',
                },
                {
                    from: 'api',
                    to: 'files',
                    label: 'Uploads under the company’s own prefix',
                },
                { from: 'api', to: 'mail', label: 'Outgoing mail' },
            ],
        },

        {
            kind: 'states',
            title: 'What a document can be',
            caption:
                'The lifecycle the numbering rules hang off. Nothing signed is ever rewritten.',
            states: [
                { id: 'draft', label: 'Draft', role: 'No number yet' },
                { id: 'final', label: 'Final', role: 'Numbered and signed' },
                { id: 'cancelled', label: 'Cancelled', role: 'Keeps its number' },
            ],
            transitions: [
                {
                    from: 'draft',
                    to: 'final',
                    label: 'The number is drawn inside the same transaction that marks it final, so a failure undoes both.',
                },
                {
                    from: 'draft',
                    to: 'draft',
                    label: 'A draft can be edited or thrown away freely, because it has never held a number.',
                },
                {
                    from: 'final',
                    to: 'cancelled',
                    label: 'A cancelled document keeps its number and stays in the book, so the sequence never gains a gap.',
                },
                {
                    from: 'final',
                    to: 'final',
                    label: 'A correction appends a new version rather than editing the old one. Every earlier version stays exactly as it was signed.',
                },
            ],
        },

        {
            kind: 'sequence',
            title: 'A technician with no signal',
            caption:
                'How work recorded offline reaches the server exactly once, even when the reply is lost.',
            steps: [
                {
                    actor: 'Technician app',
                    text: 'The visit is written to local storage straight away, so the technician is never blocked by the network.',
                },
                {
                    actor: 'Technician app',
                    text: 'A key is drawn for that action before it is ever sent, and stays with it in the queue.',
                },
                {
                    actor: 'Technician app → API',
                    text: 'When the signal returns, the queue replays in order, each item carrying its key.',
                },
                {
                    actor: 'API',
                    text: 'A key it has already seen returns the original answer again instead of writing a second time.',
                },
                {
                    actor: 'API → Technician app',
                    text: 'The item leaves the queue only on a confirmed write, so a lost reply means a safe retry rather than a duplicate.',
                },
            ],
        },

        {
            kind: 'actors',
            title: 'Who uses it',
            actors: [
                {
                    name: 'Office staff',
                    can: [
                        'Schedule and assign the day’s work',
                        'Raise and finalise documents',
                        'See every job in one live view',
                    ],
                },
                {
                    name: 'Technician',
                    can: [
                        'Take the day’s jobs offline',
                        'Record what was done on site',
                        'Capture a signature without a signal',
                    ],
                },
                {
                    name: 'Manager',
                    can: [
                        'See across branches',
                        'Approve corrections',
                        'Cannot approve their own request',
                    ],
                },
            ],
        },
    ],
};

export default fieldbase;

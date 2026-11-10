import type { Project } from '../types';

// Public site, so links and screenshots of hojrentals.ca are fine.
// Nothing from the admin panel, and nothing that would help someone attack
// the live site: no rate-limit numbers, no detail on how the private link
// is generated or expires, no function or endpoint names.
const hojRentals: Project = {
    slug: 'hoj-rentals',
    name: 'HOJ Rentals',
    tagline:
        'A booking website and back office for a family-run car and truck rental shop in Oakville.',
    status: 'live',
    dates: '2025 – present',
    order: 3,

    cover: {
        src: '/images/shot-hoj-web.jpg',
        alt: 'The HOJ Rentals website',
    },

    links: [{ label: 'hojrentals.ca', href: 'https://www.hojrentals.ca' }],

    facts: [
        'Customers request, view and change a booking without ever creating an account',
        'Only server code can write a booking — the browser never writes one directly',
        'Every change leaves an audit entry and a record of the email that was sent',
        'Live since 2025; the current version is a ground-up rebuild, live since January 2026',
    ],

    stack: [
        'TypeScript',
        'React',
        'Vite',
        'Tailwind CSS',
        'Firebase Cloud Functions',
        'Cloud Firestore',
        'Firebase Auth',
        'App Check',
        'Vercel',
        'GitHub Actions',
        'Vitest',
        'pnpm',
    ],

    problem: [
        'Someone who needs a cargo van on Saturday wants to see what is free, know the price before committing, and send a request in two minutes from a phone — then change the dates later without ringing anyone.',
        'The staff member on the counter wants that request to arrive in one place with the price already worked out, to approve or decline it in a click, and for the customer to be emailed without anybody typing it. Without the software both sides do this by phone and on paper: quotes get recalculated by hand, changes get lost, and nothing is written down about who changed what.',
    ],

    architecture: [
        {
            title: 'Customers have no accounts',
            body: 'Asking a one-time renter to register would lose bookings, so each booking gets its own private link instead. The link is stored only as a hash, so even a copy of the database would not reveal it.',
        },
        {
            title: 'The server owns the price',
            body: 'The browser sends the vehicle, the dates and the add-ons. It never sends a price. The server looks the vehicle up itself and works out the total, so nothing a customer could edit in the browser changes what they pay.',
        },
        {
            title: 'Only server code can write a booking',
            body: 'The browser can read the vehicle list but can never write a booking. Every change goes through a server function, which is how each one gets an audit entry and an email record without anybody remembering to add them.',
        },
        {
            title: 'What is sold is not what is tracked',
            body: 'Vehicle types — what the public site offers — are kept separate from the physical units with their plates, mileage and maintenance. The website stays simple while the back office tracks real vehicles.',
        },
    ],

    tradeoffs: [
        'I chose private links over customer accounts. I gave up a “my bookings” history and password recovery — if a customer loses the email, staff have to resend it.',
        'I chose a serverless backend over running my own server. I gave up fine control: the first request after a quiet spell is slower, and I had to build rate limiting myself on top of the database instead of getting it from a web framework.',
        'I chose a locked-down database, where only the server can write, over the quicker setup where the browser writes directly. I gave up development speed — every new action in the back office needs its own server function.',
    ],

    hardest: [
        'The booking function is where the money is, and I had tests for it. But a test suite only proves anything if it fails when the code is wrong, and I had no proof of that.',
        'So I built a small mutation-testing harness. A script deliberately injects one specific bug into the server code — taking the price from the request instead of the database, say, or letting a cancelled booking still be edited — runs the full end-to-end suite against local emulators, and records whether the suite caught it.',
        'The hard parts were not the idea. Every injected bug has to be valid code that still compiles. The suite has to be proven green on the unmutated code first, or the result means nothing. And the tree has to be restored and verified afterwards, so that a mutation can never leak into a commit.',
        'I wrote eighteen mutations covering pricing, rate limits, token handling, audit entries and the contact forms, plus one harmless control mutation that must survive — because a harness that flags everything is as useless as one that flags nothing. The first full run caught all eighteen and the control survived.',
    ],

    testing: [
        'Every change goes through a pull request and a gate script: formatting, lint at zero warnings, type check, build, and the full test suite at that exact commit, with CI matched by the full commit hash before a merge is allowed. Merges are rebase-only, with a check that what landed is byte-for-byte what was tested.',
        'Backend deploys go out one function at a time from a fresh checkout of the merged commit, with the previous version recorded first so that rolling back takes seconds.',
    ],

    diagrams: [
        {
            kind: 'flow',
            title: 'How a booking is made and changed',
            caption:
                'The browser never sends a price and never writes a booking. Both go through the server.',
            columns: [
                {
                    title: 'Customer',
                    nodes: [
                        {
                            id: 'browser',
                            label: 'Browser',
                            role: 'Browse, quote, manage a booking',
                        },
                    ],
                },
                {
                    title: 'Server',
                    nodes: [
                        {
                            id: 'create',
                            label: 'Create booking',
                            role: 'Validates, prices, writes',
                        },
                        {
                            id: 'manage',
                            label: 'Manage by link',
                            role: 'Checks the link, applies changes',
                        },
                        {
                            id: 'contact',
                            label: 'Contact forms',
                            role: 'Validates and forwards enquiries',
                        },
                    ],
                },
                {
                    title: 'Data & services',
                    nodes: [
                        {
                            id: 'db',
                            label: 'Firestore',
                            role: 'Vehicles, bookings, audit records',
                        },
                        { id: 'mail', label: 'Email', role: 'Confirmations and enquiries' },
                        {
                            id: 'places',
                            label: 'Google Places',
                            role: 'Live reviews on the home page',
                        },
                    ],
                },
            ],
            edges: [
                {
                    from: 'browser',
                    to: 'create',
                    label: 'Vehicle, dates, add-ons and contact details — never a price',
                },
                {
                    from: 'create',
                    to: 'db',
                    label: 'Looks the vehicle up, works out the total, writes the booking',
                },
                {
                    from: 'create',
                    to: 'mail',
                    label: 'Confirmation to the customer, carrying the private link, and a copy to the shop',
                },
                {
                    from: 'browser',
                    to: 'manage',
                    label: 'The private link, plus whatever the customer wants changed',
                },
                {
                    from: 'manage',
                    to: 'db',
                    label: 'Applies the change and records who changed what',
                },
                { from: 'browser', to: 'contact', label: 'Enquiries from the contact forms' },
                { from: 'contact', to: 'mail', label: 'Forwarded to the shop' },
                { from: 'browser', to: 'places', label: 'Live Google reviews' },
            ],
        },

        {
            kind: 'states',
            title: 'The life of a booking',
            caption:
                'A customer can change their own booking only while it is still pending.',
            states: [
                { id: 'pending', label: 'Pending', role: 'Waiting on the shop' },
                { id: 'approved', label: 'Approved', role: 'Confirmed to the customer' },
                { id: 'declined', label: 'Declined', role: 'Refused, with a reason' },
                { id: 'cancelled', label: 'Cancelled', role: 'By either side' },
            ],
            transitions: [
                {
                    from: 'pending',
                    to: 'approved',
                    label: 'Staff accept the request and the customer is emailed.',
                },
                {
                    from: 'pending',
                    to: 'declined',
                    label: 'Staff refuse it, and the customer is emailed the reason.',
                },
                {
                    from: 'pending',
                    to: 'cancelled',
                    label: 'The customer cancels through their link, or staff cancel it.',
                },
                {
                    from: 'approved',
                    to: 'cancelled',
                    label: 'Cancelled after approval. Only staff can do this.',
                },
                {
                    from: 'pending',
                    to: 'pending',
                    label: 'Dates, vehicle and add-ons can be changed through the private link — but only while the booking is still pending.',
                },
            ],
        },

        {
            kind: 'sequence',
            title: 'Getting a quote and sending a request',
            caption: 'Note what the website sends, and what it does not.',
            steps: [
                {
                    actor: 'Customer',
                    text: 'Picks a location, the dates and the driver’s age.',
                },
                { actor: 'Website', text: 'Shows the vehicles that fit, with a daily price.' },
                {
                    actor: 'Customer',
                    text: 'Picks a vehicle and any add-ons, and sees an estimated total.',
                },
                { actor: 'Customer', text: 'Enters their contact details and submits.' },
                {
                    actor: 'Website → Server',
                    text: 'Sends the request — the vehicle, the dates, the add-ons. Never a price.',
                },
                {
                    actor: 'Server',
                    text: 'Confirms the request came from a real browser, checks the vehicle can be booked, prices it from the database, and saves it as pending.',
                },
                {
                    actor: 'Server',
                    text: 'Emails the customer with their private link, and the shop with the request.',
                },
                { actor: 'Website', text: 'Shows the reference number.' },
            ],
        },

        {
            kind: 'actors',
            title: 'Who uses it',
            actors: [
                {
                    name: 'Customer',
                    can: [
                        'Browse vehicles and get a price',
                        'Send a request without an account',
                        'Change dates, vehicle or add-ons through a private link',
                        'Cancel while the booking is still pending',
                    ],
                },
                {
                    name: 'Shop staff',
                    can: [
                        'Review requests and approve, decline or cancel',
                        'Create bookings for walk-ins',
                        'Keep the vehicle list current',
                        'See enquiries and how the site is doing',
                    ],
                },
            ],
        },
    ],
};

export default hojRentals;

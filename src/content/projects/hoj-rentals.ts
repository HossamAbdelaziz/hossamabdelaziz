import type { Project } from '../types';

const hojRentals: Project = {
    slug: 'hoj-rentals',
    name: 'HOJ Rentals',
    tagline:
        'Booking and fleet admin for a vehicle rental company in Oakville, Ontario.',
    status: 'live',
    dates: 'April 2025 – present',
    order: 3,

    cover: {
        src: '/images/shot-hoj-web.jpg',
        alt: 'The HOJ Rentals website',
    },

    links: [{ label: 'hojrentals.ca', href: 'https://www.hojrentals.ca' }],

    facts: [
        'Live with real customers',
        'Quotes are computed on the server, never by the browser',
        'Customers manage a booking without an account',
    ],

    stack: [
        'TypeScript',
        'React',
        'Vite',
        'Tailwind CSS',
        'Firebase',
        'Cloud Functions',
        'Firestore',
        'Vercel',
        'Vitest',
        'GitHub Actions',
    ],
};

export default hojRentals;

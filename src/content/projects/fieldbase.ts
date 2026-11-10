import type { Project } from '../types';

// White-label: no links, no screenshots, no internal details.
// Client names (Alrahden, Firoz) are approved for use.
const fieldbase: Project = {
    slug: 'fieldbase',
    name: 'FieldBase',
    tagline:
        'A white-label field-service platform, in daily production use in Saudi Arabia and Egypt.',
    status: 'live',
    dates: 'July 2026 – present',
    order: 2,

    facts: [
        'One platform, two clients: Alrahden and Firoz',
        'In daily production use in two countries',
        'Office staff on the web, technicians on their phones',
        'Works offline and syncs without duplicating work',
    ],

    stack: [
        'TypeScript',
        'NestJS',
        'PostgreSQL',
        'Prisma',
        'Next.js',
        'React Query',
        'BullMQ',
        'Redis',
        'Docker',
        'AWS',
        'Vitest',
        'GitHub Actions',
    ],
};

export default fieldbase;

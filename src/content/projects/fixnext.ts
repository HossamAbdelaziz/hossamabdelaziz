import type { Project } from '../types';

const fixnext: Project = {
    slug: 'fixnext',
    name: 'FixNext',
    tagline:
        'Ranking which published vulnerabilities attackers are actually likely to exploit.',
    status: 'live',
    dates: 'November 2026',
    order: 4,

    links: [
        { label: 'fixnext.select', href: 'https://fixnext.select' },
        { label: 'GitHub', href: 'https://github.com/DavidRosales21/FixNext' },
    ],

    facts: [
        'Built in 24 hours at the Sheridan Datathon, on IBM’s track',
        'Back-test found 19 of 39 exploited vulnerabilities in the top 500',
        'The best existing baseline found 17; severity score alone found 6',
    ],

    stack: ['Python', 'pandas', 'scikit-learn', 'Next.js', 'TypeScript'],

    cover: {
        src: '/images/datathon-team.jpg',
        alt: 'The team at work during the Sheridan Datathon',
    },

    photo: {
        src: '/images/datathon-team.jpg',
        alt: 'Four people standing around laptops at the Sheridan Datathon',
        caption: 'The team at the Sheridan Datathon, November 2026.',
    },
};

export default fixnext;

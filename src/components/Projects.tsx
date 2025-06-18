'use client';

import ProjectCard from './ProjectCard';

// Define allowed status types
type ProjectStatus = 'live' | 'in-progress' | 'planned';

interface Project {
    title: string;
    status: ProjectStatus;
    description: string;
    github?: string;
    live?: string;
    ios?: string;
    android?: string;
    technologies?: string[];
}

const projects: Project[] = [
    {
        title: 'Coach Asmaa App',
        status: 'live',
        description:
            'A mental health coaching platform built with React and Firebase. Supports web and mobile platforms with program progress tracking, Zoom session bookings, Stripe payments, and real-time notifications.',
        github: 'https://github.com/HossamAbdelaziz/asmaa-frontend',
        live: 'https://www.asmaagad.com',
        android:
            'https://play.google.com/store/apps/details?id=com.northviatech.coachasmaa',
        technologies: ['React', 'Firebase', 'Stripe', 'Tailwind', 'Framer Motion'],
    },
    {
        title: 'HOJ Rental Platform',
        status: 'in-progress',
        description:
            'A full-featured React + Firebase system for vehicle rentals. Includes booking management, admin dashboards, mileage tracking, and dynamic pricing. Currently in active development.',
        github: 'https://github.com/HossamAbdelaziz/hoj-rental',
        technologies: ['React', 'Firebase', 'Google Maps API', 'Tailwind'],
    },
    {
        title: 'Mechanic SAAS System',
        status: 'planned',
        description:
            'An upcoming software-as-a-service platform for auto mechanic shops. Will include features like inventory control, invoice generation, service booking, and customer management. Development begins next month.',
        technologies: ['Next.js', 'MongoDB', 'Stripe', 'Make.com'],
    },
];

export default function Projects() {
    return (
        <section
            id="projects"
            className="py-16 px-6 md:px-20 bg-neutral-950 text-white"
        >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                Projects
            </h2>
            <p className="text-center text-gray-400 mb-10 max-w-2xl mx-auto">
                A few of the products and platforms I’ve built or am currently building.
            </p>

            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, idx) => (
                    <ProjectCard key={idx} {...project} />
                ))}
            </div>
        </section>
    );
}

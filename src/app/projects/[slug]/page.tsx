import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, getProject } from '@/content/projects';
import { hasCaseStudy, type Project } from '@/content/types';
import SplitLayout from '@/components/SplitLayout';
import CaseRail from '@/components/CaseRail';
import SectionLabel from '@/components/SectionLabel';
import Diagrams from '@/components/Diagrams';
import type { RailNavItem } from '@/components/RailNav';

export function generateStaticParams() {
    return projects.filter(hasCaseStudy).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project) return {};

    const title = `${project.name} — Hossam Abdelaziz`;
    // openGraph here replaces the root's outright, so the image has to be
    // repeated or shared links come out blank.
    const images = [
        {
            url: '/og.png',
            width: 1200,
            height: 630,
            alt: 'Hossam Abdelaziz — software developer',
        },
    ];
    return {
        title,
        description: project.tagline,
        alternates: { canonical: `/projects/${project.slug}` },
        openGraph: {
            title,
            description: project.tagline,
            type: 'article',
            url: `https://www.hossamabdelaziz.com/projects/${project.slug}`,
            siteName: 'Hossam Abdelaziz',
            images,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: project.tagline,
            images: ['/og.png'],
        },
    };
}

/** Only list sections that actually have content. */
function sectionsOf(project: Project): RailNavItem[] {
    const maybe: Array<[boolean, RailNavItem]> = [
        [Boolean(project.problem?.length), { id: 'problem', label: 'The problem' }],
        [
            Boolean(project.architecture?.length),
            { id: 'architecture', label: 'Architecture' },
        ],
        [
            Boolean(project.diagrams?.length),
            { id: 'diagram', label: 'How it fits' },
        ],
        [Boolean(project.tradeoffs?.length), { id: 'tradeoffs', label: 'Trade-offs' }],
        [Boolean(project.hardest?.length), { id: 'hardest', label: 'Hardest problem' }],
        [Boolean(project.testing?.length), { id: 'testing', label: 'Testing' }],
        [Boolean(project.stack?.length), { id: 'stack', label: 'Built with' }],
    ];
    return maybe.filter(([on]) => on).map(([, item]) => item);
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
    return (
        <div className="t-prose mt-8 space-y-5">
            {paragraphs.map((text, i) => (
                <p key={i}>{text}</p>
            ))}
        </div>
    );
}

function Section({
    id,
    label,
    children,
    first,
}: {
    id: string;
    label: string;
    children: React.ReactNode;
    first?: boolean;
}) {
    return (
        <section
            id={id}
            className={`scroll-mt-8 py-14 lg:py-20 ${first ? '' : 'border-t border-[var(--rule)]'}`}
        >
            <SectionLabel>{label}</SectionLabel>
            {children}
        </section>
    );
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project || !hasCaseStudy(project)) notFound();

    const sections = sectionsOf(project);

    return (
        <SplitLayout rail={<CaseRail project={project} sections={sections} />}>
            {project.facts && project.facts.length > 0 && (
                <section className="pt-12 pb-2 lg:pt-20">
                    <ul className="max-w-[var(--w-read)] border border-[var(--rule)] bg-[var(--paper-raised)]">
                        {project.facts.map((fact) => (
                            <li
                                key={fact}
                                className="flex gap-3.5 border-b border-[var(--rule)] px-5 py-3.5 text-[15px] text-[var(--ink-soft)] last:border-b-0 sm:px-6"
                            >
                                <span
                                    className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-2)]"
                                    aria-hidden
                                />
                                {fact}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {project.problem && (
                <Section id="problem" label="The problem" first={!project.facts?.length}>
                    <Prose paragraphs={project.problem} />
                </Section>
            )}

            {project.architecture && project.architecture.length > 0 && (
                <Section id="architecture" label="Architecture">
                    <div className="mt-8 max-w-[var(--w-read)] space-y-8">
                        {project.architecture.map((note) => (
                            <div key={note.title}>
                                <h3 className="t-h3">{note.title}</h3>
                                <p className="t-prose mt-2">{note.body}</p>
                            </div>
                        ))}
                    </div>
                </Section>
            )}

            {project.diagrams && project.diagrams.length > 0 && (
                <Section id="diagram" label="How it fits together">
                    <Diagrams specs={project.diagrams} />
                </Section>
            )}

            {project.tradeoffs && project.tradeoffs.length > 0 && (
                <Section id="tradeoffs" label="Trade-offs">
                    <Prose paragraphs={project.tradeoffs} />
                </Section>
            )}

            {project.hardest && project.hardest.length > 0 && (
                <Section id="hardest" label="The hardest problem">
                    <Prose paragraphs={project.hardest} />
                </Section>
            )}

            {project.testing && project.testing.length > 0 && (
                <Section id="testing" label="Testing and release">
                    <Prose paragraphs={project.testing} />
                </Section>
            )}

            {project.photo && (
                <section className="border-t border-[var(--rule)] py-14 lg:py-20">
                    <figure>
                        <Image
                            src={project.photo.src}
                            alt={project.photo.alt}
                            width={1600}
                            height={686}
                            className="h-auto w-full rounded-[2px] border border-[var(--rule)]"
                        />
                        {project.photo.caption && (
                            <figcaption className="t-meta mt-3">
                                {project.photo.caption}
                            </figcaption>
                        )}
                    </figure>
                </section>
            )}

            {project.stack && project.stack.length > 0 && (
                <Section id="stack" label="Built with">
                    <ul className="mt-8 flex max-w-[var(--w-read)] flex-wrap gap-2">
                        {project.stack.map((tech) => (
                            <li
                                key={tech}
                                className="border border-[var(--rule)] px-3 py-1.5 font-mono text-[12px] text-[var(--ink-soft)]"
                            >
                                {tech}
                            </li>
                        ))}
                    </ul>
                </Section>
            )}

            <div className="border-t border-[var(--rule)] py-12">
                <Link href="/#work" className="prose-link text-[15px]">
                    ← All work
                </Link>
                <p className="t-label mt-10">© 2026 Hossam Abdelaziz</p>
            </div>
        </SplitLayout>
    );
}

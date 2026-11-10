import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, getProject } from '@/content/projects';
import { hasCaseStudy } from '@/content/types';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';
import SectionLabel from '@/components/SectionLabel';
import Diagram from '@/components/Diagram';

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
    return {
        title,
        description: project.tagline,
        alternates: { canonical: `/projects/${project.slug}` },
        openGraph: { title, description: project.tagline, type: 'article' },
        twitter: { card: 'summary_large_image', title, description: project.tagline },
    };
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
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <section className="border-t border-[var(--rule)] py-14 sm:py-20">
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

    return (
        <>
            <SiteHeader />

            <main className="mx-auto max-w-[var(--w-wide)] px-5 sm:px-6">
                <header className="pt-12 pb-14 sm:pt-16">
                    <Link
                        href="/#work"
                        className="t-meta underline-offset-4 hover:underline"
                    >
                        ← All work
                    </Link>

                    <h1 className="t-h1 mt-8">{project.name}</h1>

                    <p className="t-prose mt-4">{project.tagline}</p>

                    <p className="t-meta mt-6">
                        {project.dates}
                        {'  ·  '}
                        {project.status === 'live' ? 'Live' : 'In progress'}
                    </p>

                    {project.links && project.links.length > 0 && (
                        <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
                            {project.links.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="prose-link"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </p>
                    )}
                </header>

                {project.facts && project.facts.length > 0 && (
                    <ul className="border border-[var(--rule)] bg-[var(--paper-raised)]">
                        {project.facts.map((fact) => (
                            <li
                                key={fact}
                                className="border-b border-[var(--rule)] px-5 py-3.5 text-[15px] text-[var(--ink-soft)] last:border-b-0 sm:px-6"
                            >
                                {fact}
                            </li>
                        ))}
                    </ul>
                )}

                {project.problem && (
                    <Section label="The problem">
                        <Prose paragraphs={project.problem} />
                    </Section>
                )}

                {project.architecture && project.architecture.length > 0 && (
                    <Section label="Architecture">
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

                {project.diagram && (
                    <Section label="How it fits together">
                        <div className="mt-8">
                            <Diagram spec={project.diagram} />
                        </div>
                    </Section>
                )}

                {project.tradeoffs && project.tradeoffs.length > 0 && (
                    <Section label="Trade-offs">
                        <Prose paragraphs={project.tradeoffs} />
                    </Section>
                )}

                {project.hardest && project.hardest.length > 0 && (
                    <Section label="The hardest problem">
                        <Prose paragraphs={project.hardest} />
                    </Section>
                )}

                {project.testing && project.testing.length > 0 && (
                    <Section label="Testing and release">
                        <Prose paragraphs={project.testing} />
                    </Section>
                )}

                {project.photo && (
                    <Section label="">
                        <figure className="mt-2">
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
                    </Section>
                )}

                {project.stack && project.stack.length > 0 && (
                    <Section label="Built with">
                        <p className="t-meta mt-8 max-w-[var(--w-read)] leading-7">
                            {project.stack.join('  ·  ')}
                        </p>
                    </Section>
                )}

                <div className="border-t border-[var(--rule)] py-12">
                    <Link
                        href="/#work"
                        className="prose-link text-[15px]"
                    >
                        ← All work
                    </Link>
                </div>
            </main>

            <Footer />
        </>
    );
}

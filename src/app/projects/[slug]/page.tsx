import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import { projects, getProject } from '@/content/projects';
import { hasCaseStudy } from '@/content/types';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';
import StatusBadge from '@/components/StatusBadge';
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

function SectionHeading({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-sm font-semibold tracking-[0.14em] text-[var(--dim)] uppercase">
            {children}
        </h2>
    );
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
    return (
        <div className="mt-5 space-y-5 text-[17px] leading-relaxed text-[var(--muted)]">
            {paragraphs.map((text, i) => (
                <p key={i}>{text}</p>
            ))}
        </div>
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

            <main>
                <section className="relative overflow-hidden border-b border-[var(--border)]">
                    <div className="field" aria-hidden />
                    <div className="relative mx-auto max-w-3xl px-6 pt-14 pb-14">
                        <Link
                            href="/#work"
                            className="inline-flex items-center gap-2 text-sm text-[var(--dim)] transition hover:text-[var(--text)]"
                        >
                            <FaArrowLeft className="text-xs" />
                            All work
                        </Link>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <StatusBadge status={project.status} />
                            <span className="text-xs text-[var(--dim)]">{project.dates}</span>
                        </div>

                        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                            {project.name}
                        </h1>

                        <p className="mt-4 max-w-2xl text-xl leading-relaxed text-[var(--muted)]">
                            {project.tagline}
                        </p>

                        {project.links && project.links.length > 0 && (
                            <div className="mt-7 flex flex-wrap gap-2.5">
                                {project.links.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-sm text-[var(--muted)] transition hover:border-[var(--border-strong)] hover:text-[var(--text)]"
                                    >
                                        {link.label}
                                        <FaExternalLinkAlt className="text-[10px]" />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <div className="mx-auto max-w-3xl px-6">
                    {project.facts && project.facts.length > 0 && (
                        <section className="border-b border-[var(--border)] py-10">
                            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                                {project.facts.map((fact) => (
                                    <li
                                        key={fact}
                                        className="flex gap-3 text-[15px] leading-relaxed text-[var(--muted)]"
                                    >
                                        <span
                                            className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[var(--accent-2)]"
                                            aria-hidden
                                        />
                                        {fact}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {project.problem && (
                        <section className="py-14">
                            <SectionHeading>The problem</SectionHeading>
                            <Prose paragraphs={project.problem} />
                        </section>
                    )}

                    {project.architecture && project.architecture.length > 0 && (
                        <section className="border-t border-[var(--border)] py-14">
                            <SectionHeading>Architecture</SectionHeading>
                            <div className="mt-6 space-y-7">
                                {project.architecture.map((note) => (
                                    <div key={note.title}>
                                        <h3 className="text-[17px] font-semibold text-[var(--text)]">
                                            {note.title}
                                        </h3>
                                        <p className="mt-2 text-[17px] leading-relaxed text-[var(--muted)]">
                                            {note.body}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {project.diagram && (
                        <section className="border-t border-[var(--border)] py-14">
                            <SectionHeading>How it fits together</SectionHeading>
                            <div className="mt-7">
                                <Diagram spec={project.diagram} />
                            </div>
                        </section>
                    )}

                    {project.tradeoffs && project.tradeoffs.length > 0 && (
                        <section className="border-t border-[var(--border)] py-14">
                            <SectionHeading>Trade-offs</SectionHeading>
                            <Prose paragraphs={project.tradeoffs} />
                        </section>
                    )}

                    {project.hardest && project.hardest.length > 0 && (
                        <section className="border-t border-[var(--border)] py-14">
                            <SectionHeading>The hardest problem</SectionHeading>
                            <Prose paragraphs={project.hardest} />
                        </section>
                    )}

                    {project.testing && project.testing.length > 0 && (
                        <section className="border-t border-[var(--border)] py-14">
                            <SectionHeading>Testing and release</SectionHeading>
                            <Prose paragraphs={project.testing} />
                        </section>
                    )}

                    {project.photo && (
                        <section className="border-t border-[var(--border)] py-14">
                            <div className="overflow-hidden rounded-xl border border-[var(--border)]">
                                <Image
                                    src={project.photo.src}
                                    alt={project.photo.alt}
                                    width={1600}
                                    height={686}
                                    className="h-auto w-full"
                                />
                            </div>
                            {project.photo.caption && (
                                <p className="mt-3 text-sm text-[var(--dim)]">
                                    {project.photo.caption}
                                </p>
                            )}
                        </section>
                    )}

                    {project.stack && project.stack.length > 0 && (
                        <section className="border-t border-[var(--border)] py-14">
                            <SectionHeading>Built with</SectionHeading>
                            <ul className="mt-6 flex flex-wrap gap-2">
                                {project.stack.map((tech) => (
                                    <li
                                        key={tech}
                                        className="rounded-full border border-[var(--border)] px-3 py-1.5 text-[13px] text-[var(--muted)]"
                                    >
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    <section className="border-t border-[var(--border)] py-14">
                        <Link
                            href="/#work"
                            className="inline-flex items-center gap-2 text-sm text-[var(--accent)] transition hover:text-[var(--accent-2)]"
                        >
                            <FaArrowLeft className="text-xs" />
                            All work
                        </Link>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}

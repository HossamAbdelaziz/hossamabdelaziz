import Image from 'next/image';
import Link from 'next/link';
import { hasCaseStudy, type Project } from '@/content/types';

export default function WorkEntry({ project }: { project: Project }) {
    const ready = hasCaseStudy(project);
    const meta = [
        project.dates,
        project.status === 'live' ? 'Live' : 'In progress',
    ].join('  ·  ');

    return (
        <article className="border-t border-[var(--rule)] pt-10 pb-14 first:border-t-0 first:pt-0">
            {project.cover ? (
                <div className="relative mb-8 overflow-hidden rounded-[3px] border border-[var(--rule)] bg-[var(--paper-raised)]">
                    <Image
                        src={project.cover.src}
                        alt={project.cover.alt}
                        width={1600}
                        height={1000}
                        className="h-auto w-full"
                    />
                    {project.coverPhone && (
                        <div className="absolute right-5 -bottom-2 hidden w-[88px] overflow-hidden rounded-[6px] border border-[var(--rule)] shadow-[0_2px_14px_rgba(26,23,20,0.14)] sm:block sm:w-[110px]">
                            <Image
                                src={project.coverPhone.src}
                                alt={project.coverPhone.alt}
                                width={750}
                                height={1624}
                                className="h-auto w-full"
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div className="mb-8 border border-[var(--rule)] bg-[var(--paper-raised)] px-6 py-10">
                    <p className="t-label">No public screenshots</p>
                    <p className="t-prose mt-3 text-[17px]">
                        FieldBase is white-label. Both clients run it under their
                        own branding, so the architecture is on the record and the
                        screens are not.
                    </p>
                </div>
            )}

            <h3 className="t-h2">
                {ready ? (
                    <Link
                        href={`/projects/${project.slug}`}
                        className="underline-offset-[6px] hover:underline"
                    >
                        {project.name}
                    </Link>
                ) : (
                    project.name
                )}
            </h3>

            <p className="t-prose mt-3">{project.tagline}</p>

            <p className="t-meta mt-4">{meta}</p>

            {project.stack && (
                <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
                    {project.stack.slice(0, 6).map((tech) => (
                        <li
                            key={tech}
                            className="border border-[var(--rule)] px-2.5 py-1 font-mono text-[11.5px] tracking-[0.03em] text-[var(--ink-faint)]"
                        >
                            {tech}
                        </li>
                    ))}
                </ul>
            )}

            <p className="mt-6">
                {ready ? (
                    <Link
                        href={`/projects/${project.slug}`}
                        className="prose-link text-[15px]"
                    >
                        Read the case study →
                    </Link>
                ) : (
                    <span className="t-meta">Case study in progress</span>
                )}
            </p>
        </article>
    );
}

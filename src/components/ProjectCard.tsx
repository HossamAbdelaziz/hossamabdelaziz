import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { hasCaseStudy, type Project } from '@/content/types';
import StatusBadge from './StatusBadge';

export default function ProjectCard({ project }: { project: Project }) {
    const ready = hasCaseStudy(project);
    const stack = project.stack?.slice(0, 5) ?? [];

    const body = (
        <>
            <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-[var(--text)]">
                    {project.name}
                </h3>
                <StatusBadge status={project.status} />
            </div>

            <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted)]">
                {project.tagline}
            </p>

            <p className="mt-3 text-xs tracking-wide text-[var(--dim)]">
                {project.dates}
            </p>

            {stack.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-1.5">
                    {stack.map((tech) => (
                        <li
                            key={tech}
                            className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[11px] text-[var(--dim)]"
                        >
                            {tech}
                        </li>
                    ))}
                </ul>
            )}

            {ready && (
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
                    Read the case study
                    <FaArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" />
                </span>
            )}
        </>
    );

    const shell =
        'group block rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition';

    if (!ready) {
        return <article className={shell}>{body}</article>;
    }

    return (
        <Link
            href={`/projects/${project.slug}`}
            className={`${shell} hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)]`}
        >
            {body}
        </Link>
    );
}

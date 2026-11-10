import Link from 'next/link';
import { hasCaseStudy, type Project } from '@/content/types';

export default function ProjectRow({ project }: { project: Project }) {
    const ready = hasCaseStudy(project);
    const meta = [
        project.dates,
        project.status === 'live' ? 'Live' : 'In progress',
        ...(project.stack?.slice(0, 4) ?? []),
    ].join('  ·  ');

    const inner = (
        <>
            <h3 className="t-h2 group-hover:underline" style={{ textUnderlineOffset: '4px' }}>
                {project.name}
            </h3>
            <p className="t-prose mt-3">{project.tagline}</p>
            <p className="t-meta mt-4">{meta}</p>
            {ready && (
                <p className="mt-4 text-[15px] text-[var(--accent)] underline underline-offset-4">
                    Read the case study
                </p>
            )}
            {!ready && (
                <p className="t-meta mt-4 text-[var(--ink-faint)]">
                    Case study in progress
                </p>
            )}
        </>
    );

    return (
        <article className="border-t border-[var(--rule)] py-10 first:border-t-0 first:pt-0">
            {ready ? (
                <Link href={`/projects/${project.slug}`} className="group block">
                    {inner}
                </Link>
            ) : (
                inner
            )}
        </article>
    );
}

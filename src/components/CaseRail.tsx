import Link from 'next/link';
import RailNav, { type RailNavItem } from './RailNav';
import type { Project } from '@/content/types';

export default function CaseRail({
    project,
    sections,
}: {
    project: Project;
    sections: RailNavItem[];
}) {
    return (
        <div className="flex h-full flex-col justify-between">
            <div>
                <Link
                    href="/#work"
                    className="font-mono text-[11.5px] tracking-[0.12em] text-[var(--ink-faint)] uppercase underline-offset-4 transition-colors hover:text-[var(--ink)] hover:underline"
                >
                    ← All work
                </Link>

                <h1 className="t-h1 mt-8">{project.name}</h1>

                <p className="mt-4 max-w-[36ch] text-[16px] leading-relaxed text-[var(--ink-soft)]">
                    {project.tagline}
                </p>

                <p className="mt-5 font-mono text-[11.5px] tracking-[0.08em] text-[var(--ink-faint)]">
                    {project.dates}
                    {'  ·  '}
                    {project.status === 'live' ? 'LIVE' : 'IN PROGRESS'}
                </p>

                {project.links && project.links.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[14px]">
                        {project.links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rail-link"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                )}

                <div className="mt-11">
                    <RailNav items={sections} />
                </div>
            </div>

            <div className="mt-10 lg:mt-0">
                <Link
                    href="/"
                    className="font-mono text-[11.5px] tracking-[0.12em] text-[var(--ink-faint)] uppercase underline-offset-4 transition-colors hover:text-[var(--ink)] hover:underline"
                >
                    Hossam Abdelaziz
                </Link>
            </div>
        </div>
    );
}

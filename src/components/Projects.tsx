import { projects } from '@/content/projects';
import ProjectRow from './ProjectRow';
import SectionLabel from './SectionLabel';

export default function Projects() {
    return (
        <section
            id="work"
            className="mx-auto max-w-[var(--w-page)] border-t border-[var(--rule)] px-5 py-16 sm:px-6 sm:py-24"
        >
            <SectionLabel>Work</SectionLabel>

            <p className="t-prose mt-8">
                Most of this is client code I can&apos;t show. So instead of demos,
                each one is written up as a case study: the problem, the decision I
                made and why, and the hardest thing I had to solve.
            </p>

            <div className="mt-12 max-w-[var(--w-read)]">
                {projects.map((project) => (
                    <ProjectRow key={project.slug} project={project} />
                ))}
            </div>
        </section>
    );
}

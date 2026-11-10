import { projects } from '@/content/projects';
import ProjectCard from './ProjectCard';

export default function Projects() {
    return (
        <section id="work" className="mx-auto max-w-5xl px-6 py-20">
            <h2 className="text-sm font-semibold tracking-[0.14em] text-[var(--dim)] uppercase">
                Work
            </h2>
            <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-[var(--muted)]">
                Most of this is client code I can&apos;t show. So instead of demos,
                each one is written up as a case study: the problem, the decision I
                made and why, and the hardest thing I had to solve.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {projects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                ))}
            </div>
        </section>
    );
}

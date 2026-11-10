import SplitLayout from '@/components/SplitLayout';
import HomeRail from '@/components/HomeRail';
import WorkEntry from '@/components/WorkEntry';
import SectionLabel from '@/components/SectionLabel';
import { projects } from '@/content/projects';

export default function Home() {
  return (
    <SplitLayout rail={<HomeRail />}>
      <section id="work" className="scroll-mt-8 py-14 lg:py-24">
        <SectionLabel>Work</SectionLabel>
        <p className="t-prose mt-8">
          Most of this is client code I can&apos;t show. So instead of demos,
          each one is written up as a case study: the problem, the decision I
          made and why, and the hardest thing I had to solve.
        </p>

        <div className="mt-12 max-w-[var(--w-read)]">
          {projects.map((project) => (
            <WorkEntry key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section
        id="about"
        className="scroll-mt-8 border-t border-[var(--rule)] py-14 lg:py-24"
      >
        <SectionLabel>About</SectionLabel>
        <div className="t-prose mt-8 space-y-5">
          <p>
            I run North Via Tech, a one-person studio. Everything here I built
            alone — the data model, the back end, the web and mobile apps, the
            payments and the deployments — and I&apos;m still the one keeping it
            running.
          </p>
          <p>
            I&apos;m in the Honours Bachelor of Computer Science (Mobile
            Computing) programme at Sheridan College, graduating in 2028.
          </p>
          <p>
            Three habits show up in all of this work: rules belong in the
            database, not only in the code; every release has a way back; and a
            test I haven&apos;t seen fail isn&apos;t a test.
          </p>
        </div>
      </section>

      <section
        id="contact"
        className="scroll-mt-8 border-t border-[var(--rule)] py-14 lg:py-24"
      >
        <SectionLabel>Contact</SectionLabel>
        <p className="t-prose mt-8">
          Open to a Summer 2027 software developer internship or co-op in the
          Greater Toronto Area.
        </p>
        <ul className="mt-8 space-y-3 text-[15px]">
          <li>
            <a className="prose-link" href="mailto:hossam.anwar.aziz@gmail.com">
              hossam.anwar.aziz@gmail.com
            </a>
          </li>
          <li>
            <a
              className="prose-link"
              href="https://www.linkedin.com/in/Hossam-Anwar-Abdelaziz"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/Hossam-Anwar-Abdelaziz
            </a>
          </li>
          <li>
            <a
              className="prose-link"
              href="https://github.com/HossamAbdelaziz"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/HossamAbdelaziz
            </a>
          </li>
        </ul>

        <p className="t-label mt-14 border-t border-[var(--rule)] pt-8">
          © 2026 Hossam Abdelaziz
        </p>
      </section>
    </SplitLayout>
  );
}

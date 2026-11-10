export default function About() {
    return (
        <section id="about" className="mx-auto max-w-5xl px-6 py-20">
            <h2 className="text-sm font-semibold tracking-[0.14em] text-[var(--dim)] uppercase">
                About
            </h2>

            <div className="mt-6 max-w-2xl space-y-5 text-[17px] leading-relaxed text-[var(--muted)]">
                <p>
                    I run North Via Tech, a one-person studio. Everything on this site
                    I built alone — the data model, the back end, the web and mobile
                    apps, the payments and the deployments — and I&apos;m still the one
                    keeping it running.
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
    );
}

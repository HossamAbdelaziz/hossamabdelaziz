import Image from 'next/image';

export default function Hero() {
    return (
        <section id="top" className="mx-auto max-w-[var(--w-page)] px-5 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-24">
            <div className="max-w-[var(--w-read)]">
                <div className="mb-10 h-20 w-20 overflow-hidden rounded-[2px] sm:h-24 sm:w-24">
                    <Image
                        src="/images/hossam-portrait.jpg"
                        alt="Hossam Abdelaziz"
                        width={192}
                        height={192}
                        className="h-full w-full object-cover"
                        priority
                    />
                </div>

                <h1 className="t-display">Hossam Abdelaziz</h1>

                <p className="t-meta mt-4">
                    SOFTWARE DEVELOPER · OAKVILLE, ONTARIO
                </p>

                <div className="t-prose mt-8 space-y-5">
                    <p>
                        I build and run three products that real people use every day
                        — on the web, on iPhone and on Android. I work on all of it:
                        the data model, the back end, the apps and the deployments.
                    </p>
                    <p>
                        Computer science student at Sheridan College.{' '}
                        <strong>
                            Open to a Summer 2027 software developer internship or
                            co-op.
                        </strong>
                    </p>
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px]">
                    <a className="prose-link" href="mailto:hossam.anwar.aziz@gmail.com">
                        Email
                    </a>
                    <a
                        className="prose-link"
                        href="https://www.linkedin.com/in/Hossam-Anwar-Abdelaziz"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        LinkedIn
                    </a>
                    <a
                        className="prose-link"
                        href="https://github.com/HossamAbdelaziz"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </section>
    );
}

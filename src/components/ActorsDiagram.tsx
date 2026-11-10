import type { ActorsDiagram as ActorsSpec } from '@/content/types';

export default function ActorsDiagram({ spec }: { spec: ActorsSpec }) {
    return (
        <div className="grid gap-px border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-3">
            {spec.actors.map((actor) => (
                <div key={actor.name} className="bg-[var(--paper-raised)] px-5 py-5">
                    <p className="font-mono text-[12px] tracking-[0.08em] text-[var(--accent)] uppercase">
                        {actor.name}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                        {actor.can.map((line) => (
                            <li
                                key={line}
                                className="text-[15px] leading-snug text-[var(--ink-soft)]"
                            >
                                {line}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

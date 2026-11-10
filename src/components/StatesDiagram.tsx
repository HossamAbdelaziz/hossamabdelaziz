import type { StatesDiagram as StatesSpec } from '@/content/types';

export default function StatesDiagram({ spec }: { spec: StatesSpec }) {
    const byId = new Map(spec.states.map((s) => [s.id, s]));

    return (
        <div>
            <ol
                className={`flex flex-col gap-3 border border-[var(--rule)] bg-[var(--paper-raised)] p-5 sm:flex-row sm:items-stretch ${
                    spec.linear ? 'sm:gap-0' : 'sm:gap-3'
                }`}
            >
                {spec.states.map((state, i) => (
                    <li key={state.id} className="flex min-w-0 flex-1 items-stretch">
                        <div className="min-w-0 flex-1 border border-[var(--rule)] bg-[var(--rail)] px-4 py-3">
                            <p className="font-mono text-[13px] text-[var(--ink)]">
                                {state.label}
                            </p>
                            {state.role && (
                                <p className="mt-1 text-[13.5px] leading-snug text-[var(--ink-faint)]">
                                    {state.role}
                                </p>
                            )}
                        </div>
                        {spec.linear && i < spec.states.length - 1 && (
                            <span
                                className="flex shrink-0 items-center justify-center px-2 text-[var(--accent)] sm:px-3"
                                aria-hidden
                            >
                                <span className="sm:hidden">↓</span>
                                <span className="hidden sm:inline">→</span>
                            </span>
                        )}
                    </li>
                ))}
            </ol>

            <ul className="mt-6 max-w-[var(--w-read)]">
                {spec.transitions.map((t, i) => {
                    const from = byId.get(t.from);
                    const to = byId.get(t.to);
                    return (
                        <li
                            key={i}
                            className="border-t border-[var(--rule)] py-2.5 text-[15px] leading-relaxed text-[var(--ink-soft)]"
                        >
                            <span className="t-meta text-[var(--ink)]">
                                {t.from === t.to
                                    ? (from?.label ?? t.from)
                                    : `${from?.label ?? t.from} → ${to?.label ?? t.to}`}
                            </span>
                            <br />
                            {t.label}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

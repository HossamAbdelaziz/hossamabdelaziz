import type { SequenceDiagram as SequenceSpec } from '@/content/types';

export default function SequenceDiagram({ spec }: { spec: SequenceSpec }) {
    return (
        <ol className="border border-[var(--rule)] bg-[var(--paper-raised)]">
            {spec.steps.map((step, i) => (
                <li
                    key={i}
                    className="flex gap-4 border-b border-[var(--rule)] px-5 py-4 last:border-b-0 sm:gap-5 sm:px-6"
                >
                    <span className="shrink-0 font-mono text-[12px] text-[var(--accent)]">
                        {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                        <p className="font-mono text-[12px] tracking-[0.06em] text-[var(--ink-faint)] uppercase">
                            {step.actor}
                        </p>
                        <p className="mt-1.5 text-[15.5px] leading-relaxed text-[var(--ink-soft)]">
                            {step.text}
                        </p>
                    </div>
                </li>
            ))}
        </ol>
    );
}

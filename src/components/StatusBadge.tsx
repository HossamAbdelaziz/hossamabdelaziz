import type { ProjectStatus } from '@/content/types';

const labels: Record<ProjectStatus, string> = {
    live: 'Live',
    'in-progress': 'In progress',
};

export default function StatusBadge({ status }: { status: ProjectStatus }) {
    const live = status === 'live';
    return (
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--border)] px-2.5 py-1 text-[11px] font-medium text-[var(--muted)]">
            <span
                className={`h-1.5 w-1.5 rounded-full ${live ? 'bg-[var(--accent-2)]' : 'bg-[var(--dim)]'}`}
                aria-hidden
            />
            {labels[status]}
        </span>
    );
}

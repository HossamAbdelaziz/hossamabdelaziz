import type { Diagram as DiagramSpec } from '@/content/types';

const NODE_W = 210;
const NODE_H = 62;
const NODE_GAP = 20;
const COL_GAP = 92;
const TITLE_H = 30;
const PAD = 8;

interface Placed {
    id: string;
    label: string;
    role?: string;
    col: number;
    x: number;
    y: number;
}

export default function Diagram({ spec }: { spec: DiagramSpec }) {
    const placed: Placed[] = [];
    const maxRows = Math.max(...spec.columns.map((c) => c.nodes.length));
    const bodyH = maxRows * NODE_H + (maxRows - 1) * NODE_GAP;

    spec.columns.forEach((col, ci) => {
        const colH = col.nodes.length * NODE_H + (col.nodes.length - 1) * NODE_GAP;
        const offset = (bodyH - colH) / 2;
        col.nodes.forEach((node, ni) => {
            placed.push({
                ...node,
                col: ci,
                x: PAD + ci * (NODE_W + COL_GAP),
                y: PAD + TITLE_H + offset + ni * (NODE_H + NODE_GAP),
            });
        });
    });

    const width = PAD * 2 + spec.columns.length * NODE_W + (spec.columns.length - 1) * COL_GAP;
    const height = PAD * 2 + TITLE_H + bodyH;
    const byId = new Map(placed.map((p) => [p.id, p]));

    const paths = spec.edges.flatMap((edge, i) => {
        const a = byId.get(edge.from);
        const b = byId.get(edge.to);
        if (!a || !b || a.col === b.col) return [];

        const forward = a.col < b.col;
        const sx = forward ? a.x + NODE_W : a.x;
        const ex = forward ? b.x : b.x + NODE_W;
        const sy = a.y + NODE_H / 2;
        const ey = b.y + NODE_H / 2;
        const bend = forward ? 54 : -54;

        return [
            <path
                key={i}
                d={`M ${sx} ${sy} C ${sx + bend} ${sy}, ${ex - bend} ${ey}, ${ex} ${ey}`}
                fill="none"
                stroke="var(--border-strong)"
                strokeWidth={1.25}
                markerEnd="url(#diagram-arrow)"
            />,
        ];
    });

    return (
        <div>
            <div className="overflow-x-auto">
                <svg
                    viewBox={`0 0 ${width} ${height}`}
                    style={{ minWidth: 680 }}
                    className="w-full"
                    role="img"
                    aria-label="System diagram"
                >
                    <defs>
                        <marker
                            id="diagram-arrow"
                            viewBox="0 0 8 8"
                            refX="7"
                            refY="4"
                            markerWidth="7"
                            markerHeight="7"
                            orient="auto-start-reverse"
                        >
                            <path d="M 0 1 L 7 4 L 0 7 z" fill="var(--border-strong)" />
                        </marker>
                    </defs>

                    {spec.columns.map((col, ci) =>
                        col.title ? (
                            <text
                                key={ci}
                                x={PAD + ci * (NODE_W + COL_GAP)}
                                y={PAD + 14}
                                fill="var(--dim)"
                                fontSize="10.5"
                                letterSpacing="1.4"
                                fontWeight="600"
                            >
                                {col.title.toUpperCase()}
                            </text>
                        ) : null,
                    )}

                    {paths}

                    {placed.map((node) => (
                        <g key={node.id}>
                            <rect
                                x={node.x}
                                y={node.y}
                                width={NODE_W}
                                height={NODE_H}
                                rx={9}
                                fill="var(--surface-2)"
                                stroke="var(--border-strong)"
                                strokeWidth={1}
                            />
                            <text
                                x={node.x + 14}
                                y={node.y + (node.role ? 25 : 36)}
                                fill="var(--text)"
                                fontSize="13"
                                fontWeight="600"
                            >
                                {node.label}
                            </text>
                            {node.role && (
                                <text
                                    x={node.x + 14}
                                    y={node.y + 43}
                                    fill="var(--dim)"
                                    fontSize="10.5"
                                >
                                    {node.role}
                                </text>
                            )}
                        </g>
                    ))}
                </svg>
            </div>

            <ul className="mt-7 space-y-2.5 border-t border-[var(--border)] pt-6">
                {spec.edges.map((edge, i) => {
                    const a = byId.get(edge.from);
                    const b = byId.get(edge.to);
                    if (!a || !b) return null;
                    return (
                        <li key={i} className="text-sm leading-relaxed text-[var(--muted)]">
                            <span className="text-[var(--text)]">{a.label}</span>
                            <span className="mx-2 text-[var(--dim)]">→</span>
                            <span className="text-[var(--text)]">{b.label}</span>
                            <span className="mx-2 text-[var(--dim)]">·</span>
                            {edge.label}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

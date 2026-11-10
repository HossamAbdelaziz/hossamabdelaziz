import type { Diagram as DiagramSpec } from '@/content/types';

const NODE_W = 196;
const NODE_H = 58;
const NODE_GAP = 18;
const COL_GAP = 88;
const TITLE_H = 28;
const PAD = 14;

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

    const width =
        PAD * 2 + spec.columns.length * NODE_W + (spec.columns.length - 1) * COL_GAP;
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
        const bend = forward ? 48 : -48;

        return [
            <path
                key={i}
                d={`M ${sx} ${sy} C ${sx + bend} ${sy}, ${ex - bend} ${ey}, ${ex} ${ey}`}
                fill="none"
                stroke="var(--ink-faint)"
                strokeWidth={1}
                markerEnd="url(#diagram-arrow)"
            />,
        ];
    });

    return (
        <div>
            <div className="overflow-x-auto border border-[var(--rule)] bg-[var(--paper-raised)]">
                <svg
                    viewBox={`0 0 ${width} ${height}`}
                    style={{ minWidth: 660 }}
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
                            markerWidth="6"
                            markerHeight="6"
                            orient="auto-start-reverse"
                        >
                            <path d="M 0 1 L 7 4 L 0 7 z" fill="var(--accent)" />
                        </marker>
                    </defs>

                    {spec.columns.map((col, ci) =>
                        col.title ? (
                            <text
                                key={ci}
                                x={PAD + ci * (NODE_W + COL_GAP)}
                                y={PAD + 12}
                                fill="var(--ink-faint)"
                                fontFamily="var(--font-mono)"
                                fontSize="9.5"
                                letterSpacing="1.3"
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
                                fill="var(--paper)"
                                stroke="var(--rule)"
                                strokeWidth={1}
                            />
                            <text
                                x={node.x + 12}
                                y={node.y + (node.role ? 23 : 34)}
                                fill="var(--ink)"
                                fontFamily="var(--font-mono)"
                                fontSize="11.5"
                                fontWeight="500"
                            >
                                {node.label}
                            </text>
                            {node.role && (
                                <text
                                    x={node.x + 12}
                                    y={node.y + 40}
                                    fill="var(--ink-faint)"
                                    fontFamily="var(--font-sans)"
                                    fontSize="10"
                                >
                                    {node.role}
                                </text>
                            )}
                        </g>
                    ))}
                </svg>
            </div>

            <ul className="mt-8 max-w-[var(--w-read)]">
                {spec.edges.map((edge, i) => {
                    const a = byId.get(edge.from);
                    const b = byId.get(edge.to);
                    if (!a || !b) return null;
                    return (
                        <li
                            key={i}
                            className="border-t border-[var(--rule)] py-2.5 text-[15px] leading-relaxed text-[var(--ink-soft)]"
                        >
                            <span className="t-meta text-[var(--ink)]">
                                {a.label} → {b.label}
                            </span>
                            <br />
                            {edge.label}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

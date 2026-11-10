import type { ProjectDiagram } from '@/content/types';
import FlowDiagram from './FlowDiagram';
import StatesDiagram from './StatesDiagram';
import SequenceDiagram from './SequenceDiagram';
import ActorsDiagram from './ActorsDiagram';

function One({ spec, idSuffix }: { spec: ProjectDiagram; idSuffix: string }) {
    switch (spec.kind) {
        case 'flow':
            return <FlowDiagram spec={spec} idSuffix={idSuffix} />;
        case 'states':
            return <StatesDiagram spec={spec} />;
        case 'sequence':
            return <SequenceDiagram spec={spec} />;
        case 'actors':
            return <ActorsDiagram spec={spec} />;
    }
}

export default function Diagrams({ specs }: { specs: ProjectDiagram[] }) {
    return (
        <div className="mt-8 space-y-14">
            {specs.map((spec, i) => (
                <figure key={i}>
                    <figcaption className="mb-5">
                        <h3 className="t-h3">{spec.title}</h3>
                        {spec.caption && (
                            <p className="t-prose mt-1.5 text-[16px]">{spec.caption}</p>
                        )}
                    </figcaption>
                    <One spec={spec} idSuffix={String(i)} />
                </figure>
            ))}
        </div>
    );
}

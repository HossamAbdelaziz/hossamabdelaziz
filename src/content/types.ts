// The shape every project page is built from.
// Adding a project = adding one file in src/content/projects/ and listing it
// in src/content/projects/index.ts. Nothing else needs to change.

export type ProjectStatus = 'live' | 'in-progress';

export interface ProjectLink {
    label: string;
    href: string;
}

/** A named block inside the Architecture section. */
export interface ArchitectureNote {
    title: string;
    body: string;
}

export interface DiagramNode {
    id: string;
    label: string;
    /** One short line: what this piece does. */
    role?: string;
}

export interface DiagramColumn {
    title?: string;
    nodes: DiagramNode[];
}

export interface DiagramEdge {
    from: string;
    to: string;
    /** What flows along this arrow. */
    label: string;
}

/** Boxes in columns with arrows between them. The default shape. */
export interface FlowDiagram {
    kind: 'flow';
    title: string;
    /** One line under the title saying what the reader is looking at. */
    caption?: string;
    columns: DiagramColumn[];
    edges: DiagramEdge[];
}

/** A lifecycle: what something can be, and how it moves between those. */
export interface StatesDiagram {
    kind: 'states';
    title: string;
    caption?: string;
    states: { id: string; label: string; role?: string }[];
    transitions: { from: string; to: string; label: string }[];
}

/** Ordered steps, each belonging to one participant. */
export interface SequenceDiagram {
    kind: 'sequence';
    title: string;
    caption?: string;
    steps: { actor: string; text: string }[];
}

/** Who uses it and what each of them can do. */
export interface ActorsDiagram {
    kind: 'actors';
    title: string;
    caption?: string;
    actors: { name: string; can: string[] }[];
}

export type ProjectDiagram =
    | FlowDiagram
    | StatesDiagram
    | SequenceDiagram
    | ActorsDiagram;

/** @deprecated use ProjectDiagram[] on `diagrams`. */
export interface Diagram {
    columns: DiagramColumn[];
    edges: DiagramEdge[];
}

export interface ProjectPhoto {
    src: string;
    alt: string;
    /** Shown under the image. */
    caption?: string;
}

export interface Project {
    /** URL segment: /projects/<slug> */
    slug: string;
    name: string;
    /** One sentence, max ~15 words. Used on the card and under the title. */
    tagline: string;
    status: ProjectStatus;
    /** Free text, e.g. "March 2025 – present". */
    dates: string;
    /** Lower numbers come first on the home page. */
    order: number;

    /** Omit entirely for white-label work with nothing public to link to. */
    links?: ProjectLink[];
    /** 3–4 countable, checkable things that stay true. */
    facts?: string[];
    stack?: string[];

    // ---- Case study. A project with no `problem` renders as a card only. ----
    /** Paragraphs. */
    problem?: string[];
    architecture?: ArchitectureNote[];
    /** Paragraphs, each one trade-off. */
    tradeoffs?: string[];
    /** Paragraphs. */
    hardest?: string[];
    /** Paragraphs. Omit until it can be defended in detail. */
    testing?: string[];
    /** One or more drawings. A bigger system usually needs more than one. */
    diagrams?: ProjectDiagram[];
    photo?: ProjectPhoto;
    /** Shown on the home page beside the project. Omit for white-label work. */
    cover?: ProjectPhoto;
    /** A second, phone-shaped image layered over the cover. */
    coverPhone?: ProjectPhoto;
}

/** True when there is enough written for a case-study page to exist. */
export function hasCaseStudy(project: Project): boolean {
    return Boolean(project.problem && project.problem.length > 0);
}

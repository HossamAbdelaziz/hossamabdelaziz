// Add a project: create the file, import it, add it to the array.
// The home page, the /projects/<slug> page and the sitemap all follow.

import type { Project } from '../types';
import recoverySpace from './recovery-space';
import fieldbase from './fieldbase';
import hojRentals from './hoj-rentals';
import fixnext from './fixnext';

export const projects: Project[] = [
    recoverySpace,
    fieldbase,
    hojRentals,
    fixnext,
].sort((a, b) => a.order - b.order);

export function getProject(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}

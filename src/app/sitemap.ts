import type { MetadataRoute } from 'next';
import { projects } from '@/content/projects';
import { hasCaseStudy } from '@/content/types';

const base = 'https://www.hossamabdelaziz.com';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: base, changeFrequency: 'monthly', priority: 1 },
        ...projects.filter(hasCaseStudy).map((p) => ({
            url: `${base}/projects/${p.slug}`,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        })),
    ];
}

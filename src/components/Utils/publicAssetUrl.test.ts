import {describe, expect, it} from 'vitest';
import {mainMedia, mediaList, projectImageSrcSet} from '../Projects/project.ts';
import {publicAssetUrl} from './publicAssetUrl.ts';

describe('publicAssetUrl', () => {
    it('préfixe les ressources publiques avec la base du déploiement', () => {
        expect(publicAssetUrl('/assets/example.webp'))
            .toBe('/assets/example.webp');
        expect(publicAssetUrl('/assets/example.webp', '/preview/'))
            .toBe('/preview/assets/example.webp');
    });

    it('normalise les médias provenant du contenu JSON', () => {
        expect(mainMedia(['/assets/first.webm', '/assets/second.webm']))
            .toBe('/assets/first.webm');
        expect(mediaList('/assets/project.png'))
            .toEqual(['/assets/project.png']);
    });

    it('construit les variantes responsives des captures de projets', () => {
        expect(projectImageSrcSet('/assets/projects/bdres-1920.webp')).toBe(
            '/assets/projects/bdres-640.webp 640w, '
            + '/assets/projects/bdres-1280.webp 1280w, '
            + '/assets/projects/bdres-1920.webp 1920w',
        );
        expect(projectImageSrcSet('/assets/projects/unknown.png')).toBeUndefined();
    });
});

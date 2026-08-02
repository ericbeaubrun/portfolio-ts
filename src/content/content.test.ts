import {describe, expect, it} from 'vitest';
import frContent from './fr_content.json';
import enContent from './en_content.json';

describe('contenus traduits', () => {
    it('garde les mêmes projets et le même nombre de sections dans les deux langues', () => {
        expect(enContent.projects.map(({name}) => name))
            .toEqual(frContent.projects.map(({name}) => name));
        expect(enContent.nav).toHaveLength(frContent.nav.length);
    });

    it.each([
        ['fr', frContent],
        ['en', enContent],
    ])('contient tous les libellés nécessaires en %s', (_language, content) => {
        expect(content.overlay).toEqual(expect.objectContaining({
            copy: expect.any(String),
            copied: expect.any(String),
            open: expect.any(String),
            close: expect.any(String),
        }));
        expect(content['project-overlay']).toEqual(expect.objectContaining({
            open: expect.any(String),
            close: expect.any(String),
            prev: expect.any(String),
            next: expect.any(String),
        }));
    });

    it.each([frContent, enContent])('référence uniquement des médias publics connus', (content) => {
        const mediaPaths = content.projects.flatMap((project) => [
            ...(Array.isArray(project.icon) ? project.icon : [project.icon]),
            ...project.gallery,
        ]);

        expect(mediaPaths.length).toBeGreaterThan(0);
        mediaPaths.forEach((path) => expect(path).toMatch(/^\/assets\/projects\//));
    });
});

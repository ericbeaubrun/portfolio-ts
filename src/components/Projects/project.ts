import type {IconType} from 'react-icons';
import {publicAssetUrl} from '../Utils/publicAssetUrl.ts';
import {
    FaCode,
    FaIdCardAlt,
    FaPlane,
    FaPython,
    FaTrophy,
} from 'react-icons/fa';

export interface Project {
    title: string;
    name: string;
    desc: string;
    icon: string | string[];
    skills: Record<string, string | undefined>;
    gh?: string;
    demo?: string;
    /** Points clés listés dans le panneau détaillé. */
    features?: string[];
    year?: string;
    role?: string;
    /** Nature du projet : « Projet client », « Projet académique »… */
    type?: string;
    status?: string;
    /** Paragraphe de mise en contexte, plus long que `desc`. */
    context?: string;
    /** Problèmes techniques rencontrés, un point par entrée. */
    challenges?: string[];
    /** Médias supplémentaires du panneau. À défaut, on reprend `icon`. */
    gallery?: string[];
}

const VIDEO_EXT = ['mp4', 'webm', 'ogg'];
const RESPONSIVE_IMAGE_WIDTHS: Record<string, number[]> = {
    'bdres-overview-1920.webp': [640, 1280, 1920],
    'bdres-crud-1920.webp': [640, 1280, 1920],
    'tournament1-1920.webp': [640, 1280, 1920],
    'tournament2-1920.webp': [640, 1280, 1920],
    'urya-presentation-1887.webp': [640, 1280, 1887],
    'urya-reservation-1920.webp': [640, 1280, 1920],
    'urya-admin-calendrier-1920.webp': [640, 1280, 1920],
    'urya-admin-cms-1920.webp': [640, 1280, 1920],
    'conquete-home-1920.webp': [640, 1280, 1920],
    'conquete-map-1920.webp': [640, 1280, 1920],
    'conquete-partie-1920.webp': [640, 1280, 1920],
    'conquete-multijoueur-1920.webp': [640, 1280, 1920],
    'conquete-lobby-1920.webp': [640, 1280, 1920],
    'conquete-codex-1920.webp': [640, 1280, 1920],
    'conquete-stats-1920.webp': [640, 1280, 1920],
    'aerien-accueil-1792.webp': [640, 1280, 1792],
};

export const isVideo = (src: string) =>
    VIDEO_EXT.includes(src.split('.').pop()?.toLowerCase() ?? '');

/** Premier média du projet : `icon` est tantôt une string, tantôt un tableau. */
export const mainMedia = (icon: string | string[]) =>
    publicAssetUrl(Array.isArray(icon) ? icon[0] : icon);

/** Tous les médias du projet, sous forme de tableau dans les deux cas. */
export const mediaList = (icon: string | string[]) =>
    (Array.isArray(icon) ? icon : [icon]).map((path) => publicAssetUrl(path));

/** Variantes WebP générées pour les captures statiques les plus lourdes. */
export const projectImageSrcSet = (src: string) => {
    const filename = src.split('/').pop();
    if (!filename) return undefined;

    const widths = RESPONSIVE_IMAGE_WIDTHS[filename];
    if (!widths) return undefined;

    const basePath = src.slice(0, -filename.length) + filename.replace(/-\d+\.webp$/i, '');
    return widths.map((width) => `${basePath}-${width}.webp ${width}w`).join(', ');
};

/** Les labels de `skills` sont déjà lisibles, on les passe juste en capitales. */
export const skillLabels = (skills: Record<string, string | undefined>) =>
    Object.values(skills).filter((skill): skill is string => typeof skill === 'string');

/**
 * Icônes de remplacement : un pictogramme par projet, à échanger plus tard.
 * La clé est le `name` du JSON de contenu (identique en FR et EN).
 */
const ICONS: Record<string, IconType> = {
    'Aerien': FaPlane,
    'Presence': FaIdCardAlt,
    'learnpy': FaPython,
    'Tournois': FaTrophy,
};

export const projectIcon = (name: string): IconType => ICONS[name] ?? FaCode;

/** Projets avec un vrai logo : prime sur le pictogramme de `projectIcon`. */
const LOGOS: Record<string, string> = {
    'Conquete': 'assets/logo-conquete.png',
    'Dj URYA': 'assets/logo-urya.png',
};

export const projectLogo = (name: string): string | undefined =>
    LOGOS[name] ? publicAssetUrl(LOGOS[name]) : undefined;

/** `https://www.dj-urya.fr/` → `dj-urya.fr`, pour afficher le lien en clair. */
export const prettyUrl = (url: string) =>
    url.replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/$/, '');

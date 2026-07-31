import type {IconType} from 'react-icons';
import {
    FaChessKnight,
    FaCode,
    FaIdCardAlt,
    FaMusic,
    FaPlane,
    FaPython,
    FaTrophy,
} from 'react-icons/fa';

export interface Project {
    title: string;
    name: string;
    desc: string;
    icon: string | string[];
    skills: { [key: string]: string };
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

export const isVideo = (src: string) =>
    VIDEO_EXT.includes(src.split('.').pop()?.toLowerCase() ?? '');

/** Premier média du projet : `icon` est tantôt une string, tantôt un tableau. */
export const mainMedia = (icon: string | string[]) =>
    Array.isArray(icon) ? icon[0] : icon;

/** Tous les médias du projet, sous forme de tableau dans les deux cas. */
export const mediaList = (icon: string | string[]) =>
    Array.isArray(icon) ? icon : [icon];

/** Les labels de `skills` sont déjà lisibles, on les passe juste en capitales. */
export const skillLabels = (skills: { [key: string]: string }) =>
    Object.values(skills);

/**
 * Icônes de remplacement : un pictogramme par projet, à échanger plus tard.
 * La clé est le `name` du JSON de contenu (identique en FR et EN).
 */
const ICONS: Record<string, IconType> = {
    'Dj URYA': FaMusic,
    'Conquete': FaChessKnight,
    'Aerien': FaPlane,
    'Presence': FaIdCardAlt,
    'learnpy': FaPython,
    'Tournois': FaTrophy,
};

export const projectIcon = (name: string): IconType => ICONS[name] ?? FaCode;

/** `https://www.dj-urya.fr/` → `dj-urya.fr`, pour afficher le lien en clair. */
export const prettyUrl = (url: string) =>
    url.replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/$/, '');

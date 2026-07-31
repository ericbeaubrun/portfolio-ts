import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {FaGithub} from 'react-icons/fa';
import type Lenis from 'lenis';
import {isVideo, mediaList, prettyUrl, Project, projectIcon, skillLabels} from './project.ts';
import {useLanguage} from '../Utils/LanguageContext.tsx';
import './ProjectPanel.scss';

/** Doit rester aligné sur `$panel-duration` dans ProjectPanel.scss. */
const PANEL_DURATION_MS = 650;

interface Props {
    project: Project;
    index: number;
    /** Position de la carte cliquée : point de départ et d'arrivée du panneau. */
    origin: DOMRect;
    onClose: () => void;
    lenis: Lenis | null;
}

interface Labels {
    eyebrow: string;
    overview: string;
    features: string;
    stack: string;
    challenges: string;
    gallery: string;
    links: string;
    site: string;
    code: string;
    close: string;
    role: string;
    year: string;
    type: string;
    status: string;
    noLink: string;
}

const FALLBACK_LABELS: Labels = {
    eyebrow: 'Étude de cas', overview: 'Le projet', features: 'Fonctionnalités clés',
    stack: 'Stack technique', challenges: 'Défis techniques', gallery: 'Aperçus',
    links: 'Liens', site: 'Site en ligne', code: 'Code source', close: 'Fermer',
    role: 'Rôle', year: 'Année', type: 'Nature', status: 'Statut', noLink: 'Pas de démo publique',
};

const Media: React.FC<{ src: string; alt: string }> = ({src, alt}) => (
    isVideo(src)
        ? <video src={src} autoPlay muted loop playsInline preload="metadata"/>
        : <img src={src} alt={alt} loading="lazy"/>
);

/**
 * Même mouvement que l'accordéon de contacts du footer : le bloc cliqué
 * poursuit sa course jusqu'au plein écran, sans coupure ni fondu. Ici la carte
 * n'est pas un panneau plein largeur, donc l'agrandissement se fait en FLIP :
 * le panneau démarre exactement sur le cadre de la carte (position fixe), puis
 * transitionne vers `0 / 0 / 100vw / 100vh`. La fermeture rejoue l'inverse.
 */
const ProjectPanel: React.FC<Props> = ({project, index, origin, onClose, lenis}) => {
    const {content} = useLanguage();
    const labels = {...FALLBACK_LABELS, ...((content as any)['project-overlay'] || {})} as Labels;

    // 'start' : posé sur la carte. 'open' : plein écran. 'closing' : retour.
    const [phase, setPhase] = useState<'start' | 'open' | 'closing'>('start');
    const closeTimer = useRef<number>();

    const Icon = projectIcon(project.name);
    const medias = project.gallery?.length ? project.gallery : mediaList(project.icon);
    const [hero, ...rest] = medias;

    useLayoutEffect(() => {
        // Deux frames : la première pose la géométrie de départ, la seconde
        // déclenche la transition (sinon le navigateur fusionne les deux états).
        const raf = requestAnimationFrame(() => requestAnimationFrame(() => setPhase('open')));
        // Filet de sécurité : onglet passé en arrière-plan juste après le clic,
        // les rAF sont alors gelés et le panneau resterait à mi-chemin.
        const fallback = window.setTimeout(() => setPhase('open'), 80);

        return () => {
            cancelAnimationFrame(raf);
            window.clearTimeout(fallback);
        };
    }, []);

    useEffect(() => {
        // C'est Lenis qui pilote le scroll de la page : `overflow: hidden` sur
        // le body n'aurait aucun effet. Le panneau scrolle nativement.
        lenis?.stop();
        return () => lenis?.start();
    }, [lenis]);

    // Ref et pas `phase` : le garde-fou doit rester lisible depuis un listener
    // enregistré une seule fois, sans se périmer au changement d'état.
    const closingRef = useRef(false);

    const startClose = useCallback(() => {
        if (closingRef.current) return;
        closingRef.current = true;
        setPhase('closing');
        // Le démontage attend la fin du retour vers la carte.
        closeTimer.current = window.setTimeout(onClose, PANEL_DURATION_MS);
    }, [onClose]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') startClose();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [startClose]);

    // Au démontage seulement : purger le timer ici reviendrait sinon à annuler
    // la fermeture que l'on vient de déclencher.
    useEffect(() => () => window.clearTimeout(closeTimer.current), []);

    const collapsed = phase !== 'open';
    const geometry: React.CSSProperties = collapsed
        ? {top: origin.top, left: origin.left, width: origin.width, height: origin.height}
        : {top: 0, left: 0, width: '100vw', height: '100vh'};

    const meta = [
        {label: labels.year, value: project.year},
        {label: labels.type, value: project.type},
        {label: labels.role, value: project.role},
        {label: labels.status, value: project.status},
    ].filter((item) => item.value);

    return createPortal(
        <div className={`ppanel-root ${phase === 'open' ? 'is-open' : ''}`}>
            <div className="ppanel-backdrop" onClick={startClose}/>

            <article className="ppanel" style={geometry}>
                <button type="button" className="ppanel-close" onClick={startClose} aria-label={labels.close}>
                    ✕
                </button>

                {/* Lenis est arrêté pendant l'ouverture et annule alors tous les
                    wheel/touch de la page, y compris ceux du panneau. L'attribut
                    est testé avant ce blocage : le scroll interne redevient natif. */}
                <div className="ppanel-scroll" data-lenis-prevent>
                    <header className="ppanel-head">
                        <span className="ppanel-eyebrow">
                            <Icon aria-hidden="true"/>
                            {labels.eyebrow} — {String(index + 1).padStart(2, '0')}
                        </span>

                        <h2 className="ppanel-name">{project.name}</h2>
                        <p className="ppanel-title">{project.title}</p>

                        {meta.length > 0 && (
                            <dl className="ppanel-meta">
                                {meta.map((item) => (
                                    <div key={item.label}>
                                        <dt>{item.label}</dt>
                                        <dd>{item.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        )}
                    </header>

                    <figure className="ppanel-hero">
                        <Media src={hero} alt={project.name}/>
                    </figure>

                    <div className="ppanel-body">
                        <section className="ppanel-block">
                            <h3 className="ppanel-block-title">{labels.overview}</h3>
                            <p className="ppanel-text">{project.desc}</p>
                            {project.context && <p className="ppanel-text">{project.context}</p>}
                        </section>

                        {project.features?.length ? (
                            <section className="ppanel-block">
                                <h3 className="ppanel-block-title">{labels.features}</h3>
                                <ul className="ppanel-list">
                                    {project.features.map((feature) => <li key={feature}>{feature}</li>)}
                                </ul>
                            </section>
                        ) : null}

                        {project.challenges?.length ? (
                            <section className="ppanel-block">
                                <h3 className="ppanel-block-title">{labels.challenges}</h3>
                                <ul className="ppanel-list">
                                    {project.challenges.map((item) => <li key={item}>{item}</li>)}
                                </ul>
                            </section>
                        ) : null}

                        <section className="ppanel-block">
                            <h3 className="ppanel-block-title">{labels.stack}</h3>
                            <ul className="ppanel-stack">
                                {skillLabels(project.skills).map((skill) => <li key={skill}>{skill}</li>)}
                            </ul>
                        </section>

                        <section className="ppanel-block">
                            <h3 className="ppanel-block-title">{labels.links}</h3>
                            <ul className="ppanel-links">
                                <li>
                                    <span className="ppanel-link-label">{labels.site}</span>
                                    {project.demo
                                        ? <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                            {prettyUrl(project.demo)} ↗
                                        </a>
                                        : <span className="ppanel-link-empty">{labels.noLink}</span>}
                                </li>
                                {project.gh && (
                                    <li>
                                        <span className="ppanel-link-label">{labels.code}</span>
                                        <a href={project.gh} target="_blank" rel="noopener noreferrer">
                                            <FaGithub aria-hidden="true"/>
                                            {prettyUrl(project.gh)} ↗
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </section>

                        {rest.length > 0 && (
                            <section className="ppanel-block ppanel-block--wide">
                                <h3 className="ppanel-block-title">{labels.gallery}</h3>
                                <div className="ppanel-gallery">
                                    {rest.map((src) => (
                                        <figure key={src}>
                                            <Media src={src} alt={project.name}/>
                                        </figure>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </article>
        </div>,
        document.body,
    );
};

export default ProjectPanel;

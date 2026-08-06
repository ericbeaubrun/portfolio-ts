import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {FaGithub} from 'react-icons/fa';
import {FaArrowDown} from 'react-icons/fa6';
import type Lenis from 'lenis';
import {isVideo, mediaList, prettyUrl, Project, projectIcon, projectImageSrcSet, projectLogo, skillLabels} from './project.ts';
import {useLanguage} from '../Utils/useLanguage.ts';
import './ProjectPanel.scss';

/** Doit rester aligné sur `$panel-close-duration` dans ProjectPanel.scss. */
const PANEL_CLOSE_DURATION_MS = 420;

interface Props {
    project: Project;
    /** Position de la carte cliquée : point de départ et d'arrivée du panneau. */
    origin: DOMRect;
    onClose: () => void;
    lenis: Lenis | null;
}

interface Labels {
    overview: string;
    features: string;
    stack: string;
    challenges: string;
    links: string;
    site: string;
    code: string;
    close: string;
    year: string;
    type: string;
    noLink: string;
    prev: string;
    next: string;
}

const FALLBACK_LABELS: Labels = {
    overview: 'Le projet', features: 'Fonctionnalités clés',
    stack: 'Stack technique', challenges: 'Défis techniques',
    links: 'Liens', site: 'Site en ligne', code: 'Code source', close: 'Fermer',
    year: 'Année', type: 'Nature', noLink: 'Pas de démo publique',
    prev: 'Précédent', next: 'Suivant',
};

const Media: React.FC<{ src: string; alt: string }> = ({src, alt}) => (
    isVideo(src)
        ? <video src={src} autoPlay muted loop playsInline preload="metadata"/>
        : <img
            src={src}
            srcSet={projectImageSrcSet(src)}
            sizes="(max-width: 1628px) 86vw, 1400px"
            alt={alt}
            loading="lazy"
            decoding="async"
        />
);

/**
 * Même mouvement que l'accordéon de contacts du footer : le bloc cliqué
 * poursuit sa course jusqu'au plein écran, sans coupure ni fondu. Ici la carte
 * n'est pas un panneau plein largeur, donc l'agrandissement se fait en FLIP :
 * le panneau démarre exactement sur le cadre de la carte (position fixe), puis
 * transitionne vers `0 / 0 / 100vw / 100vh`. La fermeture rejoue l'inverse.
 */
const ProjectPanel: React.FC<Props> = ({project, origin, onClose, lenis}) => {
    const {content} = useLanguage();
    const labels: Labels = {...FALLBACK_LABELS, ...content['project-overlay']};

    // 'start' : posé sur la carte. 'open' : plein écran. 'closing' : retour.
    const [phase, setPhase] = useState<'start' | 'open' | 'closing'>('start');
    const closeTimer = useRef<number>();

    const Icon = projectIcon(project.name);
    const logo = projectLogo(project.name);

    const medias = mediaList(project.gallery?.length ? project.gallery : project.icon);

    // Carousel : tous les médias passent par le hero, il n'y a plus de galerie.
    const [slide, setSlide] = useState(0);
    const heroRef = useRef<HTMLDivElement>(null);

    const go = useCallback((next: number) => {
        setSlide((next + medias.length) % medias.length);
    }, [medias.length]);

    // Une seule vidéo doit tourner à la fois : les autres sont mises en pause
    // pour ne pas empiler des décodages hors écran.
    useEffect(() => {
        heroRef.current?.querySelectorAll('.ppanel-slide').forEach((el, index) => {
            const video = el.querySelector('video');
            if (!video) return;
            if (index === slide) video.play().catch(() => undefined);
            else video.pause();
        });
    }, [slide, medias]);

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
        closeTimer.current = window.setTimeout(onClose, PANEL_CLOSE_DURATION_MS);
    }, [onClose]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') startClose();
            if (e.key === 'ArrowLeft') go(slide - 1);
            if (e.key === 'ArrowRight') go(slide + 1);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [startClose, go, slide]);

    // Au démontage seulement : purger le timer ici reviendrait sinon à annuler
    // la fermeture que l'on vient de déclencher.
    useEffect(() => () => window.clearTimeout(closeTimer.current), []);

    // Seule l'ouverture part du cadre de la carte. À la fermeture le panneau
    // garde sa géométrie plein écran et s'échappe par le bas (voir `is-closing`) :
    // rejouer le FLIP inverse le ferait rétrécir vers une carte souvent hors vue.
    const geometry: React.CSSProperties = phase === 'start'
        ? {top: origin.top, left: origin.left, width: origin.width, height: origin.height}
        : {top: 0, left: 0, width: '100vw', height: '100vh'};

    const meta = [
        {label: labels.year, value: project.year},
        {label: labels.type, value: project.type},
        {
            label: labels.site,
            value: (project.demo || project.gh) ? (
                <span className="ppanel-links">
                    {project.demo
                        ? <a href={project.demo} target="_blank" rel="noopener noreferrer">{prettyUrl(project.demo)} ↗</a>
                        : labels.noLink}
                    {project.gh && (
                        <a href={project.gh} target="_blank" rel="noopener noreferrer" className="ppanel-gh-link">
                            <FaGithub aria-hidden="true"/> {labels.code}
                        </a>
                    )}
                </span>
            ) : labels.noLink,
        },
    ].filter((item) => item.value);

    // `is-open` couvre aussi la fermeture : le contenu doit rester intact
    // pendant que le panneau descend, au lieu de se replier d'abord.
    return createPortal(
        <div className={`ppanel-root ${phase !== 'start' ? 'is-open' : ''} ${phase === 'closing' ? 'is-closing' : ''}`}>
            <div className="ppanel-backdrop" onClick={startClose}/>

            <article className="ppanel" style={geometry}>
                {/* Même bouton que la croix de l'accordéon de contacts : rouge,
                    libellé « fermer » à gauche du glyphe. */}
                <button type="button" className="ppanel-close" onClick={startClose} aria-label={labels.close}>
                    <span className="ppanel-close-label">{labels.close}</span>
                    ✕
                </button>

                {/* Lenis est arrêté pendant l'ouverture et annule alors tous les
                    wheel/touch de la page, y compris ceux du panneau. L'attribut
                    est testé avant ce blocage : le scroll interne redevient natif. */}
                <div className="ppanel-scroll" data-lenis-prevent>
                    <header className="ppanel-head">
                        <h2 className="ppanel-name">
                            {logo
                                ? <img className="ppanel-name-icon" src={logo} alt="" aria-hidden="true"/>
                                : <Icon className="ppanel-name-icon" aria-hidden="true"/>}
                            <span>{project.name}</span>
                        </h2>
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

                    <div className="ppanel-hero" ref={heroRef}>
                        <div className="ppanel-track" style={{transform: `translateX(-${slide * 100}%)`}}>
                            {medias.map((src) => (
                                <figure key={src} className="ppanel-slide">
                                    <Media src={src} alt={project.name}/>
                                </figure>
                            ))}
                        </div>

                        {medias.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    className="ppanel-nav ppanel-nav--prev"
                                    onClick={() => go(slide - 1)}
                                    aria-label={labels.prev}
                                >
                                    ‹
                                </button>
                                <button
                                    type="button"
                                    className="ppanel-nav ppanel-nav--next"
                                    onClick={() => go(slide + 1)}
                                    aria-label={labels.next}
                                >
                                    ›
                                </button>

                                <div className="ppanel-dots">
                                    {medias.map((src, index) => (
                                        <button
                                            key={src}
                                            type="button"
                                            className={`ppanel-dot ${index === slide ? 'is-active' : ''}`}
                                            onClick={() => go(index)}
                                            aria-label={`${index + 1} / ${medias.length}`}
                                            aria-current={index === slide}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

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
                    </div>

                    <button type="button" className="ppanel-close-bottom" onClick={startClose}>
                        {labels.close}
                        <FaArrowDown aria-hidden="true"/>
                    </button>
                </div>
            </article>
        </div>,
        document.body,
    );
};

export default ProjectPanel;

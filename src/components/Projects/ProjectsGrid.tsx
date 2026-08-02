import React, {useLayoutEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {FaArrowRight, FaGithub} from 'react-icons/fa';
import type Lenis from 'lenis';
import {
    isVideo,
    mainMedia,
    prettyUrl,
    Project,
    projectIcon,
    projectImageSrcSet,
    skillLabels,
} from './project.ts';
import ScrollingBand from './ScrollingBand.tsx';
import Banner from './Banner.tsx';
import ProjectPanel from './ProjectPanel.tsx';
import ProjectsNav from './ProjectsNav.tsx';
import {useLanguage} from '../Utils/useLanguage.ts';
import {publicAssetUrl} from '../Utils/publicAssetUrl.ts';
import './ProjectsGrid.scss';

gsap.registerPlugin(ScrollTrigger);

interface Props {
    projects: Project[];
    title: string;
    /** Le scroll de la page doit être gelé pendant l'ouverture d'un projet. */
    lenis: Lenis | null;
}

/** Projet ouvert en plein écran, et cadre d'où part son agrandissement. */
interface OpenState {
    index: number;
    origin: DOMRect;
}

/**
 * Gabarits de la grille (12 colonnes). Le décalage vertical crée le rythme :
 * une carte sur deux « tombe » plus bas que sa voisine.
 */
const LAYOUTS = [
    {col: '1 / 8', ratio: '16 / 10', offset: 0},
    {col: '9 / 13', ratio: '3 / 4', offset: 18},
    {col: '1 / 6', ratio: '4 / 5', offset: 6},
    {col: '7 / 13', ratio: '16 / 10', offset: 24},
    {col: '2 / 9', ratio: '16 / 9', offset: 0},
    {col: '9 / 13', ratio: '3 / 4', offset: 14},
];

// Course du déplacement au survol (% de la taille du média) et zoom qui crée la
// marge nécessaire pour ne pas laisser apparaître de vide dans le cadre.
const HOVER_SHIFT = 7;
const HOVER_SCALE = 1.18;

// Contre-glissement du média à l'entrée. Le zoom doit couvrir la course des
// deux côtés (marge = (scale - 1) / 2), sinon le fond du cadre apparaît en
// bande sur toute la durée du scrub.
const ENTER_SHIFT = 7;
const ENTER_SCALE = 1 + (ENTER_SHIFT * 2) / 100;

const ProjectsGrid: React.FC<Props> = ({projects, title, lenis}) => {
    const sectionRef = useRef<HTMLElement>(null);
    const {content} = useLanguage();
    const [open, setOpen] = useState<OpenState | null>(null);
    const openLabel = content['project-overlay'].open;

    // Le panneau part du cadre cliqué : on relève sa position à l'instant du clic.
    const openProject = (index: number, frame: HTMLElement | null) => {
        if (!frame) return;
        setOpen({index, origin: frame.getBoundingClientRect()});
    };

    useLayoutEffect(() => {
        // Pas de survol sur tactile : on évite d'attacher les listeners.
        const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        const cleanups: Array<() => void> = [];

        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>('.pgrid-item').forEach((item) => {
                const frame = item.querySelector<HTMLElement>('.pgrid-frame');
                const media = item.querySelector<HTMLElement>('.pgrid-media');
                const inner = item.querySelector<HTMLElement>('.pgrid-media-inner');
                const lines = item.querySelectorAll<HTMLElement>('.pgrid-line > *');

                // Chaque carte entre par son propre bord (gauche ou droite selon sa
                // colonne) et la course est pilotée par le scroll — pas une simple
                // apparition déclenchée au passage.
                const fromLeft = item.dataset.side !== 'right';
                const sign = fromLeft ? -1 : 1;

                if (frame && media) {
                    gsap.timeline({
                        scrollTrigger: {trigger: item, start: 'top 92%', end: 'top 45%', scrub: 0.6},
                    })
                        // Le masque s'ouvre depuis le même bord que la translation :
                        // la carte semble sortir de la tranche de l'écran.
                        .fromTo(frame,
                            {clipPath: fromLeft ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)'},
                            {clipPath: 'inset(0% 0% 0% 0%)', ease: 'none'}, 0)
                        .fromTo(item,
                            {xPercent: sign * 55, autoAlpha: 0.2},
                            {xPercent: 0, autoAlpha: 1, ease: 'none'}, 0)
                        // Contre-glissement du média : il rattrape son cadre, ce qui
                        // évite l'effet « bloc qui translate d'un seul tenant ».
                        // `x: 0` explicite : un remontage laisse un translate en px
                        // dans le style inline, qui s'ajouterait à xPercent et
                        // doublerait la course.
                        .fromTo(media,
                            {x: 0, xPercent: -sign * ENTER_SHIFT, scale: ENTER_SCALE},
                            {x: 0, xPercent: 0, scale: 1, ease: 'none'}, 0);
                }

                gsap.from(lines, {
                    yPercent: 110,
                    duration: 0.7,
                    stagger: 0.06,
                    ease: 'expo.out',
                    scrollTrigger: {trigger: item, start: 'top 70%'},
                });

                // Parallax interne : le média fait 140% de la hauteur du cadre,
                // soit ±14% de course avant de découvrir un bord.
                if (media) {
                    gsap.fromTo(media,
                        {yPercent: -13},
                        {
                            yPercent: 13,
                            ease: 'none',
                            scrollTrigger: {trigger: item, start: 'top bottom', end: 'bottom top', scrub: true},
                        });
                }

                // Déplacement au survol : le média est agrandi puis translaté à
                // l'inverse du curseur, ce qui découvre les bords masqués par le
                // cadre (et par le parallax de scroll).
                const frameEl = item.querySelector<HTMLElement>('.pgrid-frame');
                if (inner && frameEl && finePointer) {
                    const xTo = gsap.quickTo(inner, 'xPercent', {duration: 0.6, ease: 'power3.out'});
                    const yTo = gsap.quickTo(inner, 'yPercent', {duration: 0.6, ease: 'power3.out'});

                    const onEnter = () => gsap.to(inner, {scale: HOVER_SCALE, duration: 0.6, ease: 'power3.out'});
                    const onMove = (e: PointerEvent) => {
                        const r = frameEl.getBoundingClientRect();
                        // -0.5..0.5 → on inverse pour « pousser » l'image.
                        xTo(-((e.clientX - r.left) / r.width - 0.5) * 2 * HOVER_SHIFT);
                        yTo(-((e.clientY - r.top) / r.height - 0.5) * 2 * HOVER_SHIFT);
                    };
                    const onLeave = () => {
                        gsap.to(inner, {scale: 1, duration: 0.7, ease: 'power3.out'});
                        xTo(0);
                        yTo(0);
                    };

                    frameEl.addEventListener('pointerenter', onEnter);
                    frameEl.addEventListener('pointermove', onMove);
                    frameEl.addEventListener('pointerleave', onLeave);
                    cleanups.push(() => {
                        frameEl.removeEventListener('pointerenter', onEnter);
                        frameEl.removeEventListener('pointermove', onMove);
                        frameEl.removeEventListener('pointerleave', onLeave);
                    });
                }
            });
        }, sectionRef);

        return () => {
            cleanups.forEach((fn) => fn());
            ctx.revert();
        };
    }, [projects]);

    return (
        <section id="projects" className="projects-grid" ref={sectionRef}>
            <ProjectsNav projects={projects} lenis={lenis} hidden={!!open}/>
            {/* Le padding vit ici et pas sur la section : le bloc « voir plus »
                et la bande de skills doivent rester pleine largeur. */}
            <div className="pgrid-inner">
                <header className="pgrid-head">
                    {/* Même composant que le titre « à propos » : taille, graisse,
                        espacement et animation d'apparition sont ainsi partagés. */}
                    <Banner text={title}/>
                    <span className="pgrid-count">{String(projects.length).padStart(2, '0')} projets</span>
                </header>

                <div className="pgrid">
                    {projects.map((project, index) => {
                        const layout = LAYOUTS[index % LAYOUTS.length];
                        const src = mainMedia(project.icon);
                        const icon = React.createElement(projectIcon(project.name));

                        return (
                            <article
                                key={project.name}
                                className="pgrid-item"
                                // Colonne de départ : au-delà de la moitié de la grille,
                                // la carte est à droite et entrera donc par la droite.
                                data-side={parseInt(layout.col, 10) >= 7 ? 'right' : 'left'}
                                style={{gridColumn: layout.col, marginTop: `${layout.offset}vh`}}
                            >
                                {/* div et non <a> : le cadre ouvre le panneau, et il
                                    contient déjà un lien GitHub. */}
                                <div className="pgrid-link">
                                    <div className="pgrid-frame" style={{aspectRatio: layout.ratio}}>
                                        <div className="pgrid-media">
                                            <div className="pgrid-media-inner">
                                                {isVideo(src)
                                                    ? <video src={src} autoPlay muted loop playsInline
                                                             preload="metadata"/>
                                                    : <img
                                                        src={src}
                                                        srcSet={projectImageSrcSet(src)}
                                                        sizes="(max-width: 1024px) 88vw, 52vw"
                                                        alt={project.name}
                                                        loading="lazy"
                                                        decoding="async"
                                                    />}
                                            </div>
                                        </div>

                                        {/* Surcouche plutôt qu'un cadre cliquable : la
                                            pastille GitHub reste un lien à part entière. */}
                                        <button
                                            type="button"
                                            className="pgrid-open"
                                            onClick={(e) => openProject(index, e.currentTarget.closest('.pgrid-frame'))}
                                            aria-label={`${project.name} — ${openLabel}`}
                                        />

                                        {project.gh && (
                                            <a
                                                className="pgrid-gh"
                                                href={project.gh}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`${project.name} — GitHub`}
                                                title={`${project.name} — GitHub`}
                                            >
                                                <FaGithub/>
                                            </a>
                                        )}
                                        {/* Pastille qui glisse depuis le bord gauche du
                                            cadre : le texte suit avec un léger retard. */}
                                        <span className="pgrid-cta" aria-hidden="true">
                                            <span className="pgrid-cta-label">{openLabel}</span>
                                            <span className="pgrid-cta-arrow">↗</span>
                                        </span>
                                    </div>

                                    <div className="pgrid-content">
                                        <div className="pgrid-line">
                                            <h3 className="pgrid-name">
                                                <span className="pgrid-icon" aria-hidden="true">{icon}</span>
                                                {/* Quand le projet est en ligne, son adresse
                                                    remplace le titre et devient cliquable. */}
                                                {project.demo
                                                    ? <a
                                                        className="pgrid-url"
                                                        href={project.demo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        {prettyUrl(project.demo)}
                                                    </a>
                                                    : project.name}
                                            </h3>
                                        </div>
                                        <div className="pgrid-line">
                                            <p className="pgrid-desc">{project.desc}</p>
                                        </div>
                                        <div className="pgrid-line">
                                            <ul className="pgrid-stack">
                                                {skillLabels(project.skills).slice(0, 5).map((skill) => (
                                                    <li key={skill}>{skill}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>

            <div className="projects-more">
                <p className="more-text">{content["projects-more-text"]}</p>
                <button
                    className="more-button"
                    onClick={() => window.open('https://github.com/ericbeaubrun?tab=repositories', '_blank')}
                >
                    <span className="text">
                        {content["projects-more-button"]}
                        <FaArrowRight className="button-icon"/>
                    </span>
                    <div
                        className="wave-btn"
                        style={{backgroundImage: `url(${publicAssetUrl('assets/wave3.svg')})`}}
                    />
                </button>
            </div>

            <ScrollingBand/>

            {open && projects[open.index] && (
                <ProjectPanel
                    project={projects[open.index]}
                    origin={open.origin}
                    onClose={() => setOpen(null)}
                    lenis={lenis}
                />
            )}
        </section>
    );
};

export default ProjectsGrid;

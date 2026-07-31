import React, {useLayoutEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {FaArrowRight, FaGithub} from 'react-icons/fa';
import type Lenis from 'lenis';
import {isVideo, mainMedia, prettyUrl, Project, projectIcon, skillLabels} from './project.ts';
import ScrollingBand from './ScrollingBand.tsx';
import ProjectPanel from './ProjectPanel.tsx';
import {useLanguage} from '../Utils/LanguageContext.tsx';
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

const ProjectsGrid: React.FC<Props> = ({projects, title, lenis}) => {
    const sectionRef = useRef<HTMLElement>(null);
    const {content} = useLanguage();
    const [open, setOpen] = useState<OpenState | null>(null);
    const openLabel = (content as any)['project-overlay']?.open ?? 'Voir le projet';

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

                // Reveal : le cadre se dévoile par le bas (masque), le média
                // contre-glisse pour éviter l'effet « rideau » plat.
                if (frame && media) {
                    gsap.timeline({scrollTrigger: {trigger: item, start: 'top 85%'}})
                        .fromTo(frame,
                            {clipPath: 'inset(100% 0% 0% 0%)'},
                            {clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'expo.out'})
                        .from(media, {scale: 1.25, duration: 1.1, ease: 'expo.out'}, 0)
                        .from(lines, {yPercent: 110, duration: 0.7, stagger: 0.06, ease: 'expo.out'}, 0.25);
                }

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
            {/* Le padding vit ici et pas sur la section : le bloc « voir plus »
                et la bande de skills doivent rester pleine largeur. */}
            <div className="pgrid-inner">
                <header className="pgrid-head">
                    <h2 className="pgrid-title">{title}</h2>
                    <span className="pgrid-count">{String(projects.length).padStart(2, '0')} projets</span>
                </header>

                <div className="pgrid">
                    {projects.map((project, index) => {
                        const layout = LAYOUTS[index % LAYOUTS.length];
                        const src = mainMedia(project.icon);
                        const Icon = projectIcon(project.name);

                        return (
                            <article
                                key={project.name}
                                className="pgrid-item"
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
                                                    : <img src={src} alt={project.name} loading="lazy"/>}
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
                                        <span className="pgrid-cta">{openLabel} ↗</span>
                                    </div>

                                    <div className="pgrid-content">
                                        <div className="pgrid-line">
                                            <h3 className="pgrid-name">
                                                <span className="pgrid-icon" aria-hidden="true"><Icon/></span>
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
                <p className="more-text">{(content as any)["projects-more-text"]}</p>
                <button
                    className="more-button"
                    onClick={() => window.open('https://github.com/ericbeaubrun?tab=repositories', '_blank')}
                >
                    <span className="text">
                        {(content as any)["projects-more-button"]}
                        <FaArrowRight className="button-icon"/>
                    </span>
                    <div className="wave-btn"></div>
                </button>
            </div>

            <ScrollingBand/>

            {open && projects[open.index] && (
                <ProjectPanel
                    project={projects[open.index]}
                    index={open.index}
                    origin={open.origin}
                    onClose={() => setOpen(null)}
                    lenis={lenis}
                />
            )}
        </section>
    );
};

export default ProjectsGrid;

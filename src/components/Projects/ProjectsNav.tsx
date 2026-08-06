import React, {useEffect, useState} from 'react';
import type Lenis from 'lenis';
import {Project, projectIcon, projectLogo} from './project.ts';
import './ProjectsNav.scss';

interface Props {
    projects: Project[];
    /** Le scroll doux est piloté par Lenis : `scrollIntoView` le court-circuiterait. */
    lenis: Lenis | null;
    /** Le rail s'efface quand un projet est ouvert en plein écran. */
    hidden?: boolean;
}

/**
 * Rail de navigation des projets : une barre par projet, calée à gauche de
 * l'écran. Il n'apparaît que pendant la traversée de la section, indique la
 * carte courante et permet d'aller directement à n'importe quelle autre.
 */
const ProjectsNav: React.FC<Props> = ({projects, lenis, hidden}) => {
    const [active, setActive] = useState(0);
    // Trois états et non un booléen : la sortie ne rejoue pas l'entrée à
    // l'envers (on entre par la gauche, on sort par la droite), il faut donc
    // distinguer « pas encore vu » de « vient de partir ».
    const [phase, setPhase] = useState<'idle' | 'in' | 'out'>('idle');
    // Survol : c'est lui qui décide de la fiche affichée, l'index actif ne
    // servant que de repli quand la souris est ailleurs.
    const [hover, setHover] = useState<number | null>(null);

    // Le rail ne vit que pendant la section projets.
    useEffect(() => {
        const section = document.getElementById('projects');
        if (!section) return;

        const io = new IntersectionObserver(
            ([entry]) => setPhase((prev) => {
                if (entry.isIntersecting) return 'in';
                // On ne joue la sortie que si le rail était effectivement là.
                return prev === 'in' ? 'out' : 'idle';
            }),
            // Marges négatives : on n'affiche pas le rail pour quelques pixels
            // de section qui dépassent en haut ou en bas du viewport.
            {rootMargin: '-25% 0px -25% 0px'},
        );
        io.observe(section);
        return () => io.disconnect();
    }, []);

    // Une fois la sortie jouée, on revient à l'état d'attente : la prochaine
    // apparition repartira bien de la gauche.
    useEffect(() => {
        if (phase !== 'out') return;
        const timer = window.setTimeout(() => setPhase('idle'), 800);
        return () => window.clearTimeout(timer);
    }, [phase]);

    // Carte courante : celle qui occupe la bande centrale du viewport.
    useEffect(() => {
        const items = Array.from(document.querySelectorAll<HTMLElement>('.pgrid-item'));
        if (!items.length) return;

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const index = items.indexOf(entry.target as HTMLElement);
                    if (index >= 0) setActive(index);
                });
            },
            {rootMargin: '-45% 0px -45% 0px'},
        );
        items.forEach((item) => io.observe(item));
        return () => io.disconnect();
    }, [projects]);

    const goTo = (index: number) => {
        const item = document.querySelectorAll<HTMLElement>('.pgrid-item')[index];
        if (!item) return;

        // -12vh : la carte se cale sous le haut de l'écran plutôt que collée.
        const offset = -window.innerHeight * 0.12;
        if (lenis) {
            lenis.scrollTo(item, {offset, duration: 1.2});
        } else {
            window.scrollTo({top: item.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth'});
        }
    };

    // La fiche ne décrit que la barre survolée. On garde le dernier index le
    // temps de la disparition, sinon le contenu se viderait avant le fondu.
    const shown = hover ?? active;
    const shownName = projects[shown]?.name ?? '';
    const logo = projectLogo(shownName);
    const icon = logo
        ? <img src={logo} alt=""/>
        : React.createElement(projectIcon(shownName));

    return (
        <nav
            className={`pnav is-${hidden && phase === 'in' ? 'out' : phase}`}
            aria-label="Navigation des projets"
            onMouseLeave={() => setHover(null)}
        >
            <ul className="pnav-list">
                {projects.map((project, index) => (
                    <li key={project.name}>
                        <button
                            type="button"
                            className={`pnav-item${index === active ? ' is-active' : ''}`}
                            // Rang de la barre : sert au décalage en cascade de
                            // l'entrée et de la sortie.
                            style={{'--i': index} as React.CSSProperties}
                            onClick={() => goTo(index)}
                            onMouseEnter={() => setHover(index)}
                            onFocus={() => setHover(index)}
                            onBlur={() => setHover(null)}
                            aria-label={project.name}
                            aria-current={index === active}
                        >
                            <span className="pnav-tick" aria-hidden="true"/>
                        </button>
                    </li>
                ))}
            </ul>

            {/* Une seule fiche déplacée verticalement : elle glisse d'un projet
                à l'autre au lieu d'apparaître et disparaître à chaque ligne. */}
            <div
                className={`pnav-card${hover !== null ? ' is-shown' : ''}`}
                style={{'--row': shown} as React.CSSProperties}
                aria-hidden="true"
            >
                <h4 className="pnav-card-title">
                    <span className="pnav-card-icon">{icon}</span>
                    {projects[shown]?.name}
                </h4>
                <p className="pnav-card-desc">{projects[shown]?.desc}</p>
            </div>
        </nav>
    );
};

export default ProjectsNav;

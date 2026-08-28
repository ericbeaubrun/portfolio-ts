import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {scroller} from 'react-scroll';
import type Lenis from 'lenis';
import Banner from '../Projects/Banner.tsx';
import ArrowUpRight from '../Utils/ArrowUpRight.tsx';
import {useLanguage} from '../Utils/useLanguage.ts';
import {serviceIcon} from './services.ts';
import './Services.scss';

gsap.registerPlugin(ScrollTrigger);

interface Props {
    /** Le scroll doux vers le contact passe par Lenis, comme dans la navbar. */
    lenis: Lenis | null;
}

/**
 * Empilement des pôles : chaque carte se fige un cran plus bas que la
 * précédente, ce qui laisse dépasser le bord des cartes déjà vues. Les mêmes
 * valeurs servent au CSS (variables) et à la mesure de sécurité en JS.
 */
const STICKY_TOP_VH = 6;
const STICKY_PEEK_REM = 2.8;
/** Marge sous la carte : la ligne dépliée au survol ne doit pas sortir du cadre. */
const STICKY_HEADROOM_PX = 88;

const CONTACT_SCROLL_DURATION = 500;

const Services: React.FC<Props> = ({lenis}) => {
    const {content} = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);
    // Une seule expertise dépliée au clic, repérée par `${pôle}-${rang}`.
    // Le survol (pointeur fin) déplie en plus, mais sans passer par l'état.
    const [openRow, setOpenRow] = useState<string | null>(null);
    // L'empilement n'est activé que si les cartes tiennent réellement dans la
    // fenêtre : sinon leur bas resterait inaccessible sous le point de collage.
    const [stacked, setStacked] = useState(false);

    const pillars = content.services;
    const labels = content['services-labels'];
    const total = pillars.reduce((count, pillar) => count + pillar.items.length, 0);

    // Décide si les cartes peuvent être collées, à l'ouverture et à chaque
    // redimensionnement (la hauteur d'une carte dépend des retours à la ligne).
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        let frame: number | null = null;

        const measure = () => {
            frame = null;
            const pillarEls = Array.from(section.querySelectorAll<HTMLElement>('.svc-pillar'));
            if (pillarEls.length === 0) return;

            const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
            const deepestTop = window.innerHeight * (STICKY_TOP_VH / 100)
                + STICKY_PEEK_REM * rem * (pillarEls.length - 1);
            const available = window.innerHeight - deepestTop - STICKY_HEADROOM_PX;

            // `getBoundingClientRect` et non `offsetHeight` : les pôles sont
            // inclinés, et une carte large penchée de 3° occupe une soixantaine
            // de pixels de plus en hauteur que sa boîte de mise en page.
            setStacked(
                window.innerWidth > 1024
                && pillarEls.every((pillar) => pillar.getBoundingClientRect().height <= available),
            );
        };

        const schedule = () => {
            if (frame === null) frame = requestAnimationFrame(measure);
        };

        measure();
        // Poppins arrive après le premier rendu : les hauteurs mesurées avec la
        // police de repli sous-estiment les cartes et pourraient autoriser un
        // empilement qui ne tient pas.
        document.fonts?.ready.then(schedule).catch(() => undefined);
        window.addEventListener('resize', schedule);

        return () => {
            if (frame !== null) cancelAnimationFrame(frame);
            window.removeEventListener('resize', schedule);
        };
    }, [pillars]);

    // Passer en mode empilé change la position des cartes : les déclencheurs
    // calculés avant le basculement seraient décalés.
    useEffect(() => {
        ScrollTrigger.refresh();
    }, [stacked]);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            const pillarEls = gsap.utils.toArray<HTMLElement>('.svc-pillar');

            pillarEls.forEach((pillar, index) => {
                const card = pillar.querySelector<HTMLElement>('.svc-card');
                const heads = pillar.querySelectorAll<HTMLElement>('.svc-reveal');
                const rows = pillar.querySelectorAll<HTMLElement>('.svc-row-inner');
                const bar = pillar.querySelector<HTMLElement>('.svc-progress-bar');
                const veil = pillar.querySelector<HTMLElement>('.svc-veil');
                const next = pillarEls[index + 1];

                // La carte se redresse pendant sa montée : l'animation est finie
                // bien avant le point de collage, elle ne « rejoue » donc pas
                // pendant que la carte est figée.
                if (card) {
                    gsap.fromTo(card,
                        {yPercent: 7, autoAlpha: 0.25},
                        {
                            yPercent: 0, autoAlpha: 1, ease: 'none',
                            scrollTrigger: {trigger: pillar, start: 'top bottom', end: 'top 55%', scrub: 0.6},
                        });
                }

                // Titre, chapeau et promesse montent depuis leur masque, en cascade.
                gsap.from(heads, {
                    yPercent: 115,
                    duration: 0.9,
                    stagger: 0.08,
                    ease: 'expo.out',
                    scrollTrigger: {trigger: pillar, start: 'top 72%'},
                });

                // Puis les expertises, une par une : la liste « se remplit ».
                // Pas d'`autoAlpha` ici : le masque de `.svc-row` suffit à cacher
                // la ligne, et un `visibility: hidden` laisserait les quatorze
                // intitulés invisibles si le déclencheur ne se jouait jamais.
                gsap.from(rows, {
                    yPercent: 110,
                    duration: 0.75,
                    stagger: 0.055,
                    ease: 'expo.out',
                    scrollTrigger: {trigger: pillar, start: 'top 62%'},
                });

                // Jauge du pôle : elle se remplit au rythme de sa traversée.
                if (bar) {
                    gsap.fromTo(bar,
                        {scaleX: 0},
                        {
                            scaleX: 1, ease: 'none',
                            scrollTrigger: {trigger: pillar, start: 'top 65%', end: 'bottom 65%', scrub: 0.4},
                        });
                }

                // La carte s'assombrit à mesure que la suivante vient la couvrir :
                // seule celle du dessus reste pleinement lisible. Le voile est
                // masqué en CSS hors mode empilé, l'opacité y est sans effet.
                if (veil && next) {
                    gsap.fromTo(veil,
                        {opacity: 0},
                        {
                            opacity: 0.78, ease: 'none',
                            scrollTrigger: {trigger: next, start: 'top bottom', end: 'top 30%', scrub: true},
                        });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [pillars]);

    const goToContact = useCallback(() => {
        lenis?.stop();
        scroller.scrollTo('footer', {smooth: true, duration: CONTACT_SCROLL_DURATION});
        window.setTimeout(() => lenis?.start(), CONTACT_SCROLL_DURATION);
    }, [lenis]);

    return (
        <section
            id="services"
            className={`services${stacked ? ' is-stacked' : ''}`}
            ref={sectionRef}
            style={{
                '--svc-top': `${STICKY_TOP_VH}vh`,
                '--svc-peek': `${STICKY_PEEK_REM}rem`,
            } as React.CSSProperties}
        >
            <div className="svc-inner">
                {/* Même titre géant que « à propos » et « projets » : la section
                    s'inscrit dans le rythme du reste de la page. */}
                <header className="svc-head">
                    <Banner text={content['services-title']}/>
                    <span className="svc-count">
                        {String(pillars.length).padStart(2, '0')} {labels.pillars}
                        <span className="svc-count-sep" aria-hidden="true">—</span>
                        {total} {labels.expertises}
                    </span>
                </header>

                <p className="svc-intro">{content['services-intro']}</p>

                <div className="svc-stack">
                    {pillars.map((pillar, pillarIndex) => (
                        <article
                            key={pillar.id}
                            className="svc-pillar"
                            // `data-pillar` porte la couleur d'accent du pôle,
                            // définie dans Services.scss.
                            data-pillar={pillar.id}
                            style={{'--i': pillarIndex} as React.CSSProperties}
                        >
                            <div className="svc-card">
                                {/* Voile d'occultation, quand le pôle suivant
                                    vient recouvrir celui-ci. */}
                                <span className="svc-veil" aria-hidden="true"/>

                                <span className="svc-progress" aria-hidden="true">
                                    <span className="svc-progress-bar"/>
                                </span>

                                <header className="svc-pillar-head">
                                    <span className="svc-index" aria-hidden="true">{pillar.index}</span>

                                    <div className="svc-headings">
                                        <span className="svc-mask">
                                            <span className="svc-eyebrow svc-reveal">
                                                <span className="svc-eyebrow-dot" aria-hidden="true"/>
                                                {labels.gain} {pillar.eyebrow}
                                            </span>
                                        </span>
                                        <span className="svc-mask">
                                            <h3 className="svc-pillar-title svc-reveal">{pillar.title}</h3>
                                        </span>
                                        <span className="svc-mask">
                                            <p className="svc-promise svc-reveal">{pillar.promise}</p>
                                        </span>
                                    </div>
                                </header>

                                <ul className="svc-list">
                                    {pillar.items.map((item, itemIndex) => {
                                        const key = `${pillarIndex}-${itemIndex}`;
                                        const isOpen = openRow === key;
                                        const Icon = serviceIcon(item.id);

                                        return (
                                            <li
                                                key={item.id}
                                                className={`svc-row${isOpen ? ' is-open' : ''}`}
                                            >
                                                <div className="svc-row-inner">
                                                    <button
                                                        type="button"
                                                        className="svc-row-btn"
                                                        aria-expanded={isOpen}
                                                        onClick={() => setOpenRow(isOpen ? null : key)}
                                                    >
                                                        {/* Lavis qui balaie la ligne depuis la gauche
                                                            au survol : décoratif, hors du flux. */}
                                                        <span className="svc-row-fill" aria-hidden="true"/>

                                                        <span className="svc-row-icon" aria-hidden="true">
                                                            <Icon/>
                                                        </span>
                                                        <span className="svc-row-title">{item.title}</span>
                                                        <span className="svc-row-toggle" aria-hidden="true"/>

                                                        {/* Grille 0fr → 1fr : la hauteur s'anime sans
                                                            valeur codée en dur, et le texte reste dans
                                                            le DOM pour les lecteurs d'écran. */}
                                                        <span className="svc-row-desc">
                                                            <span className="svc-row-desc-clip">
                                                                <span className="svc-row-desc-text">{item.desc}</span>
                                                            </span>
                                                        </span>
                                                    </button>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </article>
                    ))}

                    {/* Réserve de collage du dernier pôle (cf. Services.scss). */}
                    <span className="svc-stack-spacer" aria-hidden="true"/>
                </div>

                <div className="svc-cta">
                    <p className="svc-cta-text">{labels['cta-text']}</p>
                    <button type="button" className="svc-cta-button" onClick={goToContact}>
                        <span className="svc-cta-label">{labels['cta-button']}</span>
                        <ArrowUpRight className="svc-cta-arrow"/>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Services;

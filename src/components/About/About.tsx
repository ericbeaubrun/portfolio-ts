import React, { useLayoutEffect, useRef } from 'react';
import Banner from '../Projects/Banner.tsx';
import './About.scss';
import { useLanguage } from "../Utils/LanguageContext.tsx";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SCRAMBLE_CHARS = '&$*à%#@!?§µ£¤/\\|<>[]{}=+~^0101';
const SCRAMBLE_DURATION = 900;
// Au-delà de ce nombre de mots révélés dans la même frame (scroll rapide),
// on affiche directement le texte final au lieu de lancer un déchiffrage.
const MAX_CONCURRENT_SCRAMBLES = 10;

const randomChar = () => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];

const About: React.FC = () => {
    const { content } = useLanguage();
    const presentationContent = (content as { introduction: { p1: string, p2: string } });
    const containerRef = useRef<HTMLDivElement>(null);

    const { p1, p2 } = presentationContent.introduction;

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const words = Array.from(container.querySelectorAll<HTMLElement>('.word'));
        if (words.length === 0) return;

        // État de chaque mot + frame de déchiffrage en cours.
        const revealed = words.map(() => false);
        const frames: (number | null)[] = words.map(() => null);

        const targets = words.map(word => ({
            word,
            render: word.querySelector<HTMLElement>('.word-render')!,
            text: word.dataset.text ?? '',
        }));

        const stopScramble = (index: number) => {
            const frame = frames[index];
            if (frame !== null) {
                cancelAnimationFrame(frame);
                frames[index] = null;
            }
        };

        const settle = (index: number) => {
            const { word, render, text } = targets[index];
            stopScramble(index);
            render.textContent = text;
            word.classList.remove('is-decrypting');
        };

        const scramble = (index: number) => {
            const { word, render, text } = targets[index];
            stopScramble(index);
            word.classList.add('is-decrypting');

            const start = performance.now();
            const tick = () => {
                const progress = Math.min((performance.now() - start) / SCRAMBLE_DURATION, 1);
                const settledCount = Math.floor(text.length * progress);

                let output = text.slice(0, settledCount);
                for (let i = settledCount; i < text.length; i++) {
                    output += randomChar();
                }
                render.textContent = output;

                if (progress < 1) {
                    frames[index] = requestAnimationFrame(tick);
                } else {
                    settle(index);
                }
            };

            tick();
        };

        const applyProgress = (progress: number) => {
            const revealCount = Math.round(Math.min(Math.max(progress, 0), 1) * targets.length);

            // Nombre de mots qui basculent d'un coup : au-delà du seuil, on saute
            // l'animation pour les plus anciens et on ne déchiffre que le front.
            let flipping = 0;
            for (let i = 0; i < targets.length; i++) {
                if (i < revealCount && !revealed[i]) flipping++;
            }
            const animateFrom = revealCount - Math.min(flipping, MAX_CONCURRENT_SCRAMBLES);

            for (let i = 0; i < targets.length; i++) {
                const shouldReveal = i < revealCount;
                if (shouldReveal === revealed[i]) continue;

                revealed[i] = shouldReveal;
                const { word } = targets[i];

                if (shouldReveal) {
                    word.classList.add('is-revealed');
                    if (i < animateFrom) {
                        settle(i);
                    } else {
                        scramble(i);
                    }
                } else {
                    word.classList.remove('is-revealed');
                    settle(i);
                }
            }
        };

        const trigger = ScrollTrigger.create({
            trigger: container,
            start: 'top 90%',
            end: 'bottom 65%',
            invalidateOnRefresh: true,
            onUpdate: self => applyProgress(self.progress),
            // Garde-fous : hors de la plage, ScrollTrigger n'émet plus onUpdate.
            // Sans ça, les derniers mots restent bloqués s'ils n'ont pas eu le temps
            // d'être révélés (c'était le bug du texte gris en fin de paragraphe).
            onLeave: () => applyProgress(1),
            onEnterBack: () => applyProgress(trigger.progress),
            onLeaveBack: () => applyProgress(0),
        });

        applyProgress(trigger.progress);

        return () => {
            frames.forEach((frame, index) => {
                if (frame !== null) cancelAnimationFrame(frame);
                targets[index].render.textContent = targets[index].text;
            });
            trigger.kill();
        };
    }, [p1, p2]);

    const splitText = (text: string) => {
        return text.split(' ').map((word, index) => (
            <span key={index} className="word" data-text={word}>
                {/* Fantôme : réserve la largeur finale et porte le texte lisible
                    par les lecteurs d'écran pendant le déchiffrage. */}
                <span className="word-ghost">{word}</span>
                <span className="word-render" aria-hidden="true">{word}</span>
            </span>
        )).reduce((acc, curr, i) => i === 0 ? [curr] : [...acc, ' ', curr], [] as React.ReactNode[]);
    };

    return (
        <section id="about">
            <div className="about-container">
                <Banner text={(content as any)["about-title"]} />
                <div className="about-text-content" ref={containerRef}>
                    <p>{splitText(p1)}</p>
                    <p>{splitText(p2)}</p>
                </div>
            </div>
        </section>
    );
};

export default About;

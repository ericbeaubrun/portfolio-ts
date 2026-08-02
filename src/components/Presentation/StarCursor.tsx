import {useEffect, useRef} from "react";
import "./StarCursor.scss";

type Point = { x: number; y: number };

// Étoile lumineuse qui suit la souris avec une traînée, limitée au hero.
const TRAIL_LENGTH = 45;   // nombre de points mémorisés pour la traînée
const EASE = 0.035;        // inertie : plus c'est bas, plus l'étoile traîne derrière la souris
const CORE_RADIUS = 8;     // rayon du cœur lumineux
const GLOW_RADIUS = CORE_RADIUS * 5;   // halo diffus autour du cœur
const FADE_IN = 0.12;      // vitesse d'apparition quand on revient sur le hero
const FADE_OUT = 0.045;    // vitesse d'extinction quand on quitte le hero
const BLOOM_MAX = 2.2;     // dilatation de la boule pendant son extinction

const StarCursor = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const section = canvas?.parentElement;
        if (!canvas || !section) return;

        // TODO: remettre le garde-fou `prefers-reduced-motion: reduce` avant de merger.
        const isCoarse = window.matchMedia("(pointer: coarse)").matches;
        if (isCoarse) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = 0;
        let height = 0;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = section.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener("resize", resize);

        const star: Point = {x: width / 2, y: height / 2};
        const target: Point = {...star};
        const trail: Point[] = Array.from({length: TRAIL_LENGTH}, () => ({...star}));
        let inside = false;
        let alpha = 0;   // opacité globale, animée pour le fondu entrée/sortie
        let bloom = 1;   // facteur d'échelle : la boule se dilate en s'éteignant

        const onMove = (e: PointerEvent) => {
            const rect = section.getBoundingClientRect();
            target.x = e.clientX - rect.left;
            target.y = e.clientY - rect.top;
            if (!inside) {
                inside = true;
                if (alpha < 0.02) {
                    // Réapparition à froid : on colle la traînée au curseur pour éviter le "fouet".
                    star.x = target.x;
                    star.y = target.y;
                    trail.forEach(p => {
                        p.x = target.x;
                        p.y = target.y;
                    });
                    bloom = 1;
                }
            }
        };
        const onLeave = () => {
            inside = false;
        };

        section.addEventListener("pointermove", onMove);
        section.addEventListener("pointerleave", onLeave);

        let raf = 0;
        const render = () => {
            raf = requestAnimationFrame(render);
            ctx.clearRect(0, 0, width, height);

            // Fondu : disparition lente et dilatée en sortie, retour plus franc en entrée.
            alpha += ((inside ? 1 : 0) - alpha) * (inside ? FADE_IN : FADE_OUT);
            bloom += ((inside ? 1 : BLOOM_MAX) - bloom) * (inside ? FADE_IN : FADE_OUT);
            if (alpha < 0.01 && !inside) return;

            star.x += (target.x - star.x) * EASE;
            star.y += (target.y - star.y) * EASE;

            trail.pop();
            trail.unshift({x: star.x, y: star.y});

            // Traînée : segments dégressifs en largeur et en opacité.
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            for (let i = 0; i < trail.length - 1; i++) {
                const t = 1 - i / trail.length;
                ctx.strokeStyle = `rgba(205, 226, 255, ${0.22 * t * t * alpha})`;
                ctx.lineWidth = CORE_RADIUS * 1.8 * t;
                ctx.beginPath();
                ctx.moveTo(trail[i].x, trail[i].y);
                ctx.lineTo(trail[i + 1].x, trail[i + 1].y);
                ctx.stroke();
            }

            ctx.globalAlpha = alpha;
            const glowRadius = GLOW_RADIUS * bloom;
            const coreRadius = CORE_RADIUS * bloom;

            // Halo diffus : dégradé long et progressif, sans bord net.
            const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, glowRadius);
            glow.addColorStop(0, "rgba(255, 255, 255, 0.85)");
            glow.addColorStop(0.18, "rgba(228, 240, 255, 0.45)");
            glow.addColorStop(0.45, "rgba(180, 205, 245, 0.16)");
            glow.addColorStop(0.75, "rgba(150, 180, 230, 0.05)");
            glow.addColorStop(1, "rgba(140, 175, 225, 0)");
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
            ctx.fill();

            // Cœur : petit disque blanc adouci par un second dégradé, pour éviter
            // l'arête franche d'un `arc` plein et garder l'aspect "boule de lumière".
            const core = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, coreRadius);
            core.addColorStop(0, "rgba(255, 255, 255, 1)");
            core.addColorStop(0.55, "rgba(255, 255, 255, 0.9)");
            core.addColorStop(1, "rgba(255, 255, 255, 0)");
            ctx.fillStyle = core;
            ctx.beginPath();
            ctx.arc(star.x, star.y, coreRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        };
        render();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
            section.removeEventListener("pointermove", onMove);
            section.removeEventListener("pointerleave", onLeave);
        };
    }, []);

    return <canvas ref={canvasRef} className="star-cursor" aria-hidden="true"/>;
};

export default StarCursor;

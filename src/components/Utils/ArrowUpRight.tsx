import type {SVGProps} from 'react';

/**
 * Flèche « vers le haut à droite » (public/assets/upper-right-arrow2.svg) inlinée :
 * la couleur suit `currentColor` et la taille suit la font-size du parent,
 * ce que ne permettrait pas un <img>.
 */
export default function ArrowUpRight(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 512 512"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            {...props}
        >
            <g transform="translate(0,512) scale(0.1,-0.1)">
                <path d="M1322 4738 l3 -383 1240 -3 1240 -2 -1903 -1903 -1902 -1902 273 -273 272 -272 1900 1900 1900 1900 5 -1237 5 -1238 383 -3 382 -2 0 1900 0 1900 -1900 0 -1900 0 2 -382z"/>
            </g>
        </svg>
    );
}

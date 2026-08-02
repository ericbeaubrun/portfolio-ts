import React, {useEffect, useState} from 'react';
import type {ContactItem, ContactLinksProps} from './contactItems.ts';
import {useLanguage} from '../../Utils/useLanguage.ts';
import './ContactLinksAccordion.scss';

const COPIED_FEEDBACK_MS = 2000;

/**
 * Proposition A2 + B2 — accordéon vertical qui va jusqu'au plein écran.
 * Survol : le panneau s'ouvre et écrase les deux autres.
 * Clic : il poursuit exactement le même mouvement jusqu'à occuper tout l'écran,
 * les deux autres se repliant à zéro. C'est une seule animation continue.
 */
const ContactLinksAccordion: React.FC<ContactLinksProps> = ({items, lenis}) => {
    const {content} = useLanguage();
    const labels = content.overlay;

    const [openKey, setOpenKey] = useState<ContactItem['key'] | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!openKey) return;

        // C'est Lenis qui pilote le scroll : `body { overflow: hidden }` n'aurait
        // aucun effet ici.
        lenis?.stop();

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpenKey(null);
        };
        window.addEventListener('keydown', onKeyDown);

        return () => {
            lenis?.start();
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [openKey, lenis]);

    useEffect(() => {
        if (!copied) return;
        const timer = setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
        return () => clearTimeout(timer);
    }, [copied]);

    const handleOpen = (item: ContactItem) => {
        setCopied(false);
        setOpenKey(item.key);
    };

    const handleClose = () => setOpenKey(null);

    const handleCopy = (item: ContactItem) => {
        navigator.clipboard.writeText(item.value).catch(() => undefined);
        setCopied(true);
    };

    return (
        <ul className={`cacc ${openKey ? 'has-open' : ''}`}>
            {items.map((item, index) => {
                const isOpen = openKey === item.key;

                return (
                    <li key={item.key} className={`cacc-item ${isOpen ? 'is-open' : ''}`}>
                        <div className="cacc-panel">
                            {/* Déclencheur en surcouche plutôt qu'un <a> englobant :
                                le panneau contient lui-même des boutons et un lien,
                                qu'on ne peut pas imbriquer dans un élément cliquable. */}
                            <button
                                type="button"
                                className="cacc-trigger"
                                onClick={() => handleOpen(item)}
                                aria-expanded={isOpen}
                                tabIndex={isOpen ? -1 : 0}
                            >
                                <span className="cacc-sr">{item.label}</span>
                            </button>

                            <span className="cacc-num">{String(index + 1).padStart(2, '0')}</span>

                            <span className="cacc-label">{item.label}</span>

                            <span className="cacc-icons">
                                <span className="cacc-arrow" aria-hidden="true">↗</span>
                                <button
                                    type="button"
                                    className="cacc-close"
                                    onClick={handleClose}
                                    tabIndex={isOpen ? 0 : -1}
                                    aria-label={labels.close}
                                >
                                    <span className="cacc-close-label">{labels.close}</span>
                                    ✕
                                </button>
                            </span>

                            <span className="cacc-value">{item.value}</span>

                            <span className="cacc-actions">
                                <button
                                    type="button"
                                    className={`cacc-action ${copied ? 'is-done' : ''}`}
                                    onClick={() => handleCopy(item)}
                                    tabIndex={isOpen ? 0 : -1}
                                >
                                    {copied ? labels.copied : labels.copy}
                                </button>

                                <a
                                    className="cacc-action"
                                    href={item.href}
                                    target={item.key === 'email' ? undefined : '_blank'}
                                    rel="noopener noreferrer"
                                    tabIndex={isOpen ? 0 : -1}
                                >
                                    {labels.open}
                                </a>
                            </span>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default ContactLinksAccordion;

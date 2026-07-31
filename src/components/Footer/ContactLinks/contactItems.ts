import type Lenis from 'lenis';

export interface ContactItem {
    key: 'phone' | 'linkedin' | 'email';
    /** Libellé affiché sur le panneau. */
    label: string;
    /** Valeur réelle, révélée au survol puis en grand à l'ouverture. */
    value: string;
    href: string;
}

interface Details {
    tel: string;
    linkedin: string;
    email: string;
}

export const buildContactItems = (details: Details, language: string): ContactItem[] => [
    {
        key: 'phone',
        label: language === 'fr' ? 'WhatsApp' : 'Phone',
        value: details.tel,
        href: `tel:${details.tel}`,
    },
    {
        key: 'linkedin',
        label: 'Linkedin',
        value: details.linkedin,
        href: `https://${details.linkedin}`,
    },
    {
        key: 'email',
        label: 'Mail',
        value: details.email,
        href: `mailto:${details.email}`,
    },
];

export interface ContactLinksProps {
    items: ContactItem[];
    /** Le scroll doit être gelé pendant qu'un panneau est ouvert en plein écran. */
    lenis: Lenis | null;
}

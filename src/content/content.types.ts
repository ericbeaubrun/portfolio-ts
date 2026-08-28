import type {Project} from '../components/Projects/project.ts';

export type Language = 'fr' | 'en';

export interface NavItem {
    title: string;
    subtitle: string;
}

/** Une expertise vendue, formulée du point de vue du bénéfice client. */
export interface ServiceItem {
    /** Clé de l'icône (voir `SERVICE_ICONS` dans components/Services/services.ts). */
    id: string;
    title: string;
    desc: string;
}

/** Un pôle d'offre : trois au total, chacun rattaché à un type de gain. */
export interface ServicePillar {
    id: string;
    /** Numéro affiché en chiffre géant : « 01 ». */
    index: string;
    /** Nature du gain : « Création », « Gain de temps », « Génération de revenus ». */
    eyebrow: string;
    title: string;
    /** Phrase d'accroche du pôle, avant la liste des expertises. */
    promise: string;
    items: ServiceItem[];
}

export interface ServiceLabels {
    pillars: string;
    expertises: string;
    gain: string;
    'cta-text': string;
    'cta-button': string;
}

export interface PortfolioStat {
    num: number;
    text: string;
}

export interface ContactDetails {
    title: string;
    email: string;
    tel: string;
    github: string;
    linkedin: string;
    hover_tel: string;
    hover_linkedin: string;
    hover_mail: string;
}

export interface AddressDetails {
    address: string;
}

export interface RevisionDetails {
    paragraph: string;
}

export type FooterEntry = ContactDetails | AddressDetails | RevisionDetails;

export interface ContactFormContent {
    title: string;
    btn: string;
    send: string;
    label_name: string;
    label_email: string;
    label_message: string;
    success_msg: string;
    error_msg: string;
    rgpd: string;
}

export interface ContactOverlayLabels {
    copy: string;
    copied: string;
    open: string;
    close: string;
}

export interface ProjectOverlayLabels {
    open: string;
    eyebrow: string;
    overview: string;
    features: string;
    stack: string;
    challenges: string;
    gallery: string;
    links: string;
    site: string;
    code: string;
    close: string;
    role: string;
    year: string;
    type: string;
    status: string;
    noLink: string;
    prev: string;
    next: string;
}

/** Libellés propres à la vue « portfolio simplifié » (route `#/simple`). */
export interface SimpleViewContent {
    /** Libellé du bouton qui remplace « Contacter » dans le hero. */
    button: string;
    button_hover: string;
    /** Lien de retour vers le portfolio complet. */
    back: string;
    tagline: string;
    'stack-title': string;
    'contact-title': string;
    cv: string;
    location: string;
}

export interface PortfolioContent {
    nav: NavItem[];
    title: string;
    profile_picture_alt: string;
    subtitle: string;
    introduction: {
        p1: string;
        p2: string;
    };
    'services-title': string;
    'services-intro': string;
    'services-labels': ServiceLabels;
    services: ServicePillar[];
    'about-title': string;
    'projects-title': string;
    'projects-more-text': string;
    'projects-more-button': string;
    projects: Project[];
    stats: PortfolioStat[];
    footer: FooterEntry[];
    'contact-form': ContactFormContent;
    contact_button: string;
    contact_button_hover: string;
    'scrolling-text': string;
    'source-code': string;
    'see-more': string;
    'see-more-gh': string;
    hide: string;
    'read-more': string;
    overlay: ContactOverlayLabels;
    'project-overlay': ProjectOverlayLabels;
    simple: SimpleViewContent;
}

export const isAddressDetails = (entry: FooterEntry | undefined): entry is AddressDetails =>
    Boolean(entry && 'address' in entry);

export const isContactDetails = (entry: FooterEntry | undefined): entry is ContactDetails =>
    Boolean(entry && 'email' in entry && 'tel' in entry && 'linkedin' in entry);

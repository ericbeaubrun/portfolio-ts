import type {Project} from '../components/Projects/project.ts';

export type Language = 'fr' | 'en';

export interface NavItem {
    title: string;
    subtitle: string;
}

export interface Service {
    icon: string;
    title: string;
    p: string;
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

export interface PortfolioContent {
    nav: NavItem[];
    title: string;
    profile_picture_alt: string;
    subtitle: string;
    introduction: {
        p1: string;
        p2: string;
    };
    services: Service[];
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
}

export const isContactDetails = (entry: FooterEntry | undefined): entry is ContactDetails =>
    Boolean(entry && 'email' in entry && 'tel' in entry && 'linkedin' in entry);

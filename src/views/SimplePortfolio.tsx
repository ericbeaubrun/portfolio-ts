import './SimplePortfolio.scss';
import {useEffect} from 'react';
import {useLanguage} from '../components/Utils/useLanguage.ts';
import LanguageSwitcher from '../components/Utils/LanguageSwitcher.tsx';
import {publicAssetUrl} from '../components/Utils/publicAssetUrl.ts';
import {navigateTo} from '../components/Utils/useHashRoute.ts';
import {isAddressDetails, isContactDetails} from '../content/content.types.ts';
import {skillLabels} from '../components/Projects/project.ts';

const profilePicture = publicAssetUrl('assets/eric-adelaide-beaubrun.webp');
const profilePictureSrcSet = [
    `${publicAssetUrl('assets/eric-adelaide-beaubrun-160.webp')} 160w`,
    `${publicAssetUrl('assets/eric-adelaide-beaubrun-320.webp')} 320w`,
    `${profilePicture} 500w`,
].join(', ');

/** `+33 6 43 41 40 79` → `+33643414079`, seul format accepté par `tel:`. */
const telHref = (tel: string) => `tel:${tel.replace(/[^+\d]/g, '')}`;

const externalHref = (url: string) => (/^https?:\/\//.test(url) ? url : `https://${url}`);

/**
 * Portfolio simplifié (route `#/simple`) : une seule page, aucune animation,
 * aucun overlay. Même contenu et même identité visuelle que la version
 * complète, mais réduits à l'essentiel — pas de formulaire de contact ni de
 * vue détaillée des projets.
 */
const SimplePortfolio = () => {
    const {content} = useLanguage();
    const {simple, projects, stats, introduction} = content;

    const contact = content.footer.find(isContactDetails);
    const address = content.footer.find(isAddressDetails);

    // Toutes les technologies citées par les projets, dédoublonnées.
    const stack = [...new Set(projects.flatMap((project) => skillLabels(project.skills)))];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="simple-portfolio">
            <div className="simple-topbar">
                <button className="simple-back" onClick={() => navigateTo('full')}>
                    <span aria-hidden="true">←</span> {simple.back}
                </button>
                <LanguageSwitcher/>
            </div>

            <header className="simple-hero">
                <img
                    className="simple-avatar"
                    src={profilePicture}
                    srcSet={profilePictureSrcSet}
                    sizes="96px"
                    width="500"
                    height="500"
                    decoding="async"
                    alt={content.profile_picture_alt}
                />
                <div className="simple-identity">
                    <h1>{content.title}</h1>
                    <p className="simple-subtitle">{content.subtitle}</p>
                    {address && <p className="simple-location">{simple.location} — {address.address}</p>}
                </div>
            </header>

            <p className="simple-tagline">{simple.tagline}</p>

            {contact && (
                <nav className="simple-links" aria-label={simple['contact-title']}>
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                    <a href={telHref(contact.tel)}>{contact.tel}</a>
                    <a href={externalHref(contact.linkedin)} target="_blank" rel="noreferrer">LinkedIn</a>
                    <a href={externalHref(contact.github)} target="_blank" rel="noreferrer">GitHub</a>
                    <a href={publicAssetUrl('cv.pdf')} target="_blank" rel="noreferrer">{simple.cv}</a>
                </nav>
            )}

            <section className="simple-section">
                <h2>{content['about-title']}</h2>
                <p>{introduction.p1}</p>
                <p>{introduction.p2}</p>
                <ul className="simple-stats">
                    {stats.map((stat) => (
                        <li key={stat.text}>
                            <span className="simple-stat-num">{stat.num}</span>
                            <span className="simple-stat-text">{stat.text}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="simple-section">
                <h2>{content['projects-title']}</h2>
                <ul className="simple-projects">
                    {projects.map((project) => (
                        <li key={project.name} className="simple-project">
                            <div className="simple-project-head">
                                <h3>{project.title}</h3>
                                {project.year && <span className="simple-year">{project.year}</span>}
                            </div>
                            <p>{project.short ?? project.desc}</p>
                            <ul className="simple-tags">
                                {skillLabels(project.skills).map((skill) => (
                                    <li key={skill}>{skill}</li>
                                ))}
                            </ul>
                            <div className="simple-project-links">
                                {project.demo && (
                                    <a href={project.demo} target="_blank" rel="noreferrer">
                                        {content['project-overlay'].site}
                                    </a>
                                )}
                                {project.gh && (
                                    <a href={project.gh} target="_blank" rel="noreferrer">
                                        {content['source-code']}
                                    </a>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="simple-section">
                <h2>{simple['stack-title']}</h2>
                <ul className="simple-tags">
                    {stack.map((skill) => (
                        <li key={skill}>{skill}</li>
                    ))}
                </ul>
            </section>

            <footer className="simple-footer">
                <button className="simple-back" onClick={() => navigateTo('full')}>
                    <span aria-hidden="true">←</span> {simple.back}
                </button>
            </footer>
        </div>
    );
};

export default SimplePortfolio;

import './Navbar.scss';
import {Link} from 'react-scroll';
import {useEffect} from 'react';

const Navbar = () => {

    const intersectionThreshold: number = 0.4;

    useEffect(() => {
        const sections = document.querySelectorAll('section');
        // const navItems = document.querySelectorAll('.item');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const id = entry.target.getAttribute('id');
                const navItem = document.querySelector(`[data-target="${id}"]`);

                if (navItem) {
                    if (entry.isIntersecting) {
                        navItem.classList.add('active');
                    } else {
                        navItem.classList.remove('active');
                    }
                }
            });
        }, {
            threshold: intersectionThreshold // Déclencher quand X% de la section est visible
        });

        sections.forEach((section) => {
            observer.observe(section);
        });

        return () => {
            sections.forEach((section) => {
                observer.unobserve(section);
            });
        };
    }, []);

    return (
        <>
            <section className="navbar navbar">
                <nav>
                    <Link to="presentation" smooth={true} duration={500}>
                        <div className="item" data-target="presentation">
                            <div data-text="Parcours et Objectifs" className="linktext">Présentation</div>
                        </div>
                    </Link>

                    <Link to="competences" smooth={true} duration={500}>
                        <div className="item" data-target="competences">
                            <div data-text="Technologies maitrisées" className="linktext">Compétences</div>
                        </div>
                    </Link>

                    <Link to="projets" smooth={true} duration={500}>
                        <div className="item" data-target="projets">
                            <div data-text="Mes créations" className="linktext">Projets</div>
                        </div>
                    </Link>

                    <Link to="experiences" smooth={true} duration={500} offset={-500}>
                        <div className="item" data-target="experiences">
                            <div data-text="Travaux en équipe" className="linktext">Expériences</div>
                        </div>
                    </Link>

                    <Link to="contact" smooth={true} duration={500}>
                        <div className="item" data-target="contact">
                            <div data-text="Me joindre" className="linktext">Contact</div>
                        </div>
                    </Link>
                </nav>
            </section>
        </>
    );
};

export default Navbar;

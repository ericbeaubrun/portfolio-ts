import './Navbar.scss';
import {Link} from 'react-scroll';
import {useEffect, useState} from 'react';
import HamburgerButton from "./HamburgerButton.tsx";
import {AnimatePresence, motion} from "framer-motion";
import {useLanguage} from "../Utils/LanguageContext.tsx";
import LanguageSwitcher from "../Utils/LanguageSwitcher.tsx";
import {useIsMobile} from "../Utils/MobileContext.tsx";
import Lenis from "lenis";


const Navbar = ({lenis}: { lenis: Lenis }) => {

    const isMobile = useIsMobile();
    const {content} = useLanguage();
    const [menuOpen, setMenuOpen] = useState(false);
    const DURATION = 500;
    const OFFSET = 0;

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const navItems = [
        {target: "presentation", title: content.nav[0].title, subtitle: content.nav[0].subtitle},
        {target: "services", title: content.nav[1].title, subtitle: content.nav[1].subtitle},
        {target: "projets", title: content.nav[2].title, subtitle: content.nav[2].subtitle},
        {target: "competences", title: content.nav[3].title, subtitle: content.nav[3].subtitle},
        {target: "contact", title: content.nav[4].title, subtitle: content.nav[4].subtitle},
    ];


    const renderNavItems = (closeOnClick: boolean = false) => {

        const handleClick = () => {
            lenis.stop();
            if (closeOnClick) {
                toggleMenu();
            }
            setTimeout(() => {
                lenis.start();
            }, DURATION);
        };

        return navItems.map(({target, title, subtitle}) => {
            return (
                <Link
                    key={target}
                    to={target}
                    smooth={true}
                    duration={DURATION}
                    offset={OFFSET}
                    onClick={handleClick}
                >
                    <div className="item" data-target={target}>
                        <div data-text={subtitle} className="linktext">
                            {title}
                        </div>
                    </div>
                </Link>
            );
        });
    };

    return (
        <section className="navbar">
            <nav>
                {isMobile ? (
                    <>
                        <HamburgerButton isOpen={menuOpen} onClick={toggleMenu}/>
                        <AnimatePresence>
                            {menuOpen && (
                                <motion.div
                                    initial={{opacity: 1, y: -100}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -100}}
                                    transition={{duration: 0.2}}
                                    className="mobile-menu"
                                >
                                    {renderNavItems(true)}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                ) : (
                    <>
                        {renderNavItems()}
                        <div className="setting">
                            <LanguageSwitcher/>
                        </div>
                    </>
                )}
            </nav>
        </section>
    );
};

export default Navbar;

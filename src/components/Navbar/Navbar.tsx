import './Navbar.scss';
import {Link} from 'react-scroll';
import {useState} from 'react';
import HamburgerButton from "./HamburgerButton.tsx";
import {AnimatePresence, motion} from "framer-motion";
import {useLanguage} from "../Utils/LanguageContext.tsx";
import LanguageSwitcher from "../Utils/LanguageSwitcher.tsx";
import {useIsMobile} from "../Utils/MobileContext.tsx";
import Lenis from "lenis";

interface NavItem {
    title: string;
    subtitle: string;
}

const Navbar = ({lenis}: { lenis: Lenis }) => {

    const isMobile = useIsMobile();
    const [menuOpen, setMenuOpen] = useState(false);
    const DURATION = 500;
    const OFFSET = 0;
    const {content} = useLanguage();

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const nav = (content as { nav: NavItem[] }).nav;

    const navItems = [
        {target: "presentation", title: nav[0].title, subtitle: nav[0].subtitle},
        {target: "services", title: nav[1].title, subtitle: nav[1].subtitle},
        {target: "projets", title: nav[2].title, subtitle: nav[2].subtitle},
        {target: "competences", title: nav[3].title, subtitle: nav[3].subtitle},
        {target: "contact", title: nav[4].title, subtitle: nav[4].subtitle},
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
                        {
                            menuOpen && (
                                <div className="mobile-language-switcher">
                                    <LanguageSwitcher/>
                                </div>
                            )
                        }
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

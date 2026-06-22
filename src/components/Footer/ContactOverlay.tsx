import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {FaCopy, FaTimes, FaCheck, FaExternalLinkAlt} from 'react-icons/fa';
import './ContactOverlay.scss';
import {useLanguage} from '../Utils/LanguageContext.tsx';

interface ContactOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    value: string;
    themeColor?: string;
}

const ContactOverlay: React.FC<ContactOverlayProps> = ({isOpen, onClose, title, value, themeColor = '#000'}) => {
    const [copied, setCopied] = useState(false);
    const {content} = useLanguage();
    const overlayTranslation = (content.overlay as { copy: string; copied: string; open: string }) || {
        copy: 'Copier',
        copied: 'Copié !',
        open: 'Ouvrir'
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getHref = () => {
        if (title.toLowerCase().includes('email')) return `mailto:${value}`;
        if (title.toLowerCase().includes('téléphone') || title.toLowerCase().includes('phone')) return `tel:${value}`;
        return `https://${value}`;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="contact-overlay"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0, transition: {delay: 0.6}}}
                    transition={{duration: 0.4}}
                >
                    <motion.div
                        className="overlay-bg"
                        style={{backgroundColor: themeColor}}
                        initial={{clipPath: 'circle(0% at 50% 50%)'}}
                        animate={{clipPath: 'circle(150% at 50% 50%)'}}
                        exit={{
                            clipPath: 'circle(0% at 50% 50%)',
                            transition: {duration: 0.6, ease: [0.76, 0, 0.24, 1]}
                        }}
                        transition={{duration: 0.8, ease: [0.76, 0, 0.24, 1]}}
                    />

                    <div className="noise-bg"/>

                    <motion.div
                        className="overlay-content"
                        exit={{
                            scale: 0.8,
                            opacity: 0,
                            filter: 'blur(10px)',
                            transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1]}
                        }}
                    >
                        <motion.button
                            className="close-btn"
                            onClick={onClose}
                            initial={{opacity: 0, scale: 0.5}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{scale: 0}}
                            transition={{delay: 0.4}}
                            whileHover={{rotate: 90}}
                        >
                            <FaTimes/>
                        </motion.button>

                        <div className="text-container">
                            <motion.p
                                className="overlay-title"
                                initial={{opacity: 0, letterSpacing: '20px', filter: 'blur(10px)'}}
                                animate={{opacity: 1, letterSpacing: '5px', filter: 'blur(0px)'}}
                                transition={{delay: 0.3, duration: 0.8}}
                            >
                                {title}
                            </motion.p>

                            <motion.h2
                                className="overlay-value"
                                initial={{opacity: 0, scale: 0.9, filter: 'blur(20px)'}}
                                animate={{opacity: 1, scale: 1, filter: 'blur(0px)'}}
                                transition={{delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1]}}
                            >
                                {value}
                            </motion.h2>

                            <div className="actions">
                                <motion.button
                                    className="action-btn copy-btn"
                                    onClick={handleCopy}
                                    initial={{opacity: 0, y: 30}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.7, duration: 0.5}}
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                >
                                    {copied ? <FaCheck/> : <FaCopy/>}
                                    <span>{copied ? overlayTranslation.copied : overlayTranslation.copy}</span>
                                </motion.button>

                                <motion.a
                                    href={getHref()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="action-btn open-btn"
                                    initial={{opacity: 0, y: 30}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.8, duration: 0.5}}
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                >
                                    <FaExternalLinkAlt/>
                                    <span>{overlayTranslation.open}</span>
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ContactOverlay;

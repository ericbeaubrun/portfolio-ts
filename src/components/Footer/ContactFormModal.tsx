import React, {useState} from 'react';
import './ContactFormModal.scss';
import emailjs from 'emailjs-com';
import {useLanguage} from "../Utils/LanguageContext.tsx";
import {motion, AnimatePresence} from 'framer-motion';

type FormData = {
    name: string;
    email: string;
    message: string;
};

interface ContactFormModalProps {
    btn: string;
    send: string;
}

const ContactFormModal = () => {
    const {content} = useLanguage();
    const contactFormContent = content["contact-form"] as ContactFormModalProps;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            e.target as HTMLFormElement,
            import.meta.env.VITE_EMAILJS_USER_ID
        )
            .then((result) => {
                console.log(result.text);
                alert("Messsage envoyé avec succès !");
            }, (error) => {
                console.log(error.text);
                alert("Une erreur s'est produite, veuillez réessayer.");
            });

        setFormData({name: '', email: '', message: ''});
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <div className="contact-container">
            <div className="button-container">
                <button onClick={() => {
                    setIsModalOpen(true)
                }} className="shadowed contact-button">
                    <div className="text">
                        {contactFormContent.btn}
                    </div>
                    <div className="wave-btn"></div>
                </button>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="modal-overlay"
                        onClick={closeModal}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.3}}
                    >
                        <motion.div
                            className="modal-content"
                            onClick={(e) => e.stopPropagation()}
                            initial={{scale: 0.7, opacity: 0, y: 50}}
                            animate={{scale: 1, opacity: 1, y: 0}}
                            exit={{scale: 0.7, opacity: 0, y: 50}}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                                duration: 0.4
                            }}
                        >
                            <button className="close-modal-button" onClick={closeModal}>
                                &times;
                            </button>
                            <motion.div
                                className="contactForm"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.2, duration: 0.3}}
                            >
                                <form onSubmit={handleSubmit}>
                                    <motion.div
                                        initial={{opacity: 0, scale: 0.9}}
                                        animate={{opacity: 1, scale: 1}}
                                        transition={{
                                            delay: 0.2,
                                            duration: 0.3,
                                            type: "spring",
                                            stiffness: 200,
                                            damping: 20
                                        }}
                                    >
                                        <label htmlFor="email">Email</label>
                                        <input
                                            className={"shadowed"}
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder=""
                                            required
                                        />
                                    </motion.div>
                                    <motion.div
                                        initial={{opacity: 0, scale: 0.9}}
                                        animate={{opacity: 1, scale: 1}}
                                        transition={{
                                            delay: 0.35,
                                            duration: 0.3,
                                            type: "spring",
                                            stiffness: 200,
                                            damping: 20
                                        }}
                                    >
                                        <label htmlFor="message">Message</label>
                                        <textarea
                                            className={"shadowed"}
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder=""
                                            required
                                        />
                                    </motion.div>
                                    <motion.button
                                        id="form-submit-btn"
                                        type="submit"
                                        className="shadowed"
                                        initial={{opacity: 0, scale: 0.9}}
                                        animate={{opacity: 1, scale: 1}}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.3,
                                            type: "spring",
                                            stiffness: 200,
                                            damping: 20
                                        }}
                                        whileHover={{scale: 1.02}}
                                        whileTap={{scale: 0.98}}
                                    >
                                        {contactFormContent.send}
                                        &nbsp;&nbsp;&#x27A4;&nbsp;
                                    </motion.button>
                                </form>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ContactFormModal;

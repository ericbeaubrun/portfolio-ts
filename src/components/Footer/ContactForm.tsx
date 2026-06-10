import React, {useState} from 'react';
import './ContactForm.scss';
import emailjs from 'emailjs-com';
import {useLanguage} from "../Utils/LanguageContext.tsx";
import {motion} from 'framer-motion';

type FormData = {
    name: string;
    email: string;
    message: string;
};

interface ContactFormProps {
    btn: string;
    send: string;
}

const ContactForm = () => {
    const {content} = useLanguage();
    const contactFormContent = content["contact-form"] as ContactFormProps;

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
                alert("Message envoyé avec succès !");
            }, (error) => {
                console.log(error.text);
                alert("Une erreur s'est produite, veuillez réessayer.");
            });

        setFormData({name: '', email: '', message: ''});
    };

    return (
        <div className="contact-form-container">
            <motion.div
                className="contactForm"
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.6}}
            >
                <form onSubmit={handleSubmit}>
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{
                            delay: 0.1,
                            duration: 0.5,
                        }}
                    >
                        <label htmlFor="name">Nom</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder=""
                            required
                        />
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{
                            delay: 0.2,
                            duration: 0.5,
                        }}
                    >
                        <label htmlFor="email">Email</label>
                        <input
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
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{
                            delay: 0.3,
                            duration: 0.5,
                        }}
                    >
                        <label htmlFor="message">Message</label>
                        <textarea
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
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{
                            delay: 0.4,
                            duration: 0.5,
                        }}
                        whileTap={{scale: 0.98}}
                    >
                        {contactFormContent.send}
                        &nbsp;&nbsp;&#x27A4;&nbsp;
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default ContactForm;

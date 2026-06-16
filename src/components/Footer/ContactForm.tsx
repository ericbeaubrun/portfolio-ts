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
    title: string;
    btn: string;
    send: string;
    label_name: string;
    label_email: string;
    label_message: string;
    success_msg: string;
    error_msg: string;
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
                alert(contactFormContent.success_msg);
            }, (error) => {
                console.log(error.text);
                alert(contactFormContent.error_msg);
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
                        <label htmlFor="name">{contactFormContent.label_name}</label>
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
                        <label htmlFor="email">{contactFormContent.label_email}</label>
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
                        <label htmlFor="message">{contactFormContent.label_message}</label>
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
                        {/*<img src="/assets/fleche-droite.svg" alt="→" style={{marginLeft: '8px', height: '0.8em', verticalAlign: 'middle'}} />*/}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default ContactForm;

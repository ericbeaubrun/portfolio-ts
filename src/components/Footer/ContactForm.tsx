import React, {useState} from 'react';
import './ContactForm.scss';
import emailjs from '@emailjs/browser';
import {useLanguage} from "../Utils/useLanguage.ts";
import {motion} from 'framer-motion';

type FormData = {
    name: string;
    email: string;
    message: string;
};

type SubmissionStatus = 'idle' | 'sending' | 'success' | 'error';

const ContactForm = () => {
    const {content} = useLanguage();
    const contactFormContent = content["contact-form"];

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: ''
    });
    const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData((currentFormData) => ({
            ...currentFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmissionStatus('sending');

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                e.currentTarget,
                {publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY},
            );
            setFormData({name: '', email: '', message: ''});
            setSubmissionStatus('success');
        } catch {
            setSubmissionStatus('error');
        }
    };

    // Décalage commun à tous les champs : la même cascade que les autres sections.
    const reveal = (delay: number) => ({
        initial: {opacity: 0, y: 20},
        whileInView: {opacity: 1, y: 0},
        viewport: {once: true},
        transition: {delay, duration: 0.5},
    });

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
                    <motion.div {...reveal(0.1)}>
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
                    <motion.div {...reveal(0.2)}>
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
                    <motion.div {...reveal(0.3)}>
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
                        disabled={submissionStatus === 'sending'}
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{
                            delay: 0.4,
                            duration: 0.5,
                        }}
                        whileTap={{scale: 0.98}}
                    >
                        {submissionStatus === 'sending' ? `${contactFormContent.send}…` : contactFormContent.send}
                    </motion.button>
                    {submissionStatus === 'success' && (
                        <p className="form-status is-success" role="status"
                           aria-live="polite">{contactFormContent.success_msg}</p>
                    )}
                    {submissionStatus === 'error' && (
                        <p className="form-status is-error" role="alert">{contactFormContent.error_msg}</p>
                    )}
                    <motion.p
                        className="rgpd-notice"
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        viewport={{once: true}}
                        transition={{
                            delay: 0.5,
                            duration: 0.5,
                        }}
                    >
                        {contactFormContent.rgpd}
                    </motion.p>
                </form>
            </motion.div>
        </div>
    );
};

export default ContactForm;

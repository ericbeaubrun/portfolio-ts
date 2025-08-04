import React, {useState} from 'react';
import './ContactFormModal.scss';
import emailjs from 'emailjs-com';
import {useLanguage} from "../Utils/LanguageContext.tsx";

type FormData = {
    name: string;
    email: string;
    message: string;
};

const ContactFormModal = () => {
    const {content} = useLanguage();
    const contentBtn = (content as { "see-more-gh": string })["see-more-gh"];

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
        emailjs.sendForm('service_n0ckxdy', 'template_q8yzqaj', e.target as HTMLFormElement, 'mexDdWEEhs-E5pxJW')
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
                        {contentBtn}
                    </div>
                    <div className="wave-btn"></div>
                </button>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-button" onClick={closeModal}>
                            &times;
                        </button>
                        <div className="contactForm">
                            <h2>Envoyer un message</h2>

                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name">Nom complet</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Qui êtes-vous ?"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="exemple@domaine.fr"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message">Message :</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Votre message..."
                                        required
                                    />
                                </div>
                                <button id="form-submit-btn" type="submit">
                                    &#x27A4;&nbsp;&nbsp;Envoyer&nbsp;
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactFormModal;

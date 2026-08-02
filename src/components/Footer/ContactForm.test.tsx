import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {cleanup, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import emailjs from '@emailjs/browser';
import {LanguageProvider} from '../Utils/LanguageContext.tsx';
import ContactForm from './ContactForm.tsx';

vi.mock('@emailjs/browser', () => ({
    default: {
        sendForm: vi.fn(),
    },
}));

const sendFormMock = vi.mocked(emailjs.sendForm);

const renderContactForm = () => render(
    <LanguageProvider>
        <ContactForm/>
    </LanguageProvider>,
);

describe('ContactForm', () => {
    afterEach(() => cleanup());

    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
        vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'service-id');
        vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', 'template-id');
        vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', 'public-key');
    });

    it('envoie le formulaire avec la nouvelle API EmailJS et le vide après succès', async () => {
        let resolveSend: (response: { status: number; text: string }) => void = () => undefined;
        sendFormMock.mockReturnValue(new Promise((resolve) => {
            resolveSend = resolve;
        }));
        const user = userEvent.setup();
        renderContactForm();

        const name = screen.getByLabelText('Nom');
        const email = screen.getByLabelText('Email');
        const message = screen.getByLabelText('Message');
        const submit = screen.getByRole('button', {name: 'Envoyer'});

        await user.type(name, 'Eric');
        await user.type(email, 'eric@example.com');
        await user.type(message, 'Bonjour');
        await user.click(submit);

        expect(submit).toBeDisabled();
        await waitFor(() => expect(sendFormMock).toHaveBeenCalledOnce());
        expect(sendFormMock).toHaveBeenCalledWith(
            'service-id',
            'template-id',
            expect.any(HTMLFormElement),
            {publicKey: 'public-key'},
        );

        resolveSend({status: 200, text: 'OK'});
        expect(await screen.findByRole('status')).toHaveTextContent('Message envoyé avec succès !');
        expect(name).toHaveValue('');
        expect(email).toHaveValue('');
        expect(message).toHaveValue('');
    });

    it('conserve les données et affiche une erreur accessible si EmailJS échoue', async () => {
        sendFormMock.mockRejectedValue(new Error('network error'));
        const user = userEvent.setup();
        renderContactForm();

        const name = screen.getByLabelText('Nom');
        const email = screen.getByLabelText('Email');
        const message = screen.getByLabelText('Message');

        await user.type(name, 'Eric');
        await user.type(email, 'eric@example.com');
        await user.type(message, 'À conserver');
        await user.click(screen.getByRole('button', {name: 'Envoyer'}));

        expect(await screen.findByRole('alert')).toHaveTextContent(
            "Une erreur s'est produite, veuillez réessayer.",
        );
        expect(name).toHaveValue('Eric');
        expect(email).toHaveValue('eric@example.com');
        expect(message).toHaveValue('À conserver');
    });
});

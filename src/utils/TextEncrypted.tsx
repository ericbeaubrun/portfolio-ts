import React, { useState, useEffect } from "react";

const chars = "-_~`!@#$%^&*()+=[]{}|;:,.<>?";

interface TextEncryptedProps {
    text: string;
    interval?: number;
}

export const TextEncrypted: React.FC<TextEncryptedProps> = ({ text, interval = 50 }) => {
    const [outputText, setOutputText] = useState<string>("");
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (outputText !== text) {
            timer = setInterval(() => {
                setOutputText((prev) => {
                    if (prev.length < text.length) {
                        return prev + text[prev.length];
                    } else {
                        clearInterval(timer);
                        return prev;
                    }
                });
            }, interval);
        }

        return () => clearInterval(timer);
    }, [text, interval, outputText]);

    const remainder = outputText.length < text.length
        ? text.slice(outputText.length)
            .split("")
            .map(() => chars[Math.floor(Math.random() * chars.length)])
            .join("")
        : "";

    if (!isMounted) {
        return <span> </span>;
    }

    return (
        <span>
            {outputText}
            {remainder}
        </span>
    );
};

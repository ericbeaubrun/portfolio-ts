interface Window {
    barba: {
        hooks: {
            before: (callback: () => void) => void;
            after: (callback: () => void) => void;
        };
        transitions: {
            store: {
                set: (key: string, value: any) => void;
                get: (key: string) => any;
            };
        };
    };

    setTimeout(callback: () => void, ms: number): number;

    clearTimeout(id: number): void;
}

declare global {
    interface DocumentEventMap {
        'activate-transition': CustomEvent;
        'deactivate-transition': CustomEvent;
        'activate-circle-transition': CustomEvent<{ position: { x: number, y: number } }>;
        'deactivate-circle-transition': CustomEvent;
    }
}

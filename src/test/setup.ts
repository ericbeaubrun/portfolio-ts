import '@testing-library/jest-dom/vitest';

class IntersectionObserverMock implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = '0px';
    readonly thresholds = [0];

    disconnect() {
        // Aucun observer réel dans jsdom.
    }

    observe() {
        // Aucun observer réel dans jsdom.
    }

    takeRecords(): IntersectionObserverEntry[] {
        return [];
    }

    unobserve() {
        // Aucun observer réel dans jsdom.
    }
}

globalThis.IntersectionObserver = IntersectionObserverMock;

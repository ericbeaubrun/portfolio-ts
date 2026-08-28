import {useEffect, useState} from 'react';

/**
 * Routes disponibles. `full` est le portfolio narratif complet, `simple` sa
 * version condensée en une page.
 */
export type Route = 'full' | 'simple';

export const SIMPLE_ROUTE_HASH = '#/simple';

/** `#/simple` (avec ou sans slash final) → `simple`, tout le reste → `full`. */
export const routeFromHash = (hash: string): Route =>
    /^#\/simple\/?$/.test(hash) ? 'simple' : 'full';

export const navigateTo = (route: Route) => {
    // Écrire le hash suffit : `hashchange` se déclenche et l'historique est
    // alimenté, donc le bouton retour du navigateur fonctionne sans router.
    window.location.hash = route === 'simple' ? SIMPLE_ROUTE_HASH : '';
};

export const useHashRoute = (): Route => {
    const [route, setRoute] = useState<Route>(() => routeFromHash(window.location.hash));

    useEffect(() => {
        const handleHashChange = () => setRoute(routeFromHash(window.location.hash));

        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return route;
};

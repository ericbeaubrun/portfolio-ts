import {lazy, Suspense} from "react";
import {useHashRoute} from "./components/Utils/useHashRoute.ts";

// Chargées en lazy : chaque vue a son propre chunk, la version simple
// n'embarque donc ni Lenis, ni GSAP, ni framer-motion.
const FullPortfolio = lazy(() => import("./views/FullPortfolio.tsx"));
const SimplePortfolio = lazy(() => import("./views/SimplePortfolio.tsx"));

const App = () => {
    const route = useHashRoute();

    return (
        <Suspense fallback={<div className="route-fallback"/>}>
            {route === 'simple' ? <SimplePortfolio/> : <FullPortfolio/>}
        </Suspense>
    );
};

export default App;

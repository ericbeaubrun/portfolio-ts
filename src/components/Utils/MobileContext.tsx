import type {ReactNode} from 'react';
import { useMediaQuery } from 'react-responsive';
import {MobileContext} from './mobile-context.ts';

const MOBILE_PX_VALUE = 1111;

export const MobileProvider = ({children}: { children: ReactNode }) => {
    const isMobile = useMediaQuery({ query: `(max-width: ${MOBILE_PX_VALUE}px)` });

    return <MobileContext.Provider value={isMobile}>{children}</MobileContext.Provider>;
};

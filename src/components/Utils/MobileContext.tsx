import React, { createContext, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';

const MOBILE_PX_VALUE: number = 1111;

const MobileContext = createContext<boolean>(false);

export const MobileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isMobile = useMediaQuery({ query: `(max-width: ${MOBILE_PX_VALUE}px)` });

    return <MobileContext.Provider value={isMobile}>{children}</MobileContext.Provider>;
};

export const useIsMobile = () => {
    return useContext(MobileContext);
};

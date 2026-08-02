import {useContext} from 'react';
import {MobileContext} from './mobile-context.ts';

export const useIsMobile = () => useContext(MobileContext);

import type {IconType} from 'react-icons';
import {
    FaBolt,
    FaBrain,
    FaBullhorn,
    FaBullseye,
    FaClock,
    FaCubes,
    FaHeartbeat,
    FaLaptopCode,
    FaLock,
    FaPlug,
    FaRobot,
    FaSearch,
    FaShieldAlt,
    FaSpider,
    FaTachometerAlt,
} from 'react-icons/fa';

/**
 * Un pictogramme par expertise. La clé est l'`id` de l'item dans les JSON de
 * contenu, identique en FR et EN — les libellés, eux, sont traduits.
 */
const SERVICE_ICONS: Record<string, IconType> = {
    // Création
    web: FaLaptopCode,
    apps: FaCubes,
    sovereign: FaShieldAlt,
    // Gain de temps
    bpa: FaRobot,
    api: FaPlug,
    ai: FaBrain,
    scraping: FaSpider,
    growth: FaBullhorn,
    cron: FaClock,
    // Génération de revenus
    cro: FaBullseye,
    perf: FaTachometerAlt,
    assets: FaLock,
    seo: FaSearch,
    monitoring: FaHeartbeat,
};

export const serviceIcon = (id: string): IconType => SERVICE_ICONS[id] ?? FaBolt;

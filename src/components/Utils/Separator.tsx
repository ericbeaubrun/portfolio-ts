import React from 'react';
import { motion } from 'framer-motion';

interface SeparatorProps {
  animationDelay: number;
  className?: string;
}

const Separator: React.FC<SeparatorProps> = ({ animationDelay, className = 'separator' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: animationDelay / 3 }}
      viewport={{ once: false, amount: 0.5 }}
      className={className}
    />
  );
};

export default Separator;

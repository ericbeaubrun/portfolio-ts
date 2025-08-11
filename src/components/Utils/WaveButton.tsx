import React, { ReactNode } from 'react';
import './WaveButton.scss';

interface WaveButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

const WaveButton: React.FC<WaveButtonProps> = ({
  onClick,
  children,
  className = '',
  containerClassName = '',
}) => {
  return (
    <div className={`button-container ${containerClassName}`}>
      <button onClick={onClick} className={`shadowed contact-button ${className}`}>
        <div className="text">
          {children}
        </div>
        <div className="wave-btn"></div>
      </button>
    </div>
  );
};

export default WaveButton;

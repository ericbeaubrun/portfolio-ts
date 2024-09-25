import './DashedLine.scss';

const DashedLine = ({ direction = 'right' }) => {

    const patternId = `dashed-pattern-${direction}-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <svg width="100%" height="10" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
                <pattern id={patternId} width="100%" height="10" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="5" x2="100%" y2="5" className={`line-${direction}`} />
                </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="10" fill={`url(#${patternId})`} />
        </svg>
    );
};

export default DashedLine;

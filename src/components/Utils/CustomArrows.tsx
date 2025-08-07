export const NextArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
    return (
        <div className="custom-arrow next-arrow" onClick={onClick}>
            &#9654;
        </div>
    );
};

export const PrevArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
    return (
        <div className="custom-arrow prev-arrow" onClick={onClick}>
            &#9664;
        </div>
    );
};

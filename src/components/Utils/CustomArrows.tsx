import nextIcon from '/assets/next_icon.svg';
import previousIcon from '/assets/previous_icon.svg';

const icons_size = 28;

export const NextArrow: React.FC<{ onClick?: () => void }> = ({onClick}) => {
    return (
        <div style={{mixBlendMode: 'difference'}} className="custom-arrow next-arrow" onClick={onClick}>
            <img
                src={nextIcon}
                alt="Suivant"
                style={{
                    width: icons_size + 'px',
                    height: icons_size + 'px',
                    filter: 'invert(1) contrast(2)',
                }}
            />
        </div>
    );
};

export const PrevArrow: React.FC<{ onClick?: () => void }> = ({onClick}) => {
    return (
        <div style={{mixBlendMode: 'difference'}} className="custom-arrow prev-arrow" onClick={onClick}>
            <img
                src={previousIcon}
                alt="Précédent"
                style={{
                    width: icons_size + 'px',
                    height: icons_size + 'px',
                    filter: 'invert(1) contrast(2)',
                }}
            />
        </div>
    );
};

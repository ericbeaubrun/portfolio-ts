import './HamburgerButton.scss';


interface HamburgerButtonProps {
    isOpen: boolean;
    onClick: () => void;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({isOpen, onClick}) => {

    return (
        <div className="box">
            <div
                className={`btn ${isOpen ? "active" : "notActive"}`}
                onClick={onClick}>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
            </div>
        </div>
    );
};

export default HamburgerButton;

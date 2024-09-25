import './ProjectCarousel.scss';
import {TextEncrypted} from "../utils/TextEncrypted.tsx";
import {useState} from "react";
import Slider from "react-slick";


const ProjectCard = ({imageSrc, title, subtitle, links}) => {

    const [hovered, setHovered] = useState(false);

    return (
        <div className="featured-card"
             onMouseEnter={() => setHovered(true)}
             onMouseLeave={() => setHovered(false)}
        >
            <div className="featured-card-content">
                <div className="imgBx">
                    <img
                        src={imageSrc}
                        alt="Image"
                        className="image"
                    />
                </div>
                <div className="contentBx">
                    <h3>
                        {title}
                        <br/>
                        <span>{subtitle}</span>
                    </h3>
                </div>
            </div>
            <ul className="sci">
                {links.map((link, index) => (
                    <li key={index}>
                        {hovered ? (
                            <a href={link.href}><TextEncrypted text={link.text} interval={50}/></a>
                        ) : (
                            <a href={link.href}>{link.text}</a>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const CardContainer = () => {
    const cardsData = [
        {
            imageSrc: "src/assets/aerien.png",
            title: "Simulateur de Trafic Aérien",
            subtitle: "Wild Beauty",
            links: [
                {href: "#", text: "website"},
            ],
        },
        {
            imageSrc: "src/assets/application_pedagogique.png",
            title: "Application Pédagogique pour les Étudiants",
            subtitle: "Gentle Giant",
            links: [
                {href: "#", text: "portfolio"},
            ],
        }, {
            imageSrc: "src/assets/conquete.png",
            title: "Jeu de Plateau Stratégique Multijoueur",
            subtitle: "Gentle Giant",
            links: [
                {href: "#", text: "portfolio"},
            ],
        },

        {
            imageSrc: "src/assets/librairie.png",
            title: "Lion",
            subtitle: "Happy Birthday",
            links: [
                {href: "#", text: "github.io"},
            ],
        },

        {
            imageSrc: "src/assets/presences.png",
            title: "Elephant",
            subtitle: "Gentle Giant",
            links: [
                {href: "#", text: "portfolio"},
            ],
        },

        {
            imageSrc: "src/assets/document.png",
            title: "Elephant",
            subtitle: "Gentle Giant",
            links: [
                {href: "#", text: "portfolio"},
            ],
        },
    ];

    // Configuration du carousel
    // const settings = {
    //     dots: false,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 3, // 3 cartes par défaut
    //     slidesToScroll: 3, // 3 cartes à faire défiler par défaut
    //     autoplay: false,
    //     autoplaySpeed: 3000,
    //     arrows: true,
    //     responsive: [
    //         {
    //             breakpoint: 1024, // Pour les écrans de bureau en dessous de 1024px
    //             settings: {
    //                 slidesToShow: 2, // 2 cartes visibles
    //                 slidesToScroll: 2, // 2 cartes à faire défiler
    //             },
    //         },
    //         {
    //             breakpoint: 768, // Pour les tablettes et petits ordinateurs
    //             settings: {
    //                 slidesToShow: 1, // 1 carte visible
    //                 slidesToScroll: 1, // 1 carte à faire défiler
    //                 arrows: false, // Désactiver les flèches sur les petits écrans pour plus d'espace
    //             },
    //         },
    //     ],
    // };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        responsive: [
            {
                breakpoint: 1424, // Pour les écrans en dessous de 1024px
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: true,
                },
            },
            {
                breakpoint: 850, // Pour les tablettes
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true, // Désactiver les flèches
                },
            },
            {
                breakpoint: 480, // Pour les téléphones
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                },
            },
        ],
    };

    return (
        <div className="featured-card-container">
            <Slider {...settings}>
                {cardsData.map((card, index) => (
                    <div key={index}>
                        <ProjectCard
                            imageSrc={card.imageSrc}
                            title={card.title}
                            subtitle={card.subtitle}
                            links={card.links}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CardContainer;

import React, { useContext, useEffect, useRef } from "react";
import { Context } from "../js/store/context.jsx";
import { useNavigate } from "react-router-dom";

// ================================================================
// COMPONENTE INTERNO: CARRUSEL INDIVIDUAL (Ajustado: Card Clásica)
// ================================================================
const MagicCarousel = ({ title, items, type, isLast }) => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const scrollContainerRef = useRef(null);

    // --- Lógica de Imagen Segura ---
    const getSafeImage = (item) => {
        if (item.image && item.image !== "") return item.image;
        const defaults = [
            "../../img/defaults/potter_default_1.jpg",
            "../../img/defaults/potter_default_2.jpg",
            "../../img/defaults/potter_default_3.jpg",
            "../../img/defaults/potter_default_4.jpg"
        ];
        const index = item.id ? item.id % defaults.length : 0;
        return defaults[index];
    };

    // --- Lógica de Scroll con Flechas (Desktop) ---
    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        if (container) {
            // Ajustado para desplazar el ancho del contenedor visible
            const scrollAmount = direction === "left" ? -container.offsetWidth : container.offsetWidth;
            container.scrollBy({
                left: scrollAmount,
                behavior: "smooth"
            });
        }
    };

    return (
        <React.Fragment>
            <section className="magic-carousel-wrapper">
                <div className="section-header">
                    <h2 className="carousel-title">{title}</h2>
                </div>

                {/* Flechas de Navegación */}
                <button className="scroll-btn btn-left" onClick={() => scroll("left")} aria-label="Anterior">
                    &#8249;
                </button>
                <button className="scroll-btn btn-right" onClick={() => scroll("right")} aria-label="Siguiente">
                    &#8250;
                </button>

                {/* Contenedor de Cards */}
                <div className="carousel-container" ref={scrollContainerRef}>
                    {items && items.length > 0 ? (
                        items.map((item) => (
                            <div className="h-potter-card" key={item.id}>
                                {/* 1. IMAGEN (Parte superior) */}
                                <div className="card-img-container">
                                    <img
                                        src={getSafeImage(item)}
                                        alt={item.name}
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/300x300/111/fff?text=No+Image";
                                        }}
                                    />
                                </div>

                                {/* 2. INFO + ACCIONES (Parte inferior - Estilo Clásico) */}
                                <div className="card-info-body">
                                    <h5 className="card-title text-truncate" title={item.name}>{item.name}</h5>

                                    <div className="card-actions">
                                        <span
                                            className="fav-heart-icon"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                actions.toggleFavorite(item);
                                            }}
                                            title="Agregar a favoritos"
                                        >
                                            {store.favorites.some(fav => fav.id === item.id)
                                                ? <span style={{ color: "#e3342f", textShadow: "0 0 8px #e3342f" }}>♥</span>
                                                : <span style={{ color: "#888" }}>♡</span>
                                            }
                                        </span>

                                        <button
                                            className="btn-details-gold"
                                            onClick={() => navigate(`/details/${type}/${item.id}`)}
                                        >
                                            Detalles
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-white ps-4 py-5">
                            <i className="fas fa-spinner fa-spin me-2"></i> Cargando magia...
                        </div>
                    )}
                </div>
            </section>

            {/* Separador Animado */}
            {!isLast && (
                <div className="magic-separator">
                    <div className="separator-icon">❖</div>
                </div>
            )}
        </React.Fragment>
    );
};

// ================================================================
// COMPONENTE PRINCIPAL: HOME
// ================================================================
const Home = () => {
    const { store, actions } = useContext(Context);
    const mapRef = useRef(null);

    useEffect(() => {
        actions.loadAllData();
    }, []);

    // Lógica del Mapa Mágico (Hero) - SE CONSERVA INTACTA
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;
        const reset = () => map.style.setProperty("--r", "0px");
        const move = (e) => {
            const rect = map.getBoundingClientRect();
            const clientX = e.clientX ?? e.touches?.[0].clientX;
            const clientY = e.clientY ?? e.touches?.[0].clientY;
            if (clientX == null || clientY == null) return;
            map.style.setProperty("--x", `${clientX - rect.left}px`);
            map.style.setProperty("--y", `${clientY - rect.top}px`);
            map.style.setProperty("--r", `80px`);
        };
        map.addEventListener("mousemove", move);
        map.addEventListener("mouseleave", reset);
        return () => {
            map.removeEventListener("mousemove", move);
            map.removeEventListener("mouseleave", reset);
        };
    }, []);

    return (
        <div className="home-main">
            {/* HERO SECTION */}
            <section className="home-hero d-flex align-items-center justify-content-around p-5">
                <div className="hero-text col-lg-5 col-md-12">
                    <h1 className="hero-title">
                        Los secretos de <br />
                        <span className="text-gradient-gold">Hogwarts</span>
                    </h1>
                    <p className="hero-description mt-3">
                        Más allá de lo que ven los ojos muggles, existen misterios que solo
                        un verdadero mago puede revelar.
                    </p>
                    <p className="hero-map-hint">
                        Desliza tu varita sobre el mapa <span className="hint-arrow">➶</span>
                    </p>
                </div>

                <div className="hero-map" ref={mapRef}>
                    <img src="src/imagenes/home/mapa1.png" alt="Mapa oculto" className="map-hidden" />
                    <div className="map-revealed">
                        <img src="src/imagenes/home/mapa2.png" alt="Mapa revelado" />
                    </div>
                </div>
            </section>

            {/* ZONA DE CARRUSELES PRO (Iconos Actualizados) */}
            <div className="content-wrapper pb-5">
                <MagicCarousel title="🕮 Grimorios Antiguos" items={store.books} type="books" />
                <MagicCarousel title="✵ Archivos Fílmicos" items={store.movies} type="movies" />
                <MagicCarousel title="⛧ Magos & Brujas" items={store.characters} type="characters" />
                <MagicCarousel title="⚗ Pociones Maestras" items={store.potions} type="potions" />
                <MagicCarousel title="☿ Encantamientos" items={store.spells} type="spells" isLast={true} />
            </div>
        </div>
    );
};

export default Home;
import React, { useContext, useEffect, useRef } from "react";
import { Context } from "../js/store/context.jsx";
import { useNavigate } from "react-router-dom";

// defaults cards
import d1 from "../imagenes/default/d1.png";
import d2 from "../imagenes/default/d2.png";
import d3 from "../imagenes/default/d3.png";
import d4 from "../imagenes/default/d4.png";

// hero images
import mapa1 from "../imagenes/home/mapa1.png";
import mapa2 from "../imagenes/home/mapa2.png";

// ================================================================
// COMPONENTE INTERNO: CARRUSEL INDIVIDUAL
// ================================================================
const MagicCarousel = ({ title, items, type, isLast }) => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const scrollContainerRef = useRef(null);

    // --- Lógica de Imagen Segura (FIX REAL) ---
    const getSafeImage = (item) => {
        if (item?.image && item.image.trim() !== "") return item.image;

        const defaults = [d1, d2, d3, d4];

        const index =
            typeof item?.id === "number"
                ? Math.abs(item.id) % defaults.length
                : Math.floor(Math.random() * defaults.length);

        return defaults[index];
    };

    // --- Scroll ---
    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollAmount =
                direction === "left"
                    ? -container.offsetWidth
                    : container.offsetWidth;

            container.scrollBy({
                left: scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <>
            <section className="magic-carousel-wrapper">
                <div className="section-header">
                    <h2 className="carousel-title">{title}</h2>
                </div>

                <button
                    className="scroll-btn btn-left"
                    onClick={() => scroll("left")}
                    aria-label="Anterior"
                >
                    &#8249;
                </button>
                <button
                    className="scroll-btn btn-right"
                    onClick={() => scroll("right")}
                    aria-label="Siguiente"
                >
                    &#8250;
                </button>

                <div className="carousel-container" ref={scrollContainerRef}>
                    {items && items.length > 0 ? (
                        items.map((item) => (
                            <div className="h-potter-card" key={item.id}>
                                <div className="card-img-container">
                                    <img
                                        src={getSafeImage(item)}
                                        alt={item.name}
                                        loading="lazy"
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = getSafeImage(item);
                                        }}
                                    />
                                </div>

                                <div className="card-info-body">
                                    <h5
                                        className="card-title text-truncate"
                                        title={item.name}
                                    >
                                        {item.name}
                                    </h5>

                                    <div className="card-actions">
                                        <span
                                            className="fav-heart-icon"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                actions.toggleFavorite(item);
                                            }}
                                        >
                                            {store.favorites.some(
                                                (fav) => fav.id === item.id
                                            ) ? (
                                                <span
                                                    style={{
                                                        color: "#e3342f",
                                                        textShadow: "0 0 8px #e3342f",
                                                    }}
                                                >
                                                    ♥
                                                </span>
                                            ) : (
                                                <span style={{ color: "#888" }}>♡</span>
                                            )}
                                        </span>

                                        <button
                                            className="btn-details-gold"
                                            onClick={() =>
                                                navigate(`/details/${type}/${item.id}`)
                                            }
                                        >
                                            Detalles
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-white ps-4 py-5">
                            <i className="fas fa-spinner fa-spin me-2"></i>
                            Cargando magia...
                        </div>
                    )}
                </div>
            </section>

            {!isLast && (
                <div className="magic-separator">
                    <div className="separator-icon">❖</div>
                </div>
            )}
        </>
    );
};

// ================================================================
// HOME
// ================================================================
const Home = () => {
    const { store, actions } = useContext(Context);
    const mapRef = useRef(null);

    useEffect(() => {
        actions.loadAllData();
    }, []);

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
            <section className="home-hero d-flex align-items-center justify-content-around p-5">
                <div className="hero-text col-lg-5 col-md-12">
                    <h1 className="hero-title">
                        Los secretos de <br />
                        <span className="text-gradient-gold">Hogwarts</span>
                    </h1>
                    <p className="hero-description mt-3">
                        Más allá de lo que ven los ojos muggles, existen misterios
                        que solo un verdadero mago puede revelar.
                    </p>
                    <p className="hero-map-hint">
                        Desliza tu varita sobre el mapa{" "}
                        <span className="hint-arrow">➶</span>
                    </p>
                </div>

                <div className="hero-map" ref={mapRef}>
                    <img
                        src={mapa1}
                        alt="Mapa oculto"
                        className="map-hidden"
                    />
                    <div className="map-revealed">
                        <img src={mapa2} alt="Mapa revelado" />
                    </div>
                </div>
            </section>

            <div className="content-wrapper pb-5">
                <MagicCarousel title="🕮 Grimorios Antiguos" items={store.books} type="books" />
                <MagicCarousel title="✵ Archivos Fílmicos" items={store.movies} type="movies" />
                <MagicCarousel title="⛧ Magos & Brujas" items={store.characters} type="characters" />
                <MagicCarousel title="⚗ Pociones Maestras" items={store.potions} type="potions" />
                <MagicCarousel title="☿ Encantamientos" items={store.spells} type="spells" isLast />
            </div>
        </div>
    );
};

export default Home;

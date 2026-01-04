import React, { useContext, useEffect, useRef } from "react";
import { Context } from "../js/store/context.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const mapRef = useRef(null);

    useEffect(() => {
        actions.loadAllData();
    }, []);

    /* ================= MAPA MÁGICO ================= */
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        const reset = () => {
            map.style.setProperty("--r", "0px");
        };

        const move = (e) => {
            const rect = map.getBoundingClientRect();
            const clientX = e.clientX ?? e.touches?.[0].clientX;
            const clientY = e.clientY ?? e.touches?.[0].clientY;

            if (clientX == null || clientY == null) return;

            const x = clientX - rect.left;
            const y = clientY - rect.top;

            map.style.setProperty("--x", `${x}px`);
            map.style.setProperty("--y", `${y}px`);
            map.style.setProperty("--r", `80px`);
        };

        map.addEventListener("mousemove", move);
        map.addEventListener("mouseenter", move);
        map.addEventListener("mouseleave", reset);
        map.addEventListener("touchmove", move, { passive: true });
        map.addEventListener("touchend", reset);

        return () => {
            map.removeEventListener("mousemove", move);
            map.removeEventListener("mouseenter", move);
            map.removeEventListener("mouseleave", reset);
            map.removeEventListener("touchmove", move);
            map.removeEventListener("touchend", reset);
        };
    }, []);

    const renderCarousel = (title, items, type) => (
        <div className="carousel-section mb-5 mt-4">
            <h2 className="carousel-title px-4 mb-3">{title}</h2>
            <div className="carousel-container d-flex flex-row flex-nowrap gap-3 px-4 pb-4">
                {items.length > 0 ? items.map((item) => (
                    <div className="card h-potter-card" key={item.id}>
                        <div className="card-img-container">
                            <img src={item.image} className="card-img-top" alt={item.name} />
                        </div>
                        <div className="card-body d-flex flex-column justify-content-between">
                            <h5 className="card-title text-truncate">{item.name}</h5>
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <button
                                    className="btn btn-outline-info btn-sm"
                                    onClick={() => navigate(`/details/${type}/${item.id}`)}
                                >
                                    Detalles
                                </button>
                                <button
                                    className="btn btn-favorite"
                                    onClick={() => actions.toggleFavorite(item)}
                                >
                                    {store.favorites.some(fav => fav.id === item.id) ? "❤️" : "🤍"}
                                </button>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="text-white ps-4">Cargando magia...</div>
                )}
            </div>
        </div>
    );

    return (
        <div className="home-main">

            {/* ================= HERO SECTION ================= */}
            <section className="home-hero d-flex align-items-center justify-content-around p-5">

                {/* TEXTO */}
                <div className="hero-text col-lg-5 col-md-12">
                    <h1 className="hero-title">
                        Los secretos de <br />
                        <span className="text-gradient-gold">Hogwarts</span> aguardan
                    </h1>

                    <p className="hero-description mt-3">
                        Más allá de lo que ven los ojos muggles, existen misterios que solo
                        un verdadero mago puede revelar.
                    </p>

                    <p className="hero-map-hint">
                        Desliza tu varita sobre el mapa
                        <span className="hint-arrow">➶</span>
                    </p>
                </div>

                {/* MAPA */}
                <div className="hero-map" ref={mapRef}>
                    <img
                        src="src/imagenes/home/mapa1.png"
                        alt="Mapa mágico oculto"
                        className="map-hidden"
                    />

                    <div className="map-revealed">
                        <img
                            src="src/imagenes/home/mapa2.png"
                            alt="Mapa mágico revelado"
                        />
                    </div>
                </div>

            </section>

            {/* ================= CARRUSELES ================= */}
            <div className="content-wrapper">
                {renderCarousel("📚 Libros", store.books, "books")}
                {renderCarousel("🎬 Películas", store.movies, "movies")}
                {renderCarousel("🧙 Personajes", store.characters, "characters")}
                {renderCarousel("🧪 Pociones", store.potions, "potions")}
                {renderCarousel("✨ Hechizos", store.spells, "spells")}
            </div>

        </div>
    );
};

export default Home;

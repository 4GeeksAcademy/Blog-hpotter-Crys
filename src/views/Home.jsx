import React, { useContext, useEffect } from "react";
// RUTA CORREGIDA: sube de views, entra a js/store
import { Context } from "../js/store/context.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.loadAllData();
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
                    <div className="text-white ps-4">Cargando pociones y hechizos...</div>
                )}
            </div>
        </div>
    );

    return (
        <div className="home-main">
            {/* HERO SECTION */}
            <section className="home-hero d-flex align-items-center justify-content-around p-5">
                <div className="hero-text">
                    <h1 className="display-3 fw-bold">Bienvenido a <span className="text-accent">Hogwarts</span></h1>
                    <p className="lead">Explora la librería prohibida y descubre todos los secretos.</p>
                </div>
                <div className="hero-img-wrapper">
                    <img src="/assets/images/sombrero.png" alt="Sombrero" className="hero-floating-img" />
                </div>
            </section>

            {/* CARRUSELES */}
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
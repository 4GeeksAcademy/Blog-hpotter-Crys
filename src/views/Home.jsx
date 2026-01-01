// src/js/views/Home.jsx
import React, { useContext, useEffect } from "react";
import { Context } from "../js/store/context.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.loadCharacters();
        actions.loadStaff();
        actions.loadSpells();
    }, []);

    // DEBUG TEMPORAL
    console.log("Characters:", store.characters);
    console.log("Staff:", store.staff);
    console.log("Spells:", store.spells);

    // Función para marcar/desmarcar favorito
    const toggleFavorite = (item, type) => {
        actions.toggleFavorite(item, type);
    };

    // Render de carrusel
    const renderCarousel = (items, type) => (
        <div className="carousel-section">
            <hr className="carousel-divider" /> {/* Línea mágica para CSS después */}
            <h2 className="carousel-title">{type}</h2>
            <div className="carousel-container">
                {items.map((item) => (
                    <div className="card" key={item.id}>
                        <img
                            src={item.image || "/assets/images/placeholder.png"}
                            alt={item.name}
                            className="card-image"
                        />
                        <div className="card-info">
                            <div className="card-name">Nombre: {item.name}</div>
                            {item.house && <div className="card-house">Casa: {item.house}</div>}
                        </div>
                        <div className="card-actions">
                            <button
                                className="favorite-btn"
                                onClick={() => toggleFavorite(item, type)}
                            >
                                {store.favorites.some(fav => fav.id === item.id) ? "❤️" : "🤍"}
                            </button>
                            <button
                                className="details-btn"
                                onClick={() => navigate(`/details/${type}/${item.id}`)}
                            >
                                Detalles
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <main className="home">

            {/* HERO */}
            <section className="home-hero">
                <div className="home-hero-content">
                    <h1 className="home-title">
                        Bienvenido a <span className="home-title-accent">Hogwarts</span>
                    </h1>
                    <p className="home-subtitle">
                        Descubre la magia del mundo mágico en un solo lugar
                    </p>
                    <span className="home-secret-text">
                        Wingardium Leviosa no es solo un hechizo, es conocimiento.
                    </span>
                </div>
                <div className="home-hero-visual">
                    <img
                        src="/assets/images/sombrero.png"
                        alt="Sombrero Seleccionador"
                        className="home-hero-image"
                    />
                </div>
            </section>

            {/* CARRUSELES */}
            {renderCarousel(store.characters, "Personajes")}
            {renderCarousel(store.staff, "Profesores")}
            {renderCarousel(store.spells, "Hechizos")}

        </main>
    );
};

export default Home;

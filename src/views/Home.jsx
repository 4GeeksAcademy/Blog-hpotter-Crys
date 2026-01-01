// src/js/components/Home.jsx
import React from "react";

const Home = () => {
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

          {/* Texto oculto / revelable */}
          <span className="home-secret-text">
            Wingardium Leviosa no es solo un hechizo, es conocimiento.
          </span>

        </div>

        {/* Imagen icónica */}
        <div className="home-hero-visual">
          <img
            src="/assets/images/sombrero.png"
            alt="Sombrero Seleccionador"
            className="home-hero-image"
          />
        </div>
      </section>

    </main>
  );
};

export default Home;

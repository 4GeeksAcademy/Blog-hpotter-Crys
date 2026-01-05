import React, { useContext } from "react";
import { Context } from "../js/store/context.jsx";
import { useNavigate } from "react-router-dom";
// IMPORTANTE: Importamos la utilidad para imagenes seguras
import { getSafeImage } from "../js/store/getSafeImage";

import baulImage from "../imagenes/favoritospageempty/Baul.png";


export const FavoritesPage = () => {
    const { store, actions } = useContext(Context);
    const { favorites } = store;
    const navigate = useNavigate();

    // Agrupamos favoritos
    const groupedFavorites = favorites.reduce((acc, item) => {
        if (!acc[item.type]) acc[item.type] = [];
        acc[item.type].push(item);
        return acc;
    }, {});

    const categories = Object.keys(groupedFavorites);

    return (
        <div className="favorites-page-wrapper container py-5 min-vh-100 position-relative">
            
            {/* BOTÓN DE RETORNO FLOTANTE (UX MODERNA) */}
            <div className="position-absolute top-0 start-0 mt-4 ms-3 d-none d-md-block">
                <button 
                    onClick={() => navigate("/")} 
                    className="btn-back-home"
                    title="Regresar al inicio"
                >
                    <i className="fa-solid fa-arrow-left me-2"></i> Inicio
                </button>
            </div>
            {/* Versión móvil del botón (más compacto) */}
            <div className="d-md-none mb-4">
                 <button onClick={() => navigate("/")} className="btn-back-home w-100">
                    <i className="fa-solid fa-arrow-left me-2"></i> Regresar a Inicio
                </button>
            </div>

            {/* CABECERA CREATIVA */}
            <header className="fav-header text-center mb-5 mt-4">
                <h1 className="display-4 fw-bold text-warning fav-title-magic">
                    Tu Grimorio Personal
                </h1>
                {/* Corregido: Color visible y tipografía mejorada */}
                <p className="lead fav-subtitle mt-3">
                    "La magia no solo se encuentra, se guarda." <br />
                    <span className="small text-white-50">Aquí residen los secretos, personajes y artes oscuras que has descubierto.</span>
                </p>
                
                {/* Pequeño separador visual para la cabecera */}
                <div className="fav-header-line mx-auto mt-4"></div>
            </header>

            {favorites.length === 0 ? (
                /* ESTADO VACÍO ENAMORABLE */
                <div className="empty-favorites text-center py-5 shadow-sm rounded glass-panel">
                    <img 
                        src={baulImage}
                        alt="Baúl"
                        style={{ width: "200px", opacity: 0.6, filter: "drop-shadow(0 0 10px rgba(236,185,57,0.4))" }} 
                        className="mb-4 floating-anim"
                    />
                    <h3 className="text-white h-magic">Tu baúl está vacío</h3>
                    <p className="fav-subtitle">Parece que aún no has lanzado ningún hechizo de guardado.</p>
                    <button 
                        className="btn btn-outline-warning mt-3 px-4 py-2 rounded-pill fw-bold"
                        onClick={() => navigate("/")}
                    >
                        Regresar a explorar el mundo
                    </button>
                </div>
            ) : (
                /* SECCIONES DINÁMICAS POR CATEGORÍA */
                <div className="fav-content">
                    {categories.map((cat) => (
                        <section key={cat} className="mb-5 fav-category-section">
                            
                            {/* SEPARADOR MÁGICO (Como en la Home) */}
                            <div className="magic-separator"></div>

                            <div className="d-flex align-items-center mb-4 mt-4">
                                <h3 className="text-accent text-uppercase m-0 h-magic" style={{ fontSize: '1.8rem' }}>
                                    {cat === 'books' ? '📚 Libros Guardados' : 
                                     cat === 'movies' ? '🎬 Películas Preferidas' : 
                                     cat === 'characters' ? '🧙 Personajes Aliados' : 
                                     cat === 'potions' ? '🧪 Pociones en Reserva' : '✨ Hechizos Dominados'}
                                </h3>
                            </div>
                            
                            {/* GRID RESPONSIVE MEJORADO */}
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                                {groupedFavorites[cat].map((item) => (
                                    <div className="col" key={item.id}>
                                        <div className="card h-potter-card h-100 shadow border-0">
                                            <div className="card-img-container" style={{ height: "240px" }}>
                                                <img 
                                                    /* Lógica de imagen segura aplicada aquí */
                                                    src={item.image ? item.image : getSafeImage(item.type)} 
                                                    className="card-img-top" 
                                                    alt={item.name} 
                                                    onError={(e) => {
                                                        e.target.onerror = null; 
                                                        e.target.src = getSafeImage(item.type);
                                                    }}
                                                />
                                            </div>
                                            <div className="card-body d-flex flex-column justify-content-between bg-dark text-white p-3">
                                                <h5 className="card-title text-truncate small fw-bold mb-3" style={{ color: 'var(--gold-primary)' }}>
                                                    {item.name}
                                                </h5>
                                                
                                                <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top border-secondary">
                                                    <button 
                                                        className="btn btn-sm btn-details-gold"
                                                        onClick={() => navigate(`/details/${item.type}/${item.id}`)}
                                                    >
                                                        Ver Detalles
                                                    </button>
                                                    <button 
                                                        className="btn btn-sm text-danger p-0 delete-btn-anim"
                                                        onClick={() => actions.toggleFavorite(item)}
                                                        title="Eliminar del Grimorio"
                                                    >
                                                        <i className="fa-solid fa-trash-can fs-5"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            )}
        </div>
    );
};
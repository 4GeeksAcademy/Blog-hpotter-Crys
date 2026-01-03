import React, { useContext } from "react";
import { Context } from "../js/store/context.jsx";
import { useNavigate } from "react-router-dom";

export const FavoritesPage = () => {
    const { store, actions } = useContext(Context);
    const { favorites } = store;
    const navigate = useNavigate();

    // Agrupamos los favoritos por tipo para seccionarlos
    // Esto crea un objeto donde las llaves son 'books', 'characters', etc.
    const groupedFavorites = favorites.reduce((acc, item) => {
        if (!acc[item.type]) acc[item.type] = [];
        acc[item.type].push(item);
        return acc;
    }, {});

    const categories = Object.keys(groupedFavorites);

    return (
        <div className="favorites-page-wrapper container py-5 min-vh-100">
            {/* CABECERA CREATIVA */}
            <header className="fav-header text-center mb-5">
                <h1 className="display-4 fw-bold text-warning fav-title-magic">
                    Tu Grimorio Personal
                </h1>
                <p className="lead text-muted">
                    "La magia no solo se encuentra, se guarda." <br />
                    Aquí residen los secretos, personajes y artes oscuras que has descubierto.
                </p>
                <div className="fav-divider mx-auto"></div>
            </header>

            {favorites.length === 0 ? (
                /* ESTADO VACÍO ENAMORABLE */
                <div className="empty-favorites text-center py-5 shadow-sm rounded">
                    <img 
                        src="/assets/images/defaults/magic-wand.png" 
                        alt="Varita" 
                        style={{ width: "100px", opacity: 0.5 }} 
                        className="mb-4"
                    />
                    <h3 className="text-white">Tu baúl está vacío</h3>
                    <p className="text-muted">Parece que aún no has lanzado ningún hechizo de guardado.</p>
                    <button 
                        className="btn btn-outline-warning mt-3"
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
                            <h3 className="text-accent border-bottom border-secondary pb-2 mb-4 text-uppercase">
                                {cat === 'books' ? '📚 Libros Guardados' : 
                                 cat === 'movies' ? '🎬 Películas Preferidas' : 
                                 cat === 'characters' ? '🧙 Personajes Aliados' : 
                                 cat === 'potions' ? '🧪 Pociones en Reserva' : '✨ Hechizos Dominados'}
                            </h3>
                            
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                                {groupedFavorites[cat].map((item) => (
                                    <div className="col" key={item.id}>
                                        <div className="card h-potter-card h-100 shadow">
                                            <div className="card-img-container" style={{ height: "200px" }}>
                                                <img 
                                                    src={item.image} 
                                                    className="card-img-top" 
                                                    alt={item.name} 
                                                />
                                            </div>
                                            <div className="card-body d-flex flex-column justify-content-between bg-dark text-white">
                                                <h5 className="card-title text-truncate small">{item.name}</h5>
                                                <div className="d-flex justify-content-between align-items-center mt-3">
                                                    <button 
                                                        className="btn btn-sm btn-outline-info"
                                                        onClick={() => navigate(`/details/${item.type}/${item.id}`)}
                                                    >
                                                        Revisar
                                                    </button>
                                                    <button 
                                                        className="btn btn-sm btn-link text-danger p-0"
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
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../js/store/context.jsx";

const Details = () => {
    const { type, id } = useParams(); // Extraemos el tipo (books, characters...) y el ID
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [item, setItem] = useState(null);

    useEffect(() => {
        // Buscamos en el store el array correspondiente (books, movies, etc)
        // Y dentro de ese array, buscamos el objeto con el ID que viene por la URL
        const resourceList = store[type]; 
        if (resourceList) {
            const foundItem = resourceList.find(obj => obj.id === id);
            setItem(foundItem);
        }
    }, [type, id, store]);

    if (!item) return (
        <div className="magic-loader-container text-center mt-5">
            <h2 className="text-warning">Lanzando "Revelio" para encontrar los detalles...</h2>
            <div className="spinner-border text-warning" role="status"></div>
        </div>
    );

    return (
        <div className="details-master-wrapper container-fluid py-5">
            {/* TÍTULO MÁGICO */}
            <header className="details-magic-header text-center mb-5">
                <h1 className="details-main-title">Detalles: <span className="text-accent">Mundo Mágico</span></h1>
                <p className="details-subtitle">Aquí puedes ver a fondo la magia de tus {type === 'books' ? 'libros' : 'descubrimientos'}.</p>
                <div className="details-header-divider"></div>
            </header>

            <div className="container">
                <div className="row details-glass-card g-0 overflow-hidden shadow-lg">
                    {/* COLUMNA IMAGEN */}
                    <div className="col-md-5 details-image-section">
                        <img 
                            src={item.image} 
                            alt={item.name} 
                            className="details-img-fluid"
                        />
                    </div>

                    {/* COLUMNA INFORMACIÓN */}
                    <div className="col-md-7 details-info-section p-5">
                        <div className="details-content-box">
                            <span className="badge bg-warning text-dark mb-2 text-uppercase">{type}</span>
                            <h2 className="details-item-name display-4 mb-4">{item.name}</h2>
                            
                            <p className="details-description lead">
                                {item.summary || item.description || "Este elemento del mundo mágico guarda secretos que aún no han sido revelados en la base de datos."}
                            </p>

                            {/* DATOS DINÁMICOS (Se adaptan según lo que venga en los atributos) */}
                            <div className="details-stats-grid mt-4">
                                {item.author && <div className="stat-row"><strong>Autor:</strong> {item.author}</div>}
                                {item.release_date && <div className="stat-row"><strong>Lanzamiento:</strong> {item.release_date}</div>}
                                {item.rating && <div className="stat-row"><strong>Calificación:</strong> {item.rating}</div>}
                                {item.house && <div className="stat-row"><strong>Casa:</strong> {item.house}</div>}
                                {item.effect && <div className="stat-row"><strong>Efecto:</strong> {item.effect}</div>}
                            </div>

                            <div className="details-actions-footer mt-5 d-flex gap-3">
                                <button 
                                    className="btn-magic-back btn btn-outline-light"
                                    onClick={() => navigate(-1)}
                                >
                                    <i className="fa-solid fa-arrow-left me-2"></i> Volver al Gran Comedor
                                </button>
                                
                                <button 
                                    className={`btn btn-lg ${store.favorites.some(fav => fav.id === item.id) ? "btn-danger" : "btn-warning"}`}
                                    onClick={() => actions.toggleFavorite(item)}
                                >
                                    <i className={`fa-${store.favorites.some(fav => fav.id === item.id) ? "solid" : "regular"} fa-heart me-2`}></i>
                                    {store.favorites.some(fav => fav.id === item.id) ? "Quitar de Favoritos" : "Agregar a Favoritos"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
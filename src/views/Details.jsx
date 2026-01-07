import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../js/store/context.jsx";
import { getSafeImage } from "../js/store/getSafeImage";

const Details = () => {
    const { type, id } = useParams();
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [item, setItem] = useState(null);

    useEffect(() => {
        const resourceList = store[type]; 
        if (resourceList) {
            const foundItem = resourceList.find(obj => obj.id === id);
            setItem(foundItem);
        }
    }, [type, id, store]);

    if (!item) return (
        <div className="magic-loader-container text-center mt-5 min-vh-100 d-flex flex-column justify-content-center align-items-center">
            <h2 className="h-magic text-warning mb-4">Lanzando "Revelio" para encontrar los detalles...</h2>
            <div className="spinner-border text-warning" style={{width: "3rem", height: "3rem"}} role="status"></div>
        </div>
    );

    const isFavorite = store.favorites.some(fav => fav.id === item.id);

    return (
        <div className="details-master-wrapper container-fluid py-5">
            {/* TÍTULO MÁGICO */}
            <header className="details-magic-header text-center mb-5">
                <h1 className="details-main-title h-magic display-3">
                    Detalles: <span className="text-gradient-gold">Mundo Mágico</span>
                </h1>
                <p className="details-subtitle lead">
                    Aquí puedes ver a fondo la magia de tus {type === 'books' ? 'libros' : 'descubrimientos'}.
                </p>
                <div className="magic-separator mx-auto" style={{width: '200px'}}></div>
            </header>

            <div className="container">
                <div className="row details-glass-card g-0 overflow-hidden shadow-lg border-0">
                    {/* COLUMNA IMAGEN - CONTROLADA */}
                    <div className="col-md-5 details-image-section bg-black d-flex align-items-center justify-content-center">
                        <div className="details-img-container">
                            <img 
                                src={item.image || getSafeImage(item.type)} 
                                alt={item.name} 
                                className="details-img-fixed"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = getSafeImage(item.type);
                                }}
                            />
                        </div>
                    </div>

                   
                    <div className="col-md-7 details-info-section p-4 p-lg-5 d-flex flex-column justify-content-center">
                        <div className="details-content-box">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <span className="badge-magic">{type}</span>
                                {/* BOTÓN FAVORITO CIRCULAR MODERNO */}
                                <button 
                                    className={`btn-fav-circle ${isFavorite ? 'active' : ''}`}
                                    onClick={() => actions.toggleFavorite(item)}
                                    title={isFavorite ? "Quitar del Grimorio" : "Añadir al Grimorio"}
                                >
                                    <i className={`${isFavorite ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
                                </button>
                            </div>
                            
                            <h2 className="details-item-name display-5 mb-4 h-magic">{item.name}</h2>
                            
                            <p className="details-description mb-4">
                                {item.summary || item.description || "Este elemento del mundo mágico guarda secretos que aún no han sido revelados en la base de datos."}
                            </p>

                            
                            <div className="details-stats-grid row g-3">
                                {item.author && <div className="col-6"><div className="stat-card"><strong>Autor:</strong> {item.author}</div></div>}
                                {item.release_date && <div className="col-6"><div className="stat-card"><strong>Lanzamiento:</strong> {item.release_date}</div></div>}
                                {item.house && <div className="col-6"><div className="stat-card"><strong>Casa:</strong> {item.house}</div></div>}
                                {item.effect && <div className="col-12"><div className="stat-card"><strong>Efecto:</strong> {item.effect}</div></div>}
                            </div>

                            <div className="details-actions-footer mt-5 pt-4 border-top border-secondary">
                                <button 
                                    className="btn-magic-neon px-4"
                                    onClick={() => navigate(-1)}
                                >
                                    <i className="fa-solid fa-arrow-left me-2"></i> Volver
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
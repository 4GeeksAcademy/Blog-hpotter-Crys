import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../js/store/context.jsx"; // Mantenemos la ruta que nos funcionó en Home

const Navbar = () => {
    const { store, actions } = useContext(Context);
    // Nos aseguramos de que favorites siempre sea un array para evitar errores de .length
    const favorites = store?.favorites || [];
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top border-bottom border-warning">
            <div className="container">
                {/* LOGO */}
                <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
                    <img
                        src="/assets/images/logo-hat.png"
                        alt="Hogwarts Logo"
                        width="40"
                        height="40"
                        className="d-inline-block align-text-top"
                    />
                    <span className="fw-bold h-potter-title" style={{ letterSpacing: "1px" }}>
                        HOGWARTS DB
                    </span>
                </Link>

                {/* BOTÓN MÓVIL */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                {/* CONTENIDO DERECHA */}
                <div className="collapse navbar-collapse" id="mainNavbar">
                    <div className="d-flex align-items-center ms-auto gap-3 mt-3 mt-lg-0">
                        
                        {/* DROPDOWN DE FAVORITOS */}
                        <div className="dropdown">
                            <button
                                className="btn btn-warning dropdown-toggle d-flex align-items-center gap-2 shadow"
                                type="button"
                                id="favoritesDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="fa-solid fa-hat-wizard"></i>
                                <span>Favoritos</span>
                                <span className="badge bg-dark text-warning ms-1">
                                    {favorites.length}
                                </span>
                            </button>

                            <ul
                                className="dropdown-menu dropdown-menu-end p-2 shadow-lg"
                                aria-labelledby="favoritesDropdown"
                                style={{ minWidth: "300px", backgroundColor: "#2b2b2b" }}
                            >
                                <li className="dropdown-header text-warning fw-bold border-bottom border-secondary mb-2">
                                    TUS HECHIZOS GUARDADOS
                                </li>
                                
                                {favorites.length === 0 ? (
                                    <li className="text-center py-3 text-muted">
                                        <em>El caldero está vacío...</em>
                                    </li>
                                ) : (
                                    favorites.map((f) => (
                                        <li key={f.id} className="d-flex align-items-center justify-content-between px-2 py-2 hover-magic">
                                            <div 
                                                className="d-flex align-items-center gap-2 flex-grow-1 cursor-pointer"
                                                onClick={() => navigate(`/details/${f.type}/${f.id}`)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <img
                                                    src={f.image}
                                                    alt={f.name}
                                                    style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px" }}
                                                />
                                                <div className="d-flex flex-column">
                                                    <span className="text-white small fw-bold text-truncate" style={{ maxWidth: "150px" }}>
                                                        {f.name}
                                                    </span>
                                                    <span className="text-muted" style={{ fontSize: "0.7rem" }}>
                                                        {f.type.toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            {/* BOTÓN BASURA: Usa toggleFavorite para eliminar */}
                                            <button
                                                className="btn btn-sm text-danger ms-2"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Evita que el click abra los detalles
                                                    actions.toggleFavorite(f);
                                                }}
                                            >
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
                                        </li>
                                    ))
                                )}
                                
                                {favorites.length > 0 && (
                                    <>
                                        <li><hr className="dropdown-divider border-secondary" /></li>
                                        <li>
                                            <button 
                                                className="btn btn-outline-warning btn-sm w-100 mt-1"
                                                onClick={() => navigate("/favorites")}
                                            >
                                                Ver todos los favoritos
                                            </button>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
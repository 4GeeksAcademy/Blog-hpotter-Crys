import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../js/store/context.jsx";

const Navbar = () => {
    const { store, actions } = useContext(Context);
    const favorites = store?.favorites || [];
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg sticky-top main-nav-container">
            <div className="container">
                {/* LOGO Y TITULO */}
                <Link to="/" className="navbar-brand d-flex align-items-center gap-3 magic-brand">
                    <div className="logo-wrapper">
                        <img
                            src="src/imagenes/navbar/logo1.png"
                            alt="Hogwarts Logo"
                            id="nav-logo"
                            className="rounded-circle"
                        />
                    </div>
                    <span id="nav-title" className="h-potter-title">
                        Wizarding Nexus
                    </span>
                </Link>

                <button
                    className="navbar-toggler custom-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                >
                    <i className="fa-solid fa-wand-sparkles text-warning"></i>
                </button>

                <div className="collapse navbar-collapse" id="mainNavbar">
                    <div className="d-flex align-items-center ms-auto gap-3 mt-3 mt-lg-0">
                      
                        <div className="dropdown">
                            <button
                                className="btn-magic-neon dropdown-toggle d-flex align-items-center gap-2"
                                type="button"
                                id="favoritesDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="fa-solid fa-bolt-lightning icon-electric"></i>
                                <span className="d-none d-md-inline">Favoritos</span>
                                <span className="badge-neon">{favorites.length}</span>
                            </button>

                            <ul className="dropdown-menu dropdown-menu-end glass-dropdown p-0 shadow-lg">
                                <li className="dropdown-header text-gradient-gold fw-bold p-3 border-bottom border-secondary">
                                    <i className="fa-solid fa-book-sparkles me-2"></i>MI ALMACÉN MÁGICO
                                </li>

                                <div className="fav-list-scroll" style={{ maxHeight: "350px", overflowY: "auto" }}>
                                    {favorites.length === 0 ? (
                                        <li className="text-center py-4 empty-msg">
                                            <i className="fa-solid fa-cauldron d-block mb-2 fs-4 opacity-50"></i>
                                            <em>Tu caldero está vacío...</em>
                                        </li>
                                    ) : (
                                        favorites.map((f) => (
                                            <li key={f.id} className="fav-item-row p-2">
                                                <div
                                                    className="d-flex align-items-center gap-2 flex-grow-1"
                                                    onClick={() => navigate(`/details/${f.type}/${f.id}`)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <img src={f.image} alt={f.name} className="fav-thumb" />
                                                    <div className="d-flex flex-column">
                                                        <span className="fav-name text-truncate">{f.name}</span>
                                                        <span className="fav-type">{f.type.toUpperCase()}</span>
                                                    </div>
                                                </div>
                                                <button
                                                    className="btn-remove-fav"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        actions.toggleFavorite(f);
                                                    }}
                                                >
                                                    <i className="fa-solid fa-trash-can"></i>
                                                </button>
                                            </li>
                                        ))
                                    )}
                                </div>

                                <li className="p-2 dropdown-footer-magic">
                                    <button
                                        className="btn-view-all-magic w-100"
                                        onClick={() => navigate("/favorites")}
                                    >
                                        Ver todo el Grimorio <i className="fa-solid fa-arrow-right-long ms-2"></i>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
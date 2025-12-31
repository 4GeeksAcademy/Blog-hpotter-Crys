// src/js/components/Navbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../js/store/context.jsx"; // Import correcto y estático

const Navbar = () => {
  const { store, actions } = useContext(Context) || {};
  const favorites = (store && store.favorites) || [];
  const navigate = useNavigate();

  const goToFavoritesPage = () => navigate("/favorites");

  const handleRemoveFavorite = (id) => {
    if (!actions || !actions.removeFavorite) return;
    actions.removeFavorite(id);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Logo + Nombre: clickeables, llevan a Home */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <img
            src="/assets/images/logo-hat.png"
            alt="Sombrero mágico"
            width="36"
            height="36"
            className="d-inline-block align-text-top"
            id="nav-logo"
          />
          <span id="nav-title" className="fw-bold">Hogwarts</span>
        </Link>

        {/* Botón colapsable para móvil */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Contenido colapsable: favoritos */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          <div className="d-flex align-items-center ms-auto gap-2">
            {/* Botón favoritos */}
            <button
              type="button"
              className="btn btn-outline-warning position-relative"
              onClick={goToFavoritesPage}
              aria-label={`Favoritos, ${favorites.length} elementos`}
            >
              <i className="fa-solid fa-heart"></i>
              <span className="visually-hidden">Favoritos</span>
              <span
                id="favorites-count"
                className="badge bg-danger position-absolute top-0 start-100 translate-middle"
                style={{ fontSize: "0.65rem" }}
              >
                {favorites.length}
              </span>
            </button>

            {/* Dropdown preview de favoritos */}
            <div className="dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle"
                type="button"
                id="favoritesPreviewBtn"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <i className="fa-solid fa-list"></i>
                <span className="ms-1">Favoritos</span>
              </button>

              <ul
                className="dropdown-menu dropdown-menu-end p-2"
                aria-labelledby="favoritesPreviewBtn"
                style={{ minWidth: 280 }}
              >
                <li className="dropdown-header">Favoritos ({favorites.length})</li>
                {favorites.length === 0 && <li className="px-3 text-muted">Sin favoritos aún</li>}
                {favorites.slice(0, 5).map((f) => (
                  <li key={f.id} className="d-flex align-items-center justify-content-between px-2 py-1">
                    <Link
                      to={`/details/${f.type}/${encodeURIComponent(f.id)}`}
                      className="text-decoration-none text-dark flex-grow-1"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={f.image || "/assets/images/placeholder.png"}
                          alt={f.title}
                          style={{ width: 36, height: 36, objectFit: "cover", borderRadius: 6 }}
                        />
                        <div className="small">
                          <div className="fw-semibold">{f.title}</div>
                          <div className="text-muted">{f.subtitle || f.type}</div>
                        </div>
                      </div>
                    </Link>
                    <button
                      className="btn btn-sm btn-link text-danger"
                      onClick={() => handleRemoveFavorite(f.id)}
                      aria-label={`Eliminar ${f.title} de favoritos`}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </li>
                ))}
                <li><hr className="dropdown-divider" /></li>
                <li className="px-2">
                  <button className="btn btn-sm btn-primary w-100" onClick={goToFavoritesPage}>
                    Ver todos los favoritos
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

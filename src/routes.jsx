import { createBrowserRouter } from "react-router-dom";

// Importamos el Layout
import { Layout } from "./views/Layout";
// Importamos las vistas (Asegúrate de que los nombres de archivo coincidan)
import Home from "./views/Home";
import Details from "./views/Details"; // La que acabamos de crear
import { FavoritesPage } from "./views/FavoritesPage"; // La que haremos a continuación

// Definimos el router de la aplicación
export const router = createBrowserRouter([
    {
        // Ruta raíz que envuelve toda la app con el Navbar y Footer
        path: "/",
        element: <Layout />,
        errorElement: (
            <div className="text-center mt-5 text-white">
                <h1 style={{ fontSize: "5rem" }}>404 🪄</h1>
                <h2>¡Bombarda!</h2>
                <p>Este rincón del mapa del merodeador no existe o ha sido encantado.</p>
                <a href="/" className="btn btn-warning mt-3">Volver al Castillo</a>
            </div>
        ),
        // Rutas hijas que se inyectan en el <Outlet /> del Layout
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                // :type será 'books', 'movies', 'characters', etc.
                // :id será el ID único que viene de PotterDB
                path: "details/:type/:id",
                element: <Details />
            },
            {
                // Ruta para la página dedicada a ver todos los favoritos
                path: "favorites",
                element: <FavoritesPage />
            }
        ]
    }
]);
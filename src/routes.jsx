import { createBrowserRouter } from "react-router-dom";


import { Layout } from "./views/Layout";
import Home from "./views/Home";
import Details from "./views/Details";
import { FavoritesPage } from "./views/FavoritesPage";


export const router = createBrowserRouter([
    {

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

        children: [
            {
                index: true,
                element: <Home />
            },
            {

                path: "details/:type/:id",
                element: <Details />
            },
            {

                path: "favorites",
                element: <FavoritesPage />
            }
        ]
    }
]);
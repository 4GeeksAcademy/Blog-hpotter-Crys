import { createBrowserRouter } from "react-router-dom";

import { Layout } from "./views/Layout";
import  Home  from "./views/Home";

// Definimos el router de la aplicación
export const router = createBrowserRouter([
  {
    // Ruta raíz de la aplicación
    path: "/",
    element: <Layout />,
    errorElement: (
      <div className="text-center mt-5">
        <h1>404 🪄</h1>
        <p>Este hechizo no existe en Hogwarts.</p>
      </div>
    ),
        // Rutas hijas que se renderizan dentro del <Outlet />
        children: [
      {
        index: true,
        element: <Home />
      }
    ]
  }
]);

/*
 * NOTA IMPORTANTE:
 * No estoy usando useGlobalReducer de la plantilla.
 * He construido Context + Flux + Provider desde cero para practicar arquitectura profesional
 * y tambien ir aprendiendo por mi cuenta.
 *  Todo el resto de la app sigue el mismo objetivo de aprendizaje: mantener código limpio, 
 * modular, reutilizable y escalable.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";  // Estilos globales
import { RouterProvider } from "react-router-dom";  // Router de la app
import { router } from "./routes";  // Configuración de rutas
import ContextProvider from "./js/store/context";  // Nuestro Provider global

const Main = () => {
    return (
        <React.StrictMode>
            {/* Provider global: inyecta store y actions a toda la app */}
            <ContextProvider>
                {/* RouterProvider: maneja todas las rutas definidas */}
                <RouterProvider router={router} />
            </ContextProvider>
        </React.StrictMode>
    );
};

// Renderiza la app en el root del HTML
ReactDOM.createRoot(document.getElementById("root")).render(<Main />);

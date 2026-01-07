/*NOTA IMPORTANTE:
 No estoy usando useGlobalReducer de la plantilla.
He construido Context + Flux + Provider desde cero para practicar arquitectura
  y tambien ir aprendiendo por mi cuenta. */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";  
import { RouterProvider } from "react-router-dom";  
import { router } from "./routes";  
import ContextProvider from "./js/store/context";  

const Main = () => {
    return (
        <React.StrictMode>
            <ContextProvider>
                <RouterProvider router={router} />
            </ContextProvider>
        </React.StrictMode>
    );
};


ReactDOM.createRoot(document.getElementById("root")).render(<Main />);

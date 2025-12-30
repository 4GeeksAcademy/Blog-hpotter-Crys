import React, { createContext, useState, useEffect } from "react";
import getState from "./flux";

// Creamos el Context (el canal global)
export const Context = createContext(null);

// Creamos el Provider (el enchufe de la app)
const ContextProvider = ({ children }) => {
	// Estado interno que almacenará store y actions
	const [state, setState] = useState(
		getState({
			getStore: () => state.store,
			getActions: () => state.actions,
			setStore: updatedStore =>
				setState({
					store: Object.assign(state.store, updatedStore),
					actions: { ...state.actions }
				})
		})
	);

	return (
		<Context.Provider value={state}>
			{children}
		</Context.Provider>
	);
};

export default ContextProvider;

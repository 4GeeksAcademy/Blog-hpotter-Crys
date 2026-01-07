import React, { createContext, useState, useEffect } from "react";
import getState from "./flux";


export const Context = createContext(null);


const ContextProvider = ({ children }) => {
	
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

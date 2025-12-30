const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			characters: [],
			staff: [],
			spells: [],
			creatures: [],
			favorites: [],
			loading: false,
			error: null
		},

		actions: {}
	};
};

export default getState;

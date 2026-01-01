// src/js/store/flux.js

const baseURL = `https://hp-api.onrender.com/api`;

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

		actions: {

      // ⚡ Fetch personajes (all)
      loadCharacters: async () => {
        try {
          setStore({ loading: true, error: null });
          const res = await fetch(`${baseURL}/characters`);
          const data = await res.json();
          setStore({ characters: data, loading: false });
        } catch (err) {
          setStore({ error: "Error al cargar personajes", loading: false });
        }
      },

      // 👨‍🏫 Fetch staff/profesores
      loadStaff: async () => {
        try {
          setStore({ loading: true, error: null });
          const res = await fetch(`${baseURL}/characters/staff`);
          const data = await res.json();
          setStore({ staff: data, loading: false });
        } catch (err) {
          setStore({ error: "Error al cargar staff", loading: false });
        }
      },

      // 🪄 Fetch spells/hechizos
      loadSpells: async () => {
        try {
          setStore({ loading: true, error: null });
          const res = await fetch(`${baseURL}/spells`);
          const data = await res.json();
          setStore({ spells: data, loading: false });
        } catch (err) {
          setStore({ error: "Error al cargar hechizos", loading: false });
        }
      },

      // ❤️ Agregar favorito
      addFavorite: (item) => {
        const store = getStore();
        const exists = store.favorites.find((f) => f.id === item.id);
        if (!exists) {
          setStore({ favorites: [...store.favorites, item] });
        }
      },

      // 🗑️ Eliminar favorito por id
      removeFavorite: (id) => {
        const store = getStore();
        const newFavs = store.favorites.filter((f) => f.id !== id);
        setStore({ favorites: newFavs });
      },
      
		}
	};
};

export default getState;

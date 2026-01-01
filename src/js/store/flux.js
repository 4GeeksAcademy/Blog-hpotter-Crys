// src/js/store/flux.js

const baseURL = `https://hp-api.onrender.com/api`;
// src/js/store/flux.js
const getState = ({ getStore, getActions, setStore }) => ({
  store: {
    characters: [],
    staff: [],
    spells: [],
    favorites: [],
    loading: false,
    error: null
  },
  actions: {
    toggleFavorite: (item, type) => {
      const store = getStore();
      const exists = store.favorites.find(f => f.id === item.id && f.type === type);
      const newFavorites = exists
        ? store.favorites.filter(f => !(f.id === item.id && f.type === type))
        : [...store.favorites, { ...item, type }];
      setStore({ ...store, favorites: newFavorites });
    },
    loadCharacters: async () => {
      const store = getStore();
      setStore({ ...store, loading: true });
      try {
        const res = await fetch("https://hp-api.onrender.com/api/characters");
        const data = await res.json();
        setStore({ ...store, characters: data, loading: false });
      } catch (error) {
        setStore({ ...store, error, loading: false });
      }
    },
    loadStaff: async () => {
      const store = getStore();
      setStore({ ...store, loading: true });
      try {
        const res = await fetch("https://hp-api.onrender.com/api/characters/staff");
        const data = await res.json();
        setStore({ ...store, staff: data, loading: false });
      } catch (error) {
        setStore({ ...store, error, loading: false });
      }
    },
    loadSpells: async () => {
      const store = getStore();
      setStore({ ...store, loading: true });
      try {
        const res = await fetch("https://hp-api.onrender.com/api/spells");
        const data = await res.json();
        setStore({ ...store, spells: data, loading: false });
      } catch (error) {
        setStore({ ...store, error, loading: false });
      }
    }
  }
});

export default getState;

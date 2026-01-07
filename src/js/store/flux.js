const getState = ({ getStore, getActions, setStore }) => {
    const API_URL = "https://api.potterdb.com/v1";

   
    const DEFAULT_IMAGES = [
        "/assets/images/defaults/magic1.jpg",
        "/assets/images/defaults/magic2.jpg",
        "/assets/images/defaults/magic3.jpg",
        "/assets/images/defaults/magic4.jpg"
    ];

    const getFallbackImage = () => {
        const randomIndex = Math.floor(Math.random() * DEFAULT_IMAGES.length);
        return DEFAULT_IMAGES[randomIndex];
    };

    return {
        store: {
            books: [],
            movies: [],
            characters: [],
            potions: [],
            spells: [],
            favorites: [],
        },
        actions: {
            
            toggleFavorite: (item) => {
                const store = getStore();
                const exists = store.favorites.find(fav => fav.id === item.id);
                const newFavorites = exists
                    ? store.favorites.filter(fav => fav.id !== item.id)
                    : [...store.favorites, item];
                
                setStore({ favorites: newFavorites });
            },

          
            loadResource: async (resource) => {
                try {
                    const response = await fetch(`${API_URL}/${resource}`);
                    if (!response.ok) throw new Error(`Error en ${resource}`);
                    const json = await response.json();

                    const cleanData = json.data.map(item => {
                        const attr = item.attributes;
                        // Normalizamos la data para que el componente "Home" sea sencillo
                        return {
                            id: item.id,
                            type: resource,
                            name: attr.name || attr.title,
                            image: attr.image || attr.cover || attr.poster || getFallbackImage(),
                            description: attr.slug,
                            ...attr
                        };
                    });

                    setStore({ [resource]: cleanData });
                } catch (error) {
                    console.error("Error cargando " + resource, error);
                }
            },

            loadAllData: () => {
                const actions = getActions();
                actions.loadResource("books");
                actions.loadResource("movies");
                actions.loadResource("characters");
                actions.loadResource("potions");
                actions.loadResource("spells");
            }
        }
    };
};

export default getState;
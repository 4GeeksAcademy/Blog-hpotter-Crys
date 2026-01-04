import d1 from "../../imagenes/default/d1.png";
import d2 from "../../imagenes/default/d2.png";
import d3 from "../../imagenes/default/d3.png";
import d4 from "../../imagenes/default/d4.png";

const defaults = [d1, d2, d3, d4];

export const getSafeImage = (item) => {
    if (item?.image && item.image.trim() !== "") return item.image;

    const index =
        typeof item?.id === "number"
            ? Math.abs(item.id) % defaults.length
            : Math.floor(Math.random() * defaults.length);

    return defaults[index];
};

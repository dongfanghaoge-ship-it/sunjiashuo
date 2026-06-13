import {renderAll} from "./render.js";
import {initScroll} from "./scroll.js";
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
renderAll();
initScroll(reduced);

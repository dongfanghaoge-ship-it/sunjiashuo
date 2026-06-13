import {renderAll} from "./render.js";
import {initScroll} from "./scroll.js";
import {initCursor} from "./cursor.js";
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
renderAll();
initScroll(reduced);
if(!reduced) initCursor();

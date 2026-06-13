import {renderAll} from "./render.js";
import {initScroll} from "./scroll.js";
import {initCursor} from "./cursor.js";
import {initAnimations} from "./animations.js";
import {initWorks} from "./works.js";
import {initHeroCanvas} from "./hero-canvas.js";
import {initPreloader} from "./preloader.js";
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
initPreloader();
renderAll();
initScroll(reduced);
const animated = !reduced && !!window.gsap;
if(!reduced) initCursor();
initWorks();
if(animated){
  initAnimations();
}else{
  document.querySelectorAll(".num[data-count]").forEach(el=>{el.textContent=el.dataset.count||"0";});
}
if(!reduced && !matchMedia("(hover: none)").matches) initHeroCanvas();

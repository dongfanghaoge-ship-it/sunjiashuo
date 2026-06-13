import {renderAll} from "./render.js";
import {initScroll} from "./scroll.js";
import {initCursor} from "./cursor.js";
import {initAnimations} from "./animations.js";
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
renderAll();
initScroll(reduced);
const animated = !reduced && !!window.gsap;
if(!reduced) initCursor();
if(animated){
  initAnimations();
}else{
  // 动效关闭或 gsap 未加载：数字直接显示真实值，避免停留在 0
  document.querySelectorAll(".num[data-count]").forEach(el=>{el.textContent=el.dataset.count||"0";});
}

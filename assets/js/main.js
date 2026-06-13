import {renderAll} from "./render.js";
import {initScroll} from "./scroll.js";
import {initCursor} from "./cursor.js";
import {initAnimations} from "./animations.js";
import {initWorks} from "./works.js";
import {initFloat} from "./hero-float.js";
import {initPreloader} from "./preloader.js";

const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches || /[?&]static/.test(location.search);
initPreloader();
renderAll();
initScroll(reduced);
initWorks();
if(!reduced){ initCursor(); initFloat(); }

const animated = !reduced && !!window.gsap;
if(animated){
  initAnimations();
}else{
  // 动效关闭：数字直接显示真实值
  document.querySelectorAll(".num[data-count]").forEach(el=>{el.textContent=el.dataset.count||"0";});
}

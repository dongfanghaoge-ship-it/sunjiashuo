
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches || /[?&]static/.test(location.search);
initPreloader();
renderAll();
initHeroShader(reduced);
initClock();
initScroll(reduced);
initWorks();
initTypewriter(reduced);
if(!reduced){ initCursor(); initFloat(); }

// 导航栏实时时钟（济南 / 北京时间）
function initClock(){
  const el=document.getElementById("navClock");
  if(!el) return;
  const fmt=new Intl.DateTimeFormat("zh-CN",{timeZone:"Asia/Shanghai",hour:"2-digit",minute:"2-digit",hour12:false});
  const upd=()=>{ el.textContent=fmt.format(new Date()); };
  upd(); setInterval(upd,1000);
}

const animated = !reduced && !!window.gsap;
if(animated){
  initAnimations();
}else{
  // 动效关闭：数字直接显示真实值
  document.querySelectorAll(".num[data-count]").forEach(el=>{el.textContent=el.dataset.count||"0";});
}

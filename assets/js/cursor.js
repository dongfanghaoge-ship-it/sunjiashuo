export function initCursor(){
  if(matchMedia("(hover: none)").matches) return;
  const el=document.getElementById("cursor");
  let x=innerWidth/2,y=innerHeight/2,cx=x,cy=y;
  addEventListener("mousemove",e=>{x=e.clientX;y=e.clientY;});
  (function loop(){cx+=(x-cx)*.18;cy+=(y-cy)*.18;
    el.style.transform=`translate(${cx}px,${cy}px) translate(-50%,-50%)`;requestAnimationFrame(loop);})();
  const hot='a,button,.card,.btn,.gallery__item,.video-card,.article';
  document.addEventListener("mouseover",e=>{if(e.target.closest(hot))el.classList.add("is-hot");});
  document.addEventListener("mouseout",e=>{if(e.target.closest(hot))el.classList.remove("is-hot");});
  document.body.classList.add("has-cursor");
}

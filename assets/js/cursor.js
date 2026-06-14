// 自定义光标：山大红圆点，悬停可交互元素时放大并显示标签（查看/拖拽/放大…）。
function initCursor(){
  if(matchMedia("(hover: none)").matches) return;
  const el=document.getElementById("cursor");
  const label=el.querySelector(".label");
  let x=innerWidth/2,y=innerHeight/2,cx=x,cy=y;
  addEventListener("mousemove",e=>{x=e.clientX;y=e.clientY;});
  (function loop(){
    cx+=(x-cx)*.2;cy+=(y-cy)*.2;
    el.style.transform=`translate(${cx}px,${cy}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  })();
  const hot='a,button,.btn,[data-cursor],[data-zoom],[data-href],.drag-row';
  document.addEventListener("mouseover",e=>{
    const t=e.target.closest(hot);
    if(!t)return;
    el.classList.add("is-hot");
    label.textContent=t.getAttribute("data-cursor")||(t.classList.contains("drag-row")?"拖拽":"");
  });
  document.addEventListener("mouseout",e=>{
    if(e.target.closest(hot)){el.classList.remove("is-hot");label.textContent="";}
  });
  document.body.classList.add("has-cursor");
}

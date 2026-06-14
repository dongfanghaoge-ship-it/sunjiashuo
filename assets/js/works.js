// 作品集交互：横排拖拽滚动、图片点击放大、整行可点。
function initWorks(){
  // 横排拖拽
  document.querySelectorAll(".drag-row").forEach(row=>{
    let down=false,sx=0,sl=0,moved=0;
    row.addEventListener("pointerdown",e=>{down=true;sx=e.clientX;sl=row.scrollLeft;moved=0;row.setPointerCapture(e.pointerId);});
    row.addEventListener("pointermove",e=>{
      if(!down)return;const dx=e.clientX-sx;moved=Math.max(moved,Math.abs(dx));
      row.scrollLeft=sl-dx;if(Math.abs(dx)>4)row.classList.add("is-drag");
    });
    const up=()=>{down=false;setTimeout(()=>row.classList.remove("is-drag"),0);};
    row.addEventListener("pointerup",up);row.addEventListener("pointercancel",up);
    row.addEventListener("click",e=>{if(moved>6){e.preventDefault();e.stopPropagation();}},true);
  });

  // 图片放大 lightbox
  const lb=document.getElementById("lightbox");
  const lbImg=lb?.querySelector(".lightbox__img");
  const open=src=>{if(!lb||!src)return;lbImg.src=src;lb.hidden=false;lb.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";};
  const close=()=>{if(!lb)return;lb.hidden=true;lb.setAttribute("aria-hidden","true");lbImg.src="";document.body.style.overflow="";};
  document.querySelectorAll("[data-zoom][data-src]").forEach(f=>{
    const src=f.getAttribute("data-src");
    if(!src)return;
    f.addEventListener("click",()=>open(src));
  });
  lb?.addEventListener("click",e=>{if(e.target===lb||e.target.closest(".lightbox__close"))close();});
  addEventListener("keydown",e=>{if(e.key==="Escape")close();});

  // 整行可点（科研 PDF）
  document.querySelectorAll(".row[data-href]").forEach(r=>{
    r.addEventListener("click",e=>{
      if(e.target.closest("a"))return;
      window.open(r.getAttribute("data-href"),"_blank","noopener");
    });
  });
}

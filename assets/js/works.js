// 作品集交互：横排拖拽 + 图片放大 + 整行可点 + 往返轮播（不复制图片）。
function initWorks(){
  // 图片放大 lightbox
  const lb=document.getElementById("lightbox");
  const lbImg=lb?.querySelector(".lightbox__img");
  const openLightbox=src=>{if(!lb||!src)return;lbImg.src=src;lb.hidden=false;lb.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";};
  const closeLightbox=()=>{if(!lb)return;lb.hidden=true;lb.setAttribute("aria-hidden","true");lbImg.src="";document.body.style.overflow="";};
  lb?.addEventListener("click",e=>{if(e.target===lb||e.target.closest(".lightbox__close"))closeLightbox();});
  addEventListener("keydown",e=>{if(e.key==="Escape")closeLightbox();});

  const reducedMotion=matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(".drag-row").forEach(row=>{
    let down=false,sx=0,sl=0,moved=0,clickTarget=null,hover=false;
    row.addEventListener("pointerdown",e=>{down=true;sx=e.clientX;sl=row.scrollLeft;moved=0;clickTarget=e.target;row.setPointerCapture(e.pointerId);});
    row.addEventListener("pointermove",e=>{
      if(!down)return;const dx=e.clientX-sx;moved=Math.max(moved,Math.abs(dx));
      row.scrollLeft=sl-dx;if(Math.abs(dx)>4)row.classList.add("is-drag");
    });
    const up=()=>{
      down=false;setTimeout(()=>row.classList.remove("is-drag"),0);
      if(moved<=6&&clickTarget){
        const link=clickTarget.closest("a[href]");
        if(link){ const href=link.getAttribute("href"); if(href) window.open(href,link.target||"_blank","noopener"); }
        else {
          const zoom=clickTarget.closest("[data-zoom][data-src]");
          if(zoom){ const src=zoom.getAttribute("data-src"); if(src) openLightbox(src); }
        }
      }
      clickTarget=null;
    };
    row.addEventListener("pointerup",up);row.addEventListener("pointercancel",up);
    row.addEventListener("pointerenter",()=>{hover=true;});
    row.addEventListener("pointerleave",()=>{hover=false;});

    // 往返轮播：到头即折返，无需复制图片即可头尾相接
    if(!reducedMotion){
      let dir=1;
      setTimeout(()=>{
        (function auto(){
          const max=row.scrollWidth-row.clientWidth;
          if(max>0 && !down && !hover){
            row.scrollLeft+=1.2*dir;
            if(row.scrollLeft>=max-1) dir=-1;
            else if(row.scrollLeft<=1) dir=1;
          }
          requestAnimationFrame(auto);
        })();
      },800);
    }
  });

  // 图片放大（drag-row 外的元素，如聘书等）
  document.addEventListener("click",e=>{
    const zoom=e.target.closest("[data-zoom][data-src]");
    if(zoom){ const src=zoom.getAttribute("data-src"); if(src) openLightbox(src); }
  });

  // 整行可点（科研 PDF）
  document.querySelectorAll(".row[data-href]").forEach(r=>{
    r.addEventListener("click",e=>{
      if(e.target.closest("a"))return;
      window.open(r.getAttribute("data-href"),"_blank","noopener");
    });
  });
}

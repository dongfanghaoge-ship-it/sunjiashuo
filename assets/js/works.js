// 作品集交互：横排无缝循环跑马灯（不操作时缓慢展映）+ 拖拽 + 图片放大 + 整行可点。
function initWorks(){
  const reducedMotion=matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(".drag-row").forEach(row=>{
    const originals=[...row.children];
    let loopW=0;
    if(!reducedMotion && originals.length){
      // 复制若干组，保证内容足够长可无缝循环
      let guard=0;
      do{ originals.forEach(n=>row.appendChild(n.cloneNode(true))); guard++; }
      while(row.scrollWidth < row.clientWidth*2 && guard<12);
      // 一组的循环距离（含间距）
      loopW = row.children[originals.length].offsetLeft - row.children[0].offsetLeft;
    }

    let down=false,sx=0,sl=0,moved=0,hover=false;
    row.addEventListener("pointerdown",e=>{down=true;sx=e.clientX;sl=row.scrollLeft;moved=0;row.setPointerCapture(e.pointerId);});
    row.addEventListener("pointermove",e=>{
      if(!down)return;const dx=e.clientX-sx;moved=Math.max(moved,Math.abs(dx));
      row.scrollLeft=sl-dx;if(Math.abs(dx)>4)row.classList.add("is-drag");
    });
    const up=()=>{down=false;setTimeout(()=>row.classList.remove("is-drag"),0);};
    row.addEventListener("pointerup",up);row.addEventListener("pointercancel",up);
    row.addEventListener("click",e=>{if(moved>6){e.preventDefault();e.stopPropagation();}},true);
    row.addEventListener("pointerenter",()=>{hover=true;});
    row.addEventListener("pointerleave",()=>{hover=false;});

    if(!reducedMotion && loopW>0){
      (function auto(){
        if(!down && !hover){
          row.scrollLeft+=0.4;                       // 缓慢匀速
          if(row.scrollLeft>=loopW) row.scrollLeft-=loopW;   // 无缝回跳
          else if(row.scrollLeft<0) row.scrollLeft+=loopW;
        }
        requestAnimationFrame(auto);
      })();
    }
  });

  // 图片放大 lightbox（在克隆之后绑定，副本也可点）
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

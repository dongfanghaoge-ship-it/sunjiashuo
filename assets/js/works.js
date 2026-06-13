export function initWorks(){
  const lb=document.getElementById("lightbox");
  const lbImg=lb?.querySelector(".lightbox__img");
  const open=src=>{if(!lb||!src)return;lbImg.src=src;lb.hidden=false;lb.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";};
  const close=()=>{if(!lb)return;lb.hidden=true;lb.setAttribute("aria-hidden","true");lbImg.src="";document.body.style.overflow="";};
  document.querySelectorAll(".gallery__item[data-src]").forEach(f=>{
    const src=f.getAttribute("data-src");
    f.addEventListener("click",()=>open(src));
    f.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open(src);}});
  });
  lb?.addEventListener("click",e=>{if(e.target===lb||e.target.closest(".lightbox__close"))close();});
  addEventListener("keydown",e=>{if(e.key==="Escape")close();});

  const links=[...document.querySelectorAll(".pf-nav a")];
  const map=new Map(links.map(a=>[a.getAttribute("href").slice(1),a]));
  if(links.length&&"IntersectionObserver" in window){
    const io=new IntersectionObserver(es=>es.forEach(en=>{
      if(en.isIntersecting){links.forEach(l=>l.classList.remove("is-active"));map.get(en.target.id)?.classList.add("is-active");}
    }),{rootMargin:"-40% 0px -55% 0px"});
    ["pf-data","pf-write","pf-video","pf-visual"].forEach(id=>{const el=document.getElementById(id);if(el)io.observe(el);});
  }
}

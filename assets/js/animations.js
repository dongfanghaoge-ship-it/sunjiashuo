export function initAnimations(){
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(".hero__name",{y:80,opacity:0,duration:1.1,ease:"power3.out"});
  gsap.from(".hero__tag",{y:30,opacity:0,duration:.9,delay:.25,ease:"power3.out"});
  document.querySelectorAll(".sec__title").forEach(t=>{
    gsap.from(t,{y:40,opacity:0,duration:.8,ease:"power3.out",
      scrollTrigger:{trigger:t,start:"top 85%"}});
  });
  gsap.utils.toArray(".card,.article,.video-card,.gallery__item,.timeline__item,.wall__item").forEach((el,i)=>{
    gsap.from(el,{y:36,opacity:0,duration:.7,ease:"power3.out",
      scrollTrigger:{trigger:el,start:"top 90%"},delay:(i%6)*.04});
  });
  gsap.utils.toArray(".num[data-count]").forEach(el=>{
    const end=+el.dataset.count||0;const o={v:0};
    gsap.to(o,{v:end,duration:1.2,ease:"power1.out",
      scrollTrigger:{trigger:el,start:"top 90%"},
      onUpdate:()=>{el.textContent=Math.round(o.v);}});
  });
  gsap.utils.toArray(".video-card__media img").forEach(m=>{
    gsap.to(m,{yPercent:-6,ease:"none",
      scrollTrigger:{trigger:m,start:"top bottom",end:"bottom top",scrub:true}});
  });
}

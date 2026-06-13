// 入场与滚动动效（GSAP + ScrollTrigger）。动效关闭时不调用本模块，元素保持默认可见。
export function initAnimations(){
  gsap.registerPlugin(ScrollTrigger);

  // 首页入场
  gsap.from(".hero__meta",{y:24,opacity:0,duration:.8,ease:"power3.out",delay:.15});
  gsap.from(".hero__name",{y:90,opacity:0,duration:1.1,ease:"power4.out",delay:.25});
  gsap.from(".hero__tag",{y:24,opacity:0,duration:.9,ease:"power3.out",delay:.5});
  gsap.from(".floaty--hero",{opacity:0,scale:.9,duration:1.2,ease:"power3.out",delay:.4});

  // 通用滚动揭示
  const reveal=(sel,opt={})=>gsap.utils.toArray(sel).forEach((el,i)=>{
    gsap.from(el,Object.assign({y:42,opacity:0,duration:.85,ease:"power3.out",
      scrollTrigger:{trigger:el,start:"top 86%"}},opt,{delay:(i%6)*0.05}));
  });
  reveal(".kicker");
  reveal(".big,.contact-big",{y:60});
  reveal(".lead");
  reveal(".facts li",{y:30});
  reveal(".tagrow li",{y:18,duration:.5});
  reveal(".work-head");
  reveal(".featured");
  reveal(".article");
  reveal(".vcard,.gcard");
  reveal(".row");
  reveal(".wall li",{y:20,duration:.55});
  reveal(".skills li");
  reveal(".contact-row");

  // 数字计数
  gsap.utils.toArray(".num[data-count]").forEach(el=>{
    const end=+el.dataset.count||0,o={v:0};
    gsap.to(o,{v:end,duration:1.3,ease:"power1.out",
      scrollTrigger:{trigger:el,start:"top 92%"},
      onUpdate:()=>{el.textContent=Math.round(o.v);}});
  });
}

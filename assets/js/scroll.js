export function initScroll(reduced){
  const bar=document.getElementById("progress");
  if(reduced){
    const upd=()=>{const s=scrollY/(document.body.scrollHeight-innerHeight||1);bar.style.transform=`scaleX(${s})`;};
    addEventListener("scroll",upd,{passive:true});upd();
    document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
      const t=document.querySelector(a.getAttribute("href"));if(t){e.preventDefault();t.scrollIntoView();}}));
    return null;
  }
  const lenis=new Lenis({lerp:.1,smoothWheel:true});
  function raf(t){lenis.raf(t);requestAnimationFrame(raf);}requestAnimationFrame(raf);
  lenis.on("scroll",({progress})=>{bar.style.transform=`scaleX(${progress??0})`;});
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
    e.preventDefault();lenis.scrollTo(a.getAttribute("href"),{offset:0});}));
  if(window.ScrollTrigger){lenis.on("scroll",ScrollTrigger.update);}
  return lenis;
}

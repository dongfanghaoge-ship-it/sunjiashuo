// 加载进度条：覆盖层从 0 平滑爬升，页面加载完成（或安全超时）后补满到 100% 并淡出。
export function initPreloader(){
  const pre=document.getElementById("preloader");
  if(!pre) return;
  const bar=pre.querySelector(".preloader__bar");
  const pct=pre.querySelector(".preloader__pct");
  let cur=0, target=12, done=false;
  const finish=()=>{ if(!done){ done=true; target=100; } };
  // 安全兜底：最多 2.2 秒强制完成，避免在线作品 iframe 加载慢导致一直停留
  const safety=setTimeout(finish, 2200);
  addEventListener("load", ()=>{ clearTimeout(safety); finish(); });
  // 缓慢爬升到 90% 营造加载感
  const ramp=setInterval(()=>{ if(!done && target<90) target+=Math.random()*8; }, 120);
  (function loop(){
    cur += (target-cur)*0.12;
    if(done && cur>99.4) cur=100;
    bar.style.transform=`scaleX(${(cur/100).toFixed(4)})`;
    if(pct) pct.textContent=Math.round(cur);
    if(cur>=100){
      clearInterval(ramp);
      pre.classList.add("is-done");
      setTimeout(()=>pre.remove(), 700);
      return;
    }
    requestAnimationFrame(loop);
  })();
}

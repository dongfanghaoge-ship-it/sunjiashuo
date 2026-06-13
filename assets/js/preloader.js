// 加载进度：巨型 % 计数从 0 爬到 100，每次跳动轮换不同字体（仿 coolcooltomato），完成后淡出。
const FONTS = [
  '"Geist",sans-serif',
  'Georgia,"Times New Roman",serif',
  '"Courier New",monospace',
  '"Arial Black",Impact,sans-serif',
  '"Trebuchet MS",sans-serif',
  '"Geist",sans-serif',
];

export function initPreloader(){
  const pre=document.getElementById("preloader");
  if(!pre) return;
  const el=pre.querySelector(".preloader__pct");
  let cur=0, target=10, done=false, last=-1;
  const finish=()=>{ if(!done){ done=true; target=100; } };
  const safety=setTimeout(finish, 2600);
  addEventListener("load", ()=>{ clearTimeout(safety); finish(); });
  const ramp=setInterval(()=>{ if(!done && target<92) target+=Math.random()*9; }, 110);
  (function loop(){
    cur += (target-cur)*0.1;
    if(done && cur>99.4) cur=100;
    const v=Math.round(cur);
    if(v!==last){ last=v; el.textContent=v; el.style.fontFamily=FONTS[v%FONTS.length]; }
    if(cur>=100){
      clearInterval(ramp);
      pre.classList.add("is-done");
      setTimeout(()=>pre.remove(), 750);
      return;
    }
    requestAnimationFrame(loop);
  })();
}

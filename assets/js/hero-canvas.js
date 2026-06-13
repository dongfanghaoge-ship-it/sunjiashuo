export function initHeroCanvas(){
  const cv=document.getElementById("heroCanvas");if(!cv)return;
  const ctx=cv.getContext("2d");let w,hgt,pts=[],mx=-999,my=-999;
  const DPR=Math.min(devicePixelRatio||1,2);
  function size(){const r=cv.getBoundingClientRect();w=cv.width=r.width*DPR;hgt=cv.height=r.height*DPR;}
  function seed(){pts=Array.from({length:Math.min(70,Math.floor(w/26))},()=>({
    x:Math.random()*w,y:Math.random()*hgt,vx:(Math.random()-.5)*.25*DPR,vy:(Math.random()-.5)*.25*DPR}));}
  addEventListener("resize",()=>{size();seed();});
  cv.closest("#hero").addEventListener("mousemove",e=>{const r=cv.getBoundingClientRect();mx=(e.clientX-r.left)*DPR;my=(e.clientY-r.top)*DPR;});
  size();seed();
  (function frame(){ctx.clearRect(0,0,w,hgt);
    for(const p of pts){p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>hgt)p.vy*=-1;}
    ctx.strokeStyle="rgba(158,27,50,.14)";
    for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
      const a=pts[i],b=pts[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy);
      if(d<120*DPR){ctx.globalAlpha=1-d/(120*DPR);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}
    ctx.globalAlpha=1;ctx.fillStyle="rgba(158,27,50,.5)";
    for(const p of pts){ctx.beginPath();ctx.arc(p.x,p.y,1.6*DPR,0,7);ctx.fill();}
    requestAnimationFrame(frame);})();
}

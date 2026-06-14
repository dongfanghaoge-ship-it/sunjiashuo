// 漂浮图片动效（替代参考站的 3D 悬浮物）：缓慢上下浮动 + 跟随鼠标的视差 + 可拖拽并回弹。
function initFloat(){
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nodes=[...document.querySelectorAll("[data-float]")];
  if(!nodes.length) return;
  let mx=0,my=0; // 归一化鼠标位置 (-1..1)
  addEventListener("mousemove",e=>{mx=(e.clientX/innerWidth)*2-1;my=(e.clientY/innerHeight)*2-1;},{passive:true});

  nodes.forEach((node,i)=>{
    const phase=i*1.7, amp=reduced?0:9+ (i%2)*4;
    const st={dx:0,dy:0,rot:0, tdx:0,tdy:0,trot:0, dragging:false, px:0,py:0};

    // 拖拽
    node.addEventListener("pointerdown",e=>{
      st.dragging=true; st.px=e.clientX; st.py=e.clientY;
      node.setPointerCapture(e.pointerId); node.style.cursor="grabbing";
    });
    node.addEventListener("pointermove",e=>{
      if(!st.dragging)return;
      st.tdx+=e.clientX-st.px; st.tdy+=e.clientY-st.py;
      st.trot+= (e.clientX-st.px)*0.15;
      st.px=e.clientX; st.py=e.clientY;
    });
    const release=()=>{ st.dragging=false; node.style.cursor=""; st.tdx=0; st.tdy=0; st.trot=0; };
    node.addEventListener("pointerup",release);
    node.addEventListener("pointercancel",release);

    const start=performance.now();
    (function frame(now){
      const t=(now-start)/1000;
      // 目标 = 拖拽偏移 + 视差（非拖拽时）
      const paX = st.dragging?0: mx*14*(i?-1:1);
      const paY = st.dragging?0: my*14;
      const tx = st.tdx + paX;
      const ty = st.tdy + paY + (st.dragging?0: Math.sin(t*0.9+phase)*amp);
      const tr = st.trot + (st.dragging?0: Math.sin(t*0.6+phase)*2);
      // 弹性逼近
      const k=st.dragging?1:0.08;
      st.dx+=(tx-st.dx)*k; st.dy+=(ty-st.dy)*k; st.rot+=(tr-st.rot)*k;
      node.style.transform=`translate3d(${st.dx.toFixed(2)}px,${st.dy.toFixed(2)}px,0) rotate(${st.rot.toFixed(2)}deg)`;
      requestAnimationFrame(frame);
    })(start);
  });
}

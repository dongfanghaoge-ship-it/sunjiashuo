// 打字机效果：逐字打出 [data-typewriter] 的内容，保留 <em> 等高亮标签。
// 默认等待预加载结束（'preloaded' 事件）再开始；reduced 模式直接显示全文。
function initTypewriter(reduced){
  const el=document.querySelector("[data-typewriter]");
  if(!el) return;
  // 收集所有文本节点并清空，记录原文用于逐字回填
  const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null);
  const items=[]; let node;
  while((node=walker.nextNode())) items.push({node, full:node.nodeValue});
  items.forEach(it=>{ it.node.nodeValue=""; });

  if(reduced){ items.forEach(it=>it.node.nodeValue=it.full); return; }

  el.classList.add("is-typing");
  let i=0,c=0;
  function tick(){
    if(i>=items.length){ el.classList.remove("is-typing"); return; }
    const it=items[i];
    it.node.nodeValue=it.full.slice(0,++c);
    if(c>=it.full.length){ i++; c=0; }
    setTimeout(tick, 40+Math.random()*45);
  }
  let started=false;
  const start=()=>{ if(started)return; started=true; setTimeout(tick,260); };
  window.addEventListener("preloaded", start, {once:true});
  setTimeout(start, 3600); // 兜底：预加载若未触发也会开始
}

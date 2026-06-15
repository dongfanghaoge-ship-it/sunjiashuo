const $ = (sel,el=document)=>el.querySelector(sel);
const STATIC = /[?&]static/.test(location.search);   // 预览/降级模式：不内嵌 iframe
const esc = s => (s==null?"":String(s));
const kicker = (no,label)=>`<p class="kicker"><span class="dot"></span><span class="mono">${no}</span><span>${label}</span></p>`;
// 漂浮图片（替代参考站的 3D 悬浮物）：留空显示占位，给定 src 显示图片；动效由 hero-float.js 接管
const floatImg = (src,alt,cls="")=>`<div class="floaty ${cls}"><div class="floaty__inner" data-float>${src
  ? `<img src="${src}" alt="${esc(alt)}" draggable="false">`
  : `<span class="floaty__ph">${esc(alt)||"图片占位"}</span>`}</div></div>`;

// 内联图标
const SVG_ARROW='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const SVG_CLOCK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
const SVG_STAR='<svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true"><path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z"/></svg>';
const rollBtn=(text)=>`<span class="rollbtn__roll"><span>${text}</span><span aria-hidden="true">${text}</span></span><span class="rollbtn__circle">${SVG_ARROW}</span>`;

function renderNav(){
  const items=[["about","关于"],["works","作品"],["research","科研"],["experience","实践"],["honors","荣誉"],["contact","联系"]];
  $("#nav").innerHTML = `
    <div class="navpill">
      <div class="navpill__group">
        <a class="navpill__logo" href="#hero" aria-label="${esc(profile.name)}">孙</a>
        <ul class="navpill__links">${items.map(([id,t])=>`<li><a href="#${id}">${t}</a></li>`).join("")}</ul>
      </div>
      <div class="navpill__group navpill__right">
        <span class="navpill__status">2026 推免申请中</span>
        <span class="navpill__clock mono">${SVG_CLOCK}<span id="navClock">--:--</span> 济南</span>
        <a class="rollbtn rollbtn--dark" href="#contact" data-cursor="联系">${rollBtn("联系我")}</a>
      </div>
    </div>`;
}

// 封面（仿 Axion：流光背景 + 底部大标题）
function renderHero(){
  $("#hero").innerHTML = `
    <canvas id="heroShader" class="hero-shader" aria-hidden="true"></canvas>
    <div class="cover">
      <div class="cover__top"></div>
      <div class="cover__inner">
        <p class="cover__label mono">${esc(profile.name)} · 个人主页</p>
        <h1 class="cover__title">我用数据新闻与计算传播，<br>把复杂的公共议题，<br>讲得清楚，也讲得好看。</h1>
        <div class="cover__cta">
          <a class="rollbtn rollbtn--red" href="#works" data-cursor="查看">${rollBtn("查看我的作品")}</a>
          <div class="credbadge">
            <span class="credbadge__icon">${SVG_STAR}</span>
            <span class="credbadge__txt">国家奖学金获得者</span>
            <span class="credbadge__tag">2025</span>
          </div>
        </div>
      </div>
    </div>`;
}

// 关于（承接原首页：照片 + 打字机简介 + 长简介 + 学业数据）
function renderAbout(){
  const sents = (profile.about||"").split("。").map(s=>s.trim()).filter(Boolean);
  const mid = Math.ceil(sents.length/2);
  const paras = [sents.slice(0,mid).join("。")+"。", sents.slice(mid).join("。")+(sents.length>mid?"。":"")].filter(p=>p.length>1);
  const facts = academic ? `<ul class="hero2__facts">
      <li><b class="num">${esc(academic.gpaPercent)}</b><span>百分制绩点 · 前五学期</span></li>
      <li><b class="num">${esc(academic.rank)||"待补"}</b><span>专业排名</span></li>
      <li><b class="num num--txt">国家奖学金</b><span>2024–2025学年获得者</span></li>
    </ul>` : "";
  $("#about").innerHTML = `
    ${kicker("01","关于我 / About")}
    <div class="hero2">
      <div class="hero2__photo">${profile.photo
        ? `<img src="${esc(profile.photo)}" alt="${esc(profile.name)}" draggable="false">`
        : `<span class="ph">人物照（待提供）</span>`}</div>
      <div class="hero2__body">
        <p class="hero2__statement" data-typewriter>${profile.statement||esc(profile.tagline)}</p>
        <div class="hero2__bio">${paras.map(p=>`<p>${esc(p)}</p>`).join("")}</div>
        ${facts}
      </div>
    </div>`;
}

function renderWorks(){
  const p=portfolio;
  const pieces=(p.commentary.length)+(p.video.length)+(p.gallery.length)+(p.dataNews.url?1:0);

  // 数据新闻：实时嵌入 + 漂浮信息
  const data=`
    <div class="work-block" id="pf-data">
      <div class="work-head"><span class="mono tag-line">数据新闻 / Data Journalism</span></div>
      <div class="featured">
        <div class="featured__screen">${p.dataNews.url
          ? (STATIC?`<span class="ph">数据新闻在线作品（实时嵌入）</span>`:`<iframe src="${esc(p.dataNews.url)}" title="${esc(p.dataNews.title)}" loading="lazy"></iframe>`)
          : `<span class="ph">数据新闻在线作品（待提供网址）</span>`}</div>
        <div class="featured__meta">
          ${p.dataNews.badge?`<span class="badge">${esc(p.dataNews.badge)}</span>`:""}
          <h3>${esc(p.dataNews.title)||"（作品名待填）"}</h3>
          <p>${esc(p.dataNews.summary)}</p>
          ${p.dataNews.url?`<a class="btn" href="${esc(p.dataNews.url)}" target="_blank" rel="noopener" data-cursor="查看">查看在线作品</a>`:""}
        </div>
      </div>
    </div>`;

  // 新闻评论：身份 + 聘书漂浮图 + 大文章卡
  const write=`
    <div class="work-block" id="pf-write">
      <div class="work-head"><span class="mono tag-line">新闻评论 / Commentary</span></div>
      ${p.commentaryIntro?`<p class="lead lead--sm">${esc(p.commentaryIntro)}</p>`:""}
      <div class="write-grid">
        <div class="article-list">${(p.commentary.length?p.commentary:[null]).map(c=>c?`
          <a class="article ${c.url?"":"article--static"}" ${c.url?`href="${esc(c.url)}" target="_blank" rel="noopener" data-cursor="阅读"`:""}>
            ${c.badge?`<span class="badge">${esc(c.badge)}</span>`:""}
            <h4>${esc(c.title)}</h4>
            <p class="article__meta mono"><span>${esc(c.media)}</span>${c.date?`<span>${esc(c.date)}</span>`:""}</p>
            ${c.quote?`<blockquote>${esc(c.quote)}</blockquote>`:""}
            ${c.url?`<span class="article__go mono">阅读全文 →</span>`:""}
          </a>`:`<p class="ph ph--text">新闻评论作品（待提供）</p>`).join("")}</div>
        <figure class="cert">${p.commentaryCert
          ? `<div class="cert__img" data-zoom data-src="${esc(p.commentaryCert)}" data-cursor="放大"><img src="${esc(p.commentaryCert)}" alt="红网特约青年评论员聘书" draggable="false"></div>`
          : `<span class="ph">红网特约青年评论员聘书（待提供）</span>`}
          <figcaption class="mono">红网特约青年评论员聘书</figcaption></figure>
      </div>
    </div>`;

  // 影像：可拖拽横排
  const video=`
    <div class="work-block" id="pf-video">
      <div class="work-head"><span class="mono tag-line">视频作品 / Video</span><span class="mono drag-hint">拖拽浏览 ↔</span></div>
      <div class="drag-row" data-drag>${(p.video.length?p.video:[null,null,null]).map((v,i)=>v?`
        <a class="vcard" ${v.url?`href="${esc(v.url)}" target="_blank" rel="noopener" data-cursor="下载"`:""}>
          <div class="vcard__media">${v.gif?`<img src="${esc(v.gif)}" alt="${esc(v.title)}" draggable="false">`:`<span class="ph">视频预览</span>`}<span class="vcard__play">▶</span></div>
          <h4>${esc(v.title)}</h4>
          <span class="mono vcard__kind">${esc(v.kind)}</span>
          ${v.url?`<span class="mono vcard__pan">百度网盘${v.code?` · 提取码 ${esc(v.code)}`:""} ↗</span>`:""}
        </a>`:`<div class="vcard"><div class="vcard__media"><span class="ph">视频作品 ${i+1}（待提供）</span></div></div>`).join("")}</div>
    </div>`;

  // 设计与摄影：可拖拽横排 + 点击放大
  const visual=`
    <div class="work-block" id="pf-visual">
      <div class="work-head"><span class="mono tag-line">设计与摄影 / Visual</span><span class="mono drag-hint">拖拽浏览 ↔</span></div>
      <div class="drag-row" data-drag>${(p.gallery.length?p.gallery:[null,null,null,null]).map((g,i)=>g?`
        <figure class="gcard" data-zoom data-src="${esc(g.src)}" data-cursor="放大">
          <img src="${esc(g.src)}" alt="${esc(g.caption)}" draggable="false">
          <figcaption class="mono">${esc(g.caption)}</figcaption></figure>`
        :`<figure class="gcard gcard--ph"><span class="ph">作品 ${i+1}（待提供）</span></figure>`).join("")}</div>
    </div>`;

  $("#works").innerHTML = `
    ${kicker("02","作品集 / Works")}
    <div class="works-title"><h2 class="big">作品集</h2><span class="count mono"><b class="num" data-count="${pieces}">0</b> 件作品 · <b class="num" data-count="${competitions.length}">0</b> 项竞赛获奖</span></div>
    ${data}${write}${video}${visual}`;
}

function renderResearch(){
  $("#research").innerHTML = `
    ${kicker("03","科研与学术 / Research")}
    <h2 class="big">科研与学术</h2>
    <ol class="rows">${research.map(r=>`
      <li class="row" ${r.pdf?`data-href="${esc(r.pdf)}"`:""}>
        <span class="row__no mono">${esc(r.year)}</span>
        <div class="row__main">
          <h3>${esc(r.title)}</h3>
          ${r.venue?`<p class="row__venue mono">${esc(r.venue)}</p>`:""}
          <p>${esc(r.summary)}</p>
          ${r.pdf?`<a class="row__link mono" href="${esc(r.pdf)}" target="_blank" rel="noopener" data-cursor="查看">查看全文 →</a>`:""}
        </div>
      </li>`).join("")}</ol>`;
}

function renderExperience(){
  const photos=`<div class="drag-row" data-drag>${(experiencePhotos.length?experiencePhotos:[null,null,null]).map((p,i)=>p
    ?`<figure class="gcard" data-zoom data-src="${esc(p.src)}" data-cursor="放大"><img src="${esc(p.src)}" alt="${esc(p.caption)}" draggable="false"><figcaption class="mono">${esc(p.caption)}</figcaption></figure>`
    :`<figure class="gcard gcard--ph"><span class="ph">实习照片 ${i+1}（待提供）</span></figure>`).join("")}</div>`;
  $("#experience").innerHTML = `
    ${kicker("04","实践经历 / Experience")}
    <h2 class="big">实践经历</h2>
    <ol class="rows">${experience.map(e=>`
      <li class="row">
        <span class="row__no mono">${esc(e.period)}</span>
        <div class="row__main"><h3>${esc(e.org)}</h3><p class="mono">${esc(e.role)}</p><p>${esc(e.summary)}</p></div>
      </li>`).join("")}</ol>
    <div class="work-head"><span class="mono tag-line">现场 / Snapshots</span><span class="mono drag-hint">拖拽浏览 ↔</span></div>
    ${photos}`;
}

function renderHonors(){
  const comp=competitions.length
    ?`<h3 class="sub">竞赛获奖</h3>
      <ul class="wall">${competitions.map(c=>`<li><span>${esc(c.title)}</span><span class="mono wall__lv">${esc(c.level)} · ${esc(c.year)}</span></li>`).join("")}</ul>`:"";
  $("#honors").innerHTML = `
    ${kicker("05","荣誉与技能 / Honors")}
    <h2 class="big">荣誉与技能</h2>
    ${comp}
    <h3 class="sub">荣誉称号</h3>
    <ul class="wall">${honors.map(o=>`<li><span>${esc(o.name)}</span><span class="mono wall__lv">${esc(o.year)}</span></li>`).join("")}</ul>
    <h3 class="sub">技能</h3>
    <ul class="skills">${skills.map(s=>`<li><b>${esc(s.label)}</b><span>${esc(s.detail)}</span></li>`).join("")}</ul>`;
}

function renderContact(){
  $("#contact").innerHTML = `
    ${kicker("06","联系 / Contact")}
    <h2 class="contact-big">欢迎和我联系！</h2>
    <div class="contact-row">
      ${profile.email?`<a class="contact-link" href="mailto:${esc(profile.email)}" data-cursor="发邮件">${esc(profile.email)}</a>`:`<span class="contact-link">（邮箱待提供）</span>`}
      <a class="btn" href="assets/docs/简历.pdf" target="_blank" rel="noopener" data-cursor="下载">下载简历</a>
    </div>
    <footer class="foot mono"><span>© 2026 ${esc(profile.name)}</span><span>${esc(profile.school)}</span></footer>`;
}

function renderAll(){
  renderNav();renderHero();renderAbout();renderWorks();
  renderResearch();renderExperience();renderHonors();renderContact();
}

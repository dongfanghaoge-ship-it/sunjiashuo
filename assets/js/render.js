import {profile, portfolio, competitions, research, experience, experiencePhotos, honors, skills, academic} from "./content.js";
const $ = (sel,el=document)=>el.querySelector(sel);

export function renderNav(){
  const items=[["about","关于"],["works","作品集"],["research","科研"],["experience","实践"],["honors","荣誉"],["contact","联系"]];
  $("#nav").innerHTML = `<a class="nav__brand" href="#hero">${profile.name}</a>
    <ul class="nav__links">${items.map(([id,t])=>`<li><a href="#${id}">${t}</a></li>`).join("")}</ul>`;
}

export function renderHero(){
  $("#hero").innerHTML = `<canvas id="heroCanvas" aria-hidden="true"></canvas>
    <div class="hero__inner">
      <h1 class="hero__name">${profile.name}</h1>
      <p class="hero__tag">${profile.tagline}</p>
      <p class="hero__cue">向下滚动</p>
    </div>`;
}

export function renderAbout(){
  const facts = academic ? `<ul class="about__facts">
      <li><b class="num">${academic.gpaPercent}</b><span>百分制绩点 · 前五学期</span></li>
      <li><b class="num">${academic.cet6}</b><span>英语六级</span></li>
      <li><b class="num">${academic.cet4}</b><span>英语四级</span></li>
    </ul>` : "";
  $("#about").innerHTML = `<h2 class="sec__title">关于我</h2>
    <div class="about__grid">
      <div class="about__main"><p class="about__text">${profile.about||"（自述待定稿）"}</p>${facts}</div>
      <ul class="about__tags">${profile.tags.map(t=>`<li>${t}</li>`).join("")}</ul>
    </div>`;
}

export function renderWorks(){
  const p=portfolio;
  const pieces=(p.commentary.length)+(p.video.length)+(p.gallery.length)+(p.dataNews.url?1:0);
  const stat=`<div class="stat">
    <div class="stat__item"><b class="num" data-count="${pieces}">0</b><span>作品</span></div>
    <div class="stat__item"><b class="num" data-count="${competitions.length}">0</b><span>竞赛获奖</span></div>
  </div>`;
  const cats=[["pf-data","数据新闻"],["pf-write","新闻评论"],["pf-video","影像"],["pf-visual","设计与摄影"]];
  const nav=`<div class="pf-nav">${cats.map(([id,t])=>`<a href="#${id}">${t}</a>`).join("")}</div>`;

  const data=`<div id="pf-data" class="pf-block">
    <h3 class="pf-h3">数据新闻</h3>
    <div class="laptop"><div class="laptop__screen">${p.dataNews.url
      ? `<iframe src="${p.dataNews.url}" title="${p.dataNews.title||"数据新闻作品"}" loading="lazy"></iframe>`
      : `<span class="ph">数据新闻在线作品（待提供网址）</span>`}</div></div>
    <div class="pf-data__meta">
      ${p.dataNews.badge?`<span class="card__level">${p.dataNews.badge}</span>`:""}
      <h4>${p.dataNews.title||"（作品名待填）"}</h4>
      <p>${p.dataNews.summary||""}</p>
      ${p.dataNews.url?`<a class="btn" href="${p.dataNews.url}" target="_blank" rel="noopener">查看在线作品</a>`:""}
    </div></div>`;

  const write=`<div id="pf-write" class="pf-block">
    <h3 class="pf-h3">新闻评论</h3>
    ${p.commentaryIntro?`<p class="pf-intro">${p.commentaryIntro}</p>`:""}
    <figure class="cert">${p.commentaryCert
      ? `<img src="${p.commentaryCert}" alt="红辣椒评论特约评论员聘书" loading="lazy"><figcaption>红辣椒评论特约评论员聘书</figcaption>`
      : `<span class="ph">特约评论员聘书（待提供图片）</span>`}</figure>
    <div class="article-list">${(p.commentary.length?p.commentary:[null]).map(c=>c?`
      <article class="article">
        ${c.badge?`<span class="card__level">${c.badge}</span>`:""}
        <h4 class="article__title">${c.title||""}</h4>
        <p class="article__meta"><span>${c.media||""}</span>${c.date?`<time>${c.date}</time>`:""}</p>
        ${c.quote?`<blockquote class="article__quote">${c.quote}</blockquote>`:""}
        ${c.url?`<a class="link" href="${c.url}" target="_blank" rel="noopener">阅读全文</a>`:""}
      </article>`:`<p class="ph ph--text">新闻评论作品（待提供）</p>`).join("")}</div></div>`;

  const video=`<div id="pf-video" class="pf-block">
    <h3 class="pf-h3">影像</h3>
    <div class="video-grid">${(p.video.length?p.video:[null]).map(v=>v?`
      <a class="video-card" href="${v.url||"#"}" ${v.url?'target="_blank" rel="noopener"':""}>
        <div class="video-card__media">${v.gif?`<img src="${v.gif}" alt="${v.title||""}" loading="lazy">`:`<span class="ph">GIF 预览</span>`}<span class="play">▶</span></div>
        <h4 class="video-card__title">${v.title||""}</h4>
        <span class="video-card__kind">${v.kind||""}</span>
      </a>`:`<span class="ph">影像作品（待提供）</span>`).join("")}</div></div>`;

  const visual=`<div id="pf-visual" class="pf-block">
    <h3 class="pf-h3">设计与摄影</h3>
    <div class="gallery">${(p.gallery.length?p.gallery:[null,null,null]).map((g,i)=>g?`
      <figure class="gallery__item" data-src="${g.src}" tabindex="0">
        <img src="${g.src}" alt="${g.caption||""}" loading="lazy">
        <figcaption>${g.caption||""}</figcaption></figure>`
      :`<figure class="gallery__item"><span class="ph">图位 ${i+1}</span></figure>`).join("")}</div></div>`;

  $("#works").innerHTML = `<h2 class="sec__title">作品集</h2>${stat}${nav}${data}${write}${video}${visual}`;
}

export function renderResearch(){
  $("#research").innerHTML = `<h2 class="sec__title">科研与学术</h2>
    <ol class="timeline">${research.map(r=>`
      <li class="timeline__item"><time>${r.year||""}</time>
        <h3>${r.title||""}</h3><p class="timeline__meta">${r.venue||""}</p>
        <p>${r.summary||""}</p>
        ${r.pdf?`<a class="link" href="${r.pdf}" target="_blank" rel="noopener">查看全文</a>`:""}</li>`).join("")}</ol>`;
}

export function renderExperience(){
  const photos=`<div class="exp-photos">${(experiencePhotos.length?experiencePhotos:[null,null,null]).map(p=>p
    ?`<figure class="exp-photos__item"><img src="${p.src}" alt="${p.caption||""}" loading="lazy"><figcaption>${p.caption||""}</figcaption></figure>`
    :`<figure class="exp-photos__item"><span class="ph">实习照片</span></figure>`).join("")}</div>`;
  $("#experience").innerHTML = `<h2 class="sec__title">实践经历</h2>
    <ol class="timeline">${experience.map(e=>`
      <li class="timeline__item"><time>${e.period||""}</time>
        <h3>${e.org||""}</h3><p class="timeline__meta">${e.role||""}</p>
        <p>${e.summary||""}</p></li>`).join("")}</ol>
    ${photos}`;
}

export function renderHonors(){
  const comp=competitions.length
    ?`<h3 class="pf-h3">竞赛获奖</h3>
      <ul class="wall">${competitions.map(c=>`<li class="wall__item"><span>${c.title}${c.level?`（${c.level}）`:""}</span><time>${c.year||""}</time></li>`).join("")}</ul>`:"";
  $("#honors").innerHTML = `<h2 class="sec__title">荣誉与技能</h2>
    ${comp}
    <h3 class="pf-h3">荣誉称号</h3>
    <ul class="wall">${honors.map(o=>`<li class="wall__item"><span>${o.name}</span><time>${o.year||""}</time></li>`).join("")}</ul>
    <h3 class="pf-h3">技能</h3>
    <ul class="skills">${skills.map(s=>`<li><b>${s.label}</b><span>${s.detail||""}</span></li>`).join("")}</ul>`;
}

export function renderContact(){
  $("#contact").innerHTML = `<h2 class="sec__title">联系</h2>
    <p class="contact__line">${profile.email?`<a href="mailto:${profile.email}">${profile.email}</a>`:"（邮箱待提供）"}</p>
    <a class="btn" href="assets/docs/简历.pdf" target="_blank" rel="noopener">下载简历</a>
    <footer class="foot">© <span class="num">2026</span> ${profile.name}</footer>`;
}

export function renderAll(){
  renderNav();renderHero();renderAbout();renderWorks();
  renderResearch();renderExperience();renderHonors();renderContact();
}

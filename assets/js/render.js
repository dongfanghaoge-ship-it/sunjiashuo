import {profile, portfolio, competitions, research, experience, experiencePhotos, honors, skills, academic} from "./content.js";
const $ = (sel,el=document)=>el.querySelector(sel);
const STATIC = /[?&]static/.test(location.search);   // 预览/降级模式：不内嵌 iframe
const esc = s => (s==null?"":String(s));
const kicker = (no,label)=>`<p class="kicker"><span class="dot"></span><span class="mono">${no}</span><span>${label}</span></p>`;
// 漂浮图片（替代参考站的 3D 悬浮物）：留空显示占位，给定 src 显示图片；动效由 hero-float.js 接管
const floatImg = (src,alt,cls="")=>`<div class="floaty ${cls}"><div class="floaty__inner" data-float>${src
  ? `<img src="${src}" alt="${esc(alt)}" draggable="false">`
  : `<span class="floaty__ph">${esc(alt)||"图片占位"}</span>`}</div></div>`;

export function renderNav(){
  const items=[["works","作品"],["research","科研"],["experience","实践"],["honors","荣誉"],["contact","联系"]];
  $("#nav").innerHTML = `
    <a class="nav__brand" href="#hero"><span class="nav__dot"></span>${profile.name}</a>
    <ul class="nav__links mono">${items.map(([id,t])=>`<li><a href="#${id}">${t}</a></li>`).join("")}</ul>`;
}

export function renderHero(){
  // 长简介拆成两段，呈现参考图的多段落感
  const sents = (profile.about||"").split("。").map(s=>s.trim()).filter(Boolean);
  const mid = Math.ceil(sents.length/2);
  const paras = [sents.slice(0,mid).join("。")+"。", sents.slice(mid).join("。")+(sents.length>mid?"。":"")].filter(p=>p.length>1);
  const facts = academic ? `<ul class="hero2__facts">
      <li><b class="num">${esc(academic.gpaPercent)}</b><span>百分制绩点 · 前五学期</span></li>
      <li><b class="num">${esc(academic.cet6)}</b><span>英语六级</span></li>
      <li><b class="num">${esc(academic.cet4)}</b><span>英语四级</span></li>
    </ul>` : "";
  $("#hero").innerHTML = `
    <div class="hero2">
      <div class="hero2__photo">${profile.photo
        ? `<img src="${esc(profile.photo)}" alt="${esc(profile.name)}" draggable="false">`
        : `<span class="ph">人物照（待提供）</span>`}</div>
      <div class="hero2__body">
        <p class="hero2__name">${esc(profile.name)}</p>
        <p class="hero2__meta mono">${esc(profile.school)} · ${esc(profile.major)}</p>
        <p class="hero2__statement" data-typewriter>${profile.statement||esc(profile.tagline)}</p>
        <ul class="hero2__tags">${profile.tags.map(t=>`<li>${esc(t)}</li>`).join("")}</ul>
        <div class="hero2__bio">${paras.map(p=>`<p>${esc(p)}</p>`).join("")}</div>
        ${facts}
      </div>
    </div>
    <a class="hero__cue mono" href="#works"><span>向下滚动</span><span class="hero__cue-line"></span></a>`;
}

export function renderAbout(){
  const facts = academic ? `<ul class="facts">
      <li><b class="num">${esc(academic.gpaPercent)}</b><span>百分制绩点 · 前五学期</span></li>
      <li><b class="num">${esc(academic.cet6)}</b><span>英语六级</span></li>
      <li><b class="num">${esc(academic.cet4)}</b><span>英语四级</span></li>
    </ul>` : "";
  $("#about").innerHTML = `
    ${kicker("01","关于我 / About")}
    <p class="lead">${esc(profile.about)||"（自述待定稿）"}</p>
    ${facts}
    <ul class="tagrow">${profile.tags.map(t=>`<li>${esc(t)}</li>`).join("")}</ul>`;
}

export function renderWorks(){
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
        <figure class="cert">${floatImg(p.commentaryCert,"特约评论员聘书（待提供）","floaty--cert")}<figcaption class="mono">特约评论员聘书</figcaption></figure>
      </div>
    </div>`;

  // 影像：可拖拽横排
  const video=`
    <div class="work-block" id="pf-video">
      <div class="work-head"><span class="mono tag-line">影像 / Film</span><span class="mono drag-hint">拖拽浏览 ↔</span></div>
      <div class="drag-row" data-drag>${(p.video.length?p.video:[null,null,null]).map((v,i)=>v?`
        <a class="vcard" ${v.url?`href="${esc(v.url)}" target="_blank" rel="noopener" data-cursor="播放"`:""}>
          <div class="vcard__media">${v.gif?`<img src="${esc(v.gif)}" alt="${esc(v.title)}" draggable="false">`:`<span class="ph">GIF 预览</span>`}<span class="vcard__play">▶</span></div>
          <h4>${esc(v.title)}</h4><span class="mono">${esc(v.kind)}</span>
        </a>`:`<div class="vcard"><div class="vcard__media"><span class="ph">影像作品 ${i+1}（待提供）</span></div></div>`).join("")}</div>
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

export function renderResearch(){
  $("#research").innerHTML = `
    ${kicker("03","科研与学术 / Research")}
    <h2 class="big">科研与学术</h2>
    <ol class="rows">${research.map(r=>`
      <li class="row" ${r.pdf?`data-href="${esc(r.pdf)}"`:""}>
        <span class="row__no mono">${esc(r.year)}</span>
        <div class="row__main"><h3>${esc(r.title)}</h3><p>${esc(r.summary)}</p></div>
        <span class="row__tag mono">${esc(r.venue)}</span>
        ${r.pdf?`<a class="row__link mono" href="${esc(r.pdf)}" target="_blank" rel="noopener" data-cursor="查看">查看全文 →</a>`:""}
      </li>`).join("")}</ol>`;
}

export function renderExperience(){
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

export function renderHonors(){
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

export function renderContact(){
  $("#contact").innerHTML = `
    ${kicker("06","联系 / Contact")}
    <h2 class="contact-big">一起<br>聊聊</h2>
    <div class="contact-row">
      ${profile.email?`<a class="contact-link" href="mailto:${esc(profile.email)}" data-cursor="发邮件">${esc(profile.email)}</a>`:`<span class="contact-link">（邮箱待提供）</span>`}
      <a class="btn" href="assets/docs/简历.pdf" target="_blank" rel="noopener" data-cursor="下载">下载简历</a>
    </div>
    <footer class="foot mono"><span>© 2026 ${esc(profile.name)}</span><span>${esc(profile.school)}</span></footer>`;
}

export function renderAll(){
  renderNav();renderHero();renderWorks();
  renderResearch();renderExperience();renderHonors();renderContact();
}

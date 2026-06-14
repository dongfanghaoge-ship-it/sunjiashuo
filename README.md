# 孙佳硕 · 保研个人网站

面向意向院校的个人介绍网站。纯静态站点，模仿 coolcooltomato.com 的顺滑滚动与创意动效，但信息优先、加载轻快。

## 本地预览

**直接双击 `index.html` 即可在浏览器打开**（脚本已改为普通脚本，不再受 ES module 的 file:// 限制）。

如果个别浏览器仍有限制，也可以起一个本地服务器：

```bash
cd "/Users/sjs/Desktop/保研/保研文书/个人网站"
python3 -m http.server 8011
```

然后浏览器打开 http://localhost:8011/ 。关闭服务器按 Ctrl+C。

## 怎么改内容

所有文字与数据都在一个文件里：`assets/js/content.js`。改这个文件就能改全站内容，不用动其他代码。改完刷新浏览器即可看到。

各板块对应的字段：

- `profile`：姓名、定位语、关于我自述、关键标签。
- `portfolio`：作品集四类内容（见下）。
- `competitions`：竞赛获奖（显示在「荣誉与技能」）。
- `research`：科研与学术。
- `experience` / `experiencePhotos`：实践经历与实习照片。
- `honors` / `skills`：荣誉称号与技能。
- `academic`：GPA、英语成绩等。

## 作品集需要你提供的素材

作品集目前是占位状态。素材放进 `assets/img/`，再在 `content.js` 的 `portfolio` 里填路径或链接。

- 数据新闻 `portfolio.dataNews`：填 `url`（在线作品网址，会以 iframe 嵌入笔记本外框中）、`summary`（一句话简介）。
- 新闻评论 `portfolio.commentary`：每篇一项，填 `title` 标题、`media` 刊发媒体、`date` 日期、`quote` 金句、`url` 原文链接、`badge` 奖项（如有）。另可填 `commentaryIntro` 写「特约评论员」身份背书。
- 影像 `portfolio.video`：每个视频一项，填 `title`、`kind`（微电影/采访/视频新闻）、`gif`（动图预览路径，放 `assets/img/`）、`url`（完整作品外链）。
- 设计与摄影 `portfolio.gallery`：每张图一项，填 `src`（图片路径）、`caption`（标题）、`kind`（海报/新闻摄影）。点击图片会放大查看。
- 实习照片 `experiencePhotos`：每张一项，填 `src`、`caption`。

待核对与待补的内容清单见 `CONTENT-待核对.md`。

## 之后部署到 GitHub Pages（仓库名 sunjiashuo）

内容补完后执行：

```bash
cd "/Users/sjs/Desktop/保研/保研文书/个人网站"
gh repo create sunjiashuo --public --source=. --remote=origin --push
```

然后在仓库 Settings → Pages → Source 选 `Deploy from a branch`，分支 `main`、目录 `/ (root)`，保存。约一分钟后网址为：

`https://dongfanghaoge-ship-it.github.io/sunjiashuo/`

以后更新内容，提交后 `git push` 即可自动重新发布。

## 技术说明

- 动效库在 `vendor/`（GSAP、ScrollTrigger、Lenis），已本地化，离线可用。
- 全部动效遵循系统「减弱动态效果」设置，会自动降级；触屏设备不显示自定义光标与 Hero 粒子背景。
- 强调色为山大红 `#9E1B32`，可在 `assets/css/tokens.css` 调整。

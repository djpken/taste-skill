# 動態

[英文原文](motion.md) · 翻譯基準：upstream `6010f91`。
[中文索引](../../../README.zh-tw.md#中文文件索引)

加動畫前先讀。靜態頁須完成且通過 `inspect.mjs`，動態最後做，不用來救弱版型。

## 目錄

1. 預算
2. 強頁面動態
3. 動畫前四問
4. Tokens
5. 捲動行為排名
6. 配方：複製再調整
7. 招牌動作
8. 減少動態與效能
9. 生成動態痕跡
10. 動態規則

## 1. 預算

不動像模型稿。檢查器計算載入與捲動時移動元素，少於八失敗。動態層五部分：

- **兩三捲動場景**：飛過圖群、視窗圖擴滿、文字跨固定舞台、卡牌疊放等記憶點。`library/scenes.json` 有適合需求時方向表抽出，`references/scenes.md` 說明填入與配置。此處大膽，其餘安靜。
- **一招牌時刻**：一小時後仍能描述的遮罩標題、快門圖、隨捲動縮文字標誌。方向表 `draw.mjs` 指定一個，好好做，只有它可突出。
- **區段逐部分入場**：標題、文字、圖、細節依閱讀順序，延後 60–90ms、上移 16–32px 加透明度、一次。依內容變化：清單逐列、圖遮罩或微縮、數字一次計數、陳述逐行，不到處蓋同預設。
- **手下回饋**：按鈕按下、連結回應、卡圖 hover、選單從觸發處開。
- **一動圖**：搜尋來有 poster 的靜音片，大照片慢漂縮，或主圖連動捲動。

仍禁每塊同時序淡入上移、無 fallback 先藏內容、bounce／elastic、layout 屬性動畫。統一套動作像沒決策；編排並保護一時刻才像有設計。

## 2. 強頁面動態

2026 年 7–10 月最新 99 個 Awwwards 日選站，1440 與 390，載入、捲動記錄 transition、tween、scroll trigger。違反此處準則者另給替代。

- **技術**：三分二 smooth-scroll、五分三 Three.js，56 站辨識 GSAP。安靜層揭示、逐行、填墨可 CSS scroll timelines／view transitions，研究只有 3／6 站用。大場景用 GSAP ScrollTrigger 與 `assets/scenes/` 共舞台。
- **曲線**：實跑強 ease-out。expo out `.16,1,.3,1`／`.19,1,.22,1` 14 站、cubic out13、quint out7；按 transition 數 quint／expo 最多。移動擦拭用 cubic／quart in-out 各約 15 站。ease-in 只短離場後慢進場。色變 plain `ease`46 站。overshoot 在 19 stylesheet，實跑 2。
- **時長**：hover 色 200–300ms、小 UI300–450、揭示逐行 600–1,000、開圖擦拭 1,100–1,600；各站實跑中位 420ms。
- **錯開**：字元 20–40ms、行 75–120、清單 50–100。
- **捲動連動鎖捲軸**：18 中 14 無平滑，4 平滑 0.1–3 秒。揭示在頂端到視窗 80–95%時觸發一次。
- **動量**：腳本移動元素中位 130，但一拆字標題就 20–60。檢查器 8、低 16 警告是最低量，非目標。
- **等待成本**：99 中 60 loading、26 有計數。載入後 2.5 秒仍半數不可讀、4.5 秒仍三分一。preloader 多在已載好頁，文件反而更快，設計分無提升，只降易用。此處無 preloader，首格訊息可讀，1.2 秒完成入場。
- **固定拉長**：三分二捲頁有 sticky／pin，長度中位 16.6 屏對 7.5，每屏 27 字詞對 46。此處最多兩固定舞台、每步約一屏、每台三屏。
- **減少動態缺失**：99 中 35 有任一 `prefers-reduced-motion`，16 有至少三條；26 連動場景僅 5 有。此處配方減少動態保持完成狀態。

## 3. 動畫前四問

1. **頻率？** 每次造訪一次如主圖、區段可慢；hover、選單、accordion 多次要快小；打字鍵盤數百次不動畫。
2. **目的？** 來源、確認動作、平順變化、解說產品、招牌時刻才有效。好看只適招牌。
3. **曲線？** 進出 ease-out 即時起動；兩位置間 ease-in-out；hover 色與透明`ease`；跑馬燈進度`linear`。`ease-in`頭幾格慢、不用於等待介面。CSS 關鍵字弱，採下 tokens。
4. **多久？** 按 100–160ms、hover150–200、選單 popover150–250、dialog drawer250–450、區段主圖 500–900。離場約入場 70%。

## 4. Tokens

```css
:root {
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);        /* entrances, moving hovers, UI under 600ms */
  --ease-expo: cubic-bezier(0.16, 1, 0.3, 1);        /* new: reveals of 800ms and longer, line rises, openings */
  --ease-in-out: cubic-bezier(0.76, 0, 0.24, 1);     /* wipes, panels, things that travel while visible */
  --ease-soft: cubic-bezier(0.33, 1, 0.68, 1);       /* slow scale and drift on photographs */
  --ease-exit: cubic-bezier(0.55, 0.055, 0.675, 0.19); /* new: something leaving for good, short */
  --t-press: 140ms;
  --t-hover: 180ms;
  --t-ui: 240ms;
  --t-reveal: 800ms;
  --t-open: 1200ms;                                  /* new: picture openings and clip wipes */
  --stagger-line: 90ms;                              /* new */
  --stagger-item: 70ms;                              /* new */
}
```

研究依據：

- `--ease-out` quint out 與近似值在 28 stylesheet，實跑 transition 最常見選定曲線，保留。
- 新 `--ease-expo` 兩 expo-out 在 28 stylesheet、14 站實跑，長揭示、逐行、開圖、0.9–1.6 秒卡入場採用。`--t-reveal`以上改用它，取代遮罩標題與捲動揭示的 `--ease-out`。
- `--ease-in-out` quart，14 stylesheet、7 實跑，給擦拭、快門、選單、換頁。
- `--ease-soft` cubic，21 stylesheet、13 實跑，研究 0.3–0.8 秒 UI 但已有 ease-out，此處只照片慢漂縮。
- 新 `--ease-exit`：ease-in 只用永久離開的圖說、替換 slide、關面板，約入場 60–70%，不給訪客等待物。
- 不採 `.4,0,.2,1`，38 stylesheet 的框架預設；overshoot19 仍禁 UI。
- `--t-hover`保留 180ms，比研究色 hover200–300 略快更精確；文字翻滾箭頭位移用 `--t-ui`至 400ms。

## 5. 捲動行為排名

| 行為 | 99 頁中 | 用途 | 此處版本 |
| --- | --- | --- | --- |
| smooth-scroll 庫 | 67 | 重量、易做 scrub | 選用 `Stage.smooth()`，Lenis lerp0.1–0.14，觸控／減少動態停 |
| sticky／pinned 舞台 | 44 | 一物多主張、章節 | 場景兩三、各一至四屏，其餘 sticky 最多三屏 |
| 拆字 | 40 | 依閱讀逐行字、hover roll | 標題陳述拆行；填墨才拆詞；一至三詞短標才拆字元 |
| 逐章色彩 | 34 | 不靠空帶分章 | 段邊硬切，header 文字 300ms 跟隨 |
| 捲動連動場景 | 26 | 移動解說產品 | 共舞台資料庫場景，減少動態完成構圖 |
| 視差 | 24 | 拼貼深度、框內漂 | 位移低 8%，框內圖 106–110% |
| 跑馬燈 | 21 | 靜帶生命 | 滿邊跑馬燈，每頁一、可暫停 |
| 遮罩逐行／詞上升 | 18 | 排版感入場 | 載入用遮罩，首屏下用捲動逐行 |
| wheel 場景、不捲頁 | 16 | 單物瀏覽 | 不用，見 2.6 |
| 模糊入場 | 15 | 柔進 | 最多 8px、600ms、停後消失，不正文 |
| 內嵌框擴滿 | 14 | 字轉大圖 | 展窗，約一屏捲動 |
| 灰到墨填字 | 14 | 陳述節奏 | 一次、45%墨起，填墨配方 |
| sheet 覆固定層 | 11 | 章節翻頁 | 覆固定圖新動作 |
| scramble／decode | 11 | 程式感 | 不用，見 2.6 |
| header 字逐章 | 10 | 固定列可讀 | 跟逐章色 |
| 垂直驅動水平 track | 8 | 房間作品瀏覽 | 原生拖列優先，少於三屏且鍵盤支援才 pin |
| 幕簾頁尾 | 8 | 結尾場景 | 既有動作 |
| 滾動數字 | 6 | 數值到達 | 少數數字主題用配方 |
| hover 預覽索引 | 5 | 名稱找作品 | 升級配方 |

拆字單位約 20 頁字元、14 行、11 詞。字元用短標、按鈕翻滾；長陳述會剩碎片。

## 6. 配方

全部無 JS 可見，隱藏只在 `prefers-reduced-motion: no-preference`，用上方 tokens。共通兩點：

- **timeline 需監看 scroller**。`animation-timeline: view()`找最近捲動容器，`overflow: hidden`會建立它，框內圖因此不動。用 `overflow: clip`，或 section 命名 `view-timeline-name: --hero` 給子項用，也適用既有捲動進度配方。
- **連動用 linear**。捲動本身就是 easing，18 中 14 鎖捲軸，CSS scroll timelines 正如此。

無 JS 或慢 JS 內容可見；隱藏只在 `html.js`，用一行 inline script 設定：

```html
<script>document.documentElement.classList.add('js')</script>
```

### 載入序列：1.2 秒

全部 HTML 首格繪製，序列只加入場，不等 load，不動導覽。

```html
<header class="hero">
  <h1 class="display lines">
    <span class="line"><span data-line style="--i:0">Stools for</span></span>
    <span class="line"><span data-line style="--i:1">small kitchens</span></span>
  </h1>
  <p class="lead" data-load style="--d:420ms">…</p>
  <a class="button" data-load style="--d:480ms" href="#stools">See the stools</a>
  <figure class="hero__picture" data-open><img src="stool.jpg" alt="…" fetchpriority="high"></figure>
</header>
```

```css
.hero__picture { overflow: clip; margin: 0; }
@media (prefers-reduced-motion: no-preference) {
  .js .hero [data-line] { transform: translateY(105%); animation: load-line 800ms var(--ease-expo) forwards; animation-delay: calc(100ms + var(--i) * var(--stagger-line)); }
  .js .hero [data-load] { opacity: 0; transform: translateY(12px); animation: load-rise 500ms var(--ease-out) forwards; animation-delay: var(--d); }
  .js .hero [data-open] { clip-path: inset(0 0 100% 0); animation: load-open 1000ms var(--ease-in-out) 150ms forwards; }
  .js .hero [data-open] img { transform: scale(1.08); animation: load-settle 1100ms var(--ease-expo) 100ms forwards; }
}
@keyframes load-line { to { transform: none; } }
@keyframes load-rise { to { opacity: 1; transform: none; } }
@keyframes load-open { to { clip-path: inset(0); } }
@keyframes load-settle { to { transform: none; } }
```

時序：標題 100–990ms、圖 150–1,150、句子按鈕 420–980；1.2 秒全定、最多四物。預載展示字 `<link rel="preload" as="font" type="font/woff2" crossorigin>`，圖高 priority、容器取圖底色，慢圖不開空框。研究 91 中 22 首格可讀、再 11 於 1.2 秒可讀；受尊重的 intro 約 1–1.2 秒；三分一 4.5 秒仍不可讀。

### 遮罩逐行揭示：經典展示標題

每行從自身基線後升起。標題最多兩行，自己斷行、逐行包。

```html
<h1 class="lines">
  <span class="line"><span data-line style="--i:0">Stools for</span></span>
  <span class="line"><span data-line style="--i:1">small kitchens</span></span>
</h1>
```

```css
.lines .line { display: block; overflow: hidden; padding-bottom: 0.08em; margin-bottom: -0.08em; }
.lines [data-line] { display: block; }
@media (prefers-reduced-motion: no-preference) {
  .js .lines [data-line] {
    transform: translateY(105%);
    animation: line-up 900ms var(--ease-out) forwards;
    animation-delay: calc(var(--i) * 110ms + 150ms);
  }
}
@keyframes line-up { to { transform: none; } }
```

底 padding 配負 margin 防 g、y、p 下伸裁切。窄手機兩指定行可能再折，檢查截圖，用 `<br class="only-wide">` 重斷或縮字。

### 捲動揭示一次

給值得的兩三段，不給每塊。

```css
@media (prefers-reduced-motion: no-preference) {
  .js [data-reveal] { opacity: 0; transform: translateY(24px); transition: opacity 700ms var(--ease-out), transform 900ms var(--ease-out); }
  .js [data-reveal].is-in { opacity: 1; transform: none; }
}
```

```js
const io = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
}, { rootMargin: '0px 0px -12% 0px', threshold: 0.1 });
document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
```

不用 scroll listener，不重入重播，observer 沒觸發也不能留 `opacity: 0`；`html.js`防無 JS、`unobserve`防重播。

### 圖片快門

圖自一邊展開、框內微縮。只用一主圖或展示圖。

```css
.shutter { overflow: hidden; }
@media (prefers-reduced-motion: no-preference) {
  .js .shutter { clip-path: inset(0 0 100% 0); transition: clip-path 1100ms var(--ease-in-out); }
  .js .shutter img { transform: scale(1.12); transition: transform 1500ms var(--ease-soft); }
  .js .shutter.is-in { clip-path: inset(0); }
  .js .shutter.is-in img { transform: none; }
}
```

### 按下與懸停

```css
.button { transition: transform var(--t-press) var(--ease-out), background-color var(--t-hover) ease, color var(--t-hover) ease; }
.button:active { transform: scale(0.97); }
.link { text-decoration: underline; text-decoration-color: transparent; text-underline-offset: 0.2em; text-decoration-thickness: 0.07em; transition: text-decoration-color var(--t-hover) ease; }
@media (hover: hover) and (pointer: fine) {
  .button:hover { background-color: var(--accent-strong); }
  .link:hover { text-decoration-color: currentColor; }
}
```

hover 包 `(hover: hover)`，防觸控點後卡住。提升對比，不降；不改字重重排；不每卡浮縮，統一小回應足夠。

### 無 JS 捲動進度

主標誌隨離場縮、圖漂幾%、進度條，包 `@supports`，不支援維持靜態。

```css
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .drift { animation: drift linear both; animation-timeline: view(); animation-range: entry 0% exit 100%; }
    @keyframes drift { from { transform: translateY(-4%); } to { transform: translateY(4%); } }
  }
}
```

位移小於元素 8%，大視差難讀且過時。

### 固定敘事

標題停、項目捲，用 `position: sticky`，不劫持。

```css
.story { display: grid; grid-template-columns: 5fr 7fr; gap: var(--gutter); align-items: start; }
.story__title { position: sticky; top: 18vh; }
@media (max-width: 800px) { .story { grid-template-columns: 1fr; } .story__title { position: static; } }
```

### 預覽索引：錨定列

指向或 Tab 該列，圖在列旁開。跟列、不跟游標。

```html
<section class="index">
  <ul class="index__list">
    <li><a class="index__row" href="/work/harbour-house" data-preview="/img/harbour-house.jpg">
      <span class="index__name">Harbour House</span><span class="index__year">2025</span>
      <img class="index__thumb" src="/img/harbour-house-small.jpg" alt="" loading="lazy" width="640" height="400">
    </a></li>
    <!-- … -->
  </ul>
  <div class="index__frame" aria-hidden="true"><img alt=""></div>
</section>
```

```css
.index { position: relative; }
.index__list { list-style: none; margin: 0; padding: 0; }
.index__row { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: 0 var(--gutter); padding-block: 0.3em; font-size: var(--step-head); color: inherit; text-decoration: none; transition: opacity var(--t-hover) ease; }
.index__thumb { order: -1; flex-basis: 100%; width: 100%; height: auto; margin-bottom: 0.4rem; }
.index__frame { display: none; }
@media (hover: hover) and (pointer: fine) {
  .index__list { max-width: 62%; }
  .index__thumb { display: none; }
  .index__list:has(.index__row:hover, .index__row:focus-visible) .index__row:not(:hover, :focus-visible) { opacity: 0.4; }
  .index__frame { display: block; position: absolute; top: 0; right: var(--margin); width: 30%; aspect-ratio: 4 / 3; z-index: 1; pointer-events: none; clip-path: inset(100% 0 0 0); transition: clip-path 320ms var(--ease-out), transform 360ms var(--ease-out); }
  .index__frame.is-open { clip-path: inset(0); }
  .index__frame img { width: 100%; height: 100%; object-fit: cover; }
}
@media (prefers-reduced-motion: reduce) { .index__frame { transition: none; } }
```

```js
(() => {
  const root = document.querySelector('.index');
  if (!root) return;
  const frame = root.querySelector('.index__frame');
  const picture = frame.querySelector('img');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  let warmed = false;
  const show = (row) => {
    if (!fine.matches) return;
    if (!warmed) { warmed = true; root.querySelectorAll('[data-preview]').forEach((a) => { new Image().src = a.dataset.preview; }); }
    picture.src = row.dataset.preview;
    const y = row.offsetTop + row.offsetHeight / 2 - frame.offsetHeight / 2;
    const max = root.offsetHeight - frame.offsetHeight;
    const opening = !frame.classList.contains('is-open');
    if (opening) frame.style.transitionProperty = 'clip-path';   // open in place, do not slide in from the top
    frame.style.transform = `translateY(${Math.min(max, Math.max(0, y))}px)`;
    if (opening) { frame.getBoundingClientRect(); frame.style.transitionProperty = ''; }
    frame.classList.add('is-open');
  };
  const hide = () => frame.classList.remove('is-open');
  root.querySelectorAll('.index__row').forEach((row) => {
    row.addEventListener('pointerenter', () => show(row));
    row.addEventListener('focus', () => show(row));
  });
  root.addEventListener('pointerleave', hide);
  root.addEventListener('focusout', (e) => { if (!root.contains(e.relatedTarget)) hide(); });
})();
```

觸控每列圖在名上。研究 5 頁，框約 470×270 至清單後大圖，其餘列約 0.3，此處文字最低 0.4。圖尾跡、游標帶圖是噱頭版。

### 隨捲動升起的行

無法控制斷行的段標或陳述。字型載入後拆、一次揭示、恢復純字正常折行。只純字、不內含連結強調。

```html
<h2 class="head" data-lines>Turned by hand in one small workshop</h2>
```

```css
[data-lines] .line { display: block; overflow: clip; padding-bottom: 0.12em; margin-bottom: -0.12em; }
[data-lines] .line > span { display: block; }
@media (prefers-reduced-motion: no-preference) {
  .is-split .line > span { transform: translateY(110%); }
  .is-split.is-in .line > span { transform: none; transition: transform 900ms var(--ease-expo) calc(var(--i) * var(--stagger-line)); }
}
```

```js
(() => {
  const els = [...document.querySelectorAll('[data-lines]')];
  if (!els.length || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const restore = (el) => { el.textContent = el.dataset.text; el.classList.remove('is-split', 'is-in'); };
  const split = (el) => {
    const text = el.textContent.trim().replace(/\s+/g, ' ');
    el.dataset.text = text;
    el.textContent = '';
    const words = text.split(' ').map((word) => {
      const s = document.createElement('span');
      s.style.display = 'inline-block';
      s.textContent = word;
      el.append(s, ' ');
      return s;
    });
    const lines = [];                                   // group the words by the line they landed on
    for (const w of words) {
      const last = lines.at(-1);
      if (last && Math.abs(last.top - w.offsetTop) < 4) last.words.push(w.textContent);
      else lines.push({ top: w.offsetTop, words: [w.textContent] });
    }
    el.textContent = '';
    lines.forEach((line, i) => {
      const mask = document.createElement('span');
      const inner = document.createElement('span');
      mask.className = 'line';
      inner.style.setProperty('--i', i);
      inner.textContent = line.words.join(' ');
      mask.append(inner);
      el.append(mask, ' ');
    });
    el.classList.add('is-split');
  };
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      io.unobserve(e.target);
      e.target.classList.add('is-in');
      e.target.querySelector('.line:last-of-type > span')
        .addEventListener('transitionend', () => restore(e.target), { once: true });
    }
  }, { rootMargin: '0px 0px -12% 0px' });
  document.fonts.ready.then(() => els.forEach((el) => { split(el); io.observe(el); }));
  let width = innerWidth;                               // a width change before the reveal: give the text back
  addEventListener('resize', () => {
    if (innerWidth === width) return;
    width = innerWidth;
    els.filter((el) => el.matches('.is-split:not(.is-in)')).forEach((el) => { io.unobserve(el); restore(el); });
  });
})();
```

研究下方 100–120%升起、0.6–1.2 秒、行距 75–120ms、頂到視窗 80–95%觸發。減少動態不執行，純文字。

### 展窗

字屏交給大圖，固定舞台中央窗約一屏捲動展滿。

```html
<section class="opening">
  <div class="opening__stage">
    <img src="workshop-wide.jpg" alt="The workshop at first light, benches cleared" width="2400" height="1500">
  </div>
</section>
```

```css
.opening__stage { height: 100svh; overflow: clip; }
.opening__stage img { display: block; width: 100%; height: 100%; object-fit: cover; }
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .opening { height: 200svh; view-timeline-name: --opening; --inset-y: 20%; --inset-x: 28%; }
    .opening__stage { position: sticky; top: 0; animation: opening-window linear both; animation-timeline: --opening; animation-range: contain 0% contain 75%; }
    .opening__stage img { animation: opening-settle linear both; animation-timeline: --opening; animation-range: contain 0% contain 75%; }
  }
}
@media (max-width: 700px) { .opening { --inset-y: 18%; --inset-x: 8%; } }
@keyframes opening-window { from { clip-path: inset(var(--inset-y) var(--inset-x)); } to { clip-path: inset(0); } }
@keyframes opening-settle { from { transform: scale(1.15); } to { transform: none; } }
```

區段兩屏高、舞台停一屏、四分三時全開，稍停再離。研究 14 頁，起寬 38–60%、跑道 600–1,800px，讀者希望一兩屏。無 timeline／減少動態直接滿版。

### 固定圖片、流過圖說

照片版固定敘事，圖一側停、短圖說另一側過，中央圖說亮、換其圖。

```html
<section class="steps">
  <figure class="steps__media">
    <div class="steps__pictures">
      <img src="seasoning.jpg" alt="Ash boards stacked to season" class="is-on">
      <img src="turning.jpg" alt="A leg being turned on the lathe">
      <img src="finish.jpg" alt="Oil rubbed into a finished seat">
    </div>
    <figcaption class="steps__count" aria-hidden="true"></figcaption>
  </figure>
  <ol class="steps__list">
    <li class="steps__item"><h3>Seasoned for a year</h3><p>…</p></li>
    <li class="steps__item"><h3>Turned by hand</h3><p>…</p></li>
    <li class="steps__item"><h3>Finished with oil</h3><p>…</p></li>
  </ol>
</section>
```

```css
.steps { display: grid; grid-template-columns: 7fr 5fr; column-gap: var(--gutter); }
.steps__media { margin: 0; align-self: start; }           /* a stretched grid item cannot stick */
.steps__pictures img { display: block; width: 100%; height: auto; }
.steps__list { list-style: none; margin: 0; padding: 0; }
.steps__item { min-height: 80svh; display: flex; flex-direction: column; justify-content: center; }
.js .steps__media { position: sticky; top: 0; height: 100svh; display: flex; flex-direction: column; justify-content: center; gap: 0.75rem; }
.js .steps__pictures { position: relative; aspect-ratio: 4 / 5; max-height: 80svh; }
.js .steps__pictures img { position: absolute; inset: 0; height: 100%; object-fit: cover; opacity: 0; transition: opacity 500ms ease; }
.js .steps__pictures img.is-on { opacity: 1; }
.js .steps__item { opacity: 0.4; transition: opacity var(--t-ui) ease; }
.js .steps__item.is-active { opacity: 1; }
@media (max-width: 800px) {
  .steps { display: block; }                               /* the section, not a grid area, contains the sticky picture */
  .js .steps__media { height: auto; z-index: 1; background: var(--bg); padding-block: 0.5rem; }
  .js .steps__pictures { aspect-ratio: 3 / 2; max-height: 42svh; }
  .steps__item { min-height: 60svh; }
}
@media (prefers-reduced-motion: reduce) { .js .steps__pictures img, .js .steps__item { transition: none; } }
```

```js
(() => {
  const root = document.querySelector('.steps');
  if (!root || !('IntersectionObserver' in window)) return;
  const items = [...root.querySelectorAll('.steps__item')];
  const pictures = [...root.querySelectorAll('.steps__pictures img')];
  const count = root.querySelector('.steps__count');
  const show = (i) => {
    items.forEach((el, k) => el.classList.toggle('is-active', k === i));
    pictures.forEach((el, k) => el.classList.toggle('is-on', k === i));
    if (count) count.textContent = `${i + 1} of ${items.length}`;
  };
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) show(items.indexOf(e.target));
  }, { rootMargin: '-45% 0px -45% 0px' });                 // a band across the middle of the screen
  items.forEach((el) => io.observe(el));
  show(0);
})();
```

無 JS 為兩普通欄。研究非活躍 20–40%，10–15%像缺字，此處最低 40%；crossfade400–600ms，每步約一屏；超兩步讀者要可見計數，用正文字句、不補零。

### 橫向圖庫

短集最多八項，垂直捲時舞台停、圖橫移。基本原生拖列，只寬屏、允動、列少三屏長才加固定。

```html
<section class="gallery">
  <div class="gallery__stage">
    <h2 class="head">Eight kitchens, one stool</h2>
    <ul class="gallery__track">
      <li class="gallery__item"><a href="/kitchens/leith"><img src="leith.jpg" alt="A narrow galley kitchen in Leith" width="1200" height="1500"><span>Leith</span></a></li>
      <!-- … -->
    </ul>
  </div>
</section>
```

```css
.gallery__track { display: flex; gap: var(--gutter); list-style: none; margin: 0; padding: 0 var(--margin); overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding-inline: var(--margin); }
.gallery__item { flex: 0 0 min(72vw, 28rem); scroll-snap-align: start; }
.gallery__item img { display: block; width: 100%; height: auto; aspect-ratio: 4 / 5; object-fit: cover; }
.gallery.is-pinned .gallery__stage { position: sticky; top: 0; height: 100svh; display: flex; flex-direction: column; justify-content: center; gap: 2rem; overflow: clip; }
.gallery.is-pinned .gallery__track { overflow: visible; scroll-snap-type: none; }
.gallery.is-pinned .gallery__item { flex-basis: calc(62svh * 0.8); }
```

```js
(() => {
  const root = document.querySelector('.gallery');
  if (!root) return;
  const track = root.querySelector('.gallery__track');
  const wide = matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)');
  let dx = 0, queued = false;
  const place = () => {
    queued = false;
    if (!root.classList.contains('is-pinned')) return;
    const p = Math.min(1, Math.max(0, -root.getBoundingClientRect().top / dx));
    track.style.transform = `translate3d(${(-p * dx).toFixed(1)}px, 0, 0)`;
  };
  const measure = () => {
    root.classList.add('is-pinned');                     // measure the row as it would be when pinned
    track.style.transform = '';
    dx = track.scrollWidth - track.clientWidth;
    const pin = wide.matches && dx > 0 && dx < innerHeight * 3;
    root.classList.toggle('is-pinned', pin);
    root.style.height = pin ? `${innerHeight + dx}px` : ''; // one pixel of scroll moves the row one pixel
    place();
  };
  track.addEventListener('focusin', (e) => {             // keyboard: bring the focused item into view
    if (!root.classList.contains('is-pinned')) return;
    const item = e.target.closest('.gallery__item');
    const x = Math.min(dx, Math.max(0, item.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft)));
    scrollTo({ top: root.getBoundingClientRect().top + scrollY + x, behavior: 'instant' });
  });
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(place); } }, { passive: true });
  addEventListener('resize', measure);
  addEventListener('load', measure);
  wide.addEventListener('change', measure);
  measure();
})();
```

研究 8 頁固定橫軌，頁長中位 25 屏，最差三卡佔 9 屏、單軌 wheel10,000–23,000px。此處 1:1、最後圖到邊就結束。手機、窄屏、減少動態、長列皆原生 snap，支援觸控、觸控板、鍵盤。唯一 CTA 不可只在移動列。

### 後退主視覺

首屏離開時圖微沉壓暗，字稍快升，像後退。

```html
<header class="hero">
  <img class="hero__picture" src="kitchen.jpg" alt="…" width="2400" height="1600" fetchpriority="high">
  <div class="hero__copy"><h1 class="display">…</h1><p class="lead">…</p></div>
</header>
```

```css
.hero { position: relative; min-height: 100svh; overflow: clip; display: grid; align-items: end; view-timeline-name: --hero; }
.hero__picture { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.hero::after { content: ''; position: absolute; inset: 0; background: var(--ink); opacity: 0; pointer-events: none; }
.hero__copy { position: relative; z-index: 1; padding: var(--margin); }
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .hero__picture { animation: hero-sink linear both; animation-timeline: --hero; animation-range: exit 0% exit 100%; }
    .hero::after { animation: hero-dim linear both; animation-timeline: --hero; animation-range: exit 0% exit 100%; }
    .hero__copy { animation: hero-lift linear both; animation-timeline: --hero; animation-range: exit 0% exit 70%; }
  }
}
@keyframes hero-sink { to { transform: translateY(8%) scale(1.06); } }
@keyframes hero-dim { to { opacity: 0.35; } }
@keyframes hero-lift { to { transform: translateY(-6%); opacity: 0; } }
```

exit 從主視覺頂到屏頂至底到屏頂，首屏就是首屏捲距。研究圖下沉暗化、標題 140 到 60px、手機 title card 縮，讀者稱安靜、一張紙。位移低 8%、平墨遮罩最多 35%、不漸層。不支援／減少動態靜態。

### 換頁

原生 view transitions：舊頁快淡、新頁升入，點選圖移成新頁主圖，無庫、無全屏簾。

```css
/* on every page */
@view-transition { navigation: auto; }
@media (prefers-reduced-motion: reduce) { @view-transition { navigation: none; } }
::view-transition-old(root) { animation: vt-leave 200ms var(--ease-exit) both; }
::view-transition-new(root) { animation: vt-arrive 380ms var(--ease-out) 60ms both; }
::view-transition-group(*) { animation-duration: 480ms; animation-timing-function: var(--ease-in-out); }
::view-transition-image-pair(*.picture) { overflow: clip; }
::view-transition-old(*.picture), ::view-transition-new(*.picture) { height: 100%; object-fit: cover; }
@keyframes vt-leave { to { opacity: 0; } }
@keyframes vt-arrive { from { opacity: 0; transform: translateY(16px); } }
```

```html
<!-- on the index: the card picture of one project -->
<img src="/img/leith.jpg" alt="…" style="view-transition-name: kitchen-leith; view-transition-class: picture">
<!-- on that project's page: its hero picture -->
<img src="/img/leith-wide.jpg" alt="…" style="view-transition-name: kitchen-leith; view-transition-class: picture">
```

每 name 每頁只一次。無跨文件支援正常導覽。研究 16 頁 transition 庫、全屏簾 0.7–2.4 秒，6 用 view transitions。新頁半秒內可讀。

### 填墨

一句逐行從部分到全墨，先可讀、填色只定節奏。

```html
<p class="statement head" data-fill>Nine people, one workshop, no catalogue: every stool is made for the kitchen it goes to.</p>
```

```css
[data-fill] { --fill: var(--ink); color: var(--fill); }
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .is-filling > span { display: inline-block; color: color-mix(in oklab, var(--fill) 45%, transparent); animation: ink-fill linear both; animation-timeline: view(); animation-range: cover 20% cover 45%; }
  }
}
@keyframes ink-fill { to { color: var(--fill); } }
```

```js
(() => {
  if (!CSS.supports('animation-timeline: view()') || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('[data-fill]').forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach((word, i) => {
      const s = document.createElement('span');
      s.textContent = word;
      el.append(s, i < words.length - 1 ? ' ' : '');
    });
    el.classList.add('is-filling');
  });
})();
```

各詞看自己位置，同一行從屏四分三到過半同步填。暗章設 `--fill` 對應文字色。研究 14 頁，起 25–30%，停止仍半淡像停用。此處每頁一句、三至五行、至少 32px、45%起約 3:1。無 timeline／減少動態全墨。

### 滾動數字

少數數字說主張，每位一次滾到值、欄間錯一拍，真值保留供讀屏搜尋。

```html
<p class="figure"><span class="display" data-roll>1987</span> the year the first stool was sold</p>
```

```css
.roll__digits { display: inline-flex; font-variant-numeric: tabular-nums; line-height: 1; }
.roll__col { display: inline-block; height: 1em; overflow: clip; }
.roll__strip { display: flex; flex-direction: column; transform: translateY(calc(var(--d) * -1em)); }
.roll__strip > span { height: 1em; }
@media (prefers-reduced-motion: no-preference) {
  .roll:not(.is-in) .roll__strip { transform: none; }
  .roll.is-in .roll__strip { transition: transform 1100ms var(--ease-expo) calc(var(--i) * var(--stagger-item)); }
}
```

```js
(() => {
  const els = [...document.querySelectorAll('[data-roll]')];
  if (!els.length) return;
  els.forEach((el) => {
    const value = el.textContent.trim();
    const said = Object.assign(document.createElement('span'), { className: 'sr-only', textContent: value });
    const shown = Object.assign(document.createElement('span'), { className: 'roll__digits' });
    shown.setAttribute('aria-hidden', 'true');
    let i = 0;
    for (const ch of value) {
      if (!/\d/.test(ch)) { shown.append(ch); continue; }
      const col = Object.assign(document.createElement('span'), { className: 'roll__col' });
      const strip = Object.assign(document.createElement('span'), { className: 'roll__strip' });
      strip.style.setProperty('--d', ch);
      strip.style.setProperty('--i', i++);
      for (let n = 0; n < 10; n++) strip.append(Object.assign(document.createElement('span'), { textContent: n }));
      col.append(strip);
      shown.append(col);
    }
    el.classList.add('roll');
    el.replaceChildren(said, shown);
  });
  if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -15% 0px' });
  els.forEach((el) => io.observe(el));
})();
```

研究 6 頁統計年份座標，欄各 0.9–1.1 秒 expo-out、逐欄錯開。只三四個展示值，不正文、不載入後會變的值。減少動態直接真值。

### Accordion

```css
.acc__panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 320ms var(--ease-out); }
.acc__panel > div { overflow: hidden; }
.acc[open] .acc__panel, .acc__item.is-open .acc__panel { grid-template-rows: 1fr; }
```

`grid-template-rows` 0fr 到 1fr 依內容真高展，不需 JS 量。

### 選單或對話框

```css
.menu { transform-origin: top right; transition: opacity var(--t-ui) var(--ease-out), transform var(--t-ui) var(--ease-out); }
.menu[hidden], .menu.is-closed { opacity: 0; transform: scale(0.97) translateY(-6px); pointer-events: none; }
```

從觸發處開，`transform-origin`對觸發點；不從 `scale(0)`，起 0.95–0.98。中央 dialog 才中央縮放。

## 7. 招牌動作

方向表指定一個，下列研究反覆出現：

| 動作 | 效果 | 做法 |
| --- | --- | --- |
| 遮罩標題 | 載入逐行升 | 遮罩配方 |
| 快門圖 | 從邊開、scale1.12 歸位 | 快門配方 |
| 縮放標誌 | 主視覺離場大名微縮放 | scale 捲動配方 |
| 固定敘事 | 標停項目過 | sticky 配方 |
| 預覽索引 | hover 列出圖 | 錨列配方 |
| 幕簾頁尾 | 最末從頁下露 | 有底與 z-index 的 main 下，頁尾 `position: sticky; bottom: 0` |
| 慢 crossfade | 主圖三四照各 5–6 秒 | 疊圖 opacity keyframes，背景 tab 暫停 |
| 滿邊跑馬燈 | 單行極大字慢橫移 | 複製內容、translateX(-50%) linear，hover／減少動態停 |
| 拖列 | 大圖原生 snap 橫列 | overflow-x:auto、x mandatory，無庫 |
| 逐章色 | 每章獨立滿版色、header 跟 | CSS 段底；base.js 從 data-ink 設--header-ink，不 observer 整頁改色 |
| 展窗 | 固定中央窗一屏展滿 | 展窗配方 |
| 填墨 | 45%至全墨 | 填墨配方 |
| sheet 覆圖 | 圖停一屏、下一章覆 | 100svh sticky top0 圖後有底高 z-index 段，無 JS |
| 橫圖庫 | 垂直固定、短列橫移 | 橫圖庫配方 |
| 推動文字 | 大字橫移、中點完整 | view timeline、translateX12%至-12%、linear，不支援靜態 |
| 滾數 | 少數數字滾到值 | 滾數配方 |
| 帶圖換頁 | 點圖成下一頁主圖 | 換頁配方 |

依主題選：作品集預覽、餐廳慢 crossfade、產品主物快門。動作不談主題就是裝飾，可省。

同理，一張好照片的產品／場所用展窗；各有圖的章節用 sheet；短房間廚房作品集用橫圖庫；主張是一字的品牌用推字；報告基金數字主導用滾數；同時建立索引與案例的作品集用帶圖換頁。

## 8. 減少動態與效能

- reduce 保留較少較溫和透明度／色變，去位移、縮放、視差、自動播放。配方藏於 no-preference，所以 reduce 即完成狀態。
- 動畫用 transform、opacity、clip-path。width、height、top、left、margin、padding 逐格 layout。accordion 短且少，grid-template-rows 例外。
- 不用父層變動 CSS 變數驅多子，直接設移動元素 transform。
- will-change 只給即將動元素，之後移除。
- 離屏、背景 tab 暫停 loop。
- 不劫持捲動、不自訂游標，傷易用，佔 Awwwards30%且常最低。平滑只 Stage.smooth，觸控／reduce 停。

## 9. 生成動態痕跡

- 每塊同淡入。
- 主視覺十幾項錯開。
- 每卡圖 hover 升縮。
- UI bounce／elastic。
- 無意義脈衝點、浮形、閃字、旋徽章。
- 揭示未觸發留空帶。動態後跑 inspect、看所有截圖。

### 最近日選站觀察

- **Preloader 計數**，99 中 60、26 計數。2.5 秒半不可讀、4.5 秒三分一；3 秒內載完 29 中 25 仍 4.5 秒無可讀。計數停滯、超過載入、純 tween。此處無；場景須載時先 HTML 標題圖片行動，場景就緒從後淡入。
- **Gate**，99 中 10，要 enter、音、年齡、手勢才內容。此處不做，音控制在頁上預設關。
- **劫持**，16 wheel 場景中 9 無盡，另 14 單屏 wheel 無效。失定位、長度、出口、鍵盤讀屏無內容；易用 6.01 對正常 6.50。此處原生、會結束 sticky 與計數。
- **Smooth-scroll**，67／99，增重量也增手頁延遲，長 ease 停手還滑。
- **自訂游標**，28／99，跟隨、圖尾、鏡頭糊標、hover 才標籤；僅 10／28 有 reduce。此處系統游標、標籤在頁上。
- **Scramble 打字**，11／5 站，標題四秒不可讀、正文中途亂、行動等打完。此處不用，真字完整到達。
- **長固定跑道**，pin 頁平均兩倍長少字，17 頁至少 20 屏，有慢轉獨佔屏。此處每步一屏、每台三屏、每固定屏一文字。
- **零透明藏字**，等捲停才出、非活 10–15%、半淡陳述。此處只首屏下揭一次、入視不超 900ms、dim 最低 40%、fill45%起。
- **動物穿字**，跑馬燈浮物蓋陳述、移行裁自己、字留糊。此處不穿閱讀文字，移行某點完整可讀。
- **Overshoot bounce**，19 stylesheet，仍禁 UI。
- **無關閉無盡 loop**，顆粒點等化器徽章、多無 reduce。此處離屏暫停、reduce 停。

研究禁用替代：固定舞台髮絲進度與刻度改正文 "2 of 4"；"01/08"改普通數或無；漸層淡換改平色章硬切；等寬 HUD 改正文小字。

## 10. 動態規則

1. **首格**HTML 含標題、句子、圖，立即繪，不等 load，最多四元素、1.2 秒定。
2. **無 preloader、計數、gate、自訂游標、攔 wheel**。只 Stage.smooth，Lenis lerp0.1–0.14、觸控 reduce 停，停手不繼續滑。
3. **曲線**：低 600ms ease-out；至少 800ms 揭示 expo；擦拭移動 in-out；永久離場 exit；捲動 loop linear；色 plain ease；不 overshoot。
4. **時長**：按 140ms、色 hover180–200、動 hover300–400、選單 240、揭示 700–900、開圖 1,100–1,300、離場 60–70%。
5. **錯開**：行 80–110ms、列 50–90、字元 20–40 且只一至三詞短標、每序最多四步。
6. **揭示**：頂到視窗 85–90%一次、升 12–32px 或行遮罩、視野中不藏超 900ms、首屏不等捲。
7. **場景負責大膽**：依 references/scenes.md 與共 stage，兩三個、一至四屏、手機版、完成構圖。內用場景數值，可圖擴滿、字跨台、攝影機飛；閱讀文字仍守 8 與 10。
8. **場景外連動安靜**：linear 鎖軸、視差低 8%、scale0.94–1.15、timeline 包 supports、無支援靜態。其他 sticky 每步一屏、最多三屏、每屏一行字。
9. **各一**：招牌一，場景可算；動圖一；跑馬燈最多一；場景間安靜段。
10. **字可讀**：fill45%起、dim 最低 40%、blur 最多 8px 且定後清零，不穿字。
11. **逐章色**段邊硬切、header 文字 300ms 跟。
12. **橫動**先原生拖列，固定版只少三屏、鍵盤支援。
13. **換頁**view transitions 最多 480ms，reduce 停。
14. **減少動態**每隱藏態都包 no-preference，reduce 即完成頁、loop 停。三分二得獎頁略過不構成略過理由。

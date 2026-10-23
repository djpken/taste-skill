# 捲動場景

[英文原文](scenes.md) · 翻譯基準：upstream `6010f91`。
[中文索引](../../../README.zh-tw.md#中文文件索引)

頁面的大時刻：從區段長欄變場景，攝影機飛過圖群、圖從窗展滿屏、字隨捲動彎曲、照片環繞後落格。這是得獎站的記憶點，也是只有整齊區段的頁面缺少的。

場景資料庫拆解近期 Awwwards Sites of the Day，2026 年 10 月逐格記錄 43 站、描述 261 場景、30 類型，再以自有程式碼從零重建，桌面／手機／減少動態逐格測試、對照來源評審，不包含網站自有內容。`library/scenes.json` 發布前抽選不提供場景；有需求依第 8 節在共用舞台建立，遵守此文件。

## 目錄

1. 定義
2. 放入頁面
3. 填入內容
4. 配合頁面
5. 手機、減少動態、無腳本
6. 檢查
7. 場景規則
8. 資料庫無適合場景
9. 目錄

## 1. 定義

高區段內舞台固定、頁面捲過。舞台 `position: sticky`，區段高為 hold + 1 屏，固定 hold 屏，GSAP timeline 隨捲動 scrub 0 至 1。不攔 wheel，捲軸誠實、鍵盤觸控板正常，場景會結束。

淡入上移、小視差、sticky 頁尾、跑馬燈屬 `references/motion.md` 安靜層。場景改變整屏。

方向表第 9 節抽兩三個不同家族，放在能承載論述的區段。步驟 6 一起做，場景屬構圖。

## 2. 放入頁面

複製共用舞台與抽到的 `assets/scenes/stage.css`、`stage.js`、`<id>.css`、`<id>.js`。檔頭列出預期 markup 與選項，`assets/scenes/demo/<id>.html` 是完整可執行參考。

```html
<head>
  <script>document.documentElement.classList.add('js')</script>
  <link rel="stylesheet" href="scenes/stage.css">
  <link rel="stylesheet" href="scenes/<id>.css">
</head>
<body>
  …
  <section class="scene" data-scene="<id>" data-options='{"hold": 3}' aria-label="…">
    <div class="scene-stage">
      <!-- the markup from the scene file's header, filled with this page's content -->
    </div>
  </section>
  …
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.min.js"></script>
  <script src="scenes/stage.js"></script>
  <script src="scenes/<id>.js"></script>
  <script>Stage.smooth(); Stage.init();</script>
</body>
```

- 場景明說需要才載 SplitText `gsap@3.15.0/dist/SplitText.min.js`。
- `Stage.smooth()` 用 Lenis lerp 0.12 加權 wheel。觸控、減少動態停用；安靜頁可省，場景仍可運作。
- `Stage.init()` 啟動所有 `[data-scene]`，兩場景就載兩檔。
- 版本鎖定，不改 `@latest` 或未鎖 major。

## 3. 填入內容

檔頭、方向表 Content 行說明數量；共通規則：

- **同家族圖。** 同光、色調、主題類型。混圖比時序錯誤更破壞空間感。此處順序為主題世界真圖 `assets.mjs`、自有圖、抽選圖，見 `references/imagery.md`。依最大顯示尺寸備圖，設 `width`、`height`。
- **一口氣可讀。** 固定陳述 4–12 字詞，圖說一至四字詞、正文字型、句首大寫，每次一陳述。
- **說主題。** 飛越工作室作品、貨運真路線、房屋四房、產品狀態變化。無關圖是噱頭。
- **只用真內容。** 要八圖卻只有三，`--redraw scenes`，不塞替身。

## 4. 配合頁面

- 檔案讀 `--ground`、`--ink`、`--muted`、`--accent`、`--font-display`、`--font-text` 與 fallback。用方向表設 `:root`，場景沿用頁面。讓 demo 配頁面。
- 展示字用抽到字型、最多兩行，陳述維持陳述字級。
- 場景間有文字、清單、普通圖等安靜區段。連兩場景像長旅程，第二場失效。
- 首屏場景 progress 0 可讀，第一格有標題、句子、行動，訪客捲才動，動態規則 1。
- 區段有標題。場景內不顯示時，section 仍有 `aria-label`，完成構圖有真 heading。

## 5. 手機、減少動態、無腳本

- **手機。** 各檔有改數值、簡化、或 `phone: 'rest'` 完成構圖方案。觸控不平滑。手機圖表與桌面同等檢視。
- **減少動態與無腳本。** 普通區段展示可靜讀的完成構圖，相同內容，不隱藏等腳本。看 `reduced-hidden` 與 `scenes.mjs` reduced 圖表。
- **CDN 失敗**也回完成構圖，stage 加 `.is-rest`。桌面休止 `scene-not-live` 會失敗，壞腳本不能過關。

## 6. 檢查

```bash
node <skill>/scripts/scenes.mjs <page>        # every scene at 0, 10 … 100%, desktop and phone, and reduced motion
node <skill>/scripts/inspect.mjs <page>       # the gate; with scenes on the sheet it also films the scroll
```

`scenes.mjs` 將各場景、各寬度 contact sheet 寫 `.taste-skill/scenes/`，全部看。每格問：一個清楚焦點？陳述可讀？跳動、空白、裁切、穿字？夠大膽？`desktop-film-NN.jpg` 每三分一屏拍全頁，檢查場景與安靜區段節奏，段間不空。

## 7. 場景規則

1. **每頁兩三個不同家族**，中間安靜段。超四 `many-scenes`、固定佔頁長 60% 以上 `scene-heavy` 警告。
2. **每場固定一至四屏**，每敘事拍約一屏；無新內容就刪，不延長。
3. **只原生捲動。** 不攔 wheel、不鎖頁、不只點擊才跑。平滑只用 `Stage.smooth()`。
4. **停點可讀。** 完整陳述，讀時無物穿字，圖上有平遮罩或平靜區。
5. **場景內採場景數值**，動態規則 7。圖可擴滿、字可跨台、攝影機可飛。外部依 `references/motion.md` 安靜限制。
6. **Transform、opacity、clip-path。** 不逐格強迫 layout，移動前 decode 圖。
7. **準則仍適用。** 不等寬、不 01/07 計數，必要用普通 "3 of 7"；不漸層、只平遮罩；不陰影光暈、髮絲裝飾、裝飾粒子、紫色。
8. **完成構圖須設計。** 減少動態、失敗腳本、部分手機看到它，不是事後補丁。

## 8. 資料庫無適合場景

先 `--redraw scenes`。需求確需不存在場景，沿同舞台繼承防護：

```js
Scenes['my-scene'] = (root, opts = {}) => Stage.scene(root, {
  hold: opts.hold ?? 2,          // screens the stage is held for
  scrub: opts.scrub ?? true,     // true when Lenis runs; 0.4-0.8 without it reads as weight
  phone: 'same',                 // or 'rest', or { hold, build } for a phone plan
  build(tl, { q, phone }) {      // positions are fractions of the scene, 0-1
    tl.fromTo(q('.picture'), { clipPath: 'inset(30% 30% 30% 30%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6 }, 0)
      .to(q('.title'), { yPercent: -40, autoAlpha: 0, duration: 0.25 }, 0.7);
  },
});
```

先寫 CSS 完成構圖，再於 `.scene.is-live` 寫即時版，照常用 `scenes.mjs` 檢查。

## 9. 目錄

由 `library/scenes.json` 產生，抽選由此取材；`node <skill>/scripts/draw.mjs --list scenes` 印出。

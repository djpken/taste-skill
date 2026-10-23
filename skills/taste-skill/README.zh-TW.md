# tasteskill v2 (`design-taste-frontend`)

為 coding agent 設計的技能，根據 2026 年 10 月 One Page Love 與 Awwwards Sites of the Day 共 247 精選網站研究。提供藝術指導、嚴格不靠裝飾的準則，要求看完渲染結果再完成工作。

## 運作方式

1. **盤點。** 列出只屬此客戶的名稱含義、街道、數字、限制、材料、時間。
2. **抽選。** `scripts/draw.mjs` 從 20 個方向抽三，各是強站構想引擎。選能承載盤點者，再抽主圖、區段、免費真字型、色盤、照片、動態、研究參考。藍圖下列出與準則衝突處。記住近期抽選避免重複。
3. **構想與互動。** 一句把客戶材料連方向，與最近競品核對；一件訪客可做的事。
4. **製作。** 依表先文案、完整內容。無自有照片，`scripts/assets.mjs` 從開放典藏找街道明信片、地圖、材料、行業版畫、同類文物，下載記署名；無誠實真圖才程式畫。
5. **關卡。** `scripts/lint.mjs` 掃原始碼、`scripts/inspect.mjs` 真瀏覽器 1440／768／390 量兩行標、無眉標、mono、01/02/03、細線、漸層、靜影、奶油陶土、紫。也查盲評最批的無焦點、空屏、遮裁文字、長固定、橫列、淡字。
6. **檢視。** 依 Awwwards 權重評截圖，修前三，最多三輪。

五輪無 skill 與另一設計 skill 盲測見 `references/research.md` §11。

## 內容

```
SKILL.md                 the run, the house rules, the laws
references/              copy, type, colour, layout, imagery, motion, critique, tells, research
scripts/draw.mjs         deal options / a direction / reprint / redraw; --alternatives, --photos, --site
scripts/assets.mjs       search open image collections (Openverse, Wikimedia Commons, Art Institute of
                         Chicago, the Met) and, with --video, real footage (Wikimedia Commons, Internet
                         Archive, NASA); --get downloads with the credit, --credits prints them
scripts/lint.mjs         static scan for banned patterns and stock phrases
scripts/inspect.mjs      render, measure, photograph
scripts/lib/             zero-dependency Chrome DevTools client, the in-page probe, the rules
library/                 directions (20), heroes, sections, type systems, palettes, photographs,
                         studied sites, motions
assets/base.css, base.js an optional neutral foundation
evals/evals.json         six briefs for testing the skill against a no-skill baseline
```

## 需求

`inspect.mjs`需 Node22 以上、已安裝 Chrome／Edge／Chromium，以 Node 內建 WebSocket 走 DevTools，不安裝其他軟體。`draw.mjs`、`lint.mjs`、`assets.mjs`可 Node18+；assets 需網路、無 API key。非標準瀏覽器位置用 `CHROME_PATH`。

## 安裝

複製資料夾到技能目錄，例如 `~/.claude/skills/design-taste-frontend/`，或 repo 內 `.claude/skills/`。

## 注意事項

- library 照片來自 Unsplash、由 Lorem Picsum 提供，依 Unsplash 授權，只作氣氛佔位，替換自有。
- assets 搜尋圖保自授權，預設只 CC0、公有領域、CC BY、CC BY-SA，`--get`在 `assets/credits.json`記標題、作者、授權、來源。頁須有署名，`--credits`印出。
- `assets.mjs --video`找短片，取 720p 以下，預設拒超 25MB，`--max-mb`可改，每片 poster。靜音 loop、poster、reduce 停見 `references/imagery.md` §11。
- 字型來自 Google Fonts、Fontshare，確認各字體授權。
- `references/research.md`分數是模型讀截圖判斷，非真 Awwwards 分。
- 抽選歷史 `~/.taste-skill/history.json`，可 `TASTE_SKILL_HISTORY`移動，刪除重設。
- 完整檢視修正約 30–45 分鐘、數十萬 tokens，多花在無自有圖時找圖／繪圖。

## 中文閱讀入口

[完整指令](SKILL.zh-TW.md)與[全部中文參考文件](../../README.zh-tw.md#中文文件索引)。英文 runtime 入口保持原樣。

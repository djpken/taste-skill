# 更新紀錄

taste-skill 的重要變更記錄於此。版本大致遵循 SemVer：實驗預發布可自由迭代，穩定版鎖定 API。以下保留歷史當時的敘述與命令；現行安裝來源以 README 的搬遷表為準。

---

## 2.1.4 - 2026-10-20

- **修正：一輪檢查可能刪除另一個仍在執行的瀏覽器 profile**，[#157](https://github.com/Leonxlnx/taste-skill/issues/157)，由@t4sh 於[#158](https://github.com/Leonxlnx/taste-skill/pull/158)修正。macOS、Linux 的 Chrome 不留 lockfile，2.1.0 清理只按年齡判未使用，長工作中啟動第二輪可能刪第一輪 profile。#158 移除掃除並加回歸測試。
- **安全恢復殘留 profile 清理。** 每 profile 有 `taste-skill-owner.json`，含機器、run 與 Chrome PID。之後 run 只在同機且兩 process 皆不活時清理；無 owner 檔不動。舊版本殘留不自動刪，手動處理 temp 或 `TASTE_SKILL_TMP` 的 `ad-chrome-*`。

## 2.1.3 - 2026-10-19

一庫一技能，`design-taste-frontend`未改。

- **經典技能搬遷**至 [taste-skill-classics](https://github.com/Leonxlnx/taste-skill-classics)：`high-end-visual-design`、`minimalist-ui`、`industrial-brutalist-ui`、`gpt-taste`、`stitch-design-taste`、`design-taste-frontend-v1`、`design-taste-frontend-v2-experimental`。名稱檔案相同，Claude Code plugin 隨搬，用 `/plugin marketplace add Leonxlnx/taste-skill-classics`。
- **移除指向資料夾**：2.1.1 已搬 [imagegen-skills](https://github.com/Leonxlnx/imagegen-skills) 的 brandkit、image-to-code、imagegen-frontend-web、imagegen-frontend-mobile，以及整合的 redesign-existing-projects。README 列各舊名新址。
- **移除** `research/laziness/`，屬 2.1.1 已移除 full-output-enforcement；過時 `skills/llms.txt`、`skill.sh`與測試、未用圖片。
- **README**改文字標誌、暗色更明顯 TasteCode banner、減 badge、永遠顯社群贊助。
- Codex plugin 只載 `design-taste-frontend`。

## 2.1.2 - 2026-10-19

- **修正 Claude Code 不載技能**，[#151](https://github.com/Leonxlnx/taste-skill/issues/151)。2.1.0 description 未引用 `: ` 導 YAML 失敗、默默略過並報 Unknown skill。改折疊 block scalar。
- **防再犯**：`tests/frontmatter.mjs`用嚴格 YAML 解析每 SKILL 與 agents/openai.yaml，檢 name、描述長、manifest；`check-skills.yml`每 push／PR 跑、registry test 與腳本語法。

## 2.1.1 - 2026-10-19

單一首選，安裝 repo 不再可能自動選舊技能。

- **經典技能明確啟用**。soft、minimalist、brutalist、gpt-taste、Stitch、v1、v2-experimental 只具名呼叫。Claude `disable-model-invocation: true`，Codex `allow_implicit_invocation: false`於 agents/openai.yaml，其他 agent 描述亦明說。
- **改版整合**。SKILL 完整處理既有網頁／App 的 redesign、restyle、review：真瀏覽器 before、保技術內容功能、依字型色彩外框狀態制式元件修改、after 證明。redesign-existing-projects 退役指向此處。
- **圖像技能搬遷**至 [imagegen-skills](https://github.com/Leonxlnx/imagegen-skills)：imagegen-frontend-web、imagegen-frontend-mobile、brandkit、image-to-code，同安裝名，本地只指向。
- **移除 full-output-enforcement**。
- **兩 Claude plugins**：taste-skill 只預設，taste-skill-classics 給想要經典者。

## 2.1.0 - 2026-10-19

### 捲動場景引擎

大場景基礎，如攝影機飛圖群、圖片窗擴滿。從 43 個動態日選拆解從零重建的測試場景庫將於 2.2 提供，本版先提供執行基礎與檢查。

- **assets/scenes/stage.js 與 stage.css**：原生 scroll scrub 的 sticky 舞台、鎖版 GSAP ScrollTrigger；可選 Lenis，觸控 reduce 停；減少動態、無 JS、CDN 失敗皆完成構圖。做法見 references/scenes.md。
- **scripts/scenes.mjs**桌手機拍固定區間 0–100%與 reduce 頁；**inspect.mjs --film**每三分一屏記全捲，未啟動／桌面 rest 判失敗。
- scenes.json 存在後 draw 可抽，`--redraw scenes`、`--list scenes`。
- motion.md 只舞台允 smooth，場內用場數、外安靜，仍無 preloader、gate、自訂游標、攔 wheel。

### 展示 App 的產品頁

每主視覺即時屏、功能裁切、圖表皆真 App 片段。一次 `draw.mjs --app --keep palette,type --out .taste-skill/app`抽風格，用 app.css 與 charts.js、可加總真資料。

### 修正

- Chrome 先停再刪 profile、限制 cache、清理被 kill 殘留。長測曾留數十 GB，`TASTE_SKILL_TMP`可移離系統碟。
- motion.md／research.md 移除 smooth-scroll 中途空格主張，原因是擷取錯誤。

### App：儀表板、後台、設定、收件匣

預設技能增加工作畫面，SKILL 先分網頁或 App。

- **references/app-screens.md**新章：資料工作盤點、單問單發現、帶 assert 資料、抽風格、外殼資料各狀態、檢查檢視；外殼、畫布標題、KPI、圖表、表清單、表單設定、亮暗字色、密度、空零 loading error、手機平板、準則、生成痕跡替代。
- 作者選 23 真畫面、17 產品、17 亮 6 暗，像素量測；截圖私有，只量測規則入 skill。
- **draw.mjs --app**從 app.json 抽七風格：achromatic ledger、framed sheet、accent ladder、editorial greeting、pastel consumer、true-black flat、data terminal。各 tokens 字型色預算招牌，另五 shell、13 產品類 21screen pattern。
- **inspect／lint --app**由 App 表自啟。允低調邊、小標、重複 panel 表；不重影玻璃染方圖、彩虹、佔位、低 11 字、手機側欄、列不齊、首屏薄、落地大字值、旁死帶、色泛濫。
- **assets/app.css**中性 shell、panel、分 KPI、table、pill、control、tab、empty、手機；**charts.js**線柱環 barlist、計畫／已花、share／target、註記參考預測封頂。皆研究預設。
- 四盲輪 8／6／5／3 成品對參考截圖評。末輪「套件良好但無產品面貌」導新增必要 face 步，各 style 從需求取面貌；power-flow、leave timeline、cover matrix、sell-out strip 等 signature。

### 網頁外框

生成頁常細節前就失敗：無標、邊不等、半屏空、長空、段無標、字貼邊。

- SKILL 步 6 加外框，準則三列，回報前完成線。
- inspect 查 `no-title`、`name-only-title`、`off-centre`，FAIL 且 16px 偏移 WARN、`lopsided`、`empty-middle`、`blank-gap`、`untitled-section`、`edge-text`、`ragged-edges`、`small-title`、`many-h1`。依研究強邊差數 px、百文字段一空半、82%有標。
- critique 加五秒、外框、上限；layout 重寫空間、新外框章。

### 最新 100 個 Awwwards 日選研究

2026-10-18 擷取 1440／390、量實動 CSS，每站一模型讀者，91 可用。只學習、不複製自有物。

- **影像影片**imagery§12：每屏比例、19 放法排名幾何手機、影片裁切圖上字；每片 poster、每屏一動、全循環對比。
- **動態**motion 增實跑曲線時長、錯開 trigger、preloader 成本、新 `--ease-expo`、`--ease-exit`、`--t-open`、stagger；排名；十配方：逐行、展窗、固定圖過字、橫圖庫、後退主圖、列錨預覽、1.2 秒載入、view transition、填墨、滾數；避噱頭與規則。motions.json 七新 signature。
- **library**10 主圖 13 區段、21 新站、另 70 媒體動態筆記，以 `draw.mjs --site <id>`讀。
- **新檢查** `late-title`載後 1.2 秒不可讀、`reduced-hidden`、`no-poster`。

---

## 2.0.0 - 2026-10-13

### 儲存庫

- taste-skill 安裝名 design-taste-frontend 改**v2**新技能，名不變。
- 舊 experimental 保 taste-skill-v2-experimental，安裝名 design-taste-frontend-v2-experimental。
- v1 保持 taste-skill-v1／design-taste-frontend-v1。
- 增 CHANGELOG.md。
- Codex plugin 安裝，.codex-plugin／.agents/plugins。
- manifests2.0.0。
- skill.sh 同收安裝／資料夾名。
- 移除未用贊助 README 圖、scripts 一次素材腳本、與 v2 矛盾舊 Copilot 指示。

---

## v2：taste-skill 的新預設

全新技能，基於 247 精選 One Page Love／Awwwards 研究。是資料夾，含指令、九 reference、library、四零依賴腳本。

### 如何運作

1. **盤點**客戶獨有名含義、街、數、限制。
2. **抽選**20 取 3，選可承盤點者，再抽 48 主圖、172 區段、44 免費字型系統、56 色盤、420 照片、11 動態、181 研究參考。每藍圖印準則衝突。
3. **構想互動**一句自有素材連手法、最近競品測、一可做事。
4. **完整製作**無自有照則 assets 開典真圖，無誠實圖才程式畫。
5. **關卡**lint 源、inspect 真瀏覽器 1440／768／390；眉標、code 外 mono、01/02/03、細線框、漸層靜影、奶油陶土紫、超兩行、低 13 字、首屏無焦點、近空屏、遮裁字、橫溢皆失敗。
6. **檢視**Awwwards 權重評截圖、修前三、最多三輪。

### 開放典藏真圖

無照 agent 曾全畫 SVG。assets 無 key 搜 Openverse、Commons、Chicago、Met，印直圖 URL、源頁、尺寸、作者、授權、署名。預設可商用 CC0／public domain／CC BY／CC BY-SA 且查載入。`--source`、`--license`、`--orientation`、`--min-width`篩；`--get <ref>`下載 project assets 記 credits.json；`--credits`印頁尾與報告。

影像順序：自有、生成、**主題世界開典真圖**如街老片地圖材料版畫文物、無真圖才畫、抽氣氛照、純字色。不冒充產品房菜人團隊，逐圖署名列報告。表依需求建首查如 ghent postcard／old map，imagery§3 說明搜尋好圖創意授權。

### 圖、片、動態必備

測試最初 v2 十頁全無真圖、幾乎不動，故強制：

- `few-pictures`少四真圖 FAIL，照片典藏片 raster 與軟體真介面裁切算，SVG 不算。少二真照片 `no-real-pictures`、無片 `no-footage`警。
- `still-page`低 8FAIL 低 16WARN，計實動 distinct 元素，CSS animation transition WebAnimations script transform。
- `assets.mjs --video`搜 Commons、Internet Archive、NASA 開放片，靜音 loop。

改為一大 signature、各段各部編排入場、每控回饋、一動圖。移除「一時刻其餘不動」預算，仍禁每塊同淡入。

### 需求

inspect 需 Node22+與 Chrome／Edge／Chromium，DevTools 不另裝。draw lint assets Node18+，assets 網路無 key。工作 project `.taste-skill/`、歷史 `~/.taste-skill/history.json`。

### 測試

六需求五盲輪，新 agent 無 skill／v2，三需求另 skill，獨立 agent 匿名截圖 Awwwards 權重。末三需求 v2 7.7、無 7.8、另 7.2，v2 勝二；檢查 v2 每頁 0、無 8–13 失敗。限制單評約半分噪音、模型評、末需求前輪已見。research§11 全記。

### 成本

完整檢視修正約 30–45 分鐘、數十萬 tokens，無自照多花找畫。

---

## v2 experimental：前預設，現 taste-skill-v2-experimental

原版重大重寫，保三旋鈕 `DESIGN_VARIANCE`、`MOTION_INTENSITY`、`VISUAL_DENSITY`，加結構、硬規則、可遵循實作。

**這是預發布。** 曾預設直至正式 v2 取代，保留供依賴專案，不再迭代。

### experimental 新內容

**新章**

- **§0 需求推斷**：程式前判頁種、語感、參考、受眾限制，一行 design read，避免預設。
- **§2 需求→設計系統**：Material／Fluent／Carbon／Polaris／Atlassian／Primer／GOV.UK／USWDS／Bootstrap／Radix／shadcn／Tailwind 取官方套件；玻璃、bento、brutalism、editorial、dark tech、aurora、kinetic 等美學用 web 標準誠實命名，Apple Liquid Glass 只是近似。
- **§8 暗模式**：預設雙模式、每專案 token 策略、對比層級同等。
- **§11 改版**：Greenfield／Preserve／Overhaul，先稽核、依順序現代化，不默改 URL、nav 標、欄名、品牌字標、法律文案。
- **§12Block library 合約**：真來源實作 schema，hero feature social-proof pricing cta footer portfolio transition navigation。
- **§13 範圍外**：儀表板、data table、多步 form、code editor、原生 mobile、即時協作 UI。
- **§14 交付前檢查**：每項誠實通過。

**§9 生成痕跡強化禁令**

- **§9.G 全面禁 em dash `—`**，標題眉標 pill 正文引言署名圖說按鈕 alt，改 hyphen 或句構。先前測試最常違反。
- 禁 00 / INDEX、001 · Capabilities、06 · how it works 等眉標編號。
- 主圖 V0.6、INVITE-ONLY PREVIEW、BETA，只明確發布需求例外。
- 假 Field study no.12 · Ines Caetano 照片署名裝飾，真署名例外。
- 主圖底 BRAND.MOTION.SPATIAL 裝飾串。
- 圖上 pill 標。
- 行銷頁 v1.4.2、Build0048 頁尾。
- 99%需求不用城市時間天氣條，如 Lisbon,working with founders。
- Scroll、↓scroll、Scroll to explore 提示。
- 預設零裝飾狀態點。
- 長 list 每列 border-t＋border-b，改元件。
- 比較視覺不用有底 track 評分／進度。
- div 裝飾假 task list／dashboard／terminal。
- 段標右上浮小字。
- 強烈不建議手繪 SVG icon，用 Phosphor／HugeIcons／Radix／Tabler。

**設計規則強化**

- **鎖色**全頁一 accent，不第 7 段亂換。
- **鎖形**全頁一 radius 系統。
- **按鈕對比**每 CTA WCAG AA，不白上白。
- **主圖**標≤2 行、副≤20 詞≤4 行、CTA 免捲可見、字圖尺度先規劃。
- **nav**桌面單行高≤80。
- **Used by／Trusted by**在 hero 下，真 SVG logo 用 Simple Icons／devicon，非純字。
- **段版型**8 段至少 4 家族。
- **Bento** N 項剛好 N 格，無空中尾。
- **主題鎖**全頁 light／dark／auto 一種，不中途明暗翻。
- **斜字下伸**y g j p q 至少 leading-[1.1]與 pb-1。
- **長清單換元件**，超 5 的 ul＋divide-y 慵懶，改 cards tabs marquee carousel scroll-snap pills。
- **分隔不濫用**，每列不 border-t＋border-b。

**動畫紀律**

- 標準 Motion `motion/react`，Framer Motion 新名，舊 framer-motion 可 alias。
- **§5.A sticky-stack**標準骨架，start top top、pin true、scrub true、下一卡 trigger 驅 transform。
- **§5.B horizontal-pan**start top top、pin true、end +=distance、scrub1。
- **§5.C reveal stagger**輕 Motion whileInView，GSAP 留真 pin／scrub。
- **§5.D 禁模式**window.addEventListener('scroll')、React state 手算捲動、rAF 碰 React state。
- **MOTION_INTENSITY>3 必 reduce**，useReducedMotion 或 media。
- **宣稱須展示**，>4 真動，否則降 3 乾淨靜態。

**技術更新**

- 預設 Tailwind v4，既有要求才 v3。
- Motion 取代建議 Framer import。
- Icon 優先 Phosphor／HugeIcons／Radix／Tabler，Lucide 不建議，手 SVG 禁。

### 保持內容

- 三旋鈕精神相同，增 presets 推斷。
- 反樣板化方向同、執行更硬。
- transform／opacity、無 top left width height 動畫、硬體加速。

### 當時為何改預設

舊 taste-skill 方向對但易略讀，正式測試反覆 em dash、編號眉標、Quietly in use at、裝飾點、div 假截圖、GSAP trigger 壞。v2 以硬規則、標準骨架、交付清單補足，當時建議此版。

### 固定 v1

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend-v1"
```

此命令安裝原始不變 SKILL。

### 穩定性註記

此為歷史當時聲明：experimental 成預設且持續迭代，任何 pre-release 可改，收斂 v2.0.0。安裝名變更、刪章等破壞改動集中正式版明說。

---

## v1：原始 taste-skill

初版三旋鈕、反樣板規則、pattern 名稱參考。歷史保於 `skills/taste-skill-v1/`，安裝名 `design-taste-frontend-v1`。

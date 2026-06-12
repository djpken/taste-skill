# Scenario Routing — 情境技能路由指南

以真實前端設計情境為出發點，快速找到對應的 taste-skill 技能或組合。

每個情境包含：**觸發訊號 → 推薦技能鏈 → 跳過警示**。

---

## 目錄

1. [從零開始一個登陸頁](#1-從零開始一個登陸頁)
2. [重新設計現有網站](#2-重新設計現有網站)
3. [圖像先行再實作（圖像轉程式碼）](#3-圖像先行再實作)
4. [建立行動端 App 介面概念](#4-建立行動端-app-介面概念)
5. [建立品牌視覺識別系統](#5-建立品牌視覺識別系統)
6. [快速改善現有介面品質](#6-快速改善現有介面品質)
7. [設計師工作室 / 創意作品集](#7-設計師工作室--創意作品集)
8. [Google Stitch 螢幕生成](#8-google-stitch-螢幕生成)
9. [AI 模型持續截斷輸出](#9-ai-模型持續截斷輸出)
10. [不確定用哪個 skill](#10-不確定用哪個-skill)

---

## 情境路由快速參照表

| 情境 | 主要 Skill | 安裝名稱 |
|------|-----------|---------|
| 新登陸頁（SaaS / 代理商 / 作品集） | taste-skill | `design-taste-frontend` |
| 重新設計現有網站 | redesign-skill | `redesign-existing-projects` |
| 圖像 → 分析 → 程式碼 | image-to-code-skill | `image-to-code` |
| 網站視覺參考圖（無程式碼） | imagegen-frontend-web | `imagegen-frontend-web` |
| 行動端 App 螢幕概念 | imagegen-frontend-mobile | `imagegen-frontend-mobile` |
| 品牌識別板 / 標誌系統 | brandkit | `brandkit` |
| 柔和高端消費者介面 | soft-skill | `high-end-visual-design` |
| 極簡編輯風格（Notion/Linear 氛圍） | minimalist-skill | `minimalist-ui` |
| 工業野獸派 / 強烈排版 | brutalist-skill | `industrial-brutalist-ui` |
| Google Stitch DESIGN.md | stitch-skill | `stitch-design-taste` |
| 防截斷，完整輸出 | output-skill | `full-output-enforcement` |
| GPT / Codex 嚴格指導 | gpt-tasteskill | `gpt-taste` |

---

## 1. 從零開始一個登陸頁

### 觸發訊號

- 新的 SaaS 產品、個人作品集、活動或代理商登陸頁
- 使用者說「幫我做一個登陸頁」、「建立官網首頁」
- 從無到有，沒有既有的視覺語言

### 推薦技能鏈

```
design-taste-frontend（預設）
        │
        ├── 若需要先看視覺參考圖再動手
        │        ▼
        │   imagegen-frontend-web  →  image-to-code
        │
        ├── 若要柔和昂貴感（消費者/健康/wellness）
        │        ▼
        │   soft-skill（high-end-visual-design）
        │
        └── 若要極簡編輯風（Notion/Linear 氛圍）
                 ▼
            minimalist-skill
```

### 安裝指令

```bash
# 預設（最安全的起點）
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"

# 若需要先生成視覺參考再實作
npx skills add https://github.com/Leonxlnx/taste-skill --skill "imagegen-frontend-web"
npx skills add https://github.com/Leonxlnx/taste-skill --skill "image-to-code"
```

### 旋鈕設定建議

| 頁面類型 | VARIANCE | MOTION | DENSITY |
|---------|---------|--------|---------|
| SaaS 主流 | 7 | 6 | 4 |
| 代理商 / 創意 | 9 | 8 | 3 |
| 高端消費者 | 7 | 6 | 3 |
| 開發者作品集 | 6 | 5 | 4 |

### 跳過警示

- 不讀設計旋鈕直接產出 → 模型會套預設模板，輸出缺乏個性
- 省略 `設計讀取（Design Read）` 步驟 → 模型不推斷使用者意圖，仍套 AI 通用美學

---

## 2. 重新設計現有網站

### 觸發訊號

- 使用者說「幫我改善這個頁面」、「這個網站看起來很廉價」、「重新設計」
- 貼上截圖或現有程式碼
- 要改版但不能破壞 SEO 或現有功能

### 推薦技能鏈

```
redesign-skill（先稽核，後修復）
        │
        │  稽核發現大量問題？
        ├── 輕度改善（字型/間距/色彩）
        │        → 直接用 redesign-skill 修復
        │
        ├── 需要全面重構視覺語言
        │        → redesign-skill + design-taste-frontend
        │
        └── 僅需要動態層升級
                 → redesign-skill + soft-skill（motion 部分）
```

### 安裝指令

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "redesign-existing-projects"
```

### 稽核優先順序（重新設計的槓桿）

| 優先級 | 操作 | 風險 / 效益 |
|------|------|------------|
| 1 | 字型刷新 | 低風險，最大視覺提升 |
| 2 | 間距與節奏 | 低風險，立即改善感知品質 |
| 3 | 色彩重新校準 | 中風險，保留品牌強調色 |
| 4 | 動態層 | 中風險，加入微互動 |
| 5 | Hero 區段重新構圖 | 高風險，可能影響 CTA 轉化 |
| 6 | 全面塊替換 | 最高風險，最後手段 |

### 跳過警示

- 不先稽核直接改 → 修了不重要的地方，真正的問題沒動到
- 在沒有測試的情況下重構 CSS → 行動端版面靜默崩潰
- 修改了頁面 slug 或表單欄位名稱 → SEO 斷鏈 + 分析數據中斷

---

## 3. 圖像先行再實作

### 觸發訊號

- 使用者想先「看到」設計再決定要不要動手
- 使用 ChatGPT Images / Codex 圖像模式
- 需要設計參考板（不一定要即刻實作）

### 推薦技能鏈

```
imagegen-frontend-web（生成每個區段的設計圖像）
        │
        ▼
image-to-code（深度分析圖像，然後精確實作）
```

### 安裝指令

```bash
# 先生成設計圖
npx skills add https://github.com/Leonxlnx/taste-skill --skill "imagegen-frontend-web"

# 再實作（兩個 skill 搭配使用）
npx skills add https://github.com/Leonxlnx/taste-skill --skill "image-to-code"
```

### 硬性輸出規則

`imagegen-frontend-web` 強制每個區段生成**獨立圖像**：
- 6 個區段的登陸頁 → 生成 6 張圖像（非一張長圖）
- 在提示中明確說明：`follow the skill: generate images, then analyze, then code`

### 跳過警示

- 跳過 `imagegen-frontend-web` 直接用 `image-to-code` → 無設計參考，實作方向不確定
- 讓模型把全頁壓成一張圖 → 文字無法讀取，實作精確度低

---

## 4. 建立行動端 App 介面概念

### 觸發訊號

- 需要 iOS / Android / 跨平台 App 的螢幕概念圖
- 展示 App 入門流程、儀表板或特定功能螢幕
- 不需要實作程式碼，只需視覺概念

### 推薦技能鏈

```
imagegen-frontend-mobile（僅生成圖像，不寫程式碼）
        │
        │  若需要實作
        ▼
image-to-code + design-taste-frontend
（mobile 的程式碼實作須搭配程式碼 skill）
```

### 安裝指令

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "imagegen-frontend-mobile"
```

### 適用場景

| 情境 | 建議 |
|------|------|
| 單一螢幕概念 | 1 張圖像 |
| 完整入門流程 | 3-5 張螢幕 |
| App 完整概念 | 8-12 張螢幕 |

### 跳過警示

- 此 skill **不寫程式碼**，請勿期待輸出可執行的 React Native 或 Swift 程式碼
- 若需要實作，搭配 `image-to-code` skill

---

## 5. 建立品牌視覺識別系統

### 觸發訊號

- 需要標誌方向、色盤、字型選擇
- 建立品牌指南板（brand guidelines board）
- 展示識別在各媒體上的應用（名片、社群、App 圖示）

### 推薦技能鏈

```
brandkit（僅生成圖像，不寫程式碼）
        │
        │  識別確定後，進入實作
        ▼
design-taste-frontend（應用識別到網頁）
或
imagegen-frontend-web（生成套用識別的網頁參考圖）
```

### 安裝指令

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "brandkit"
```

### 品牌套件輸出結構

```
完整品牌套件（6-10 張板）：
  1. 標誌系統（主版 / 反轉 / 獨立符號）
  2. 色盤（名稱 + 十六進位碼 + 功能角色）
  3. 字型板（展示層次）
  4. 圖像方向（攝影風格 / 插圖風格）
  5. 應用示例（名片 / 社群封面 / App 圖示）
```

### 跳過警示

- 此 skill **不寫程式碼**，不會輸出 CSS 變數或設計 token
- 若需要將品牌 token 轉為 Tailwind config，需手動轉換或搭配 `stitch-skill` 的 `DESIGN.md` 輸出

---

## 6. 快速改善現有介面品質

### 觸發訊號

- 功能已完成，但介面看起來廉價或平庸
- 只需要快速的視覺提升，不需要全面重設計
- 模型輸出了「AI 通用美學」（Inter 字型 + 藍色 CTA + 圓角卡片）

### 推薦技能鏈

```
改善程度輕微（字型 / 色彩 / 間距）：
  redesign-skill

改善整體氛圍（柔和昂貴感）：
  soft-skill（high-end-visual-design）

改善為極簡風格（Notion/Linear）：
  minimalist-skill

改善為強烈個性感（野獸派）：
  brutalist-skill
```

### 快速 AI 告示清單（立即識別問題）

| 告示 | 修復方向 |
|------|---------|
| Inter 字型 | 換成 Geist / Outfit / Satoshi |
| 藍色 CTA + 白色背景 | 調整為品牌強調色 |
| `shadow-md` 灰色陰影 | 改為純黑低不透明度陰影 |
| 居中 3 欄等寬卡片 | 改為不對稱 Bento 或 Zig-Zag |
| Em-dash（—）在標題中 | 改為換行、逗號或冒號 |
| `h-screen` | 改為 `min-h-[100dvh]` |
| 圖像上的藥丸標籤 | 移除標籤或將其移出圖像 |

---

## 7. 設計師工作室 / 創意作品集

### 觸發訊號

- 個人設計師作品集
- 創意代理商或工作室官網
- 希望有獨特視覺個性，而非「另一個 SaaS 登陸頁」感

### 推薦技能鏈

```
設計師 / 工作室作品集（VARIANCE 8+）：
  design-taste-frontend（旋鈕：VARIANCE 9, MOTION 7-8）

工業 / 強排版個性：
  brutalist-skill

高端生活方式 / 奢侈感：
  soft-skill + minimalist-skill 組合使用

若需要先有視覺方向：
  imagegen-frontend-web → image-to-code
```

### 旋鈕設定建議

| 作品集類型 | VARIANCE | MOTION | DENSITY |
|----------|---------|--------|---------|
| 設計師 / 工作室 | 8-9 | 7-8 | 3 |
| 開發者作品集 | 6-7 | 5 | 4 |
| 攝影師 | 7 | 4 | 3 |
| 創意代理商 | 9-10 | 8 | 3 |

### 跳過警示

- 使用預設旋鈕（VARIANCE 7, MOTION 6）→ 作品集看起來像 SaaS 登陸頁，缺乏個性
- 沒有說明受眾 → 模型推斷不出風格方向

---

## 8. Google Stitch 螢幕生成

### 觸發訊號

- 使用 Google Stitch 生成 UI 螢幕
- 需要建立 `DESIGN.md` 作為 Stitch 的設計語言定義
- 想讓 Stitch 輸出頂級、非通用的介面

### 推薦技能鏈

```
stitch-skill（生成 DESIGN.md）
        │
        ▼
將 DESIGN.md 傳入 Stitch 作為設計語言基準
        │
        ▼
在 Stitch 中生成螢幕
```

### 安裝指令

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "stitch-design-taste"
```

### DESIGN.md 結構（stitch-skill 輸出）

```markdown
# 設計系統：[專案名稱]
## 1. 視覺主題與氛圍
## 2. 色盤與角色（含十六進位碼）
## 3. 字型規則
## 4. 元件樣式
## 5. 排版原則
## 6. 動態與互動
## 7. 反模式（禁止）
```

### 跳過警示

- 不生成 `DESIGN.md` 直接用 Stitch → Stitch 輸出通用 Material 風格介面
- 省略反模式清單 → Stitch 仍會套用 AI 通用美學

---

## 9. AI 模型持續截斷輸出

### 觸發訊號

- 模型輸出 `// ...` 或 `// rest of code` 等佔位符
- 模型說「如您想讓我繼續」
- 只輸出了部分元件或函式骨架

### 推薦技能鏈

```
output-skill（full-output-enforcement）
  │  搭配任何其他 skill 使用
  ▼
design-taste-frontend（或其他 skill）
```

### 安裝指令

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "full-output-enforcement"
```

### 禁止的輸出模式（output-skill 負責攔截）

```
程式碼中：
  // ...  |  // rest of code  |  // TODO  |  /* ... */
  // similar to above  |  // continue pattern

文字中：
  「如需更多細節請告知」
  「為了簡潔起見」
  「其餘部分遵循相同模式」
```

---

## 10. 不確定用哪個 Skill

### 決策樹

```
需要生成程式碼？
  ├── 是 → 需要處理現有網站？
  │         ├── 是 → redesign-skill
  │         └── 否 → 有特定視覺風格？
  │                   ├── 柔和高端      → soft-skill
  │                   ├── 極簡編輯風   → minimalist-skill
  │                   ├── 工業野獸派   → brutalist-skill
  │                   └── 通用起點     → design-taste-frontend（預設）
  │
  └── 否（只需圖像）
        ├── 網頁設計參考圖  → imagegen-frontend-web
        ├── 行動端 App 螢幕 → imagegen-frontend-mobile
        └── 品牌識別板     → brandkit
```

### 通用原則

| 情況 | 建議 |
|------|------|
| 不確定，想要安全的起點 | `design-taste-frontend` |
| 已有現成網站要改善 | `redesign-skill` |
| 需要先看設計再動手 | `imagegen-frontend-web` → `image-to-code` |
| 模型一直截斷輸出 | 搭配 `output-skill` |
| 使用 GPT / Codex | 用 `gpt-taste` 替代 `design-taste-frontend` |

---

## Skill 相依關係圖

```
圖像生成（不寫程式碼）        程式碼 Skills（實作）
─────────────────────        ──────────────────────
imagegen-frontend-web ──┐
                         ├──► image-to-code ──► design-taste-frontend
imagegen-frontend-mobile ┘                           │
                                                      ├── soft-skill
brandkit ─────────────────────────────────────────── ├── minimalist-skill
                                                      ├── brutalist-skill
                                                      └── redesign-skill

輔助 Skills（搭配任何主要 skill 使用）
──────────────────────────────────────
output-skill（防截斷）
stitch-skill（DESIGN.md 生成）
gpt-tasteskill（GPT/Codex 嚴格模式）
```

---

## 相關文件

- [README.md](../README.md) — 專案總覽（English）
- [README.zh-tw.md](../README.zh-tw.md) — 專案總覽（繁體中文）
- [skills/llms.txt](llms.txt) — 機器可讀的 Skill 清單

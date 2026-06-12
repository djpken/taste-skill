<p align="center">
  <img src="assets/readme-banner.png" alt="Taste Skill - 專為優質前端設計的 AI Agent Skills" width="100%" />
</p>

# Taste Skill

<p align="center">
  <em>AI Agent 的反濫觴前端框架</em>
</p>

<p align="center">
  <a href="https://tasteskill.dev" title="Taste Skill - tasteskill.dev">
    <img src="assets/taste-skill-logo.webp" width="80" height="80" alt="Taste Skill" />
  </a>
</p>

<p align="center">
  <a href="https://tasteskill.dev">
    <img src="https://img.shields.io/badge/開啟-tasteskill.dev-%23a855f7?style=for-the-badge&labelColor=%230f172a" alt="開啟 tasteskill.dev" />
  </a>
</p>

<p align="center">
  <a href="README.md">English</a>
</p>

可攜式 **Agent Skills**，升級 AI 建構的介面：更強的排版、字型、動態效果與間距，取代千篇一律的樣板 UI。本倉庫同時包含用於參考板的**圖像生成 Skills**（網頁、行動端、品牌套件）。可搭配 **ChatGPT Images** 或類似工具使用，再將生成的框架交給 Codex、Cursor 或 Claude Code 實作。

<p align="center">
<a href="https://github.com/Leonxlnx/taste-skill/stargazers"><img src="https://img.shields.io/github/stars/Leonxlnx/taste-skill?style=for-the-badge&logo=github&labelColor=1e293b&color=fbbf24" alt="GitHub stars"/></a>
<a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-fbbf24?style=for-the-badge&labelColor=1e293b" alt="MIT 授權"/></a>
<a href="#安裝"><img src="https://img.shields.io/badge/工具-Codex%20%C2%B7%20Cursor%20%C2%B7%20Claude-111827?style=for-the-badge&labelColor=1e293b" alt="支援的 agents"/></a>
<a href="https://www.tasteskill.dev/changelog"><img src="https://img.shields.io/badge/更新日誌-最新-059669?style=for-the-badge&labelColor=1e293b" alt="tasteskill.dev 更新日誌"/></a>
</p>

## 免責聲明

Taste Skill 沒有任何官方代幣、幣種或加密貨幣項目。任何使用我的名稱、圖像或本專案的代幣均與本人無關，且不受本人認可。

<p align="center"><sub><a href="#免責聲明">免責聲明</a> · <a href="#安裝">安裝</a> · <a href="#skills">Skills</a> · <a href="#設定僅-taste-skill">設定</a> · <a href="#範例">範例</a> · <a href="#支持本專案">贊助</a> · <a href="#研究">研究</a> · <a href="#常見問題">FAQ</a> · <a href="#授權">授權</a></sub></p>

## 回饋與貢獻

歡迎提供建議與回報錯誤：

- 在 GitHub 開 Pull Request 或 Issue
- 私訊 [@lexnlin](https://x.com/lexnlin) 或 [@blueemi99](https://x.com/blueemi99)
- 發送電子郵件至 [hello@tasteskill.dev](mailto:hello@tasteskill.dev)

## 安裝

[`npx skills add`](https://github.com/vercel-labs/agent-skills) CLI 會掃描本倉庫的 `skills/` 資料夾，因此**以下所有 skills（程式碼與圖像生成）均以相同方式安裝**。

```bash
npx skills add https://github.com/Leonxlnx/taste-skill
```

透過 **安裝名稱**（即 SKILL frontmatter 中的 `name:` 欄位，非資料夾名稱）安裝單一 skill：

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
```

您也可以將 `SKILL.md` 複製到專案中，或貼入 ChatGPT / Codex 對話。預設的 `taste-skill`（安裝名稱 `design-taste-frontend`）目前為 **v2（實驗性）**，是原始 v1 的重大改版。如果已安裝 v1，重新執行安裝指令即可升級：

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
```

安裝名稱未更改，無需更新腳本。新的 SKILL.md 會直接取代舊版。如需鎖定 v1：

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend-v1"
```

### 從舊版升級

每個 skill 各司其職，無需同時使用所有 skill。

## Skills

每個 skill 各司其職，無需同時使用所有 skill。**實作 skills** 輸出程式碼；**圖像生成 skills** 僅輸出參考圖像。

`安裝名稱` 欄位是傳遞給 `--skill` 的確切值。

> **不確定用哪個？** 查看 [情境路由指南 →](skills/SKILL-ROUTING.zh-tw.md)

| Skill（資料夾） | 安裝名稱 | 說明 |
| --- | --- | --- |
| **taste-skill** | `design-taste-frontend` | 🆕 **v2（實驗性）** — 預設 skill 的重大改版。讀取簡報、推斷設計語言、調整三個旋鈕（VARIANCE / MOTION / DENSITY）。包含簡報推斷、設計系統對應、GSAP 程式碼骨架、重新設計稽核協定、嚴格的飛行前檢查。 |
| **taste-skill-v1** | `design-taste-frontend-v1` | 原始 v1 版 taste-skill，保留供依賴其確切行為的專案使用。僅在 v2 破壞工作流程時使用。 |
| **gpt-tasteskill** | `gpt-taste` | GPT/Codex 的更嚴格變體：更高的排版變異度、更強的 GSAP 指導、積極的反濫觴規則。 |
| **image-to-code-skill** | `image-to-code` | 圖像優先流程：先生成網站參考圖，分析後再實作前端以匹配。 |
| **redesign-skill** | `redesign-existing-projects` | 現有專案：先稽核 UI，再修復排版、間距、層次、樣式。 |
| **soft-skill** | `high-end-visual-design` | 精緻、沉穩、昂貴感的 UI：柔和對比、留白、優質字型、彈簧動態。 |
| **output-skill** | `full-output-enforcement` | 當模型輸出半成品時使用：完整輸出，無佔位符注釋。 |
| **minimalist-skill** | `minimalist-ui` | 編輯風格產品 UI（Notion/Linear 氛圍），克制的色盤，清晰的結構。 |
| **brutalist-skill** | `industrial-brutalist-ui` | 硬派機械語言：瑞士字型、強烈對比、實驗性排版。 |
| **stitch-skill** | `stitch-design-taste` | Google Stitch 相容規則，包含可選的 `DESIGN.md` 匯出格式。 |

### 圖像生成 Skills

這些 skill 僅產生設計圖像（無程式碼）。可搭配 ChatGPT Images、Codex 圖像模式或任何能生成圖像的 agent 使用。

| Skill（資料夾） | 安裝名稱 | 說明 |
| --- | --- | --- |
| **imagegen-frontend-web** | `imagegen-frontend-web` | 網站合成圖：Hero、登陸頁、多區塊，強大的字型設計、間距、反濫觴藝術指導。 |
| **imagegen-frontend-mobile** | `imagegen-frontend-mobile` | 行動端畫面與流程：iOS/Android/跨平台、展示圖、可讀字型、連貫系列。 |
| **brandkit** | `brandkit` | 品牌套件板：標誌方向、色盤、字型、各類別的識別應用。 |

### 我該用哪一個？

查看完整的 **[情境路由指南](skills/SKILL-ROUTING.zh-tw.md)**，以真實情境導航到對應的 skill 組合。

快速判斷：
- 以 **taste-skill** 作為最安全的通用預設值。
- 改善現有網站時，使用 **redesign-skill**。
- 需要先看設計圖再動手時，用 **imagegen-frontend-web** → **image-to-code**。
- Agent 持續截斷輸出時，加入 **output-skill**。
- 交付物為**圖像**時，使用 **imagegen-frontend-web**、**imagegen-frontend-mobile** 或 **brandkit**。

### 圖像優先技巧

使用 **image-to-code-skill** 時，在提示中說明流程，例如：`follow the skill: generate images, then analyze, then code`。

### ChatGPT Images 與 Codex

附加或貼入 **`imagegen-frontend-web`**、**`imagegen-frontend-mobile`** 或 **`brandkit`**，請求所需的框架，然後將渲染結果傳給 Codex、Cursor 或 Claude Code。需要在一個工作流程中同時生成參考圖和實作網站時，使用 **image-to-code-skill**。

## 設定（僅 taste-skill）

檔案頂端的數字為 1-10 旋鈕：

- **DESIGN_VARIANCE**：排版實驗度（低：居中/整齊；高：不對稱/現代）。
- **MOTION_INTENSITY**：動畫深度（低：懸停效果；高：捲動/磁性效果）。
- **VISUAL_DENSITY**：每個視口的資訊量（低：寬敞；高：密集儀表板）。

## 範例

使用 taste-skill 建立的作品：

<p>
  <img src="examples/floria-top.webp" width="400" />
  <img src="examples/floria-bottom.webp" width="400" />
</p>

## 支持本專案

如果 Taste Skill 對你有幫助，請考慮贊助：

[在 GitHub 贊助](https://github.com/sponsors/Leonxlnx)

### 現有贊助者

<a href="https://github.com/dnakov"><img src="https://github.com/dnakov.png" width="40" height="40" style="border-radius:50%" alt="dnakov" title="dnakov" /></a>
<a href="https://github.com/AkramReshad"><img src="https://github.com/AkramReshad.png" width="40" height="40" style="border-radius:50%" alt="AkramReshad" title="AkramReshad" /></a>
<a href="https://github.com/ajmalaksar25"><img src="https://github.com/ajmalaksar25.png" width="40" height="40" style="border-radius:50%" alt="ajmalaksar25" title="ajmalaksar25" /></a>
<a href="https://github.com/krikkkk"><img src="https://github.com/krikkkk.png" width="40" height="40" style="border-radius:50%" alt="krikkkk" title="krikkkk" /></a>
<a href="https://github.com/navanchauhan"><img src="https://github.com/navanchauhan.png" width="40" height="40" style="border-radius:50%" alt="navanchauhan" title="navanchauhan" /></a>
<a href="https://github.com/robinebers"><img src="https://github.com/robinebers.png" width="40" height="40" style="border-radius:50%" alt="robinebers" title="robinebers" /></a>
<a href="https://github.com/JKc66"><img src="https://github.com/JKc66.png" width="40" height="40" style="border-radius:50%" alt="JKc66" title="JKc66" /></a>
<a href="https://github.com/u2393696078-rgb"><img src="https://github.com/u2393696078-rgb.png" width="40" height="40" style="border-radius:50%" alt="u2393696078-rgb" title="u2393696078-rgb" /></a>
<a href="https://github.com/a-human-created-this"><img src="https://github.com/a-human-created-this.png" width="40" height="40" style="border-radius:50%" alt="a-human-created-this" title="a-human-created-this" /></a>
<a href="https://github.com/AtharvaJaiswal005"><img src="https://github.com/AtharvaJaiswal005.png" width="40" height="40" style="border-radius:50%" alt="AtharvaJaiswal005" title="AtharvaJaiswal005" /></a>
<a href="https://github.com/ghughes7"><img src="https://github.com/ghughes7.png" width="40" height="40" style="border-radius:50%" alt="ghughes7" title="ghughes7" /></a>
<a href="https://github.com/mccun934"><img src="https://github.com/mccun934.png" width="40" height="40" style="border-radius:50%" alt="mccun934" title="mccun934" /></a>
<a href="https://github.com/techmedic5"><img src="https://github.com/techmedic5.png" width="40" height="40" style="border-radius:50%" alt="techmedic5" title="techmedic5" /></a>
<a href="https://github.com/bytewerk-dev"><img src="https://github.com/bytewerk-dev.png" width="40" height="40" style="border-radius:50%" alt="bytewerk-dev" title="bytewerk-dev" /></a>

<p align="center">
 <a href="https://www.star-history.com/leonxlnx/taste-skill">
  <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/badge?repo=Leonxlnx/taste-skill&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/badge?repo=Leonxlnx/taste-skill" />
   <img alt="Star History Rank" src="https://api.star-history.com/badge?repo=Leonxlnx/taste-skill" />
  </picture>
 </a>
</p>

## 研究

形塑這些 skills 的背景文章收錄於 [`research/`](research/)。

## Star 歷史

<a href="https://www.star-history.com/?repos=Leonxlnx%2Ftaste-skill&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=Leonxlnx/taste-skill&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=Leonxlnx/taste-skill&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=Leonxlnx/taste-skill&type=date&legend=top-left" />
 </picture>
</a>

## 常見問題

**這與其他 AI 設計 skills 有何不同？**
多個專門變體、關鍵 skills 中的可調旋鈕、基於專項研究的反重複規則。所有 skill 均與主要編碼 agent 的框架無關。

**支援 React、Vue、Svelte 嗎？**
支援。規則針對設計意圖，而非單一框架 API。

**什麼是 SKILL.md？**
一個可攜式指令檔，agent 可自動載入；透過 `npx skills add` 安裝，或複製到倉庫或對話中。

**圖像生成 skills 也能用 `npx skills add` 安裝嗎？**
可以。它們與程式碼 skills 同樣存放在 `skills/` 下，CLI 能自動發現。

## 授權

[MIT 授權](LICENSE) · Copyright (c) 2026 Leonxlnx

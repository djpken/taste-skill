# 情境技能指南

對應 upstream `6010f91`，現行版本 2.1.4。本庫只保留 `design-taste-frontend`。舊版三旋鈕設定不適用現行流程。

## 情境對應

| 需求 | 處理方式 |
| --- | --- |
| 到達頁、行銷頁、作品集、餐廳、活動、單頁網站 | 依 [主技能](taste-skill/SKILL.zh-TW.md) 的網頁流程：盤點、論述、抽方向、找構想、文案、靜態製作、檢查、看圖、動態、回報。 |
| 儀表板、後台、分析、設定、收件匣、錢包、builder | 先完整讀 [App 畫面](taste-skill/references/app-screens.zh-TW.md)，使用 `draw.mjs --app` 與 `inspect.mjs --app`。 |
| 既有網站或 App 改版 | 主技能的特殊情況：先記錄 before，保留技術與正常功能，再改、檢查 after、比較。 |
| 只要求審查 | 記錄 before、看截圖、量測、列三個最有效變更；不進入實作。 |
| 單一元件／區段 | 有既定方向可略過抽選，沿用周圍設計，仍須檢查。 |
| 產品頁展示 App | 外頁採網頁流程，內部真介面片段採 App 規則；共色盤字型。 |
| 需要大捲動場景 | [場景指南](taste-skill/references/scenes.zh-TW.md)。此版本有共用舞台與檢查器，完整 `library/scenes.json` 尚未發布；勿假設已附各場景 demo。 |
| 只要網頁／手機設計圖、品牌板、圖轉程式碼 | 已搬至 `Leonxlnx/imagegen-skills`，不是本庫目前的技能。 |
| 明確要舊 soft／minimalist／brutalist／GPT／Stitch／v1／v2 experimental | 已搬至 `Leonxlnx/taste-skill-classics`。 |
| 模型省略輸出 | 原 `full-output-enforcement` 已移除，見 `Leonxlnx/unlazy`。 |

## 安裝現行技能

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
```

Node22 以上、已安裝 Chrome／Edge／Chromium；搜尋開放典藏需網路，無 API key。安裝名稱保持英文。

中文文件屬此 fork，agent 預設載入的英文 `SKILL.md` 不變。需要中文資料請取本 fork `zh-TW`分支並由[總覽](../README.zh-tw.md)閱讀。

## 舊技能位置

| 安裝名稱 | 儲存庫／現況 |
| --- | --- |
| `high-end-visual-design`、`minimalist-ui`、`industrial-brutalist-ui`、`gpt-taste`、`stitch-design-taste`、`design-taste-frontend-v1`、`design-taste-frontend-v2-experimental` | [taste-skill-classics](https://github.com/Leonxlnx/taste-skill-classics) |
| `imagegen-frontend-web`、`imagegen-frontend-mobile`、`brandkit`、`image-to-code` | [imagegen-skills](https://github.com/Leonxlnx/imagegen-skills) |
| `redesign-existing-projects` | 已整合到現行 `design-taste-frontend`，無須另裝。 |
| `full-output-enforcement` | 已移除；參考 [unlazy](https://github.com/Leonxlnx/unlazy)。 |

例如安裝經典柔和風格：

```bash
npx skills add https://github.com/Leonxlnx/taste-skill-classics --skill "high-end-visual-design"
```

`image-to-code` 本身包含先生成圖片、分析再實作的工作流程。無須將另一圖像技能視為必要相依。

## 查閱文件

完整中文索引在 [README](../README.zh-tw.md#中文文件索引)。色彩、動態、字級及數值限制依各參考文件，不沿用已搬出的 experimental 三旋鈕指南。

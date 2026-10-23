# 字型排版

[英文原文](type.md) · 翻譯基準：upstream `6010f91`。
[中文索引](../../../README.zh-tw.md#中文文件索引)

訪客主要看到文字；文字決定頁面像經過設計或拼裝。方向表提供字型、字重、設定，本文件說明用法。

## 目錄

1. 研究量測
2. 少量且差距大的字級
3. 展示字
4. 正文
5. 正確載入字型
6. 一或兩家族
7. 排版細節
8. 檢查器看不到的錯誤

## 1. 研究量測

247 個研究站有 202 個可量測，Chrome、1440×900 與 390×844：

| 項目 | 中位數 | 中間一半 | 註記 |
| --- | --- | --- | --- |
| 主視覺標題字級 | 72px（5.0vw） | 43–109px | 高分中位 6.0vw |
| 頁面最大字 | 6.4vw | 達 10.4vw | 高分 8.4vw、弱站 5.0vw |
| 手機主視覺標題 | 40px | 32–59px | |
| 主視覺字距 | -0.01em | -0.03 至 0 | 越大越緊 |
| 主視覺行高 | 1.0 | 0.95–1.1 | |
| 正文字級 | 16px | 14–18px | |
| 標題／正文 | 4.3 | | 高分 4.7 |
| 實際字體數 | 2 | 31% 一、45% 二、22% 三 | |
| 主視覺字重 | regular 48%、medium 18%、bold 以上 22% | | 大字不必粗 |
| 主視覺全大寫 | 24% | | |
| 主視覺置中 | 39% | | 弱站 52% |

兩項重點：尺寸對比是主要手段，強站更強；字重則否，一半主視覺用 regular。尺度與間距帶來自信，粗體只是選項。

## 2. 少量且差距大的字級

114 強站中約 30 站被評為兩三種字級、中間沒有其他字級，沒有任何站被評為五六階漸進。展示、正文、小字承載頁面，必要才加 lead、區段標題，最多五。常見失敗是九種相近字級，如 16、18、20、24、28、32，缺乏層次。選明顯不同階：

```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);   /* 13–14px  captions, legal */
  --step-body:  clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);    /* 17–19px  paragraphs */
  --step-lead:  clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);      /* 20–26px  supporting line, large body */
  --step-head:  clamp(2rem, 1.3rem + 3.2vw, 4rem);             /* 32–64px  section headings */
  --step-display: clamp(3rem, 1rem + 9vw, 9rem);               /* set by the hero blueprint */
}
```

- `--step-display` 依方向：巨型文字標誌 16–24vw，安靜工具標題 28px。用主視覺藍圖大小，以 `clamp()` 隨視窗縮放並限制手機與超寬螢幕。
- 桌面展示字至少正文四倍；除非真需第六字級，`--step-lead` 與 `--step-head` 間不加字級。
- 不為每卡、標籤另設小標字級。兩級看起來近就合併。

## 3. 展示字

大字暴露正文看不到的間距問題。40px 以上全部套用：

```css
.display {
  font-size: var(--step-display);
  line-height: 0.95;              /* 0.85–1.05; tighter for capitals and condensed faces */
  letter-spacing: -0.035em;       /* -0.02 to -0.05em; use the value on the direction sheet */
  font-kerning: normal;
  text-wrap: balance;
  max-width: 14ch;                /* choose the measure so lines break where you want */
  margin: 0;
}
```

- **字距隨尺寸。** 越大越緊；120px 適合值會擠壞 32px。各字級獨立設定。
- **行高低於 1.0 須檢查。** 看下伸部與下一行上伸部、重音是否相撞。兩行易目視驗證。
- **全大寫**即使大字也略開字距 0 至 +0.03em，行高約 0.9。
- **視覺對齊。** O、C、A、T、W 等圓／斜左緣看似內縮，標題左拉 0.04–0.06em，如 `margin-left: -0.05em`，對齊下文。
- **滿視窗文字。** 用 `vw`，檢查 390、1440；`white-space: nowrap`，容器裁切而非折行。依字元算 `font-size ≈ container width ÷ (characters × k)`，k 見 `copy.md` §2。
- 展示字不加陰影、描邊、漸層。

## 4. 正文

```css
body { font-size: var(--step-body); line-height: 1.5; font-kerning: normal; text-rendering: optimizeLegibility; }
p { max-width: 62ch; text-wrap: pretty; margin: 0; }
p + p { margin-top: 0.9em; }
.lead { font-size: var(--step-lead); line-height: 1.35; max-width: 40ch; }
small, .caption { font-size: var(--step-small); line-height: 1.45; }
```

- 行寬 45–75 字元，過寬眼睛難找下一行；檢查器約 88 以上警告。
- 行高正文 1.45–1.6；較大 lead 1.3–1.4；長篇更鬆。
- 次要文字同字型、柔文字色 `--muted`，不減字重、不低於 13px。
- 超三行不置中，不左右對齊。
- 暗底亮字顯得較粗，減一階字重或加 0.01em 字距，略增行高。

## 5. 正確載入字型

方向表給 `<link>`，照用，不換成偏好字型。

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="…from the direction sheet…" rel="stylesheet">
```

```css
:root {
  --font-display: "Family From Sheet", "Helvetica Neue", Arial, sans-serif;
  --font-text: "Family From Sheet", Georgia, serif;
}
```

- 只載用到的字重，通常共兩三種。
- fallback 同大類，sans 配 sans、serif 配 serif。
- 框架用同家族、字重的 loader，如 `next/font/google` 或自架 `@font-face` 搭 `font-display: swap`。Fontshare 用方向表的 `api.fontshare.com` stylesheet。
- `inspect.mjs` 回報實際渲染家族。未載入警告代表截圖是 fallback，評估沒有意義，先修連結。

## 6. 一或兩家族

三分之一研究站只用一家族，是最安全的一致方式。抽到兩字體時：

- 固定分工，一個標題、另一個其餘內容，不互換。
- 不為標籤、數字、引言加第三種。
- 同一標題不混字體。
- 斜體只給作品名、段落真強調，不裝飾。

## 7. 排版細節

- 彎引號、apostrophe、真正破折號與省略號，見 `copy.md` §7。
- 價格、表格、欄式日期用 `font-variant-numeric: tabular-nums`；襯線正文可用 `oldstyle-nums`。
- 連結 `text-underline-offset: 0.18em; text-decoration-thickness: 0.07em`，避開下伸部。
- 標題 `hyphens: none`；只有長 URL／email 用 `overflow-wrap: anywhere`。
- 標題屬下文，上距至少下距兩倍。
- `::selection { background: var(--accent); color: var(--accent-ink); }` 與強調色可見 `:focus-visible`，讓原生狀態也融入設計。
- hover 不改字重，避免重排。

## 8. 檢查器看不到的錯誤

- 雖兩行但孤字，或拆詞組如 "Stools for small / kitchens"；手動斷行。
- 展示字緊到接觸，或鬆到散開。
- 主視覺自信，後面區段標題卻幾乎同大；每屏保留一個主導字級。
- 只為大字設計的展示字型拿來排正文。
- 全部粗體。每行都強調就沒有強調。

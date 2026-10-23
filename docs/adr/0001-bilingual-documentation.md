# ADR 0001：英文原文與翻譯對應檔並存

狀態：採用。日期：2026-10-23。

## 決策

以 upstream/main 的英文原文為基準，新增 `zh-TW` 標準書面語對應檔。`SKILL.md`、參考文件、程式碼、命令、URL、plugin manifest 及呼叫用的 `name:` 保持原樣；翻譯不改變 runtime 載入行為。中文 `description:` 與本文供人閱讀。原始 `SKILL.md` 永不因翻譯而編輯。

技能、參考文件與新增翻譯使用 `<stem>.zh-TW.md` 命名。既有 `README.zh-tw.md` 與 `skills/SKILL-ROUTING.zh-tw.md` 保留原路徑並更新全文，不另建只差大小寫的重複檔案，避免 macOS／Windows 檔案名稱衝突。英文 README 僅新增中文入口。

## 語體

使用台灣正體中文標準書面語，排除粵語口語標記。保留技術識別字、路徑、指令、程式碼區塊與正式產品名稱。

## 上游同步

本次同步 upstream `6010f91`。上游已將其他技能搬出本庫，因此翻譯目前仍存在的 skill 及所有 Markdown 參考文件，不復活上游移除的技能。情境指南依現行路由重寫。

後續更新先合併 upstream，再比對英文與中文的標題、列表、數值、條件與範例。英文原文引用的路徑在譯文中保留；中文 README 提供完整中文參考索引。

## 取捨

agent 預設仍載入英文 `SKILL.md`；中文對應檔不會自動取代它。這保留 upstream 行為，也避免 plugin manifest 或安裝名稱分歧。

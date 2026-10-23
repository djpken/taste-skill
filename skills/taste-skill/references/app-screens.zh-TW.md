# App 畫面

[英文原文](app-screens.md) · 翻譯基準：upstream `6010f91`。
[中文索引](../../../README.zh-tw.md#中文文件索引)

儀表板、管理、分析、設定、收件匣、錢包、建構工具都是供人工作的畫面。開始前完整閱讀，本章不採 `SKILL.md` 的網頁流程。

生成儀表板常是模板平均：深色側欄、彩色選取膠囊、Welcome back 揮手、四張 KPI 卡各有彩圓圖示、綠+12.5%、sparkline、漸層面積圖、斑馬表格與大寫加字距表頭。此處以真實產品畫面替代。

研究 23 畫面、17 產品，17 亮 6 暗，桌面 1440 或 1512px。產品不具名。逐像素量測並記優缺，以下為量測及中位數。與生成品差別依明顯度：

1. **色給資料、不給外框。** 有色像素中位約 3%，23 中 17 不超 5%，12 無實心主要按鈕。
2. **KPI 是字。** 無彩圓圖示、無 sparkline。
3. **表面平。** 17 無卡陰影，1px 線或一階分隔。
4. **無主視覺 header。** 9 無超 16px 標題，其餘中位 24px。
5. **圖表無多餘外觀。** 單序列無 legend，3–7 淡格線或無。
6. **導覽退後。** 活躍灰膠囊或文字亮度，彩左條只一站。
7. **表格靠線與對齊。** 無斑馬、表頭色帶，數字靠右。
8. **狀態誠實。** 零顯零、缺值灰橫線、空段保外框。

移除模板只是半工作，另一半是真資料、先回答一問題、格線加總正確。

**測試警訊。** 首輪盲測，本章畫面乾淨安靜正確，卻輸更豐富的無 skill 畫面，原因已成規則：

- **首屏薄**：一平線大圖，半需求在下方。1440×900 每需求塊都露標頭首列，§2.2。
- **沒產品**：無名、workspace、標誌，誰都能用。外殼命名產品範圍，§3.2。
- **節制藏意義**：延遲與請求上升都同灰。色代表好壞，§5。
- **無可做**：缺主要工作控制，最常用工作首屏一點，§2.2。
- **列底不齊、風格過用**：每卡套 tray、需要標籤卻圖示 rail。手法只放有意義處。

安靜是起點。可信畫面呈更多產品的人、物、數字、下一步。

**產品要有面貌。** 四輪後最常批評是同套件：Geist／Inter、#f8f8f8 底、白 12px 卡、黑上萊姆。Tokens 使正確，以下使專屬，須在流程§2.3 決定：

- **先選方向表一項面貌**：各風格列兩三路，如主題染底、個性數字字型、主要資料品牌色。寫在問題旁，首張截圖確認可見。
- **抽選字型真正載入**：fallback 會變預設，檢查器現在判失敗。
- **專屬標誌名稱**：外殼頂放從名／物推導的強調色簡單 monogram／符號，不黑方框一字。
- **獨有元素**：家庭電流、麵包售罄帶、假期最低人力、跑團配速 unit chart、情侶三欄、deploy commit 主體。方向表列需求字詞相符 signature，無則自創，記在問題旁。
- **主要資料一色相**：今日線、預訂柱、當期、破線餘裕。只有 delta 上色仍像套件，圖表無資料色 `no-data-hue`警告。
- **真人真物識別**：各人固定 initial、自己淡色，相鄰人色相至少 60 度。淡色是身分、不入圖例；產品縮圖、作品封面用本人本物。
- **行業詞**：等待客戶、病假、28 日到期，不模板 Items／Records／Status。

**日曆時間軸**為測試後作者規則，研究無樣本。人名左固定 160–220px，team subheader 分組不逐列重複。日欄淡 1px、週末深一階、今日單一資料色 1px 加文字色日期。條高 20–24px、圓 4。單行名列距 32，雙行 40–44 避免碰下列。

**每種預訂獨立標記**：休假淡填、病假 1px 斜紋、長假深灰階、外地工作外框、待核虛線。風格有色預算可相關種類 3px 左色邊；全色只需決策如人力不足。標籤在條內，太短用種類代碼加 tooltip 或條末後，不覆前日。多辦公室假日標辦公室。圖例縮小真標記，只列畫面種類，`Charts.timeline(el, rows, kinds)`從同 kinds 圖產條與 legend。

## 目錄

1. 適用
2. 流程
3. 外殼
4. 畫布標題
5. KPI
6. 圖表
7. 表格清單
8. 表單設定
9. 字型色彩
10. 密度
11. 空、零、載入、錯誤
12. 手機
13. App 準則
14. 生成儀表板痕跡

## 1. 適用

App 供工作，包括：

- 儀表板概況：店日、專案健康、出版成長。
- 後台管理：成員、訂單、活動、目錄。
- 分析報告，含無 App 外殼的生成報告。
- 設定帳務。
- 收件匣、佇列、可篩表等待處理清單。
- 錢包、財務首頁。
- 流程、表單、頁面 builder、畫布編輯器。
- 單一活動、deploy、客戶詳情。

展示產品介面的網站屬網頁，內部片段用此規則，根加 `data-ui`。混合需求各走流程，共色盤字型。

研究 23 桌面，無手機、loading、error；只有一設定、無 inbox、無密集作業表，最密約 120 資料點。超研究者標為**作者規則**。

## 2. 流程

依序，前三步決定品質。

### 2.1 盤點資料與工作

網頁盤世界，App 盤資料，在筆記八至十二行列：

- **物件欄位單位**：deploy、發票、成員、活動、對話。
- **合理量級**：數量、常金額、率範圍、日月年變化、新帳戶真小量。
- **人**：誰開、多頻、每天一眼或八小時、裝置。
- **工作**：核准、回覆、付、出貨、邀請，何者最多。
- **專屬事物**：名稱標誌、workspace／帳戶、兩伴侶／六人團／會員，肉眼辨識的商品照、封面、路線圖。規劃各出現處。

接著 JSON 或 JS 小資料集，合理名字、金額加總、日期序、數字單位，全部由此 render。總數計算不另手寫，新帳戶 1、6、9 誠實呈現。資料檔 assert，如 `console.assert(sold - cancelled === rsvps)`、bins 加總、部分整體，讀 console；票表與 KPI 不合會讓全屏失信。請假後額度、每日人力等計算檢查放計算腳本。

**誠實資料**，以下作者規則皆經評審核對：

- **重複事實一變數**：時間窗、總數、狀態跨卡，例如電池滿 13:30–16:30 之 KPI、陰影、卡，全從一值建。差半小時比少卡更失信。
- **總數 delta 依顯示部分計**：加四捨五入後分幣，不另 round 原總；£21.68 + £8.34 − £3.81 = £26.21，非£26.22。£5.28 比£5.22 為+£0.06，非+£0.07。
- **相對數同句明基準**：關門前 3h40m、比上週日早 45m、較平常週一+5。裸 early／up／+5 會被當比旁值。
- **同時間同名**：15:00 打烊、15:12 結帳，header 與卡一致，錯誤改狀態句。
- **圖說需解柱意義就改編碼**：另色期間與 legend、正負軸、mark 標籤。

### 2.2 寫出畫面的一個問題

每屏先回答一問：今日營收？哪 deploy 壞？誰等回覆？本月額度餘？一行寫下，決定：

- **最大物**：圖、plan、ring、list 都以該問題為主，最大數字回答標題句。測試 32px 的 88%太陽比壓過 24px 充電窗，與標題不符。
- **先讀什麼**。
- **省什麼**：研究設定頁只有三 usage、連分析，四畫面完全無圖因數字足夠。

再寫**一發現**，今日最需注意事實，如 9 人未到但 8 人候位、23:28 deploy 錯誤倍增、外食超£36。放標題下或主數副行、近行動。卡底 14px 藏重要發現讓畫面平。

**不重建研究畫面。** 同類財務、deploy 最易抄布局，評審立即認出。從自有事物建結構：情侶 Mia／Joint／Tom 三欄串帳戶計畫帳單，跑團依配速組。

逐區塊列後續問題的答案，一行一塊，無問題刪，避 KPI、大圖、雙小圖、表的制式序。

再守三點：

- **需求全在首屏**：1440×900 每塊露標頭、首列或數字。主塊約高 200–360px，長清單限 4–6 列加 View all；到期帳、SLA、失敗 deploy 在長表前。大部分平線圖最多三分二寬，旁放下一答案。
- **最常工作一點**：今日包貨、回最久逾時、重 deploy。控制放答案處，標題主要按鈕、列動作、失敗項 View logs。沒控制只是報表。
- **答案旁證據**：0.28%錯率加「23:28 deploy 後峰 3.9%，已 revert」比裸數可信。一句關鍵事件勝第二圖。

### 2.3 選風格

```bash
node <skill>/scripts/draw.mjs --app --kind <kind> --brief "<one line about the product>" \
  --screens <screens> [--theme light|dark] [--keep palette,type] --options 3
```

從 `library/app.json`最多三風格，類別 theme 只合兩就兩。`draw.mjs --app --list kinds`、styles、screens、signatures 列選項。畫面有 overview、analytics、list、detail、settings、wallet、builder、inbox、home、report。七風格取自共手法樣本：

| 風格 | 主題 | 用途 | 手法 |
| --- | --- | --- | --- |
| achromatic-ledger | light | 財務、報告、usage 設定 | 外框無色，圖用墨，變化小訊號 |
| framed-sheet | light | B2B 分析、開發平台、builder | 單染色 L 框，白頁內縮 8px 無陰影 |
| accent-ladder | light | 創作者、小商家方案管理 | 全色只小 mark，面積用淡同色 |
| editorial-greeting | light | 團隊個人首頁 | 置中 12 欄問候 h1，數字 regular |
| pastel-consumer | light | 錢包、預算 | 同色淡磚、大圓角、安靜正負 |
| true-black-flat | dark | 社群、活動、媒體 | 明度做高度，色只資料 |
| data-terminal | dark | 市場、監控 | 同 1px 強調選線，數字用符號非色 |

依長短工作、錢／媒體、團隊／個人、日／夜選，寫理由，不選熟悉。再抽完整表：

```bash
node <skill>/scripts/draw.mjs --app <the same arguments, without --options> --style <id>
```

方向表給 tokens、字型、外殼與各 screen pattern。保留一手法，其餘用本檔預設。只品牌衝突或使用方式不合才 `--redraw style | shell | screen:<name>`。既有品牌 `--keep palette,type`，映射§9 角色，保色預算。

**標記前選面貌。** Its face 列兩三種，Signature elements 列需求詞匹配的電流、售罄、cover matrix、種類時間軸。問題旁記面貌、表中或自創 signature、首屏位置。同風格給兩產品不可同面貌，四輪跳過者都像同套件。

### 2.4 建外殼

先空框：側欄／rail、若有 topbar、畫布邊距、標題，§3／4。複製 `<skill>/assets/app.css`、`:root`放表 tokens。放資料前看 1440、390。註解寫格線算式：欄數、gutter、卡合到畫布邊的總和。

### 2.5 放資料

每塊從資料 render，圖用 `<skill>/assets/charts.js`：`Charts.line`、`Charts.bars`、`Charts.diverging`、`Charts.ring`、`Charts.barList`、`Charts.plan`、`Charts.bullet`、`Charts.timeline`、`Charts.matrix`、`Charts.timeStrip`，選項見檔頭；或依§6 自有 SVG，不用圖庫預設、不用圖表圖片。新 helper 回 `{ svg, legend }`，legend 放卡 header，別另畫，確保樣本符號對應 mark。每數依§7.4：分隔、固定小數、變化符號、小灰單位、tabular、欄右對齊。標籤用行業字，無 lorem、Acme、John Doe；不虛構虛榮總數、新帳週卻+12%。

### 2.6 狀態

每塊 empty／zero／loading／error，§11；每列控制 hover／selected／focus／disabled，各在瀏覽器看。只滿資料能用僅半成品。

### 2.7 檢查

```bash
node <skill>/scripts/lint.mjs --app <source files or folder>
node <skill>/scripts/inspect.mjs --app <url or path/to/index.html>
```

`--app`方向表自動讓兩工具採 App 規則。1440／768／390 量 h1 並稱 hero、手機折側欄、用到右邊、陰影邊框、圓角數、同列底不齊 `ragged-row`，堆卡欄加 gutter 算一塊；卡內空帶超 40px、新段標前超 64 `panel-void`；彩底圖示；數字對齊 tabular；圖表色相；色比例與無資料色 `no-data-hue`；佔位；低 11px；仍適用對比、漸層、禁色、emoji。修所有 FAIL，WARN 除非一句能向設計師辯護。

全部寬度看圖，書面回答。此為 App 評估，`critique.md`圖片、動態、互動元素上限只適網頁：

1. 最大物先答主問題？最大數回答標題句？
2. 所有塊共邊？死帶、短卡、孤格、卡內空帶、legend 貼底或四列卻拉高？
3. 色只資料狀態主要行動、主要資料有一色？選面貌首屏可見？
4. 數字加總且逐位齊？列重複事實核副本、用顯示值重算總變化、相對數具基準？
5. 零像零、缺值像橫線？計數只待辦且名詞清楚？
6. legend 每樣本符號與 mark 同？需圖說解柱就改圖編碼。標籤撞線撞字？
7. 手機導覽收起，各塊仍答問題？

修最差三、重檢再看、最多三輪。只依圖，截圖問題就是真問題。

### 2.8 回報

簡報風格名 seed、重抽理由、面貌 signature、各 screen 問題、允許的檢查如 builder `--allow icon-chips`及理由、可定位的待替換示例資料。

App 無動態最低量。動態只回饋：按 hover 焦點、選單 sheet、列出現。作者規則：畫面內容不表演入場。

## 3. 外殼

### 3.1 五原型

| 外殼 | 樣本 | 說明 |
| --- | --- | --- |
| 開放平面 | 5 | 有標籤側欄同底或差 1–2%，無分隔或 1px，無 topbar，header 卡坐底，畫布流動 24–64px 邊距或置中欄 |
| 染框白頁 | 8 | 側 top 同#f6f6f6–#f9fbfc 無中線，白頁右底內 8px，圓 10–16 中 16，邊#eaeaea–#ededed 1px 無影；齊 L 框、內頁、浮面板 8–12px 內距 12px 間隙 |
| 線分 T 框 | 4 | 側 210–240px、top64px 同底，1px 分，workspace 右端全高分隔，四中三暗 |
| 圖示 rail | 3 | 無標 50–60px 中 55，圖 15–18、列距 34–49，色或 2%底標活躍，群 20px 短線，省約 180px |
| 無側欄 | 3 | top46–48、置中 1088–1208px、邊 152–212px，logo 沿左，報告／檢視器／少目的地 |

六暗全同底，#161616–#232323 1px 或無線。17 亮無一深／飽和側欄。

### 3.2 側欄

- **寬**210–292，中 230，多 224–240。一次浮側卡 280 寬離窗 40。
- **列**32px hit、34pitch 眾數 7 站；寬鬆 40–52／42–60。圖 14–20 中 16，16 中 14 外框約 1.5px。標 14px／400 在 16 中 12，文字色或#4b4d4f–#63666e，圖後 8–10px，label x36–48。
- **活躍**8 站灰 pill 不改字，圓 4–16 中 8、左右內 8–14、#e9e9e9–#ededed。暗 3 站#bbb 到#fff。3 僅圖／字彩皆 rail 或浮卡；3 淡強調底；23 中 1 左條；2 改字重。預設亮灰 pill、暗亮度。
- **群**9 站 12–13px 灰 sentence case，不全大寫，上空 22–56、到首項 13–33；4 改短線。5 設定說明在底。
- **頂底**switcher 頂 7、底 2、或 topbar。底 user row8、upsell8，其中一實強調按鈕。
- **產品命名**，測試作者規則：側／rail 頂標誌名，scope 用 switcher／breadcrumb。截圖無法命名就像模板。
- **導覽計數**只待辦，名詞清楚，如 Requests5、Price changes3；Range and prices9 讓人問九個什麼。
- **預設有標籤**，僅目的地不超五且研究監控需寬才 rail。rail 頂有產品標、每圖 tooltip／accessible name。項目是其他 screen，非頁內 anchor；長頁 scroll-spy 已被扣兩次。

### 3.3 Topbar

23 中 14 有，預設無。亮 44–51 中 48，或 64 配 1px。需真搜尋、switcher、物件／頁名。搜尋中央 548×32 加 shortcut 有 2，無側欄 457–537×36。右群離邊 24–46。兩站約 1070px 空列皆批。

### 3.4 右 rail 與固定欄

一站右 384px、`1fr 384px`、距 24，與首卡同頂非標題，標題在卡外上 8px。只穩定次流：近期、選物詳情、分享。一次左固定 306px 帳卡高 viewport 減 72，淨值留視野。

五站浮按鈕 24–56px，一遮內容。作者規則：只主要行動且任寬不覆內容才浮。

## 4. 畫布標題

### 4.1 寬與邊距

- **流動**14 站，側 17–64 中 29，常 24 與 36–40；內容 1120–1312 中約 1204。
- **置中**8 站：624、864、1088、1100、1152、約 1190、1208，中 1126。資料頁均 1100–1250，兩個人窄 624／864 皆被批浪費。
- **頂距**20–88 中 36，工具 20–36，問候 50–88。
- **單一 gutter**橫直同值，12 對 16、20 對 24、16 對 12 混用 8 站被批。

### 4.2 一左緣一右緣

最強從 header 至末列同左緣。一站頁標內縮卡 24px，標題卡名數字圖同線。列線可超字欄 7–8px。

算式閉合：3 x 372 + 2 x 17 = 2 x 568 + 16 = 1152；12 x 77 + 11 x 16 = 1100；4 x 144 + 3 x 16 = 624；下卡寬等上兩卡 251 + 24 + 515。寫出算式。

避研究失敗：卡距右邊還 120px、右 0 左 40、欄在整窗置中非側欄後區域，左 204 右 444、徽章偏軸 108。用不滿右邊檢查器警告。

**格線不合資料空洞**最常 10 站：四 KPI 三欄孤第四、三欄只有一卡旁 810 空、卡拉鄰高 legend 下 250 空。按物數選欄、孤卡跨欄、不為空間拉框。

**同列共底**。26–190px 差每次扣、`ragged-row`。先平衡內容：分清單、同列數、相近高配對。兩卡堆一欄與旁大卡算一塊，共底才平。無法才堆兩塊，或短卡拉高但內容靠上、只有 View all／總數固定底，避免洞。

**有內容才拉卡**。僅行動總數可貼底，legend 註解緊圖下。測試 cover 卡 legend 貼底留 60px、售罄卡連結上 45px。短內容自高，row `align-items: start`、footer 移 header、配同高塊。篩選後隨列縮，或固定列數空位一句，四列下 270 空不行。卡內超 40px `panel-void`警告。

**窄塊不跨畫布**。五欄以下表／六列以下清單，1440 時約 760px，旁配下一塊。拉 1300 會名稱與首數間 400–600 空。

### 4.3 標題

- **唯一 h1**，缺則 FAIL。14 站畫布 18–48px 中眾 24、600–700，8 用 700。其餘無超 16、breadcrumb 末項作 16px h1，仍最先讀。
- **名詞**如 Analytics、Overview、專案物件名。23 中 3 問候、一 emoji 移除；只個人團隊首頁適合問候。
- **可選次行**14–16 灰句談資料／物：發現、期間、scope，非 UI 教學「篩選控制每塊」「本頁顯示」；或 12px 來源。
- **右側**真行動才放，10 站；6 更新時間如 Updated Jul27 4:09PM 加 refresh。
- **主要按鈕**12 無實心、5 近黑#1d1f20／#1f2937 或暗反白、4 品牌填。每屏一。

### 4.4 分頁篩選日期

- **期間**頁級 7、卡級 7、不兩者；卡期間 header 右灰。
- **底線 tabs**8，滿寬 1px 底線，indicator1–4 中 2，字寬或超 8–11px。
- **segmented**一次 48px #f3f4f6、白 36px active pill、日期右內。寬隨選項，僅約 480 以下全寬；三選項佔 680 像進度。
- **高度**28–40 中 34，集中 32／36。
- **順序**左 scope 先日期後 filter，右 utility refresh。
- **複合 filter**像 Date | Jun14-Jul13 | Daily，一次高 28 距 8。
- **首卡距**13–64 中 24。

## 5. KPI

- **預設不獨立磚**。20 有主數中 11 無磚，5 裸字、6 同容器 1px 分。9 一卡一 KPI 高 61–147 中 108。預設單容器等欄 1px 分；7 無 KPI 列，數在解說卡常更好。
- **數量**每列 1–6 中 3–4，四 KPI 四欄。
- **尺寸**16–40 中 26 眾 24，獨磚中 30、共享 24，不達 48。標 12–16 中 14，值約 1.7 倍。
- **字重**8 用 400、6 用 600、6 用 700–800。大值 regular 配 semibold 標常見，粗體只錢。
- **順序**14 標在值上，13 灰#6b6b6b–#aaa，sentence case。
- **不加多物**。23 中零彩圓圖示、零 sparkline、無染磚。5 有 info 可；單位小灰，如 24／14 的 5 mins、2 m24 s、5 /10。
- **答案數主導**。餘額淨值 30–36、至少兄弟 18–24 的 1.3 倍。三個 24 無主導；其他卡次要比率不更大。
- **一值一處**。strip 值不再 legend 重複；每 KPI 都對應下方同名 panel 就刪 strip，panel 自己領數。
- **第二用途**可作圖 series tabs 或 filter，選卡 1.5px 邊。選者 2px 線或 active 底、墨標 500；他者灰標、墨值 400，不灰值像 disabled。若需求明要各店營收等明細，所有標值不灰，只線標選。手機 2 欄選格填底或橫捲，不在 grid 內浮底線，app.css 支援。

### 變化值

- 選用，20 中 9 有、11 無。
- 10–15px 中 14、不大於標，6 文字／小 glyph、3 淡 pill。
- **期間文字**，9 中 7 說 vs prior30days、last90days、from0 last4weeks。
- **只上色數字**或全灰。
- **色表好壞**，測試作者規則。延遲錯率成本流失回覆時間下降才好。壞用--negative 於值或小下 glyph，好--positive 或灰。錯誤 2.5 倍與 visit 上升同灰被視藏壞消息。
- **零／未定義灰**。常見錯是從零三綠 up100%、>999%、粗紅 0.00%、綠+0。前零用+4(new)，無可比灰短線。

## 6. 圖表

### 6.1 問題配圖

| 問題 | 形式 | 樣本 |
| --- | --- | --- |
| 時間變化 | 單線，面積填最多 15% | 9 |
| 每期間多少 | 直角柱 | 3 |
| 分布 | 等 bins histogram | 1，不等 bins 被批 |
| 排名 | 排序橫 bar 或單數清單列底作 bar | 3 |
| 佔比 | 薄 ring 或 100%stack、2px 縫、最多五部分 | 5 |
| 目標距離 | 兩端標真比例進度 | 4 |
| 計畫已用 | 全長 plan、已花實填、承諾淡段、超出尾端負色，Charts.plan | 作者規則 |
| 偏離目標 | 各項一列實佔 bar 與 1px 目標 tick，Charts.bullet，不雙 stack 比 | 作者規則 |
| 哪裡 | 地圖旁清單承數量 | 1 |
| 分期與累計 | 同寬並排、同日期 | 1 |
| 流向多少 | 同零線同 scale 上下柱、軸 signed、上下 Sold／Bought、另期間第二 tone 與 legend，Charts.diverging | 作者規則 |
| 誰何時不在 | 人日 timeline 各種類獨 mark，Charts.timeline | 作者規則 |
| 人力足夠 | team 日 matrix 餘裕+2、+1、0、−1，一色向負色，hover 人數，Charts.matrix | 作者規則 |
| 日內比前次 | 各項共開到關軸，2px 灰 track、今日墨點、比較空 tick，Charts.timeStrip | 作者規則 |

測試追加：

- **分期 bar＋累計 pair 每屏最多一次**，只總數跨容量／目標才用。六圖三 pair 像蓋章。
- **一事件外全平**最多三分二寬高約 140，或 range 上限參考線約兩倍、超峰標值 `Charts.line({ max })`。85%空全寬圖被扣。
- **預測非事實**：今日後虛線、標末值 `Charts.line({ today, endLabel })`，有目標括差距。
- **需求要時間序列就在首屏畫**。KPI 切換只用需求未命名 metric。

少數數字不必圖，四屏省圖、設定 View more 連分析。

### 6.2 一問一序列

通常一序列，最多三。另一 metric 用 segmented／dropdown／KPI tabs 切，不疊線。圖高 112–264 中 195、寬 316–1136 中 570，比例 1.8–5.2。

### 6.3 軸格線

- **格線**12 笛卡兒圖中 7 僅橫、3 雙向、2 無。此處 3–5，研究 3–7 中 4–5，1px 實線，亮約#e5e5e5、範圍#cfcfd2–#f2f2f2，暗#111 上#2b2b2b。四圖用虛 3/3、4/4、3/2.5，只圖格可虛。
- **無 y 軸線**。baseline 唯一較重，兩圖 2px、一 1px；完整軸只一。
- **y ticks**4–7 中 5、11–16px 中 12、灰#5f5f5f–#6c6c6c，左 8 右 2。均勻整數如 0/5/10/15%、0–600 每 150，最高 tick 高於 max，counts 整數，bar／counts 零基線。
- **不可無 scale**。兩圖無 y 只 hover 看量被批；0/3/6/10 不均、count0.8、頂 tick 等 max 撞頂、累計從 1 亦錯。
- **軸字不大於資料**。15–16ticks 配 14 值被批。
- **x 標**4–8、平、不旋，40 度被批；首末內拉、同 step 到底。90 分鐘 step 卻 14:00 後硬加關店標導末距短，改 08–15 每小時或不標末。只兩端藏發生時間；不規則日期不得用 categorical 軸，時間用 time scale。

### 6.4 標記

- **線**1–3px 中 2、直線段。四平滑，一在日總間虛構值被批，不用平滑。無點，hover 可 8px。
- **填色**10 時間圖 7 無，最多 14%平色或線至透明 150–200px。
- **柱**四直角，或頂最多 4px、基底直，stack 縫 1–2px。
- **色**每圖一相。8 屏只資料上色、多資料墨低 3%像素。近黑到游標後灰、白配紅、用+$24,000,000 符號可更好。但風格有 hue 時上主要資料、非次圖／delta，否則像套件。主題跨圖同色，同 subscribers 粉再靛被批。三五無關色每次扣，狀態色只狀態。超四 hue 警、超六 FAIL。
- **圖例**單 series 無，9 圖，標題／dropdown 已命名。否則最多五、header5–8px 點配 12–14 灰，或點名值變化小表承資料。不列無資料 series。縮小真 mark，斜紋也斜紋，單獨畫易漂；helper 同 style 產 legend。
- **Ring**只三至五部分且旁未列同數，重畫鄰卡 spent／due／left 冗餘。切片不標，總在中／旁。好例 90–154px 環線 3–5px、182px 線 8，另兩粗 28／37。
- **進度**高 4–24 中 8、全圓、兩端標 Skilled200 與 Expert2,000；303 只填 392 中 22px。零無 6px stub。
- **Tooltip**裸字或無箭頭普通框，label 值同行。
- **重要事件註記**。變化超常約三倍用 1px 線、12px 原因，如 Deploy a3f09c1／Newsletter featured。預算 SLO 開始時間參考 1px 虛線末標。無解釋跳峰最先被問；line／bars／diverging 收 annotations、reference。
- **標籤不撞**。plot 上方分列貼自己的 leader 頂，線不穿別字，只存在才留列，無標不空帶。預測 Now 放序列未穿側。字型載好再排，否則每次不一；helper 處理，可給 short。
- **先 helper 再擴**。用 assets/charts.js 加需求，不另寫軸；測試從零寫的手機全把 y 標壓線。
- **短空歷史誠實**。平零一峰、空期缺柱、不墊 y-range、不 No data 圖片。但一點不給全屏最大 plot，空洞被批。

## 7. 表格清單

### 7.1 列

- 單行 36–53px 中 45。
- 雙行含媒體 56–92 中 72，媒體高加 24–32，48+24、48+32、50+30。
- 卡內 key-value／legend21–32。
- 雙行次行距首約 21、19–23，少一字級 12–14 灰。至少列距 40–44，32 會碰下一名，測試作者規則。
- 概況清單 2–5 列。

### 7.2 表頭

- 11–14 中 12、多 regular 灰 sentence case，11 中 9；唯一大寫比資料響被批。
- **無填色帶**，11 中 0；8 無下線，有線是表最強#e5e7eb 對列#f3f4f6。
- 高 36–40。
- 數值 header 右齊值，少 15px 被批；控制 header 對齊控制，如 stepper 中央；delta 另窄無標欄，一 header 三種對齊被批。
- 只活躍欄有 sort glyph。

### 7.3 分隔

- **無斑馬**，23 中 0。
- 約半清單無列線，靠 61–92px pitch 或實列 2–8px 間隙。
- 有則 1px、比表面深 3–7%，白#ededed–#f4f4f4，黑#161616，#131217 上#1b1a1f。
- 範圍可超字邊 8–9px、跳媒體從字欄、全內寬，每屏一種。

### 7.4 數字對齊

- **右齊 tabular 或 mono**。研究左齊、比例數字欄皆批，如 00:00:12 對 00:00:04 抖、小數漂。
- **同 metric 固定小數**：錢 2、百分 1 或 2、count0。千分位$16,531.54，僅 capacity 可 12.7k of20.0k。變化必符號-$0.09、+10,100(+0.20%)，貨幣後無空，$ 89.00 配$15.00 被批。
- **身分欄最寬**約三分一至半，桌面不先裁它。先編短名，刪共同 issuer、share class、Ltd，各寬同名。
- **每列卡一右緣**。內距線相同，某值少 18px 像第二邊。
- **兩量同格堆**：count 與 12px 灰百分、日期時間、金額與單位量，同右緣。
- **日期**比較列 ISO 如 2024-02-15 右齊，近期 Today／Yesterday／6 days。
- **ID**正文 mono、約 8 字元省略、copy 圖後 12px。
- 一行省略、不詞內換。
- **窄卡分項**如 Headingley6 · Chapel Allerton5 · Meanwood3，固定 mini 欄或每項 nowrap、分隔附下一項，末行不孤中點。
- **編輯值有改動標記**，作者規則。點或染邊、header／caption 明 vs usual Monday，stepper 旁裸灰+5 像噪音。

### 7.5 列中文字色

- 身分、關鍵數墨，其餘灰，如 5 墨／10 灰。
- 缺值灰橫線，零印$0、0.00%、0%(0)。
- 正負符號在文字，收入綠+、支出墨，不每負數紅。
- 只名格連結色、無底線。

### 7.6 狀態 pill

- 高 15–28 中 20，研究字 9–14 中 12／500；此處至少 11。全 pill 或 3–5px tag。
- 淡底同相深字，可 1px 更深邊，如#dcfae5 配#04250e、#ffedea 配#831c1e。
- 中性狀態單色 chip 加 glyph，如 Public 地球。
- 狀態機同相三強度：關灰、CTA 全色、運行深染。飽和白字只一稀少 CTA；可見列超約五分一就像黑斑，比資料響，改淡對或 6px 點加墨標。
- **每列一狀態 mark**，tag 與 badge 同義被批。
- **chip 不擠**，`flex: none; white-space: nowrap`，測試環境 chip 壓 12px 字溢。

### 7.7 媒體

密列 logo16px、avatar24–32、雙行 48–50。人 token 公司圓，作品旗圓 2–3、照片 8。固定 media slot 如 50、字後 16，同左緣。圖字距 10–16 中 12。

### 7.8 行動分頁

- **概況不 pagination**，23 中 0。限列，header View all、下 30px 外框或 32px 滿寬條，明總 3 tracks。
- 9 無列動作，其餘最右 kebab。多列都有才留尾欄，否則次行墨 action、值仍齊邊。待付、待包、失敗 deploy 用可見 ghost／墨 action 固定尾欄、同 pitch，不灰、不堆金額下改列高。
- 只有 bulk 才 checkbox，一例 18px、線 2、圓 3。
- hover／selected：1px 外框、圓 6、超 panel1px，或深邊加 1px ring，研究無 hover 換填。帶詳情 pane 的 inbox／queue 選列改 nav `--active`底，別像 focus／hover，作者規則。
- 工具搜尋一，高 30–36，256×30、252×36、316×32。
- **完整 list**作者規則無研究例：表上總數、sticky 表頭、末 page／load more、範圍 1-50 of1,284。

### 7.9 承資料清單

- **列底即 bar**：單數 ranking 用 radius8 列底按最大比例，高 44 距 2。多欄雙行邊會切字，測試失敗。計畫 vs 花費獨立 6–8px track，Charts.plan。
- **bar list**：pitch64、label 行、10px pill、值尾後 5，最長 88%、一色無 track。
- **inline bar 薄灰**，除非主 series，最多 2–3px。窄錢 ranking 用標下 2px 比例灰、首墨，`Charts.barList(el, rows, { thin: true })`。六 4px 黑 bar 測試太響。
- **時間軸畫比較**。比上週日用同軸今日墨點、前次空 tick，Charts.timeStrip，不只文字。
- **legend 表**：點、名、pill、值、變化，pitch57。
- **key-value well**：染底圓 8、列 32、左 label 右數。
- **feed 列卡**：高 63 距 8 圓 14，較 panel 亮一階底深一階邊，右相對日。
- **tree**：無線、每層縮 8、依層墨灰、pitch 約 30、群距約 45。

## 8. 表單設定

研究只有三屏表單、一設定，證據少但足預設。

### 8.1 欄位

- **label 上**14／500、距 8–10，不 floating、不 placeholder 代 label。
- **輸入**高 38–40 圓 8–10；工具 filter28–40 中 32，各情境同高。
- 灰 panel 仍白 input、1px #e5e7eb–#e8e8e8，filter select 深一階#cdcfcf–#d1d5db。
- 首圖 14px、離邊 13、字從 38。
- **距**描述到首 label24、欄間 16、Save 距 16。
- **input＋action**如唯讀連結 copy 共邊、內角直。
- **toggle**28×16 至 33×20，開為語意綠／近黑、非品牌。
- **disabled 可讀且說原因**。研究 Save #cecece／#f4f4f4 約 1.4:1、鎖 panel30%被批。

### 8.2 設定版型

- 各段一列：label 欄約 450，title16／500、描述 14 灰；panel 約 700、#fafafa、圓 16、pad16、無邊影。title cap 頂與 panel 首行對、頂下 6–8。
- 段間滿寬 1px、上下 32。
- switch 列 title14／500、badge 後 8、描述 14 灰、右 toggle 離邊 16、對 title 中。
- 方案鎖：panel 上 48px 染帶與 32px 按鈕，panel 仍可讀。
- 窄容器 label、10、field、下組 26。
- 不 label 欄空對高 panel，250px 洞被批；放 help／現值摘要或縮欄。
- **破壞動作**作者規則無樣本，最後獨段、負色文字／外框、文字後果、具名物件確認。
- **一區一 view**作者規則。general、members、billing、notifications 各 sidebar 開獨 view，靜態 hash route 足夠，以區名 h1。長頁 anchor 讓首需區下四屏被批。
- **每 view 一保存模式**：各控自存加安靜 Saved，或各 panel 右下 Save，不混。
- **顯示設定產出**：控制旁小預覽 invite email、通知、下一 invoice，帶產品實質。
- usage 是問題的 plan／quota 才頂 usage strip，值小於 h1。

### 8.3 按鈕

高 27–40 中 34 眾 32；緊風格圓 6–8、柔風格全 pill。同列同高。每屏一實主要、多近黑；次白 1px 邊、第三文字。

## 9. 字型色彩

### 9.1 字型

- **一 grotesk**。23 全 neo-grotesk、14 只一家。第二只一工作：全數或 ID mono、一問候 serif、品牌限標誌 switcher，最多二。即使 ID mono，軸註記 label 仍正文。
- **App 不展示字**。h1 18–32、數不達 48。50px 襯線 title、76pxbalance 讓預算像落地頁，檢查器 34／48 警。
- **尺寸**：

| 角色 | 研究範圍 | 中位 |
| --- | --- | --- |
| 頁標 | 14–48 | 24 |
| KPI | 16–40 | 24 |
| 卡標 500–600 | 14–24 | 16 |
| 正文導覽格 | 13–16 | 14 |
| label meta | 11–14 | 12 |
| 軸 | 11–16 | 12 |
| pill badge | 9–14 | 11–12，此處最低 11 |

每屏 4–9 字級、中 6，乾淨例 12/14/18/24、12/14/16/30、12/14/16/24。

- **字重**中位 3，23 中 10 不超 600，700 每屏只錢、問候或標題一用。
- **數字**表、KPI、更新處全 tabular，確認字型真的支援，`font-variant-numeric: tabular-nums`不改字寬就換字體。
- **大小寫**23 中約 19sentence、只有 4 全大寫 label。字距 0，大字才負，如 32px -0.02em。14 字行 20，16 字行 24。
- **暗**三屏正文 13，標 18–20／600 或 26–28／700。

### 9.2 亮色

- **底模型**10 白卡灰白底#f3f5f7–#fdfdfd、中#f9f9f9–#f9fafb；6 白底灰 panel；7 框頁。
- **側欄不深不飽和**，17 中 0，同底或差 1–3 階、灰頁上白。
- **三階線**卡邊中#eaeaea、#e5e7eb–#ededed 約白上 1.2:1；列淺#efefef–#f4f4f4；控深中#d1d5db。卡#cbcecd 重、#f5f5f5 消失。
- **三階字**主約#111、#000–#272446；次約#606060、#3a3b3b–#8e8e8e；第三研究#969696–#9f9d9b、placeholder#9ca3af–#b0b2b6 僅白上 2.5–3:1，不達此處。作者規則每承字階含 placeholder 至少 4.5:1，白與#f9fafb 上#6b6b6b 約最淺。
- **accent**4 只資料灰外框、2 只行動、2 全無。主按多近黑，多於一 accent 家族皆批。
- **狀態**研究綠#16a34a–#40a670 不足文字 4.5，改#247b50 約 5.2；pill 正#dcfae5／#04250e、負#ffedea／#831c1e、notice#fffbeb 底#fde68a 邊#92400e 字、count#c4242a–#dc3532。

### 9.3 暗色

- **底**黑#000 三、#111 二、#171719 一，無 navy slate。
- **表面**較亮無邊如黑上#111、巢#222–#2a2a2a；同底 1px 如#111 上#2e2e2e；一次更暗柔影#171719 上#131217、0 12px28px rgba(0,0,0,.2)。
- **線**結構比底亮 22–31 階，如黑上#1a1a1a、#111 上#2e2e2e、#171719 上#222224。控制#373737–#4c4c4c 更亮、無填也可點。
- **字**白、次約#aaa 範#82848a–#bbb、第三約#888；#4c4c4f 約 2:1 批。仍 4.5 最低，最多兩灰且夠分，如次#b4b4b4、meta#949494；#aaaaaa／#969696／#bbbbbb 同屏像一灰三用。
- **accent**只資料或一選取，nav 亮度。白反 pill、#212121 按鈕、外框可無色強調。
- **狀態**同相暗底，如#172a1d 上#3fc07a、#1b2828 上#44a282。accent 綠／黃綠時 `--positive`用 accent 或中性符號，薄荷+£3.81 配萊姆 Sold 像雙綠；亮同。
- **色比**六屏皆不超 3%。

### 9.4 表面圓角圖示間距

- **邊**17 亮中 12 用 1px、3 只色階、1 只影。邊影二選一。既有影淡、alpha≤.06 的 0 2px8px，一次.12 的 0 1px4px。真浮物選單 popover tooltip composer 才真影。
- **圓角雙峰**緊 4–8 九屏另一直卡、柔 16–24 十屏、11–12 僅三。控制跟卡，緊 6、柔 pill；巢 20/10/8/5/4 下降。panel 超三值警。
- **分群不套框**，KPI 單卡 1px 分或裸帶 48–52px 直線。
- **圖示**23 中 22outline，nav14–20 中 16、線約 1.5；inline12–14；字距 10；亮灰#454545–#73737f、暗白或#81858a–#999。不彩圓，23 中 0。容器若有只中性#f0f0f0 圓或 builder node 類型。
- **4px 基底**，卡距 6–24 中 16、pad12–34 中 20、段 24–64、控制 27–40 中 34。

### 9.5 預設 tokens

`library/app.json`各風格自有 tokens，未定者用研究中位，灰移至 4.5:1。名稱配 `draw.mjs --app` 與中性 `assets/app.css` 的外殼、標題、panel、分 KPI、表、pill、控、tab、空、手機。`assets/charts.js`依資料與此 tokens 畫§6 各 SVG 圖。

```css
:root {
  /* light */
  --ground: #f9fafb;  --surface: #ffffff;  --raised: #f9f9f9;  --active: #eeeeee;
  --border: #e8e8e8;  --rule: #f2f2f2;     --control: #d1d5db;
  --text: #111111;    --muted: #5f6368;    --faint: #6b6b6b;    /* placeholders use --faint */
  --primary: #1d1f20;                      /* near-black fill, white label */
  --accent: /* one hue, about 3% of pixels: the data, plus at most one control */;
  --positive: #247b50;  --pill-positive-bg: #dcfae5;  --pill-positive-ink: #04250e;
  --negative: #c4242a;  --pill-negative-bg: #ffedea;  --pill-negative-ink: #831c1e;
  --pill-warning-bg: #fffbeb;  --pill-warning-ink: #92400e;  /* notice border #fde68a */
  --grid: #e5e5e5;  --chart-span: 0.06;  /* the opacity of a shaded span in a chart */

  --radius-card: 8px;  --radius-control: 6px;  --radius-chip: 4px;  /* soft styles: 20 / 14 / 999 */
  --gap: 16px;  --card-pad: 20px;  --pad: 24px;
  --nav-row: 34px;  --control-height: 32px;  --row-height: 48px;
  --font: "Inter", system-ui, sans-serif;                            /* one grotesk */
  --fs-title: 24px;  --fs-section: 16px;  --fs-kpi: 24px;  --fs-body: 14px;  --fs-small: 12px;
}
:root[data-theme="dark"] {
  --ground: #000000;  --surface: #111111;  --raised: #222222;  --active: #222222;
  --border: #1a1a1a;  --rule: #161616;     --control: #444444;  /* on a #111 ground the border is #2e2e2e */
  --text: #ffffff;    --muted: #b4b4b4;    --faint: #949494;  /* two greys that read apart */
  --primary: #ffffff;                      /* inverted: white fill, black label */
  --positive: #3fc07a;  --pill-positive-bg: #172a1d;  --pill-positive-ink: #3fc07a;  /* a green accent replaces these */
  --negative: #e5566f;  --pill-negative-bg: #2c1a20;  --pill-negative-ink: #e5566f;  /* the study's #d4405d, lifted for 4.5:1 */
  --grid: #2b2b2b;  --chart-span: 0.12;
}
.num { font-variant-numeric: tabular-nums; }
td.num, th.num { text-align: right; }
```

## 10. 密度

- 研究 6 至約 120 資料點，中約 25。
  - **疏 6–25**：home 設定單物，pad20–24、列 56–92、正文 14–16。
  - **中 25–50**：分析財務清單，列 44–56、pad16–24。
  - **密約 120**只有一屏研究監控長時，正文 13、list28、table42，外框留氣：邊 100、帶間 64、卡 pad32。
- 列距、pad、字級一起調，不只縮字。
- **安排的空間安靜，剩餘像未完成**。固定格線重複距刻意；資料不合格、每列空欄 300px、空 topbar、拉高卡屬意外。
- **兼顧現有與未來資料**。忙帳戶設計卻給新帳：673×240 圖三分二零。誠實畫，塊尺寸依問題，非想像的未來資料。

## 11. 空、零、載入、錯誤

- **真零**正常$0、0、0%、0.00%、0%(0)，10 屏。若旁 caption 下一步如 Automate savings up to3.50%APY，$0.00 可灰。
- **缺／不適**灰 em dash、-、6×2px，不用值大小 24px 的--，像 loading。
- **計數跟 view、框也跟**。tabs／KPI／12open 從當前篩列算，每次切換重算。塊隨列縮、鄰頂齊，或固定列數空一句；副行依該 view 算。
- **空側卡放參考資料**，非 400 白上一虛框。未售罄時在 Nothing sold out yet today 下安靜列上週日時間。
- **紅是訊號**，每物最多一紅、逾期失敗事實；十三紅串是噪音，deal 清單不在旁 board 重複旗。
- **空段留框標題**，一句跨塊，grid 用 `grid-column: 1 / -1`，不擠 34px 欄逐字斷。1px 虛圓 8 高約 38 如 No channel usage in range，或框＋新增 Liability account。builder 空槽畫布底 1px 虛。
- **空圖仍畫**零線、缺柱、不墊 range、不插圖。
- **初次全空**留框標題、資料位置放首 action；有步驟真進度，如 67% setup、表上四格 getting-started。
- **Loading**作者規則：最終 layout 各值換真尺寸平灰條，24px 值用高 24，列距保；label 標題立即見、無 shimmer 漸層、資料到不位移。refresh 保舊值更新時間。
- **Error**作者規則：局部失敗塊、非全屏 banner。一句失敗與上次正常，如 Couldn't load deployments.Last updated09:14，加 Retry 文字。負色只小圖或 pill 對。
- **過期／靜態**六有更新時間 refresh；不能 refresh 快照一安靜 notice，例#fffbeb、1px#fde68a、12px#92400e。notice 底不作全頁底，淡琥珀會判奶油。
- **額度 usage**真比例 bar、兩端 12.7k of20.0k。

## 12. 手機

研究無手機，此為作者規則，參 `layout.md` §9 與桌面推導。手機側欄超寬 30%失敗。

- **導覽收**：48px topbar 有 screen 名、開全屏 sheet 的 menu 含 nav／workspace／account、最多一 action；或四五目的地短標 bottom bar。icon rail 轉 bottom。
- **邊**16–20，觸控高至少 44，資料 label14、副行至少 12。
- **標題保留 20–24**，除主 action 其餘入 kebab。
- **filter**一列 chips 或 sheet；tab 自己列橫捲、非整頁。首列在手機上 60%內，三排 filter 曾推走清單。
- **KPI**分容器變兩欄，或左 label 右 value list，不四擠欄。全寬 lead 後數量偶數，否則三窄欄、分清單、末格全寬，app.css 支援奇數。單 Sold3.18kWh 旁空半列被批。
- **圖上一列控制最多**，office 與 week 同列，兩全寬 segmented 曾推資料下。
- **圖**滿寬高 160–200、x3–4 標、legend 上方點，若會三行改兩欄或 Key disclosure。y 留左通道或右緣，不壓線。
- **列 action**文字或緊尾按鈕，清單一實 bulk 如 Approve3that fit，不五 44px 灰大按鈕。
- **strip 收縮**刪最不相關主行動者，不照 source 末項；能源依 liveprice 規劃就保價格。
- **表約 640 以下轉雙行 list**。首行身分主值，次行 13 灰留需求欄如 fra1 ·1m38s，action 右。欄搬次行不刪。必須表則自框橫捲、首欄 fixed、頁不橫捲。
- **平板 641–1100 獨立**：sidebar 轉 top，表保四五欄次要副行，兩窄 panel 任一低 340 就堆，不先裁身分而別欄有空。
- **有 action 塊往上**：右 rail 低庫存 Reorder、到期 Pay 變清單上摘要 5 items low ·Review，不放二十訂單下。
- **多 pane**一次一區，選列推 detail，back 回原捲位。
- **設定**label 堆 panel 上。
- **右 rail**移主欄下或 tab。
- **builder**唯讀工作，保編輯才 bottom palette。
- 每輪看 390 截圖。

## 13. App 準則

網頁一次讀，App 每天用，部分禁手法其實工作結構，因此有限放寬：

| 允許 | 限制 |
| --- | --- |
| 卡 panel 表控制 1px 邊 | 亮 1.1–1.3:1，白上#e5e7eb–#ededed；黑上#1a1a1a、#111 上#2e2e2e；控制深一階。邊影二選一 |
| 列線 | 1px 比表面深 3–7%，不斑馬表頭色帶 |
| 虛線 | 只圖格、空槽 |
| 值上小標 | 12–14sentence 灰 4.5:1，meta 軸 11–12，至少 11。最多一加字距大寫 context |
| 相同卡列 | 同級 metric／物 3–6 等寬同距、無孤、跨列齊邊、不頂圖示，偏好一分卡、混 span |
| Mono | ID、key、code，或風格決定全數字；否則正文 tabular |
| Pill | 列內或值旁高 16–24、淡底同相深字，不標題上 |
| 索引號 | 只排名 1.、node 編號等資料 |
| Icon | 同套 14–20outline 灰，nav、label 前、kebab／chevron／info。容器只中性或 builder node 類型，後者--allow icon-chips 報理由 |
| Shadow | 浮選單 popover tooltip composer dialog；靜卡最多小模糊、黑低 8% |
| 第二字體 | 單一工作，ID／數 mono 或一問候 serif |
| 漸層 | 只單 line chart 下 area fade，14%平填更安全 |

仍禁且檢查：

| 禁用 | 替代 |
| --- | --- |
| 底按鈕卡字 KPI 漸層，研究兩按鈕皆批 | 平色 |
| 發光玻璃背景糊 | 不透明差一階 |
| 每 KPI 卡彩圓／彩方圖示，23 中 0 | label 值 |
| 彩虹圖超四相、一 bar 一色、一主題兩相 | 各圖一相其餘中性 |
| KPI sparkline，23 中 0 | 趨勢獨圖或無 |
| emoji 問候 label nav 空態 | 字 |
| lorem、Acme、John Doe、User1、10,000+teams、加總錯 | 合理示例由列計算、報告列 |
| 零或未定變化用狀態色 | 灰或+4(new) |
| 亮頁深／飽和側、navy／slate 暗題 | 側同底、真中性暗 |
| 外框 accent、彩 nav 左條、彩 tab、每按品牌填 | 資料與最多一控制，近黑主按 |
| 大寫加字距表頭、斑馬、色帶 | 12 灰 sentence header、線空間 |
| 左齊數、比例字數欄 | 右齊 tabular |
| 主視覺 header、emoji 問候、插畫歡迎 banner | 名詞 24px 標 |
| 五列概況 pagination | 限列 View all 總數 |
| 紫靛、奶油陶土 | 抽選色盤 |
| 超 32px 頁標、至少 48 數 | 18–32 標、16–40 值 |
| 清單每列盒圖、每同級卡頂圖，彩灰皆同 | 有用處一普通 16 圖或無 |
| 每列異色、每預算餘額綠 | 正常灰、風險超支才色 |
| 不命名產品無 action | 外殼標誌 scope、主 job 一點 |

**紫靛。** 23 中 10 有，皆資料或單控制。禁令出自作者品味，非研究發現；library 抽其他相，palette 檢查仍開。

## 14. 生成儀表板痕跡

| 痕跡 | 23 樣本的替代 |
| --- | --- |
| navy 染側、彩 pill 左條 | 側同底，灰 pill 或暗字變亮，左條 1／23 |
| Welcome back,Alex 揮手副標 | 名詞 24／600，3 問候、emoji 移 |
| 四 KPI 各彩圓圖 | 一容器細線分、label 上 value，23 零圖 |
| 每 KPI 綠+12.5% | 20 中 9 有 delta、期間文字、零灰、從零+4(new) |
| 每 KPI sparkline | 23 零，獨圖 |
| 值 36–48 粗品牌色 | 24–30／400–600 墨、不 48 |
| 漸層平滑曲線每點 marker | 2px 直段，10 中 7 無填、無點 |
| 每柱每圖彩虹 | 每圖一相、accent 只資料、屏最多四 |
| 20px 一格線、雙邊軸、單 series legend | 3–5 淡線、無 y 軸、單 series 無 legend，整 tick 高於 max |
| 肥 donut 片標大中數 | 薄環無片標、legend 表含值 |
| 16–24 圓＋邊＋大柔影 | 邊或色階無影，緊柔一次決定 |
| 斑馬大寫表、每列 checkbox avatar chip kebab | 線對齊、12 灰 header、一狀態、必要一 action |
| 左比例數 | 右 tabular 固定小數灰單位 |
| 飽和白字 chip | 淡底同相深字 |
| 每 button tab link accent | 23 中 12 無實主，有則近黑 |
| 每屏 search bell avatar topbar 或全空 | 23 中 9 無，有則真 search switcher 物名 |
| title 旁 Export Share date | 真 action 才有，否則更新時間 |
| 假人公司圓虛榮總、新帳成長 | 自資料小量實大小、列總 |
| 短 list 分頁 | 限列 View all |
| 永遠四等格、孤格、拉卡 | 按項數欄，各列 span 共邊 |
| 暗霓虹發光玻璃 | 真中性暗、明階、資料色 |
| Geist／Inter #f8f8f8 白 12 卡、資料無色或黑萊姆 | 從需求取底／數字字型／主資料品牌色面貌，獨有元素 |
| 每 category 彩圖 | 一灰 icon 套、色若有在數 |
| 空圖插畫 No data yet | 畫零線、框內一句 |

移除痕跡卻沒補產品仍是整齊模板。補自有資料、真量級、最大塊回答一問題、格線加總閉合。

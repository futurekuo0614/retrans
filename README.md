# Whisper 日→中 即時字幕 (Vercel Edge Function)

這個專案示範在 **瀏覽器錄音** + **Vercel Edge Function** 的架構下：

1. 使用 Whisper‐1 把日文語音轉成文字
2. 立即呼叫 GPT 模型將日文翻譯成繁體中文
3. 將結果以 0.4 秒頻率即時顯示在前端

## 部署步驟

1. Fork / Clone 後推到 GitHub
2. 在 Vercel 新增專案 → 連結此 Repo
3. **環境變數**：新增 `OPENAI_API_KEY`
4. `Deploy`，完成後打開 `https://<YOUR-PROJECT>.vercel.app`

## 專案結構

| 路徑 | 說明 |
| --- | --- |
| `/public/index.html` | 錄音 + 字幕前端 |
| `/api/jp2zh.js` | Edge Function：Whisper 轉錄 + GPT 翻譯 |
| `/package.json` | 最小化 package metadata (無依賴) |

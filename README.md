# Whisper 即時字幕 (Vercel Edge Function)

這個專案示範如何在 **不安裝 Anaconda / Whisper.exe** 的前提下，
直接於瀏覽器錄音，透過 Vercel Serverless Edge Function 呼叫
OpenAI Whisper API，並以 0.4 秒的頻率即時顯示字幕。

## 部署步驟

1. **Fork / Clone** 這個 repo 後推到 GitHub。
2. 在 Vercel 上點「New Project」→ 連結 GitHub Repo。
3. 於 *Project Settings → Environment Variables*  
   新增 `OPENAI_API_KEY`，值為你的 OpenAI 金鑰。
4. 直接 `Deploy`，完成後開啟 `https://<YOUR-PROJECT>.vercel.app`  
   按「開始」即可測試。

## 檔案說明

| 路徑 | 用途 |
| ---- | ---- |
| `/public/index.html` | 前端 UI、錄音與字幕顯示 |
| `/api/transcribe.js` | Edge Function：把音訊片段送到 Whisper API |
| `/package.json` | 最小化 package metadata（無依賴） |

> Edge Runtime 已內建 `fetch` 與 `FormData`，故不需任何 NPM 依賴。

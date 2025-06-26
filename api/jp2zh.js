export const config = { runtime: 'edge' };

export default async function handler(req) {
  // 讀取瀏覽器傳來的 audio/webm chunk
  const audioBuffer = await req.arrayBuffer();

  /* === 1) Whisper：日文即時轉錄 === */
  const form = new FormData();
  form.append(
    'file',
    new Blob([audioBuffer], { type: 'audio/webm' }),
    'chunk.webm'
  );
  form.append('model', 'whisper-1');
  form.append('language', 'ja'); // 明確指定日文

  const whisperRes = await fetch(
    'https://api.openai.com/v1/audio/transcriptions',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: form
    }
  );

  if (!whisperRes.ok) {
    return new Response(
      JSON.stringify({ error: await whisperRes.text() }),
      { status: 500 }
    );
  }

  const { text: jpText } = await whisperRes.json();

  /* === 2) GPT：日文 → 繁體中文 翻譯 === */
  const gptRes = await fetch(
    'https://api.openai.com/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        temperature: 0.2,
        messages: [
          {
            role: 'system',
            content: '將以下日文翻譯成自然、簡潔的繁體中文，只回譯文：'
          },
          { role: 'user', content: jpText }
        ]
      })
    }
  );

  if (!gptRes.ok) {
    return new Response(
      JSON.stringify({ error: await gptRes.text() }),
      { status: 500 }
    );
  }

  const { choices } = await gptRes.json();
  const zhText = choices[0].message.content.trim();

  return new Response(JSON.stringify({ text: zhText }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

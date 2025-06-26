export const config = { runtime: 'edge' };

export default async function handler(req) {
  // Read raw binary from the incoming request (audio chunk)
  const body = await req.arrayBuffer();

  // Prepare multipart/form-data payload for Whisper API
  const form = new FormData();
  form.append('file', new Blob([body], { type: 'audio/webm' }), 'chunk.webm');
  form.append('model', 'whisper-1');

  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    body: form
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ error: await response.text() }), { status: 500 });
  }

  const data = await response.json();
  return new Response(JSON.stringify({ text: data.text }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
    body: JSON.stringify(body),
  };
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return json(500, { error: 'Missing GROQ_API_KEY env var' });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'Invalid JSON body' });
  }

  const messages = Array.isArray(payload.messages) ? payload.messages : [];
  const systemPrompt = typeof payload.systemPrompt === 'string' ? payload.systemPrompt : '';

  const sanitized = messages
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content }));

  const groqMessages = [];
  if (systemPrompt.trim()) {
    groqMessages.push({ role: 'system', content: systemPrompt.trim() });
  }
  groqMessages.push(...sanitized);

  try {
    const res = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        temperature: 0.4,
        max_tokens: 512,
        messages: groqMessages,
        response_format: { type: "json_object" }
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return json(502, { error: 'Groq request failed', details: text || `HTTP ${res.status}` });
    }

    const data = await res.json();
    const jsonString = data?.choices?.[0]?.message?.content;

    let parsedContent;
    try {
      parsedContent = JSON.parse(jsonString || '{}');
    } catch {
      return json(502, { error: 'Groq response was not valid JSON', details: jsonString });
    }

    if (!parsedContent || typeof parsedContent.reply !== 'string' || !parsedContent.reply.trim()) {
      return json(502, { error: 'Invalid Groq JSON format' });
    }

    return json(200, { reply: parsedContent.reply, state: parsedContent.state || {} });
  } catch (err) {
    return json(500, { error: 'Server error', details: String(err?.message || err) });
  }
};

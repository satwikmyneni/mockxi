exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'POST, OPTIONS' }, body: '' };
  }
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  try {
    const { prompt, maxTokens } = JSON.parse(event.body);
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'GEMINI_API_KEY not set in Netlify environment variables' })
    };

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: maxTokens || 300, temperature: 0.7 }
      })
    });

    const data = await response.json();

    // Extract text from Gemini response format
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 
                 (data.error && data.error.message) || 
                 'Unable to generate response.';

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text })
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: e.message })
    };
  }
};

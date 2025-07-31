import fetch from 'node-fetch';

const TEXTRAZOR_API_KEY = '9916472eda82d41952400d402bcc35a2e918c83a6e1cb7756cb7763b';

let handler = async (m, { conn }) => {
  // Ignore system messages or messages from self/bots
  if (!m.text || m.fromMe) return;

  // Call TextRazor API
  let mood = await analyzeMood(m.text);
  if (!mood) return;

  // Respond based on mood
  let response = '';
  switch (mood) {
    case 'positive':
      response = "😊 You sound happy! Keep spreading the joy!";
      break;
    case 'negative':
      response = "😟 You seem upset. If you need to talk, I'm here.";
      break;
    case 'neutral':
      response = "😐 Not sure how you're feeling, but I'm listening!";
      break;
    default:
      response = "🤖 I couldn't quite read your mood, but I'm here!";
  }

  await conn.sendMessage(m.chat, { text: response }, { quoted: m });
};


handler.help = ['mood'];
handler.tags = ['fun'];
handler.command = /^$/; // This runs on every message
handler.group = false; // Set to true if you want only in groups

export default handler;

// Helper: Analyze mood using TextRazor
async function analyzeMood(text) {
  try {
    let res = await fetch('https://api.textrazor.com/', {
      method: 'POST',
      headers: {
        'x-textrazor-key': TEXTRAZOR_API_KEY,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `text=${encodeURIComponent(text)}&extractors=entities,sentiment`
    });
    let data = await res.json();
    // Sentiment score: >0 positive, <0 negative, 0 neutral
    let score = data.response && data.response.sentiment ? data.response.sentiment.score : null;
    if (score === null) return null;
    if (score > 0.2) return 'positive';
    if (score < -0.2) return 'negative';
    return 'neutral';
  } catch (e) {
    return null;
  }
}

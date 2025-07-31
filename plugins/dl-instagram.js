/*  ──────── dependencies ────────  */
import fetch from 'node-fetch';
import { igdl } from 'btch-downloader';   // ← NEW

/*  ──────── helper ────────  */
const fetchWithRetry = async (url, options, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, options);
    if (res.ok) return res;
    console.log(`Retrying… (${i + 1})`);
  }
  throw new Error('Failed to fetch media content after retries');
};

/*  ──────── main handler ────────  */
const handler = async (m, { conn, args }) => {
  if (!args[0])
    throw '✳️ Enter the Instagram link next to the command';

  // Accepts /reel/, /p/, or /tv/ forms
  const igRegex =
    /^(https?:\/\/)?(www\.)?(instagram\.com\/(reel|p|tv)\/[\w.-]+(\/)?(\?.*)?)$/i;

  if (!igRegex.test(args[0]))
    throw '❌ Link incorrect. Please ensure it is a valid Instagram post or reel link.';

  m.react('⏳');

  try {
    /* 1. grab media list */
    const mediaList = await igdl(args[0]);         // ← NEW
    if (!mediaList.length) throw new Error('No media found');

    /* 2. pick the first item */
    const { url: dlUrl, type } = mediaList[0];     // {url, type:'video'|'image'}

    /* 3. download the file (with retry) */
    const res = await fetchWithRetry(dlUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
          '(KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
      }
    });

    const buf = Buffer.from(await res.arrayBuffer());
    if (!buf.length) throw new Error('Downloaded file is empty');

    /* 4. send to chat */
    const mime = type === 'video' ? 'video/mp4' : 'image/jpeg';
    const fileName = `instagram.${type === 'video' ? 'mp4' : 'jpg'}`;

    await conn.sendFile(m.chat, buf, fileName, '*By Riruru*', m, false, {
      mimetype: mime
    });
    m.react('🎉');
  } catch (err) {
    console.error('IG-DL error:', err.message);
    await m.reply(
      '⚠️ An error occurred while processing the request. Please try again later.'
    );
    m.react('❌');
  }
};

/*  ──────── meta ────────  */
handler.help    = ['instagram', 'ig', 'igdl', 'insta', 'igdownload'];
handler.tags    = ['downloader'];
handler.command = ['instagram', 'ig', 'igdl', 'insta', 'igdownload'];

export default handler;

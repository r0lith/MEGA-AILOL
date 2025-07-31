import fetch from 'node-fetch';
import { instagramGetUrl } from 'instagram-url-direct';

const fetchWithRetry = async (url, options, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, options);
    console.log(`fetchWithRetry: attempt ${i + 1}, status ${res.status}`);
    if (res.ok) return res;
    console.log(`Retrying... (${i + 1})`);
  }
  throw new Error('Failed to fetch media content after retries');
};

const handler = async (m, { conn, args } = {}) => {
  // Debugging: log full context
  console.log('Handler invoked');
  console.log('m:', JSON.stringify({ text: m?.text, body: m?.body, caption: m?.caption }, null, 2));
  console.log('args:', args);

  if (!args || !args[0]) {
    console.error('No args provided or args[0] is undefined');
    throw '✳️ Enter the Instagram link next to the command';
  }

  const rgx = /^(https?:\/\/)?(www\.)?instagram\.com\/(reel|p|tv)\/[A-Za-z0-9._%+-]+\/?(\?.*)?$/;
  if (!rgx.test(args[0])) {
    console.error('Link did not match regex:', args[0]);
    throw '❌ Link incorrect. Please ensure it is a valid Instagram post or reel link.';
  }

  m.react('⏳');
  try {
    console.log('Calling instagramGetUrl with', args[0]);
    const result = await instagramGetUrl(args[0]);
    console.log('instagramGetUrl result:', JSON.stringify(result, null, 2));

    if (!result.url_list || result.url_list.length === 0) {
      throw new Error('No media URLs found in result');
    }

    const downloadUrl = result.url_list[0];
    console.log('Selected downloadUrl:', downloadUrl);

    const response = await fetchWithRetry(downloadUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    console.log('Download response headers:', [...response.headers.entries()]);

    const buffer = Buffer.from(await response.arrayBuffer());
    console.log('Downloaded buffer length:', buffer.length);
    if (!buffer.length) throw new Error('Empty media buffer');

    const md = (result.media_details && result.media_details[0]) || {};
    console.log('Media details:', md);

    const isVideo = md.type === 'video';
    const ext = isVideo ? 'mp4' : 'jpg';
    const mime = isVideo ? 'video/mp4' : 'image/jpeg';
    const fileName = `${result.post_info?.owner_username || 'insta'}_${Date.now()}.${ext}`;

    console.log(`Sending file: ${fileName}, mimetype: ${mime}`);
    await conn.sendFile(
      m.chat,
      buffer,
      fileName,
      `*By Riruru*`,
      m,
      false,
      { mimetype: mime }
    );
    m.react('✅');
  } catch (err) {
    console.error('Error downloading from Instagram:', err.message);
    console.error(err.stack);
    await m.reply(`⚠️ Error: ${err.message}`);
    m.react('❌');
  }
};

handler.help = ['instagram','ig','igdl','insta'];
handler.tags = ['downloader'];
handler.command = ['instagram','ig','igdl','insta'];
handler.limit = true;

export default handler;

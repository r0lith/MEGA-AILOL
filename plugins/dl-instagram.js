import fetch from 'node-fetch';
import { instagramGetUrl } from 'instagram-url-direct';

const fetchWithRetry = async (url, options, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, options);
    if (res.ok) return res;
    console.log(`Retrying... (${i+1})`);
  }
  throw new Error('Failed to fetch media content after retries');
};

const handler = async (m, { conn, args }) => {
  if (!args[0]) throw '✳️ Enter the Instagram link next to the command';

  const rgx = /^(https?:\/\/)?(www\.)?instagram\.com\/(reel|p|tv)\/[A-Za-z0-9._%+-]+\/?(\?.*)?$/;
  if (!rgx.test(args[0])) {
    throw '❌ Link incorrect. Please ensure it is a valid Instagram post or reel link.';
  }

  m.react('⏳');
  try {
    // Fetch all media URLs and metadata
    const result = await instagramGetUrl(args[0]);
    if (!result.url_list || result.url_list.length === 0) {
      throw new Error('No media URLs found');
    }

    // Choose first URL
    const downloadUrl = result.url_list[0];
    const response = await fetchWithRetry(downloadUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const buffer = Buffer.from(await response.arrayBuffer());
    if (!buffer.length) throw new Error('Empty media buffer');

    // Determine MIME from first media_details entry
    const md = result.media_details[0];
    const isVideo = md.type === 'video';
    const ext = isVideo ? 'mp4' : 'jpg';
    const mime = isVideo ? 'video/mp4' : 'image/jpeg';
    const fileName = `${result.post_info.owner_username}_${Date.now()}.${ext}`;

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
    console.error('Error downloading from Instagram:', err);
    await m.reply('⚠️ An error occurred. Please try again later.');
    m.react('❌');
  }
};

handler.help = ['instagram','ig','igdl','insta'];
handler.tags = ['downloader'];
handler.command = ['instagram','ig','igdl','insta'];
handler.limit = true;

export default handler;

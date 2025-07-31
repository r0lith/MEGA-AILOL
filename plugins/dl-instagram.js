import fetch from 'node-fetch';
import instagramDl from '@sasmeee/igdl';

const fetchWithRetry = async (url, options, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    const response = await fetch(url, options);
    if (response.ok) return response;
    console.log(`Retrying... (${i + 1})`);
  }
  throw new Error('Failed to fetch media content after retries');
};

const handler = async (m, { conn, args }) => {
  if (!args[0]) throw '✳️ Enter the Instagram link next to the command';

  const instagramRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/(reel|p|tv)\/[A-Za-z0-9._%+-]+\/?(\?igsh=[A-Za-z0-9=]+)?$/;
  if (!instagramRegex.test(args[0])) {
    throw '❌ Link incorrect. Please ensure it is a valid Instagram post or reel link.';
  }

  m.react('⏳');
  try {
    const url = args[0];
    const data = await instagramDl(url);
    if (!data.download_link) throw new Error('Download URL not found');

    const response = await fetchWithRetry(data.download_link, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const arrayBuffer = await response.arrayBuffer();
    const mediaBuffer = Buffer.from(arrayBuffer);
    if (mediaBuffer.length === 0) throw new Error('Downloaded file is empty');

    // Determine file type from data.media_type or URL
    const isVideo = data.media_type === 'video' || data.download_link.endsWith('.mp4');
    const fileName = isVideo ? `${data.shortcode || 'reel'}.mp4` : `${data.shortcode || 'image'}.jpg`;
    const mimetype = isVideo ? 'video/mp4' : 'image/jpeg';

    await conn.sendFile(
      m.chat,
      mediaBuffer,
      fileName,
      `*${data.title || ''}*`,
      m,
      false,
      { mimetype }
    );
    m.react('✅');
  } catch (err) {
    console.error('Error downloading from Instagram:', err);
    await m.reply('⚠️ An error occurred while processing the request. Please try again later.');
    m.react('❌');
  }
};

handler.help = ['instagram', 'ig', 'igdl', 'insta'];
handler.tags = ['downloader'];
handler.command = ['instagram', 'ig', 'igdl', 'insta'];
handler.limit = true;

export default handler;

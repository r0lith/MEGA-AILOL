let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Please provide a bug description.\nExample: ${usedPrefix}${command} The bot crashes when I use /menu`;
  const ownerJid = '919737825303@s.whatsapp.net'; // Owner's WhatsApp JID
  const bugReport = `🐞 *Bug Report*\nFrom: wa.me/${m.sender.split('@')[0]}\n\n${text}`;
  await conn.sendMessage(ownerJid, { text: bugReport }, { quoted: m });
  m.reply('Bug successfully reported!');
};

handler.help = ['bug <description>'];
handler.tags = ['main'];
handler.command = ['bug'];

export default handler;

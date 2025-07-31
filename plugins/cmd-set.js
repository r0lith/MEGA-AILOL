let handler = async (m, { text, usedPrefix, command }) => {
    global.db.data.sticker = global.db.data.sticker || {};
    
    // Ensure m.quoted is defined and has fileSha256
    if (!m.quoted) throw `✳️ Quoted message not found`;
    if (!m.quoted.fileSha256) throw `⚠️ File SHA256 not found`;
    if (!text) throw `✳️ Command is missing`;

    let sticker = global.db.data.sticker;
    let hash = m.quoted.fileSha256.toString('base64');

    // Check if sticker is locked
    if (sticker[hash] && sticker[hash].locked) {
        throw '⚠️ You do not have permission to change this Sticker command';
    }

    // Assign sticker properties
    sticker[hash] = {
        text,
        mentionedJid: m.mentionedJid || [], // Ensure it's defined
        creator: m.sender,
        at: +new Date(),
        locked: false,
    };

    m.reply(`🎉 Command saved successfully.`);
}

handler.help = ['setcmd <text>'];
handler.tags = ['cmd'];
handler.command = ['setcmd'];
handler.rowner = true;

export default handler;

import fetch from 'node-fetch';

let handler = async (m, { text, usedPrefix, command, conn }) => {
  try {
    // Fetch environment variables with defaults
    const OwnerName = process.env.OWNER_NAME || 'Rolith Rathwa';
    const timeZone = process.env.TIME_ZONE || 'India';
    const profession = process.env.OWNER_STATUS || 'White Hat';
    const skills = process.env.OWNER_SKILLS || 'Potato';
    const language = process.env.LANGUAGE || 'Gujarati, Hindi, Rathwi & English';
    const project = process.env.BOTNAME || 'Riruru';
    const hobbies = process.env.HOBBIES || 'Yawning multiple times in a single second';

    // Expanded intro card text with additional fields
    const introText = `
About Me:

Name    : ${OwnerName}
Place   : ${timeZone}
Gender  : Male
Age     : 25
Status  : ${profession}
Skill   : ${skills}
Lang    : ${language}
Project : ${project}
Hobbie  : ${hobbies}

    `;

    let pp = 'https://i.ibb.co/TMn2DjB7/Rolith.jpg';

    // Try fetching the profile picture of the sender
    try {
      pp = await conn.profilePictureUrl(m.sender);
    } catch (e) {
      console.log("Error fetching profile picture:", e);
    }

    const sourceUrl = 'https://youtube.com/'; // Example source URL for the card
    const OwnerImg = 'https://i.ibb.co/TMn2DjB7/Rolith.jpg';
    const contextInfo = {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: 'Riruru', // Title of the card
        body: 'Touch Me',
        thumbnailUrl: OwnerImg, // Fixed URL syntax with quotes
        mediaUrl: pp,  // Corrected to use profile picture URL fetched
        sourceUrl: sourceUrl, // Source URL for the card
      },
    };

    // Send the message with the extended intro text and external ad reply
    await conn.sendMessage(m.chat, { text: introText, contextInfo }, { quoted: m });

  } catch (e) {
    console.error(e);
    await conn.sendMessage(m.chat, { text: `❌ Something went wrong: ${e.message}` }, { quoted: m });
  }
};

handler.help = ['intro'];
handler.tags = ['fun'];
handler.command = /^owner|intro|duction$/i;

export default handler;

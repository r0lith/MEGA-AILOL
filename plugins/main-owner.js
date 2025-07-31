import pkg from 'baileys-pro';
const { proto, prepareWAMessageMedia, generateWAMessageFromContent } = pkg;

let handler = async (m, { conn, usedPrefix }) => {
  const OwnerName = 'Hello there!';
  const str = `Rolith on this side, its nice to meet you. Want to know me more? check the options below`;

  let msg = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: str
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            ...(await prepareWAMessageMedia({ image: { url: './assets/A.png' } }, { upload: conn.waUploadToServer } )),
            title: null,
            subtitle: null,
            hasMediaAttachment: false
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                "name": "single_select",
                "buttonParamsJson": JSON.stringify({
                  "title": "Tap Here",
                  "sections": [{
                    "highlight_label": "Me",
                    "rows": [
                      { "header": "", "title": "About Me", "description": "About the Owner", "id": `${usedPrefix}aboutme` },
                      { "header": "", "title": "Report A Bug", "description": "Found an issue? Let us know!", "id": `${usedPrefix}bug` }
                    ]
                  }]
                })
              },
              {
                "name": "cta_url",
                "buttonParamsJson": JSON.stringify({
                  "display_text": "Chat with me",
                  "url": "https://wa.me/+919737825303"
                })
              }
            ],
          })
        })
      }
    }
  }, {});

  await conn.relayMessage(msg.key.remoteJid, msg.message, {
    messageId: msg.key.id
  });
};

handler.help = ['owner'];
handler.tags = ['main'];
handler.command = ['owner'];

export default handler;

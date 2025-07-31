const { proto, generateWAMessage, areJidsSameUser } = (await import('baileys-pro')).default

export async function all(m, chatUpdate) {
  try {
    if (m.isBaileys) return
    if (!m.message) return
    if (!m.msg?.fileSha256) return

    // Safely access global.db.data.sticker
    const stickerDB = global.db?.data?.sticker
    if (!stickerDB) return

    const hashKey = Buffer.from(m.msg.fileSha256).toString('base64')

    if (!(hashKey in stickerDB)) return

    let hash = stickerDB[hashKey]
    let { text, mentionedJid } = hash

    let messages = await generateWAMessage(
      m.chat,
      { text: text, mentions: mentionedJid },
      {
        userJid: this.user.id,
        quoted: m.quoted && m.quoted.fakeObj,
      }
    )

    messages.key.fromMe = areJidsSameUser(m.sender, this.user.id)
    messages.key.id = m.key.id
    messages.pushName = m.pushName
    if (m.isGroup) messages.participant = m.sender

    let msg = {
      ...chatUpdate,
      messages: [proto.WebMessageInfo.fromObject(messages)],
      type: 'append',
    }

    this.ev.emit('messages.upsert', msg)
  } catch (error) {
    console.error('Error in all handler:', error)
  }
}

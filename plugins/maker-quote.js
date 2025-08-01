import fetch from 'node-fetch'
import { Sticker, StickerTypes } from 'wa-sticker-formatter'

import fs from 'fs'
import os from 'os'
import path from 'path'

let handler = async (m, { conn, text }) => {
  try {
    // Only allow quoting a message, not direct text
    if (!(m.quoted && m.quoted.text)) {
      return m.reply("Please reply to a message with !quote to generate a quote image.")
    }

    text = m.quoted.text

    let who = m.quoted
      ? m.quoted.sender
      : m.mentionedJid && m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.fromMe
          ? conn.user.jid
          : m.sender
    if (!(who in global.db.data.users)) throw '✳️ The user is not found in my database'
    
    let userPfp = await conn
      .profilePictureUrl(who, 'image')
      .catch(_ => 'https://i.ibb.co/0rK5vH5/tra.png')
    let user = global.db.data.users[who]
    let { name } = global.db.data.users[who]

    m.react(rwait)

    let quoteJson = {
      type: 'quote',
      format: 'png',
      backgroundColor: '#FFFFFF',
      width: 500,
      height: 500, // Adjust the height value as desired
      scale: 2,
      messages: [
        {
          entities: [],
          avatar: true,
          from: {
            id: 1,
            name: name,
            photo: {
              url: userPfp,
            },
          },
          text: text,
          replyMessage: {},
        },
      ],
    }

    let res = await fetch('https://bot.lyo.su/quote/generate', {
      method: 'POST',
      body: JSON.stringify(quoteJson),
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`)
    }

    let json = await res.json()

    if (!json.result || !json.result.image) {
      throw new Error('Unexpected response structure')
    }
    function randomId() {
      return Math.floor(100000 + Math.random() * 900000)
    }

    let bufferImage = Buffer.from(json.result.image, 'base64')

    let tempImagePath = path.join(os.tmpdir(), 'tempImage.png')
    fs.writeFileSync(tempImagePath, bufferImage)
    let sticker = new Sticker(tempImagePath, {
      pack: global.packname,
      author: name,
      type: StickerTypes.FULL,
      categories: ['🤩', '🎉'],
      id: randomId(),
      quality: 100,
      background: '#00000000',
    })

    // Send the sticker without buttons
    try {
      await conn.sendMessage(m.chat, await sticker.toMessage())
    } catch (stickerError) {
      console.error('Error sending sticker:', stickerError)
      m.reply('Error sending sticker. Sending image instead.')

      // Send the image without buttons
      await conn.sendFile(m.chat, tempImagePath, 'quote.png', 'Here is the quote image:', m)
    }

    // Clean up temporary file
    fs.unlinkSync(tempImagePath)

    m.react('🎉')
  } catch (e) {
    console.error(e)
    m.react('😭')
  }
}

handler.help = ['quote']
handler.tags = ['fun']
handler.command = ['quote']
export default handler

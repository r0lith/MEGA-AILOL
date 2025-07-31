import path from 'path'
import fs from 'fs'

let handler = m => m

// Mapping of trigger words to media type and URL or local file path
const mediaReactions = {
  'happy22': { type: 'gif', url: 'https://media.giphy.com/media/1BdIPqQOqKQk/giphy.gif' },
  'greet22': { type: 'audio', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  'amazed22': { type: 'video', url: 'https://samplelib.com/mp4/sample-5s.mp4' },
  'beautiful22': { type: 'image', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb' },
  'cap': { type: 'video', url: 'https://media.tenor.com/VcrD5Fub-u0AAAPo/caption.mp4' },
  'thumbsup22': { type: 'sticker', url: 'https://www.pngall.com/wp-content/uploads/5/Thumbs-Up-PNG-Image.png' }
}

handler.all = async function (m) {
  const text = (m.text || '').trim().toLowerCase()
  for (const word in mediaReactions) {
    if (text === word.toLowerCase()) {
      const { type, url, isLocal } = mediaReactions[word]
      let file = url
      if (isLocal) {
        try {
          file = fs.readFileSync(url)
        } catch (e) {
          await this.reply(m.chat, 'Local file not found: ' + url, m)
          break
        }
      }
      switch (type) {
        case 'audio':
          await this.sendFile(m.chat, file, 'audio.mp3', null, m, true)
          break
        case 'video':
          await this.sendFile(m.chat, file, 'video.mp4', null, m, false, { asVideo: true })
          break
        case 'image':
          await this.sendFile(m.chat, file, 'image.jpg', null, m)
          break
        case 'gif':
          await this.sendFile(m.chat, file, 'file.gif', null, m, false, { asGif: true })
          break
        case 'sticker':
          await this.sendFile(m.chat, file, 'sticker.webp', null, m, false, { asSticker: true })
          break
      }
      break
    }
  }
  return !0
}

export default handler

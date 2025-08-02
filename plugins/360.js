import fetch from 'node-fetch'
import FormData from 'form-data'
import cheerio from 'cheerio'  // <-- Add cheerio import

/**
 * Handler for all /ephoto360 commands.
 * Usage:  /ephoto360 <effectPageURL> | <text>
 * Example:
 *   /ephoto360 https://en.ephoto360.com/handwritten-text-on-foggy-glass-online-680.html Hello World
 */
let handler = async (m, { conn, args, usedPrefix, command }) => {
  // 1. Validate input
  if (args.length < 2) {
    throw `✳️ Usage: ${usedPrefix}${command} <effectPageURL> | <text>\nExample: ${usedPrefix}${command} https://en.ephoto360.com/handwritten-text-on-foggy-glass-online-680.html Hello`
  }
  const [effectPageURL, ...textParts] = args
  const text = textParts.join(' ')
  if (!effectPageURL.includes('photo360.com')) {
    throw '❌ Invalid URL: must be a photo360.com effect page.'
  }
  if (!text) throw `✳️ Please provide text to render.`

  m.react('⌛')

  try {
    // 2. Fetch initial page and extract form data with cheerio
    const initialResp = await fetch(effectPageURL, {
      headers: {
        'Accept': 'text/html',
        'User-Agent': 'Mozilla/5.0'
      }
    })
    if (!initialResp.ok) throw new Error('Failed to load effect page.')
    const html = await initialResp.text()
    const cookies = initialResp.headers.get('set-cookie') || ''

    // Parse html with cheerio
    const $ = cheerio.load(html)

    // Extract current form fields by their actual attribute names
    const build_server = $('input[name="build_server"]').attr('value') || ''
    const build_server_id = $('input[name="build_server_id"]').attr('value') || ''
    const token = $('input[name="token"]').attr('value') || ''
    const submit = $('button[name="submit"]').attr('value') || ''
    const radioMatches = $('input[name="radio0[radio]"]')
      .map((i, el) => $(el).val())
      .get()

    if (!build_server || !token) throw new Error('Form fields missing; page structure changed.')

    // Helper for secure random index
    const randomInt = (max) => Math.floor(Math.random() * max)

    // Prepare form payload
    const form = new FormData()
    form.append('submit', submit)
    form.append('token', token)
    form.append('build_server', build_server)
    if (build_server_id) form.append('build_server_id', build_server_id)
    if (radioMatches.length) {
      const choice = radioMatches[randomInt(radioMatches.length)]
      form.append('radio0[radio]', choice)
    }
    form.append('text[]', text)

    // 3. Submit form to get JSON payload
    const postResp = await fetch(effectPageURL, {
      method: 'POST',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Cookie': cookies
      },
      body: form
    })
    if (!postResp.ok) throw new Error('Failed to submit input form.')
    const postHtml = await postResp.text()

    // extract JSON blob from <div id="form_value"> or <input id="form_value_input">
    const $2 = cheerio.load(postHtml)
    let jsonText = $2('#form_value').text().trim()
    if (!jsonText) jsonText = $2('#form_value_input').attr('value')?.trim() || ''
    if (!jsonText) throw new Error('no generated form value found')

    // 4. Create image from JSON payload
    let payload
    try {
      payload = JSON.parse(jsonText)
    } catch {
      throw new Error('please try using a URL that requires 1 input field')
    }
    const createUrl = new URL('/effect/create-image', effectPageURL).origin + '/effect/create-image'
    const urlEncoded = new URLSearchParams()
    urlEncoded.set('id', payload.id)
    urlEncoded.set('token', payload.token)
    urlEncoded.set('build_server', payload.build_server)
    if (payload.build_server_id) urlEncoded.set('build_server_id', payload.build_server_id)
    if (payload.radio0?.radio) urlEncoded.set('radio0[radio]', payload.radio0.radio)
    payload.text.forEach(t => urlEncoded.append('text[]', t))

    const imgResp = await fetch(createUrl, {
      method: 'POST',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': cookies
      },
      body: urlEncoded.toString()
    })
    if (!imgResp.ok) throw new Error('Image creation failed.')
    const imgJson = await imgResp.json()
    if (!imgJson.success) throw new Error('generation failed: status is false')

    // Assemble final URL
    const base = payload.build_server
    const imgPath = imgJson.image || imgJson.fullsize_image
    const imageUrl = base + imgPath
    const sessionId = String(imgJson.session_id)

    // 5. Send back the generated image file
    const ext = imageUrl.split('.').pop().split(/\W/)[0] || 'jpg'
    await conn.sendFile(m.chat, imageUrl, `effect.${ext}`, null, m)
    m.react('🎉')

  } catch (err) {
    console.error(err)
    // Mirror Go errors exactly where possible
    if (err.message.includes('invalid URL')) {
      return m.reply('❌ Invalid URL: Must be a photo360.com URL.')
    } else if (err.message.includes('no generated form value')) {
      return m.reply('❌ Failed to extract form value. Effect may require single input.')
    } else if (err.message.includes('please try using a URL')) {
      return m.reply('⚠️ This effect requires single-text input. Use: SetName only.')
    } else {
      return m.reply('❌ An error occurred: ' + err.message)
    }
  }
}

handler.help = ['ephoto360 <url> <text>']
handler.tags = ['maker']
handler.command = ['ephoto360']
export default handler

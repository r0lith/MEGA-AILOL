
import fetch from 'node-fetch'

let handler = m => m
handler.all = async function (m) {
	
	let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender
	let pp = await this.profilePictureUrl(who, 'image').catch(_ => 'https://i.ibb.co/gZLqPThn/Riruru.png')
	
	//reply link wa
   global.rpgc = { contextInfo: { externalAdReply: { mediaUrl: 'https://i.ibb.co/gZLqPThn/Riruru.png', mediaType: 'VIDEO', description: 'support group', title: 'JOIN GROUP', body: 'support group', thumbnailUrl: 'https://i.ibb.co/gZLqPThn/Riruru.png', sourceUrl: 'null channel' }}} 
	
	//reply link Instagram 
    global.rpig = { contextInfo: { externalAdReply: { mediaUrl: 'https://i.ibb.co/gZLqPThn/Riruru.png', mediaType: 'VIDEO', description: 'FOLLOW DEVELOPER', title: 'INSTAGRAM', body: 'Keep bot alive', thumbnailUrl: 'https://i.ibb.co/gZLqPThn/Riruru.png', sourceUrl: 'https://instagram.com/global.techinfo' }}}
	
	//reply link yt
    global.rpyt = { contextInfo: { externalAdReply: { showAdAttribution: true, mediaUrl: 'https://i.ibb.co/gZLqPThn/Riruru.png', mediaType: 'VIDEO', description: 'SUBSCRIBE : YT CHANNEL', title: 'YouTube', body: 'learn to create your own bots', thumbnailUrl: 'https://i.ibb.co/gZLqPThn/Riruru.png', sourceUrl: 'https://youtube.com/' }}}

//reply link WhatsApp Channel
    global.rpwp = { contextInfo: { externalAdReply: { showAdAttribution: true, mediaUrl: 'https://i.ibb.co/gZLqPThn/Riruru.png', mediaType: 'VIDEO', description: 'Follow Channel', title: 'FOLLOW CHANNEL', body: '© GlobalTechInfo', thumbnailUrl: 'https://i.ibb.co/gZLqPThn/Riruru.png', sourceUrl: 'null channel' }}}
    
} 
export default handler

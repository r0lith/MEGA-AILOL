let handler = async (m, { conn, usedPrefix, command }) => {
  let who = m.quoted
    ? m.quoted.sender
    : m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender
  if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`

  let pp = './assets/A.png'
  let more = String.fromCharCode(8206)
  let readMore = more.repeat(850)

  let lkr
  switch (command) {
    case 'listmenu':
    case 'menulist':
      lkr ='*Get ready for the ride, here are your ticket options:*\n\n' +
        '🌅 *' +
        usedPrefix +
        "botmenu* - The Bot's secret control panel.\n\n" +
        '🖲️ *' +
        usedPrefix +
        "ownermenu* - Yep, that's for you, Boss!\n\n" +
        '🛫 *' +
        usedPrefix +
        'groupmenu* - Groups to unite people.\n\n' +
        '🗂️ *' +
        usedPrefix +
        "dlmenu* - 'DL' stands for 'Delicious Loot'.\n\n" +
        '🎭 *' +
        usedPrefix +
        "funmenu* - The bot's party hat. Games, jokes and instant ROFLs.\n\n" +
        '💵 *' +
        usedPrefix +
        'economy* - Your personal vault of virtual economy.\n\n' +
        '🎮 *' +
        usedPrefix +
        'gamemenu* - Enter the gaming arena.\n\n' +
        '🫐 *' +
        usedPrefix +
        'stickermenu* - A rainbow of stickers.\n\n' +
        '🪙 *' +
        usedPrefix +
        "toolsmenu* - Your handy-dandy toolkit.\n\n" +
        '🧲 *' +
        usedPrefix +
        'logomenu* - Create a logo that screams You.\n\n' +
        '💟 *' +
        usedPrefix +
        'aimenu* - Your Personal Artificial Intelligence Copilots.\n\n' +
        '🎧 *' +
        usedPrefix +
        'aeditor* - Tune The Mp3/Audio As You Wish.\n\n' +
         '🎉 *' +
        usedPrefix +
        'animemenu* - Animated Images,Stickers and Videos.\n\n' +
         '🍒 *' +
        usedPrefix +
        'reactions* - Anime reactions menu for group.\n\n' +
        '🪁 *' +
        usedPrefix +
        'infoanime* - Full Information About Animes Like imdb.\n\n' +
        '💡 *' +
        usedPrefix +
        'imagen* - Create Images and designs based on your thoughts/prompts.\n\n' +
        '🃏 *' +
        usedPrefix +
        'randompic* - Random Images you might like and love.\n\n' +
        '🏖️ *' +
        usedPrefix +
        'textpro* - Generate Beautiful Logos Using Text Of Your Choice.\n\n' +
        '🎥 *' +
        usedPrefix +
        'randomvid* - Random Videos you might like and love.\n\n' +
        '🖍️ *' +
        usedPrefix +
        'fancy* - Fancy text generator Menu.' 
        break

    case 'botmenu':
      lkr = `
╭───『 *Bot Menu* 』─❍
◈ • *allmenu*
◈ • *alive*
◈ • *autoreact*
◈ • *blocklist*
◈ • *botinfo*
◈ • *donate*
◈ • *gita*
◈ • *groups*
◈ • *language*
◈ • *listmenu*
◈ • *listprem*
◈ • *listrent*
◈ • *menu*
◈ • *menu2*
◈ • *menu3*
◈ • *menu4*
◈ • *mrcs*
◈ • *owner*
◈ • *ping*
◈ • *quran*
◈ • *rentbot*
◈ • *runtime*
◈ • *server*
◈ • *speedtest*
◈ • *stoprent*
◈ • *uptime*
╰─────────❍` //
      break
      case 'aimenu':
      lkr=`
╭───『 *AI Menu* 』─❍
◈ • *ai*
◈ • *blackbox*
◈ • *blackpink*
◈ • *bro*
◈ • *chatgpt*
◈ • *fact*
◈ • *google*
◈ • *googleit*
◈ • *gimage*
◈ • *gpt4*
◈ • *travel*
◈ • *why*
╰─────────❍` //   
 break

 case 'logosmaker':
 case 'ephoto':
 case 'textpro':
      lkr=`
╭───『 *Textpro Menu* 』─❍
◈ • *3dsilver*
◈ • *balon*
◈ • *blackpink*
◈ • *color*
◈ • *circle*
◈ • *cubic*
◈ • *foggy*
◈ • *galaxy*
◈ • *galaxy2*
◈ • *gaming*
◈ • *gold*
◈ • *golden*
◈ • *gsilver*
◈ • *hacker*
◈ • *jewel*
◈ • *logomaker*
◈ • *matrix*
◈ • *metal*
◈ • *metallic*
◈ • *mascot*
◈ • *nigeria*
◈ • *papercut*
◈ • *sand*
◈ • *splat*
◈ • *snake*
◈ • *star*
◈ • *typo*
◈ • *wgalaxy*
◈ • *wings*
╰─────────❍` //
 break
      case 'imagen':
      case 'imagenai':
      lkr=`
╭───『 *ImaGen Menu* 』─❍
◈ • *animefy*
◈ • *cartoon*
◈ • *dalle*
◈ • *hercai-lexica*
◈ • *imagev3*
◈ • *lexica*
◈ • *prodia*
◈ • *raava*
◈ • *shonin*
◈ • *simurg*
◈ • *v2beta*
╰─────────❍` //
 break
    case 'ownermenu':
      lkr = `
╭───『 *Owner* 』─❍
◈ • *addowner*
◈ • *addprem*
◈ • *addsudo*
◈ • *afk*
◈ • *allow*
◈ • *allvars*
◈ • *autoeract*
◈ • *banchat*
◈ • *ban*
◈ • *banuser*
◈ • *broadcast*
◈ • *broadcastgc*
◈ • *clearchat*
◈ • *cleartmp*
◈ • *delcmd*
◈ • *delowner*
◈ • *delprem*
◈ • *delsudo*
◈ • *enable*
◈ • *fakereply*
◈ • *fullpp*
◈ • *getfile*
◈ • *getmsg*
◈ • *getplugin*
◈ • *intro*
◈ • *inspect*
◈ • *join*
◈ • *listban*
◈ • *listcmd*
◈ • *listplugins*
◈ • *logout*
◈ • *readviewonce*
◈ • *remove*
◈ • *restart*
◈ • *save*
◈ • *savecontact*
◈ • *savefile*
◈ • *setppbot*
◈ • *setprefix*
◈ • *setprivacy*
◈ • *unban*
◈ • *unbanuser*
◈ • *unbanchat*
◈ • *update*
◈ • *var*
◈ • *resetprefix*
╰─────────❍` //
      break
      case 'randompic':
      lkr = `
╭───『 *RandomPic Menu* 』─❍
◈ • *aesthetic*
◈ • *antiwork*
◈ • *bike*
◈ • *blackpink3*
◈ • *boneka*
◈ • *car*
◈ • *cat*
◈ • *chinese*
◈ • *cosplay2*
◈ • *doggo*
◈ • *girl*
◈ • *hijab*
◈ • *indo*
◈ • *japanese*
◈ • *justina*
◈ • *kayes*
◈ • *korean*
◈ • *kpop*
◈ • *malay*
◈ • *malaysia*
◈ • *notnot*
◈ • *person*
◈ • *profile2*
◈ • *pubg*
◈ • *random*
◈ • *random2*
◈ • *ryujin*
◈ • *thai*
◈ • *ulzzanggirl*
◈ • *ulzzangboy*
◈ • *vietnamese*
◈ • *wallhp*
◈ • *wallml*
╰─────────❍` //  
      break
      case 'randomvid':
      lkr = `
╭───『 *Random-Vid Menu* 』─❍
◈ • *tiktokbocil*
◈ • *tiktokgirl*
◈ • *tiktokghea*
◈ • *tiktokkayes*
◈ • *tiktoknukhty*
◈ • *tiktoknotnot*
◈ • *tiktokpanrika*
◈ • *tiktoksantuy*
╰─────────❍` //
      break
    case 'groupmenu':
      lkr = `
╭───『 *Group Menu* 』─❍
◈ • *add*
◈ • *admins*
◈ • *antilink*
◈ • *delete*
◈ • *demote*
◈ • *disable*
◈ • *enable*
◈ • *group*
◈ • *groupinfo*
◈ • *kick*
◈ • *link*
◈ • *mysn*
◈ • *notify*
◈ • *poll*
◈ • *promote*
◈ • *register*
◈ • *resetlink*
◈ • *setbye*
◈ • *setdesc*
◈ • *setname*
◈ • *setpp*
◈ • *setwelcome*
◈ • *ship*
◈ • *tagall*
◈ • *totag*
◈ • *warn*
◈ • *warns*
◈ • *unreg*
◈ • *unwarn*
◈ • *wyr*
◈ • *toxic*
◈ • *delwarn*
◈ • *hidetag*
╰─────────❍` //
      break
    case 'downloadermenu':
    case 'dlmenu':
    case 'downloads':
      lkr = `
╭───『 *Download* 』─❍
◈ • *apkdl*
◈ • *apksearch*
◈ • *audio*
◈ • *capcut*
◈ • *dlstatus*
◈ • *facebook*
◈ • *gdrive*
◈ • *gimage*
◈ • *gitclone*
◈ • *githubdl*
◈ • *githubstalk*
◈ • *igstory*
◈ • *igstalk*
◈ • *insta*
◈ • *itunes*
◈ • *likee*
◈ • *mediafire*
◈ • *mega*
◈ • *npmstalk*
◈ • *pinterest*
◈ • *pinterest2*
◈ • *play*
◈ • *play2*
◈ • *play5*
◈ • *playstore*
◈ • *playvid*
◈ • *ringtone*
◈ • *rnekos*
◈ • *rwall*
◈ • *swdl*
◈ • *threads*
◈ • *tiktok*
◈ • *ttstalk*
◈ • *twitter*
◈ • *video*
◈ • *wallpapers*
◈ • *ytmp3*
◈ • *ytmp4*
◈ • *ytsearch*
╰─────────❍` //
      break
    case 'economymenu':
    case 'economy':
      lkr = `
╭───『 *Economy* 』─❍
◈ • *addgold*
◈ • *addxp*
◈ • *adventure*
◈ • *balance*
◈ • *bank*
◈ • *bet*
◈ • *buyall*
◈ • *buych*
◈ • *claim/daily*
◈ • *craft*
◈ • *deposit*
◈ • *give*
◈ • *heal*
◈ • *leaderboard*
◈ • *levelup*
◈ • *mine*
◈ • *monthly*
◈ • *opencrate*
◈ • *rob*
◈ • *sell*
◈ • *shop*
◈ • *todiamond*
◈ • *tomoney*
◈ • *transfer*
◈ • *wallet*
◈ • *weekly*
◈ • *withdraw*
╰────────❍` // 
      break
    case 'funmenu':
      lkr = `
╭───『 *Fun Menu* 』─❍
◈ • *alexa*
◈ • *character*
◈ • *dare*
◈ • *flirt*
◈ • *gay*
◈ • *hack*
◈ • *hornycard*
◈ • *lolicon*
◈ • *shayeri*
◈ • *simpcard*
◈ • *ship*
◈ • *stupid*
◈ • *truth*
◈ • *waste*
◈ • *ytcomment*
╰─────────❍` //
      break
      case 'animereactions':
case 'reactions':
lkr=`
╭───『 *Reactions Menu* 』─❍
◈ • *awoo*
◈ • *bite*
◈ • *blush*
◈ • *bonk*
◈ • *bully*
◈ • *cringe*
◈ • *cry*
◈ • *cuddle*
◈ • *dance*
◈ • *glomp*
◈ • *happy*
◈ • *handhold*
◈ • *highfive*
◈ • *hug*
◈ • *kill*
◈ • *kiss*
◈ • *lick*
◈ • *nom*
◈ • *poke*
◈ • *pat*
◈ • *smug*
◈ • *slap*
◈ • *wave*
◈ • *wink*
◈ • *yeet*
╰─────────❍` //
      break
    case 'animemenu':
      lkr = `
╭───『 *Anime Menu* 』─❍
◈ • *akira*
◈ • *akiyama*
◈ • *anna*
◈ • *asuna*
◈ • *ayuzawa*
◈ • *boruto*
◈ • *chiho*
◈ • *chitoge*
◈ • *couplepp*
◈ • *deidara*
◈ • *elaina*
◈ • *emilia*
◈ • *erza*
◈ • *hestia*
◈ • *hinata*
◈ • *hornycard*
◈ • *inori*
◈ • *itachi*
◈ • *kagura*
◈ • *kaori*
◈ • *keneki*
◈ • *kotori*
◈ • *loli*
◈ • *madara*
◈ • *mikasa*
◈ • *minato*
◈ • *miku*
◈ • *naruto*
◈ • *neko*
◈ • *nezuko*
◈ • *sagiri*
◈ • *sakura*
◈ • *sasuke*
◈ • *toanime*
◈ • *waifu*
╰─────────❍` //
      break
      case 'infoanime':
      lkr = `
╭───『 *Anime Info Menu* 』─❍
◈ • *anime akira*
◈ • *anime akiyama*
◈ • *anime anna*
◈ • *anime asuna*
◈ • *anime ayuzawa*
◈ • *anime boruto*
◈ • *anime chiho*
◈ • *anime chitoge*
◈ • *anime deidara*
◈ • *anime elaina*
◈ • *anime emilia*
◈ • *anime erza*
◈ • *anime hestia*
◈ • *anime hinata*
◈ • *anime inori*
◈ • *anime isuzu*
◈ • *anime itachi*
◈ • *anime kagura*
◈ • *anime kaori*
◈ • *anime keneki*
◈ • *anime kotori*
◈ • *anime loli*
◈ • *anime madara*
◈ • *anime mikasa*
◈ • *anime minato*
◈ • *anime miku*
◈ • *anime naruto*
◈ • *anime neko*
◈ • *anime nezuko*
◈ • *anime sakura*
◈ • *anime sagiri*
◈ • *anime sasuke*
◈ • *anime waifu*
╰─────────❍` //
      break
    case 'gamemenu':
    case 'gamesmenu':
      lkr = `
╭───『 *Game Menu* 』─❍
◈ • *casino*
◈ • *chess*
◈ • *cock-fight*
◈ • *delttt*
◈ • *fhint*
◈ • *guessflag*
◈ • *math*
◈ • *math answer*
◈ • *ppt*
◈ • *roulette*
◈ • *slot*
◈ • *tictactoe*
╰─────────❍` //
      break
    case 'stickermenu':
      lkr = `
╭───『 *Sticker Menu* 』─❍
◈ • *attp*
◈ • *attp2*
◈ • *attp3*
◈ • *emojimix*
◈ • *getsticker*
◈ • *quote*
◈ • *quoted*
◈ • *rc*
◈ • *scircle*
◈ • *s*
◈ • *smaker*
◈ • *smeme*
◈ • *stickers*
◈ • *take*
◈ • *tenor*
◈ • *tgsticker*
◈ • *toimg*
◈ • *tovid*
◈ • *trigger*
◈ • *ttp*
◈ • *ttp2*
╰─────────❍` //
      break
    case 'toolmenu':
    case 'toolsmenu':
      lkr = `
╭───『 *Tools Menu* 』─❍
◈ • *android*
◈ • *autosticker*
◈ • *base64*
◈ • *calc*
◈ • *carbon*
◈ • *checkmail*
◈ • *course*
◈ • *define*
◈ • *element*
◈ • *enhance*
◈ • *fancy*
◈ • *filelength*
◈ • *google*
◈ • *googleit*
◈ • *happymod*
◈ • *imdb*
◈ • *itunes*
◈ • *linux*
◈ • *lyrics*
◈ • *nowa*
◈ • *pokedex*
◈ • *qrmaker*
◈ • *quote*
◈ • *readmore*
◈ • *readqr*
◈ • *readvo*
◈ • *reddit*
◈ • *removebg*
◈ • *remini*
◈ • *ssweb*
◈ • *styletext*
◈ • *technews*
◈ • *tinyurl*
◈ • *tocartoon*
◈ • *topdf*
◈ • *tourl*
◈ • *trace*
◈ • *translate*
◈ • *true*
◈ • *wa*
◈ • *weather*
◈ • *whatmusic*
◈ • *wattpad*
◈ • *wikipedia*
╰─────────❍` //
break
case 'aeditor':
case 'audioeditor':
lkr=`
╭───『 *Audio Menu* 』─❍
◈ • *bass*
◈ • *blown*
◈ • *chipmunk*
◈ • *deep*
◈ • *earrape*
◈ • *fast*
◈ • *nightcore*
◈ • *reverse*
◈ • *robot*
◈ • *slow*
◈ • *smooth*
◈ • *squirrel*
◈ • *tupai*
╰─────────❍` //
      break
    case 'logomenu':
    case 'makermenu':
      lkr = `
╭───『 *Maker Menu* 』─❍
◈ • *blur*
◈ • *difuminar2*
◈ • *enhance*
◈ • *gfx1*
◈ • *gfx10*
◈ • *gfx11*
◈ • *gfx12*
◈ • *gfx2*
◈ • *gfx3*
◈ • *gfx4*
◈ • *gfx5*
◈ • *gfx6*
◈ • *gfx7*
◈ • *gfx8*
◈ • *gfx9*
◈ • *hornycard*
◈ • *hornylicense*
◈ • *itssostupid*
◈ • *iss*
◈ • *lolicon*
◈ • *logololi*
◈ • *simpcard*
◈ • *stupid*
◈ • *tweet <comment>*
◈ • *ytcomment <comment>*
╰─────────❍` //
      break
    default:
      lkr = `Invalid command. Type ${usedPrefix}list to see available options.`
  }

  conn.sendFile(m.chat, pp, 'perfil.jpg', lkr, m, false, { mentions: [who] })

  let done = '👍'
  m.react(done)
}

handler.help = [
  'listmenu',
  'menulist',
  'aimenu',
  'animereactions',
  'reactions',
  'imagen',
  'textpro',
  'textmaker',
  'logosmaker',
  'imagenai',
  'animemenu',
  'aeditor',
  'audioeditor',
  'infoanime',
  'botmenu',
  'ownermenu',
  'groupmenu',
  'dlmenu',
  'downloads',
  'downloadermenu',
  'economymenu',
  'economy',
  'funmenu',
  'gamemenu',
  'gamesmenu',
  'stickermenu',
  'logomenu',
  'makermenu',
  'randompic',
  'randomvid',
  'toolsmenu',
  'toolmenu',
]
handler.tags = ['main']
handler.command = [
  'listmenu',
  'menulist',
  'aimenu',
  'animereactions',
  'reactions',
  'imagen',
  'textpro',
  'textmaker',
  'logosmaker',
  'imagenai',
  'animemenu',
  'aeditor',
  'audioeditor',
  'infoanime',
  'botmenu',
  'ownermenu',
  'groupmenu',
  'dlmenu',
  'downloads',
  'downloadermenu',
  'economymenu',
  'economy',
  'funmenu',
  'gamemenu',
  'gamesmenu',
  'stickermenu',
  'logomenu',
  'makermenu',
  'randompic',
  'randomvid',
  'toolsmenu',
  'toolmenu',
]

export default handler

import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
let limit = 100
let handler = async (m, { conn, args, isPrems, isOwner, usedPrefix, command }) => {
if (!args || !args[0]) throw `Ingrese el link de un video de YouTube junto al comando`
if (!args[0].match(/youtu/gi)) throw `Verifica que el link de YouTube`
conn.reply(m.chat, global.wait, m)
let chat = global.db.data.chats[m.chat]
try {
let q = args[1] || '360p'
let v = args[0]
const yt = await youtubedl(v).catch(async () => await youtubedlv2(v))
const dl_url = await yt.video[q].download()
const title = await yt.title
const size = await yt.video[q].fileSizeH 
if (size.split('MB')[0] >= limit) return m.reply(`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`) 
if (size.includes('GB')) return m.reply(`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`)   
conn.sendMessage(m.chat, { video: { url: dl_url }, fileName: title + '.mp4', mimetype: 'video/mp4', caption: `╭─⬣「 *YouTube Download* 」⬣\n│  ≡◦   *🍭 Título:* ${title}\n│  ≡◦ *🪴 Calidad:* ${q}\n╰─⬣`, thumbnail: await fetch(yt.thumbnail) }, { quoted: m })
} catch {
m.reply(`*☓ Ocurrió un error inesperado*`) 
}}
handler.help = ['ytmp4 <url>']
handler.tags = ['downloader']
handler.command = ['ytmp4', 'ytv', 'yt']
handler.limit = 1

export default handler
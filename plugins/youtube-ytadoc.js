import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
let limit = 100
let handler = async (m, { conn, text, args, isPrems, isOwner, usedPrefix, command }) => {
if (!args || !args[0]) throw `Ingrese el link de un video de YouTube junto al comando`
if (!args[0].match(/youtu/gi)) throw `Verifica que el link de YouTube`
conn.reply(m.chat, global.wait, m)
let chat = global.db.data.chats[m.chat]
try {
let q = '128kbps'
let v = args[0]
const yt = await youtubedl(v).catch(async () => await youtubedlv2(v))
const dl_url = await yt.audio[q].download()
const title = await yt.title
const size = await yt.audio[q].fileSizeH
let cap = `╭─⬣「 *YouTube Download* 」⬣\n│  ≡◦   *🍭 Título:* ${title}\n│  ≡◦ *🪴 Calidad:* ${q}\n╰─⬣`.trim()
if (size.split('MB')[0] >= limit) return m.reply(`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`) 
if (size.includes('GB')) return m.reply(`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`)   
await conn.sendMessage(m.chat, { document: { url: dl_url }, caption: cap, mimetype: 'audio/mpeg', fileName: `${title}.mp3`}, { quoted: m })
} catch {
await m.reply(`*☓ Ocurrió un error inesperado*`)
}}
handler.help = ['ytmp3doc <url>']
handler.tags = ['downloader']
handler.command = ['ytmp3doc', 'ytadoc'] 
handler.limit = 1

export default handler
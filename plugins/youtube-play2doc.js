import yts from 'yt-search'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
let limit = 200
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
if (!text) throw `▶⏸ *PLAY*\n\nQué estás buscando?`
try {
let ytse = await yts(args.join(" "))
let vid = ytse.all.find(v => v.type === "video")
let q = '360p'
let v = vid.url
let yt = await youtubedl(v).catch(async _ => await youtubedlv2(v))
let dl_url = await yt.video[q].download()
let ttl = await yt.title
let size = await yt.video[q].fileSizeH
let play = `╭─⬣「 *YouTube Play* 」⬣
│  ≡◦ *🍭 Titulo ∙* ${vid.title}
│  ≡◦ *📅 Publicado ∙* ${vid.ago}
│  ≡◦ *🕜 Duración ∙* ${vid.timestamp}
│  ≡◦ *👁 Visitas ∙* ${vid.views}
│  ≡◦ *⛓ Url ∙* ${vid.url}
╰─⬣`.trim()
if (size.split('MB')[0] >= limit) return m.reply(`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`) 
if (size.includes('GB')) return m.reply(`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`)   
conn.sendFile(m.chat, vid.thumbnail, '', play, m)
conn.sendMessage(m.chat, { document: { url: dl_url }, caption: `╭─⬣「 *YouTube Download* 」⬣\n│  ≡◦   *🍭 Título:* ${vid.title}\n│  ≡◦ *🪴 Calidad:* ${q}\n╰─⬣`, mimetype: 'video/mp4', fileName: `${vid.title}` + `.mp4`}, {quoted: m})
  } catch (error) {
}}
handler.help = ["play2doc"].map(v => v + " <búsqueda>")
handler.tags = ["downloader"]
handler.command = /^play2doc|playdoc2$/i

export default handler
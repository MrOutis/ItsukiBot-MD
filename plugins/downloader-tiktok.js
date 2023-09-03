import fg from 'api-dylux' 
import { tiktokdl } from '@bochilteam/scraper'
let handler = async (m, { conn, text, args, usedPrefix, command}) => {
if (!args[0]) throw `Ingrese el enlace del vídeo de Tiktok`
if (!args[0].match(/tiktok/gi)) throw `verifica que el link sea de tiktok`
conn.reply(m.chat, global.wait, m)
try {
let p = await fg.tiktok(args[0]) 
conn.sendFile(m.chat, p.play, 'tiktok.mp4', '', m)
} catch {  	
try { 
const { author: { nickname }, video, description } = await tiktokdl(args[0])
const url = video.no_watermark2 || video.no_watermark || 'https://tikcdn.net' + video.no_watermark_raw || video.no_watermark_hd
if (!url) throw global.error
conn.sendFile(m.chat, url, 'fb.mp4', ``, m)
} catch {
m.reply('*☓ Ocurrió un error inesperado*')
}}}  
handler.help = ['tiktok <url>']
handler.tags = ['downloader']
handler.command = /^(tiktok|ttdl|tiktokdl|tiktoknowm)$/i
handler.limit = 1
handler.register = true 

export default handler
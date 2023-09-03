import fg from 'api-dylux' 
let handler = async (m, { conn, args, usedPrefix, command }) => {
 
if (!args[0]) throw `Ingrese el enlace del vídeo de Facebook`
conn.reply(m.chat, global.wait, m)
try {
let result = await fg.fbdl(args[0]);
conn.sendFile(m.chat, result.videoUrl, 'fb.mp4', `\t\t\t*📥 Facebook Download 📥*\n\n*🍭 Titulo ∙* ${result.title}`, m);
} catch (error) {
m.reply('*☓ Ocurrió un error inesperado*')
}}
handler.help = ['facebook <url>']
handler.tags = ['downloader']
handler.command = /^((facebook|fb)(downloder|dl)?)$/i
handler.limit = 1

export default handler
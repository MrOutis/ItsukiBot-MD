import { mediafiredl } from '@bochilteam/scraper'
let handler = async (m, { conn, args, usedPrefix, command }) => {
let limit = 100
if (!args[0]) throw `Ingrese un enlace de Mediafire`
let res = await mediafiredl(args[0])
let { url, url2, filename, ext, aploud, filesize, filesizeH } = res
    let caption = `
*📓 Nombre:* ${filename}
*📁 Peso:* ${filesizeH}
*📄 Tipo:* ${ext}
*🕐 Subido:* ${aploud}

*↻ Espera soy lenta. . .*
`.trim()
if (filesizeH.split('MB')[0] >= limit) return m.reply(`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`) 
if (filesizeH.includes('GB')) return m.reply(`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`)   
m.reply(caption)
await conn.sendFile(m.chat, url, filename, '', m, null, { mimetype: ext, asDocument: true })
}
handler.help = ['mediafire'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(mediafire|mf)$/i
//handler.premium = true 

export default handler
/*let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `Ingrese el error ue desea reportar`
if (text.length < 10) throw `Especifique bien el error, mínimo 10 caracteres`
if (text.length > 1000) throw `Máximo 1000 caracteres para enviar el error`
let teks = `*[ REPORTE ]*\n\n*• Usuario:* @${m.sender.split`@`[0]}\n*• Texto:* ${text}`
conn.reply('5218261275256@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, { contextInfo: { mentionedJid: [m.sender] }})
conn.reply('5218132588591@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, { contextInfo: { mentionedJid: [m.sender] }})
conn.reply('5492616532494@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, { contextInfo: { mentionedJid: [m.sender] }})
m.reply(`El reporte se envío a mi creador, cualquier informe falso puede ocasionar banneo`)
}
handler.help = ['reporte <fallo>']
handler.tags = ['main']
handler.command = /^(report|request|reporte|bugs|bug|report-owner|reportes)$/i
export default handler*/
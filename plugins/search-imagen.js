import { googleImage } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `¿Que imagen esta buscando?`
    const res = await googleImage(text)
    conn.sendFile(m.chat, res.getRandom(), 'image.jpg', `
🔎 Resultado de: *${text}*
`.trim(), m )
}
handler.help = ['imagen <texto>']
handler.tags = ['search']
handler.command = ['img', 'image', 'imagen'] 
handler.limit = 1
handler.register = true 

export default handler
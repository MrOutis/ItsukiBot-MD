import { googleImage, pinterest } from '@bochilteam/scraper'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!global.db.data.chats[m.chat].nsfw) throw `❎ En este grupo no esta permitido el contenido +18`

    if (!text) throw `Ejemplo *${usedPrefix}${command}* Hinata`
    const res = await (await googleImage('rule34 ' + text)).getRandom()
    conn.sendFile(m.chat, res, 'error.jpg', `*Rule34* ${text ? text.capitalize() : false}`, m)
}
handler.help = ['rule34 <texto>']
handler.tags = ['nsfw', 'search']
handler.command = ['rule34']
handler.register = true
handler.limit = 1
export default handler
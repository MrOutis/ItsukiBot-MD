//import db from '../lib/database.js'

let handler = async (m, { conn, isOwner, isAdmin, isROwner }) => {
    if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
    global.db.data.chats[m.chat].isBanned = true
    m.reply('*🔇 La bot a sido desactivada en este grupo*')
}
handler.help = ['banchat']
handler.tags = ['group']
handler.command = ['banchat'] 

export default handler
//import db from '../lib/database.js'

let handler = async (m, { conn, isOwner, isAdmin, isROwner} ) => {
    if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
    global.db.data.chats[m.chat].isBanned = false
    m.reply('*🔇 La bot a sido reactivada en este grupo*')   
}
handler.help = ['unbanchat']
handler.tags = ['group']
handler.command = ['unbanchat'] 

export default handler
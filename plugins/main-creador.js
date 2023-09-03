import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
let mentionedJid = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

  try {
let pp = await conn.profilePictureUrl(mentionedJid)
let name = await conn.getName(mentionedJid)
const sentMsg = await conn.sendContactArray(m.chat, [
      ['5218261275256', 'おDaniel', 'Owner ItsukiBot - MD', 'Número', 'ItsukiBot - MD By おDaniel', '🇲🇽 México', '📍 https://github.com/DanisOFC', '👤 Owner Bot']
    ], m)
  } catch (error) {
   
  }
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = /^(owner|creator)$/i
export default handler
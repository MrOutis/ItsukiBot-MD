import { webp2png } from '../lib/webp2mp4.js'
let handler = async (m, { conn, usedPrefix, command }) => {
const notStickerMessage = `Respondα a un sticker`
if (!m.quoted) throw notStickerMessage
const q = m.quoted || m
let mime = q.mediaType || ''
if (!/sticker/.test(mime)) throw notStickerMessage
let media = await q.download()
let out = await webp2png(media).catch(_ => null) || Buffer.alloc(0)
await conn.sendFile(m.chat, out, 'error.png', null, m)
}
handler.help = ['toimg <sticker>']
handler.tags = ['sticker', 'tools']
handler.command = ['toimg', 'jpg', 'aimg'] 

export default handler
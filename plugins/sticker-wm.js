import { addExif } from '../lib/sticker.js'


let handler = async (m, { conn, text }) => {
  if (!m.quoted) throw '*El sticker!*'
  let stiker = false
  try {
    let [packname, ...author] = text.split('|')
    author = (author || []).join('|')
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) throw '*Responde a un sticker*'
    let img = await m.quoted.download()
    if (!img) throw '*Responde a un sticker!*'
    stiker = await addExif(img, packname || '', author || '')
  } catch (e) {
    console.error(e)
    if (Buffer.isBuffer(e)) stiker = e
  } finally {
    if (stiker) conn.sendFile(m.chat, stiker, 'wm.webp', '', m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: gcname, body: `h`, mediaType: 2, sourceUrl: linkgc, thumbnail: miniurl}}}, { quoted: m })
    else throw '*La conversión falló*'
  }
}
handler.help = ['wm <nombre>|<autor>']
handler.tags = ['sticker']
handler.command = ['take', 'robar', 'wm'] 

export default handler

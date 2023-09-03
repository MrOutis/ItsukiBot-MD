import { sticker } from '../lib/sticker.js'
let handler = async(m, { conn }) => {
if (!db.data.chats[m.chat].stickers && m.isGroup) throw 0
 
let nombre = 'ItsukiBot'
let nombre2 = 'By おDaniel'
 
const s = [
'https://media.giphy.com/media/h5cY0X4NcHP2JiFXNG/giphy.gif', 
'https://media.giphy.com/media/SSinJFA7xCih5g9F1c/giphy.gif',
'https://media.giphy.com/media/kBHH2rfm1VHIYgodQx/giphy.gif',
'https://media.giphy.com/media/UpDKR8EYG5zFtYhWNz/giphy.gif',
'https://media.giphy.com/media/h8mwX2Tt1R2oIOhszC/giphy.gif',
'https://media.giphy.com/media/iGeW8L2Pvzzbtf6jII/giphy.gif'

];  
 
let stiker = await sticker(null, s[Math.floor(Math.random() * s.length)], nombre, nombre2)
conn.sendFile(m.chat, stiker, null, { asSticker: true })
}
handler.help = ['dado']
handler.tags = ['sticker'] 
handler.command = /^(dado|dados)/
export default handler

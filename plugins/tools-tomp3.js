import { toAudio } from '../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    if (!/video|audio/.test(mime)) throw `Responde a un video o nota de voz`
    let media = await q.download?.()
    if (!media) throw '*☓ Ocurrió un error inesperado*'
    let audio = await toAudio(media, 'mp4')
    if (!audio.data) throw '*☓ Ocurrió un error inesperado*'
    conn.sendMessage(m.chat, { audio: audio.data,  mimetype: 'audio/mpeg' }, { quoted: m })
}
handler.help = ['tomp3']
handler.tags = ['tools']
handler.command = ['tomp3', 'toaudio', 'mp3'] 
handler.register = true

export default handler
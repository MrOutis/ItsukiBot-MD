import { toPTT } from '../lib/converter.js'
let handler = async (m, { conn, usedPrefix, command }) => {
let q = m.quoted ? m.quoted : m
let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
if (!/video|audio/.test(mime)) throw `Responde a un video o audio`
let media = await q.download?.()
if (!media && !/video/.test(mime)) throw `*☓ Ocurrió un error inesperado*`
if (!media && !/audio/.test(mime)) throw `*☓ Ocurrió un error inesperado*`
let audio = await toPTT(media, 'mp4')
if (!audio.data && !/audio/.test(mime)) throw `*☓ Ocurrió un error inesperado*`
if (!audio.data && !/video/.test(mime)) throw `*☓ Ocurrió un error inesperado*`
conn.sendFile(m.chat, audio.data, 'error.mp3', '', m, true, { mimetype: 'audio/mp4' })
}
handler.help = ['tovn']
handler.tags = ['tools']
handler.command = /^tovn|vn|ptt$/i
export default handler
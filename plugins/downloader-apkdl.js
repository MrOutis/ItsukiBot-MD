import { search, download } from 'aptoide-scraper'
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
if (!text) throw `Qué Apk esta buscando?`   
conn.reply(m.chat, global.wait, m)
try {
switch(command) {
case 'dapk2': case 'modapk': case 'apkdl': case 'apk':
let data5 = await download(text)
if ( data5.size.replace(' MB' , '') > 999) return await conn.sendMessage(m.chat, { text: '*el archivo sobre pasa mis limites :v*' }, { quoted: m } )
if ( data5.size.includes('GB')) return await conn.sendMessage(m.chat, { text: '*Pesa mucho tu apkb:/*' }, { quoted: m } )
await conn.sendMessage(m.chat, { document: { url: data5.dllink }, mimetype: 'application/vnd.android.package-archive', fileName: data5.name + '.apk', caption: null }, { quoted: m })   
break    
}} catch {
throw `*☓ Ocurrió un error inesperado*\n\nrecuerda ingresar nombre de un Apk`
}}  
handler.help = ['apkdl']
handler.tags = ['downloader']
handler.command = /^(apkdl|apk|apkmod|modapk|dapk2|aptoide|aptoidedl)$/i
handler.register = true 
handler.limit = 5
export default handler
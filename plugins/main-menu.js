import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let tags = {
'main': 'Info 🧇',
'game': 'Juegos 🎮',
'sticker': 'Stickers 🧩',
'jadibot': 'Sub Bots 🤖',
'econ': 'Economía 💰',
'rg': 'Registro ✍',
'marker': 'Logo - maker 🎨',
'nable': 'Activadores 🛎️',
'group': 'Grupos 👥',
'downloader': 'Descargas 📥',
'search': 'Buscador 🔎',
'img': 'Imágenes 🌠',
'tools': 'Herramientas ⚙️',
'fun': 'Diverción 🎡',
'audio': 'Efecto de Audios 🔉', 
'database': 'Almacenamiento 📂',
'nsfw': 'Nsfw 🔞',
'owner': 'Creador 🐈',
'advanced': 'Abanzado 💠',
}

const defaultMenu = {
before: `
*꒷꒦꒷꒷꒦꒷꒦꒷꒷꒦꒷꒦꒷꒦꒷꒷꒦꒷꒷꒦꒷꒷꒦꒷꒦꒷꒦꒷꒦꒷*

“ Hola *%name 👋🏻*, Cómo se encuentra el día de hoy? ”

\t\t\t乂 *I N F O  -  U S E R*
🍬 *Nombre* : %name
🍬 *Diamantes* : %limit
🍬 *Nivel* : %level
🍬 *XP* : %totalexp

 \t\t\t乂 *I N F O  -  B O T*
🍬 *Usuarios* : %totalreg
🍬 *Regs* : %rtotalreg
🍬 *Hora* : %time 

 \t\t\t乂 *I N F O  -  N P M*
🍬 *Nombre* : %npmname
🍬 *Description* : %npmdesc
🍬 *Versión* : %version
🍬 *Main* : %npmmain
🍬 *Autor* : %author
🍬 *Licencia* : %license


“ Si encuentrɑ un error en lɑ bot reportɑr con el comɑndo *%preport* ”
%readmore 
*Ժ╴ ╴ ╴ ╴ ╴ ╴ ╴ ╴ ╴ ╴ ╴ ╴ ╴ ╴*

\t\t\t*L I S T A  -  M E N U S*
`.trimStart(),
header: '*≡ %category*\nᅠ┌─',
body: 'ᅠ│∙ *%cmd*\n',
footer: 'ᅠ╰•\n╴',
after: '',
}

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
try {
let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
let { exp, limit, level, role } = global.db.data.users[m.sender]
let { min, xp, max } = xpRange(level, global.multiplier)
let name = await conn.getName(m.sender)
let d = new Date(new Date + 3600000)
let locale = 'es'
let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, {
day: 'numeric',
month: 'long',
year: 'numeric'
})
let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
day: 'numeric',
month: 'long',
year: 'numeric'
}).format(d)
let time = d.toLocaleTimeString(locale, {
hour: 'numeric',
minute: 'numeric',
second: 'numeric'
})
let _uptime = process.uptime() * 1000
let _muptime
if (process.send) {
process.send('uptime')
_muptime = await new Promise(resolve => {
process.once('message', resolve)
setTimeout(resolve, 1000)
}) * 1000
}
let muptime = clockString(_muptime)
let uptime = clockString(_uptime)
let totalreg = Object.keys(global.db.data.users).length
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
return {
help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
prefix: 'customPrefix' in plugin,
limit: plugin.limit,
premium: plugin.premium,
enabled: !plugin.disabled,
}
})
for (let plugin of help)
if (plugin && 'tags' in plugin)
for (let tag of plugin.tags)
if (!(tag in tags) && tag) tags[tag] = tag
conn.menu = conn.menu ? conn.menu : {}
let before = conn.menu.before || defaultMenu.before
let header = conn.menu.header || defaultMenu.header
let body = conn.menu.body || defaultMenu.body
let footer = conn.menu.footer || defaultMenu.footer
let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `*Creɑted By おDaniel*`) + defaultMenu.after
let _text = [
before,
...Object.keys(tags).map(tag => {
return header.replace(/%category/g, tags[tag]) + '\n' + [
...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
return menu.help.map(help => {
return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
.replace(/%islimit/g, menu.limit ? '˄' : '')
.replace(/%isPremium/g, menu.premium ? '˄' : '')
.trim()
}).join('\n')
}),
footer
].join('\n')
}),
after
].join('\n')
let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
let replace = {
'%': '%',
p: _p, uptime, muptime,
taguser: '@' + m.sender.split("@s.whatsapp.net")[0],
wasp: '@0',
me: conn.getName(conn.user.jid),
npmname: _package.name,
version: _package.version,
npmdesc: _package.description,
npmmain: _package.main,
author: _package.author.name,
license: _package.license,
exp: exp - min,
maxexp: xp,
totalexp: exp,
xp4levelup: max - exp,
github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
readmore: readMore
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    
let pp = './src/menu.jpg'
    
conn.sendFile(m.chat, pp, 'menu.jpg', text.trim(), m)
    
//Menu Url
/*conn.sendMessage(m.chat, {
text: text.trim(),
contextInfo: {
externalAdReply: {
title: 'ItsukiBot - MD',
body: 'Simple WhatsApp Bot',
thumbnailUrl: 'https://telegra.ph/file/79f3c2853c7d4f997def2.jpg',
sourceUrl: '',
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})*/
    
//Menu Gif
//conn.sendMessage(m.chat, { video: { url: 'https://telegra.ph/file/940feafccb26bcb5a0a4c.mp4' }, gifPlayback: true, gifAttribution: ~~(Math.random() * 2), caption: text.trim()}, { quoted: m})
   
    
} catch (e) {
conn.reply(m.chat, '❎ Lo sentimos, el menú tiene un error.', m)
throw e
}}
handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help', 'menú'] 
handler.register = true 
export default handler


const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
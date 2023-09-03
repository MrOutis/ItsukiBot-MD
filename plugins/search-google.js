import {googleIt} from '@bochilteam/scraper';
import google from 'google-it';
import axios from 'axios';
let handler = async (m, { conn, command, args, usedPrefix }) => {
  const fetch = (await import('node-fetch')).default;
  const text = args.join` `;
  if (!text) return conn.reply(m.chat, 'Qué quiere que busque en Google?', m);
const url = 'https://google.com/search?q=' + encodeURIComponent(text);
google({'query': text}).then(res => {
let teks = ``
for (let g of res) {
teks += `_*${g.title}*_\n_${g.link}_\n_${g.snippet}_\n\n`
} 
m.reply(teks)
})
} 
handler.help = ['google'];
handler.tags = ['search'];
handler.command = /^googlef?$/i;
handler.limit = 1
handler.register = true 
export default handler;
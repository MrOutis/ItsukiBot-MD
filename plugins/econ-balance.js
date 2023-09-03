let handler = async (m, {conn, usedPrefix}) => {
	
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let user = global.db.data.users[who]
    if (!(who in global.db.data.users)) throw `✳️ El usuario no se encuentra en mi base de datos`
    let bank = `┌───⊷ *BALANCE* ⊶
▢ *💎Diamantes* : _${user.limit}_
▢ *⬆️XP* : _Total ${user.exp}_
└──────────────

*NOTA :* 
Puedes comprar 💎 diamantes usando los comandos
❏ *${usedPrefix}buy <cantidad>*
❏ *${usedPrefix}buyall*`.trim();
    conn.sendMessage(
    m.chat,
    {
      image: {
        url: "https://telegra.ph/file/e5d939e60854b97f1d9cc.jpg",
      },
      caption: bank,
      contextInfo: {
        externalAdReply: {
          title: gcname,
          sourceUrl: global.linkgc,
          mediaType: 1,
          showAdAttribution: true,
          thumbnailUrl: "https://telegra.ph/file/4a337bdef796355491b43.jpg",
        },
      },
    },
    {
      quoted: m,
    }
  );
}
handler.help = ['balance']
handler.tags = ['econ']
handler.command = ['bal', 'diamantes', 'diamond', 'balance'] 

export default handler
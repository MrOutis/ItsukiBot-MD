let handler = async (m, { conn, participants, groupMetadata, args }) => {
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/avatar_contact.png'
const groupAdmins = participants.filter(p => p.admin)
const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
let text = `\t*‧ 🍭 Lista de administradores\'as 🍭 ‧*

*• Grupo:* ${groupMetadata.subject}
*• Admins:*
${listAdmin}
`
conn.sendFile(m.chat, pp, 'staff.png', text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] })
}

handler.help = ['admins']
handler.tags = ['group']
handler.command = /^(adms|staff|admins|listadmin|administradores)$/i

handler.group = true

export default handler

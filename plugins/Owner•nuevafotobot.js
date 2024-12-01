let handler = async (m, { conn, args, usedPrefix, command }) => {

if (!m.quoted || !m.quoted.mtype.startsWith('image')) {
await m.reply('🚩 Te faltó la *imagen*')
return
}

let media = await m.quoted.download()
if (!media) {
await m.reply('✖️ Hubo un problema al descargar la imagen. Por favor, intenta nuevamente.')
return
}

await conn.updateProfilePicture(conn.user.jid, media)
await m.reply('🍄 Foto de perfil actualizada exitosamente.')
}

handler.tags = ['owner']
handler.help = ['nuevafotobot *<imagen>*']
handler.command = ['nuevafotobot']
handler.owner = true 
export default handler
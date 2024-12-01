import fetch from 'node-fetch'
import { format } from 'util'
let handler = async (m, { text, usedPrefix, command }) => {
    if (!/^https?:\/\//.test(text)) return conn.reply(m.chat, `🍄 Te faltó el *link* de la pagina\n\n✨️Ejemplo:\n> » ${usedPrefix + command} https://github.com`, m, rcanal)
    let _url = new URL(text)
    let url = global.API(_url.origin, _url.pathname, Object.fromEntries(_url.searchParams.entries()), 'APIKEY')
    let res = await fetch(url)
    if (res.headers.get('content-length') > 100 * 1024 * 1024 * 1024) {
        // delete res
        throw `Content-Length: ${res.headers.get('content-length')}`
    }
    if (!/text|json/.test(res.headers.get('content-type'))) return conn.sendFile(m.chat, url, 'file', text, m)
    let txt = await res.buffer()
    try {
        txt = format(JSON.parse(txt + ''))
    } catch (e) {
        txt = txt + ''
    } finally {
        m.reply(txt.slice(0, 65536) + '')
    }
}
handler.help = ['get']
handler.tags = ['owner']
handler.command = ['get', 'getweb']
handler.rowner = true

export default handler
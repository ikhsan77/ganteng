const { ICommand } = require('@jadibot/libs/builders/command')
const { writeExifImg } = require('@jadibot/libs/converter/exif')
const x = require('axios').default

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Sticker',
    description: 'Sticker Maker',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<emoji1>+<emoji2>',
    example: '{prefix}{command} 😅+🤔',
    callback: async ({ msg, client, message, fullArgs }) => {
        const [m1, m2] = fullArgs.split('+')
        if (!m1) return msg.reply('cth: #emojimix 😅+🤔')
        if (!m2) return msg.reply('cth: #emojimix 😅+🤔')

        let { data } = await x.get(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(m1)}_${encodeURIComponent(m2)}`).catch(() => { return msg.reply('Server dalam perbaikkan') })
        if (!data) return msg.reply('Server dalam perbaikkan')
        if (!data.results) return msg.reply('Server dalam perbaikkan')

        for (var i of data.results) {
            let buffer = await writeExifImg(i.url, { packname: 'Fajarara', author: '@shannbot.ofc' })
            await client.sendMessage(msg.from, { sticker: { url: buffer } }, { quoted: message }).catch(() => { return msg.reply('Terjadi kesalahan') })
        }
    },
}

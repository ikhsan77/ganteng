const { ICommand } = require('@libs/builders/command')
const x = require('axios').default
const y = require("@config")
const shanMs = require('ms')
const strnum = require('convert-string-to-number')

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['ytp'],
    category: 'Search',
    description: 'Youtube Play.',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<query>',
    example: '{prefix}{command} melukis senja',
    callback: async ({ msg, client, fullArgs }) => {
        const { data } = await x.get('https://api.lolhuman.xyz/api/ytplay?apikey={apikey}&query={query}'.format({ apikey: y.apikey, query: fullArgs })).catch(() => { return msg.reply('Server dalam perbaikkan') })

        if (!data) return msg.reply('Server dalam perbaikkan')
        if (data.status !== 200) return msg.reply('Query not found')

        let duration = shanMs(strnum.convertStringToNumber(data.result.info.duration.split(":")[0] + data.result.info.duration.split(":")[1] + data.result.info.duration.split(":")[2]) * 600, { long: true })
        let text = `*${data.result.info.title}*

📍 Durasi : ${duration}
📍 Penonton : ${data.result.info.view} views
📍 Link Video : https://www.youtube.com/watch?v=${data.result.info.id}`

        client.sendMessage(msg.from, { image: { url: data.result.info.thumbnail }, caption: text, footer: `© ${y.botName}`, templateButtons: [{ index: 1, quickReplyButton: { displayText: '🎧 Audio', id: `#yta https://www.youtube.com/watch?v=${data.result.info.id}` } }, { index: 2, quickReplyButton: { displayText: '📽️ Video', id: `#ytv https://www.youtube.com/watch?v=${data.result.info.id}` } }], viewOnce: true }).catch(() => { return msg.reply('Terjadi kesalahan') })
    },
}

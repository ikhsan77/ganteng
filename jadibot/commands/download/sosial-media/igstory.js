const { ICommand } = require('@jadibot/libs/builders/command')
const axios = require('axios').default

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['instastory'],
    category: 'Download',
    description: 'Instagram story downloader.',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<username>',
    example: '{prefix}{command} shannbot.ofc',
    callback: async ({ msg, args }) => {
        const config = require(`@jadibot/config-${shannMe}.json`)

        const { data } = await axios.get(`https://api.lolhuman.xyz/api/igstory/${args[0]}?apikey={apikey}`.format({ apikey: config.apikey })).catch(() => { return msg.reply('Username tidak ada') })
        const result = data.result

        for (var i of result) {
            let res = await axios.head(i)
            let mime = res.headers['content-type']

            if (/image/.test(mime)) await msg.replyImage({ url: i }, '_Done by SHANNBot_').catch(() => { return msg.reply('Username tidak valid') })
            if (/video/.test(mime)) await msg.replyVideo({ url: i }, '_Done by SHANNBot_').catch(() => { return msg.reply('Username tidak valid') })
        }
    },
}

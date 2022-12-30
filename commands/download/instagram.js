const { ICommand } = require('@libs/builders/command')
const axios = require('axios').default
const { apikey } = require('@config')

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['ig', 'igdl'],
    category: 'Download',
    description: 'Instagram video downloader',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<link>',
    example: '{prefix}{command} https://www.instagram.com/xxxx',
    callback: async ({ msg, args }) => {
        let { data } = await axios.get('https://api.lolhuman.xyz/api/instagram?apikey={apikey}&url={url}'.format({ apikey, url: args[0] })).catch(() => { return msg.reply('Link tidak valid') })
        if (data.status !== 200) return msg.reply('link tidak valid')

        for (var i of data.result.media) {
            let res = await axios.head(i)
            let mime = res.headers['content-type']

            if (/image/.test(mime)) msg.replyImage({ url: i }, data.result.caption).catch(() => { return msg.reply('Link tidak valid') })
            else if (/video/.test(mime)) msg.replyVideo({ url: i }, data.result.caption).catch(() => { return msg.reply('Link tidak valid') })
            else msg.reply('Link tidak valid')
        }
    },
}

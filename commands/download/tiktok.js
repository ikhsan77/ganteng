const { ICommand } = require('@libs/builders/command')
const axios = require('axios').default
const { apikey } = require('@config')

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['tt', 'ttdl'],
    category: 'Download',
    description: 'Tiktok video downloader',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<link>',
    example: '{prefix}{command} https://vt.tiktok.com/ZSwWCk5o/',
    callback: async ({ msg, args }) => {
        let { data } = await axios.get('https://api.lolhuman.xyz/api/tiktok?apikey={apikey}&url={url}'.format({ apikey, url: args[0] })).catch(() => { return msg.reply('link tidak valid') })

        msg.replyVideo({ url: (data.result.link ? data.result.link : '') }, `Download from ${args[0]}`).catch(() => { return msg.reply('Terjadi kesalahan saat mengirim media') })
    },
}

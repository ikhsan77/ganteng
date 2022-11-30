const { ICommand } = require('@libs/builders/command')
const { downloader } = require('xfarr-api')
const axios = require('axios').default

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['twitterdl', 'twdl'],
    category: 'Download',
    description: '-',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<link>',
    example: '{prefix}{command} https://twitter.com/gofoodindonesia/status/1229369819511709697',
    callback: async ({ msg, client, args }) => {
        const result = await downloader.twitter(args[0])
        if (!result) return msg.reply('Server sedang dalam perbaikkan')
        if (!result.quality_720 && !result.quality_360 && !result.quality_270) return msg.reply('Link tidak valid')

        let url = result.quality_720 ? result.quality_720 : result.quality_360 ? result.quality_360 : result.quality_270
        let res = await axios.head(url)
        let mime = res.headers['content-type']

        if (mime.split("/")[0] === "video") return msg.replyVideo({ url }, '_Done by SHANNBot_').catch(() => { return msg.reply('terjadi kesalahan') })
        if (mime.split("/")[0] === "image") return msg.replyImage({ url }, '_Done by SHANNBot_').catch(() => { return msg.reply('terjadi kesalahan') })
    },
}

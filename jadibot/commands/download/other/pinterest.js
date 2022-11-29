const { ICommand } = require('@jadibot/libs/builders/command')
const axios = require('axios').default
const x = require('xfarr-api')

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['pinterestdl', 'pin'],
    category: 'Download',
    description: 'Downloader Pinterest',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<link>',
    example: '{prefix}{command} https://www.pinterest.com/xxx',
    callback: async ({ msg, args }) => {
        let result = await x.downloader.pinterestdl(args[0])
        let res = await axios.head(result[0].url)
        let mime = res.headers['content-type']

        await msg.replyDocument({ url: result[0].url }, mime, `shannDev.${mime.split('/')[1]}`).catch(() => { return msg.reply('Link tidak valid') })
    }
}
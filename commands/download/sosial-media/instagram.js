const { ICommand } = require('@libs/builders/command')
const axios = require('axios').default
const x = require('xfarr-api')

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
        let { media } = await x.downloader.instagram(args[0])
        let res = await axios.head(media[0].url)
        let mime = res.headers['content-type']
        
        for (var i of media) {
            if (/image/.test(mime)) msg.replyImage({ url: i.url }, '_Done by SHANNBot_').catch(() => { return msg.reply('Link tidak valid') })
            else if (/video/.test(mime)) msg.replyVideo({ url: i.url }, '_Done by SHANNBot_').catch(() => { return msg.reply('Link tidak valid') })
            else msg.reply('Link tidak valid')
        }
    },
}

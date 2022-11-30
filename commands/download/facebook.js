const { ICommand } = require('@libs/builders/command')
const axios = require('axios').default
const config = require('@config')

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['facebookdl', 'fb', 'fbdl'],
    category: 'Download',
    description: 'Facebook video downloader',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<link>',
    example: '{prefix}{command} https://www.facebook.com/reel/455053933435576?ref=share&s=yWDuG2&fs=e',
    callback: async ({ msg, args }) => {
        const { data } = await axios.get('https://api.lolhuman.xyz/api/facebook?apikey={apikey}&url={url}'.format({ apikey: config.apikey, url: args[0] })).catch(() => { return msg.reply('Link tidak valid') })

        let res = await axios.head(data.result)
        let mime = res.headers['content-type']

        if (/video/.test(mime)) return msg.replyVideo({ url: (data.result ? data.result : '') }, "_Done by SHANNBot_").catch(() => { return msg.reply('Terjadi Kesalahan') })
        if (/image/.test(mime)) return msg.replyImage({ url: (data.result ? data.result : '') }, "_Done by SHANNBot_").catch(() => { return msg.reply('Terjadi Kesalahan') })
    }
}
const { ICommand } = require('@libs/builders/command')
const axios = require('axios').default
const config = require('@config')

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['spotifydl'],
    category: 'Download',
    description: '-',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<link>',
    example: '{prefix}{command} https://open.spotify.com/track/0ZEYRVISCaqz5yamWZWzaA',
    callback: async ({ msg, args }) => {
        const { data } = await axios.get('https://api.lolhuman.xyz/api/spotify?apikey={apikey}&url={url}'.format({ apikey: config.apikey, url: args[0] })).catch(() => { return msg.reply('Link tidak valid') })

        await msg.replyAudio({ url: (data.result.link ? data.result.link : '') }, "_Done by SHANNBot_").catch(() => { return msg.reply('Terjadi Kesalahan') })
    }
}
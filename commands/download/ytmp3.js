const { ICommand } = require('@libs/builders/command')
const x = require('axios').default
const c = require("@config")

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['yta', 'ytaudio'],
    category: 'Download',
    description: 'Youtube audio downloader',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<link>',
    example: '{prefix}{command} https://www.youtube.com/watch?v=eZskFo64rs8',
    callback: async ({ msg, args }) => {
        const { data } = await x.get('https://api.lolhuman.xyz/api/ytaudio?apikey={apikey}&url={url}'.format({ apikey: c.apikey, url: args[0] })).catch(() => { return msg.reply('Link tidak valid') })
        if (data.status !== 200) return msg.reply('Link tidak valid')

        msg.replyAudio({ url: data.result.link.link }).catch(() => { return msg.reply('Terjadi kesalahan') })
    },
}

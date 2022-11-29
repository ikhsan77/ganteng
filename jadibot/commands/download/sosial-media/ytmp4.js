const { ICommand } = require('@jadibot/libs/builders/command')
const x = require('axios').default

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['ytv', 'ytvideo'],
    category: 'Download',
    description: 'Youtube audio downloader',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<link>',
    example: '{prefix}{command} https://www.youtube.com/watch?v=eZskFo64rs8',
    callback: async ({ msg, args, shannMe }) => {
        const c = require(`@jadibot/config-${shannMe}.json`)

        const { data } = await x.get('https://api.lolhuman.xyz/api/ytvideo?apikey={apikey}&url={url}'.format({ apikey: c.apikey, url: args[0] })).catch(() => { return msg.reply('Server sedang dalam perbaikkan') })
        if (!data) return msg.reply('Server sedang dalam perbaikkan')
        if (data.status !== 200) return msg.reply('Link tidak valid')

        msg.replyVideo({ url: data.result.link.link }, '_Done by SHANNBot_').catch(() => { return msg.reply('Server sedang dalam perbaikkan') })
    },
}

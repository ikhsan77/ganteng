const { youtube } = require('@libs/utils/scrapper/download/youtube')
const { ICommand } = require('@libs/builders/command')

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
        const result = await youtube(args[0], 'mp3')
        if (!result) return msg.reply('Server sedang dalam perbaikkan')
        if (!result.link) return msg.reply('Link tidak valid')

        await msg.replyAudio({ url: result.link })
    },
}

const { ICommand } = require('@libs/builders/command')
const xfarr = require('xfarr-api')

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
        const result = await xfarr.downloader.tiktok(args[0])
        if (!result) return msg.reply('Server sedang dalam perbaikkan')
        if (!result.media.length) return msg.reply('Link tidak valid')

        return msg.replyVideo({ url: (result.media[1] ? result.media[1].url : '') }, `Download from ${args[0]}`).catch(() => { return msg.reply('Terjadi kesalahan saat mengirim media') })
    },
}

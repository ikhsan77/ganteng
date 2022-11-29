const { ICommand } = require('@jadibot/libs/builders/command')
const exec = require('xfarr-api')

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['imdbdl'],
    category: 'Download',
    description: 'Downloader IMDB',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<link>',
    example: '{prefix}{command} https://www.facebook.com/reel/455053933435576?ref=share&s=yWDuG2&fs=e',
    callback: async ({ msg, args }) => {
        await exec.downloader.imdb(args[0]).then(({ medias }) => {
            msg.replyVideo({ url: medias[0].url }, '_Done by SHANNBot_')
        }).catch(() => { return msg.reply('Link tidak valid') })
    }
}
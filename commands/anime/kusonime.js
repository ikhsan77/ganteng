const { ICommand } = require('@libs/builders/command')
const { search } = require('caliph-api')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Anime',
    description: 'Anime Search',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<title>',
    example: '{prefix}{command} Bleach',
    callback: async ({ msg, fullArgs }) => {
        let { result } = await search.kusonime(fullArgs)
        if (!result) return msg.reply('Server dalam perbaikkan')

        let shannMsg = `*${result.judul}*\n\nGenre: ${result.genre}\nStatus: ${result.status}\nProduser: ${result.produser}\nRate: ${result.rate}\nType: ${result.type}\nLink: ${result.link}\n\n${result.desk}`
        msg.replyImage({ url: result.thumb }, shannMsg).catch(() => { return msg.reply('Terjadi kesalahan') })
    }
}
const { ICommand } = require('@libs/builders/command')
const dhn = require('dhn-api')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Search',
    description: '-',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<title>',
    example: '{prefix}{command} pengabdi setan',
    callback: async ({ msg, fullArgs }) => {
        let result = await dhn.LayarKaca21(fullArgs)
        if (!result) return msg.reply('Server dalam perbaikkan')
        if (!result[0]) return msg.reply('Movie not found')

        for (let i of result) {
            msg.replyImage({ url: i.film_thumb }, `Title: ${i.film_title}\nLink: ${i.film_link}`).catch(() => { return msg.reply('Terjadi kesalahan') })
        }
    },
}

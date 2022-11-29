const { ICommand } = require('@jadibot/libs/builders/command')
const x = require('mumaker')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Maker',
    description: 'Candy maker',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<text>',
    example: '{prefix}{command} shannbot',
    callback: async ({ msg, fullArgs }) => {
        const url = await x.textpro(`https://textpro.me/create-christmas-candy-cane-text-effect-1056.html`, fullArgs)

        msg.replyImage({ url }).catch(() => { return msg.reply('Terjadi kesalahan') })
    }
}
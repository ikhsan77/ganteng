const { ICommand } = require('@jadibot/libs/builders/command')
const x = require('mumaker')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Maker',
    description: 'Blackpink maker',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<text>',
    example: '{prefix}{command} shannbot',
    callback: async ({ msg, fullArgs }) => {
        const url = await x.textpro(`https://textpro.me/create-blackpink-logo-style-online-1001.html`, fullArgs)

        msg.replyImage({ url }).catch(() => { return msg.reply('Terjadi kesalahan') })
    }
}
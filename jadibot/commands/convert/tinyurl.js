const { ICommand } = require('@jadibot/libs/builders/command')
const x = require('tinyurl')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Convert',
    description: 'Shorterner URL',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<url>',
    example: '{prefix}{command} https://yourweb.site/',
    callback: async ({ msg, fullArgs }) => {
        const link = await x.shorten(fullArgs)

        msg.reply(link).catch(() => { return msg.reply('Terjadi kesalahan') })
    }
}
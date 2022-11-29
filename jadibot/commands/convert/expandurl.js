const { ICommand } = require('@jadibot/libs/builders/command')
const x = require('caliph-api')

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
        const { result } = await x.tools.expandurl(fullArgs)

        msg.reply(result).catch(() => { return msg.reply('Terjadi kesalahan') })
    }
}
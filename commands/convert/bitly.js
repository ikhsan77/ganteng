const { ICommand } = require('@libs/builders/command')
const BitlyClient = require('bitly').BitlyClient
const x = new BitlyClient('3680511149167fdd418027ff9d13369470616db7');

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
        const { link } = await x.shorten(fullArgs)

        msg.reply(link).catch(() => { return msg.reply('Terjadi kesalahan') })
    }
}
const { ICommand } = require('@libs/builders/command')
const x = require('axios').default

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Convert',
    description: 'Shortener URL',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<url>',
    example: '{prefix}{command} https://yourweb.site/',
    callback: async ({ msg, fullArgs }) => {
        const { data } = await x.get(`https://cutt.ly/api/api.php?key=903869065d29e23455ddca922071f4bbeb133&short=${fullArgs}`).catch(() => {return msg.reply('Terjadi kesalahan')})

        msg.reply(data.url.shortLink).catch(() => { return msg.reply('Terjadi kesalahan') })
    }
}
const { ICommand } = require('@libs/builders/command')
const x = require('xfarr-api')

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['noveltoon'],
    category: 'Search',
    description: 'Noveltoons Search',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<title>',
    example: '{prefix}{command} love',
    callback: async ({ msg, fullArgs }) => {
        let result = await x.search.noveltoons(fullArgs)
        let shannMsg = `「 SUKSES MENDAPATKAN DATA 」`

        for (var i of result) {
            shannMsg += `\n\n──────────────────────`
            shannMsg += `\n\nJudul: ${i.judul}`
            shannMsg += `\nLike: ${i.like}`
            shannMsg += `\nGenre: ${i.genre}`
            shannMsg += `\nLink: ${i.url}`
        }

        msg.reply(shannMsg).catch(() => { return msg.reply('Terjadi kesalahan') })
    },
}

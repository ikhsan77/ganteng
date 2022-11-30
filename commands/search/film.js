const { ICommand } = require('@libs/builders/command')
const { search } = require('xfarr-api')

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
    callback: async ({ msg, client, fullArgs }) => {
        let result = await search.film(fullArgs)
        if (!result) return msg.reply('Server dalam perbaikkan')

        let shannMsg = `「 SUKSES MENDAPATKAN DATA 」`
        for (let i of result) {
            shannMsg += `\n\n──────────────────────\n\nJudul: ${i.judul}\nQuality: ${i.quality}\nType: ${i.type}\nRelease: ${i.upload}\nLink: ${i.link}`
        }

        msg.reply(shannMsg).catch(() => { return msg.reply('Terjadi kesalahan') })
    },
}

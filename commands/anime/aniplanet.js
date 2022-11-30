const { ICommand } = require('@libs/builders/command')
const { AniPlanetSearch } = require('dhn-api')

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
        let result = await AniPlanetSearch(fullArgs)
        if (!result) return msg.reply('Server dalam perbaikkan')
        if (!result[0]) return msg.reply('Anime not found')

        let shannMsg = `「 SUKSES MENDAPATKAN DATA 」`
        for (var i of result) {
            shannMsg += `\n\n──────────────────────`
            shannMsg += `\n\n⦿ Name: ${i.manga_name}`
            shannMsg += `\n⦿ Link: ${i.manga_url}`
        }

        msg.reply(shannMsg).catch(() => { return msg.reply('Terjadi kesalahan') })
    }
}
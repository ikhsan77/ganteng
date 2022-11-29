const { ICommand } = require('@jadibot/libs/builders/command')
const { anime } = require('xfarr-api')

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
        let result = await anime.anime(fullArgs)
        if (!result) return msg.reply('Server dalam perbaikkan')
        if (!result[0]) return msg.reply('Anime not found')

        let shannMsg = `「 SUKSES MENDAPATKAN DATA 」`
        for (var i of result) {
            shannMsg += `\n\n──────────────────────`
            shannMsg += `\n\n⦿ Judul: ${i.judul}`
            shannMsg += `\n⦿ Link: ${i.link}`
        }

        msg.replyImage({ url: result[0].thumbnail }, shannMsg).catch(() => { return msg.reply('Terjadi kesalahan') })
    }
}
const { ICommand } = require('@libs/builders/command')
const { writeExifImg, writeExifVid } = require('@libs/converter/exif')
const i18n = require('i18n')
const fs = require('fs')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Sticker',
    description: 'Sticker Maker',
    premiumOnly: true,
    minArgs: 1,
    expectedArgs: '<pack>|<author>',
    example: '{prefix}{command} Fajarara|@shannbot.ofc',
    waitMessage: true,
    callback: async ({ msg, client, message, fullArgs }) => {
        const file = (await msg.download('buffer')) || (msg.quoted && (await msg.quoted.download('buffer')))
        if (msg.typeCheck.isSticker || msg.typeCheck.isQuotedSticker) {
            let [m1, m2] = fullArgs.split('|')
            if (!m1) return msg.reply('*#xample:* #take Fajarara|@shannbot.ofc')
            if (!m2) return msg.reply('*#xample:* #take Fajarara|@shannbot.ofc')

            await fs.writeFileSync('database/src/shanndev.webp', file)

            let buffer = await writeExifImg('database/src/shanndev.webp', { packname: m1, author: m2 })
            if (!buffer) return msg.reply('Server dalam perbaikkan')

            await fs.unlinkSync('database/src/shanndev.webp')
            client.sendMessage(msg.from, { sticker: { url: buffer } }, { quoted: message })
        } else return msg.reply(i18n.__('sticker.no_media'))
    },
}

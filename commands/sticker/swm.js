const { ICommand } = require('@libs/builders/command')
const { writeExifImg, writeExifVid } = require('@libs/converter/exif')
const i18n = require('i18n')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Sticker',
    description: 'Sticker Maker',
    minArgs: 1,
    expectedArgs: '<pack>|<author>',
    example: '{prefix}{command} Fajarara|@shannbot.ofc',
    waitMessage: true,
    callback: async ({ msg, client, message, prefix, command, fullArgs }) => {
        const file = (await msg.download('buffer')) || (msg.quoted && (await msg.quoted.download('buffer')))

        let [m1, m2] = fullArgs.split('|')
        if (!m1) return msg.reply('*example:* #take Fajarara|@shannbot.ofc')
        if (!m2) return msg.reply('*example:* #take Fajarara|@shannbot.ofc')

        if (msg.typeCheck.isImage || msg.typeCheck.isQuotedImage) {
            let buffer = await writeExifImg(file, { packname: m1, author: m2 })
            await client.sendMessage(msg.from, { sticker: { url: buffer } }, { quoted: message })
        } else if (msg.typeCheck.isVideo || msg.typeCheck.isQuotedVideo) {
            let buffer = await writeExifVid(file, { packname: m1, author: m2 })
            await client.sendMessage(msg.from, { sticker: { url: buffer } }, { quoted: message })
        } else {
            msg.reply(i18n.__('sticker.no_media'))
        }
    },
}

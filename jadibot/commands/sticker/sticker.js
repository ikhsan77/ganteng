const { ICommand } = require('@jadibot/libs/builders/command')
const { writeExifImg, writeExifVid } = require('@libs/converter/exif')
const i18n = require('i18n')

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['s', 'stiker', 'sgif', 'stikergif'],
    category: 'Sticker',
    description: 'Sticker Maker',
    waitMessage: true,
    callback: async ({ msg, client, message, prefix, command }) => {
        const file = (await msg.download('buffer')) || (msg.quoted && (await msg.quoted.download('buffer')))
        if (msg.typeCheck.isImage || msg.typeCheck.isQuotedImage) {
            let buffer = await writeExifImg(file, { packname: 'Fajarara', author: '@shannbot.ofc' })
            await client.sendMessage(msg.from, { sticker: { url: buffer } }, { quoted: message })
        } else if (msg.typeCheck.isVideo || msg.typeCheck.isQuotedVideo) {
            let buffer = await writeExifVid(file, { packname: 'Fajarara', author: '@shannbot.ofc' })
            await client.sendMessage(msg.from, { sticker: { url: buffer } }, { quoted: message })
        } else {
            msg.reply(i18n.__('sticker.no_media'))
        }
    },
}

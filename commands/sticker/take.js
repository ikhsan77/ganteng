const { ICommand } = require('@libs/builders/command')
const { writeExifImg, writeExifVid } = require('@libs/converter/exif')
const i18n = require('i18n')
const axios = require('axios').default
const { UploadFileUgu } = require('@libs/converter/upload')
const { up } = require('@database/migrations/20220822141103_users')

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

            if (!msg.quoted.message.stickerMessage.isAnimated) {
                let buffer = await writeExifImg(file, { packname: m1, author: m2 })
                if (!buffer) return msg.reply('Server dalam perbaikkan')

                client.sendMessage(msg.from, { sticker: { url: buffer } }, { quoted: message }).catch(() => { return msg.reply('Terjadi kesalahan') })
            } else if (msg.quoted.message.stickerMessage.isAnimated) {
                let url = await UploadFileUgu(file)
                let res = await axios({ method: 'get', url: url.url, headers: { 'DNT': 1, 'Upgrade-Insecure-Request': 1, }, responseType: 'arraybuffer' })

                let buffer = await writeExifVid(res.data, { packname: m1, author: m2 })
                if (!buffer) return msg.reply('Server dalam perbaikkan')

                client.sendMessage(msg.from, { sticker: { url: buffer } }, { quoted: message }).catch(() => { return msg.reply('Terjadi kesalahan') })
            }

        } else return msg.reply(i18n.__('sticker.no_media'))
    },
}

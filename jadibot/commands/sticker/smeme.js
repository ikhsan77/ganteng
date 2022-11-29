const { ICommand } = require('@jadibot/libs/builders/command')
const { writeExifImg } = require('@libs/converter/exif')
const fs = require('fs')
const { TelegraPh } = require('@libs/converter/upload')
const axios = require('axios').default

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Sticker',
    description: 'Sticker Maker',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<Teks 1>|<Teks 2>',
    example: '{prefix}{command} Ayolo|Wkwk',
    callback: async ({ msg, client, message, fullArgs }) => {
        const file = (await msg.download('buffer')) || (msg.quoted && (await msg.quoted.download('buffer')))
        if (msg.typeCheck.isImage || msg.typeCheck.isQuotedImage) {
            let [m1, m2] = fullArgs.split('|')
            if (!m2) {
                m1 = '-'
                m2 = fullArgs
            }

            let mee = 'shannSmeme.jpg'
            fs.writeFileSync(mee, file)

            let mem = await TelegraPh(mee)
            let smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(m1)}/${encodeURIComponent(m2)}.png?background=${mem}`
            let { data } = await axios({ method: 'get', url: smeme, headers: { 'DNT': 1, 'Upgrade-Insecure-Request': 1 }, responseType: 'arraybuffer' })

            fs.unlinkSync(mee)
            let buff = await writeExifImg(data, { packname: 'Fajarara', author: '@shannbot.ofc' })
            await msg.replySticker({ url: buff }).catch(() => { return msg.reply('Terjadi kesalahan') })
        } else return msg.reply('Send/Reply image dengan caption #smeme')

    },
}

const { ICommand } = require('@libs/builders/command')
const x = require('axios').default
const { TelegraPh } = require('@libs/converter/upload')
const fs = require('fs')
const { apikey } = require('@config')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Anime',
    description: 'Anime',
    waitMessage: true,
    callback: async ({ msg, client, message, fullArgs }) => {
        if (msg.typeCheck.isImage || msg.typeCheck.isQuotedImage) {
            let image = (await msg.download('buffer')) || (msg.quoted && (await msg.quoted.download('buffer')))
            let media = 'database/src/whatanime.jpg'
            await fs.writeFileSync(media, image)

            let buffer = await TelegraPh(media)
            if (!buffer) return msg.reply('Server dalam perbaikkan')
            msg.replyImage({ url: 'https://api.lolhuman.xyz/api/imagetoanime?apikey={apikey}&img={buffer}'.format({ apikey, buffer }) }, 'awikwok').catch(() => { return msg.reply('gabisa') })
        }
    },
}

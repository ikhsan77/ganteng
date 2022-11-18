const { ICommand } = require('@libs/builders/command')
const axios = require('axios').default
const i18n = require('i18n')
const fs = require('fs')
const { TelegraPh } = require('@libs/converter/upload')
const { apikey } = require('@config')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Anime',
    description: 'Anime Search',
    waitMessage: true,
    callback: async ({ msg, client, message, prefix, command }) => {
        const file = (await msg.download('buffer')) || (msg.quoted && (await msg.quoted.download('buffer')))
        if (msg.typeCheck.isImage || msg.typeCheck.isQuotedImage) {
            let media = 'database/src/whatanime.jpg'
            await fs.writeFileSync(media, file)

            let buffer = await TelegraPh(media)
            if (!buffer) return msg.reply('Server dalam perbaikkan')

            let { data } = await axios.get('https://api.lolhuman.xyz/api/wait?apikey={apikey}&img={buffer}'.format({ apikey, buffer })).catch(() => { return msg.reply('Server dalam perbaikkan') })
            if (data.status !== 200) return msg.reply('Anime not found')

            let shannMsg = `[ *${data.result.title_romaji}* ]
            
Menit : ${data.result.at}
Episode : ${data.result.episode}
Similarity : ${data.result.similarity}
Video : ${data.result.video}
`
            msg.replyVideo({ url: data.result.video }, shannMsg).catch(() => { return msg.reply('Terjadi kesalahan') })
        } else {
            msg.reply(i18n.__('sticker.no_media'))
        }
    },
}

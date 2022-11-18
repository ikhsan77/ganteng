const { ICommand } = require('@libs/builders/command')

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['texttospeak'],
    category: 'Convert',
    description: 'Text to Audio',
    waitMessage: true,
    callback: async ({ msg, client, message, fullArgs }) => {
        let [m1, m2] = fullArgs.split('|')
        if (!m1) return msg.reply('*Example: #tts id|Hallo semuanya*')
        if (!m2) return msg.reply('*Example: #tts id|Hallo semuanya*')

        msg.replyAudio({ url: `https://api.lolhuman.xyz/api/gtts/${m1}?apikey=SHANNBot-APIKEY&text=${m2}` }).catch(() => { return msg.reply('Kode bahasa tidak diketahui, silahkan coba lagi.') })
    }
}
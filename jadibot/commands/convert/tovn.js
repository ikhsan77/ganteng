const { ICommand } = require('@jadibot/libs/builders/command')
const { toPTT } = require('@jadibot/libs/converter/convert')

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['toptt'],
    category: 'Convert',
    description: 'MP4 to PTT',
    waitMessage: true,
    callback: async ({ msg, client, message }) => {
        const media = (await msg.download('buffer')) || (msg.quoted && (await msg.quoted.download('buffer')))

        if (msg.typeCheck.isVideo || msg.typeCheck.isQuotedVideo) {
            const result = await toPTT(media, 'mp4')
            await client.sendMessage(msg.from, { audio: result, mimetype: 'audio/mpeg', ptt: true }, { quoted: message }).catch(() => { return msg.reply('Terjadi kesalahan') })
        } else return msg.reply('Send/reply video dengan caption #tovn')
    }
}
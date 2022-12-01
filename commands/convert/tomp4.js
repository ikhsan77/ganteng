const { ICommand } = require('@libs/builders/command')
const { webp2mp4File } = require('@libs/converter/upload')
const fs = require('fs')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Convert',
    description: 'Sticker to Mp4',
    waitMessage: true,
    callback: async ({ msg, client, message }) => {
        const media = (await msg.download('buffer')) || (msg.quoted && (await msg.quoted.download('buffer')))

        if (msg.typeCheck.isQuotedSticker) {
            await fs.writeFileSync('database/src/shanndev.webp', media)
            const { result } = await webp2mp4File('database/src/shanndev.webp')
            if (!result) return msg.reply('server dalam perbaikkan')

            client.sendMessage(msg.from, { video: { url: result }, caption: '_Done by SHANNBot_' }, { quoted: message }).catch(() => { return msg.reply('Server dalam perbaikkan') })
            await fs.unlinkSync('database/src/shanndev.webp')
        } else return msg.reply('Send/reply video dengan caption #tomp4')
    }
}
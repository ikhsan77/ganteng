const { ICommand } = require('@libs/builders/command')
const { exec } = require("child_process")
const fs = require('fs')

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['toimage'],
    category: 'Convert',
    description: 'Sticker to Image',
    waitMessage: true,
    callback: async ({ msg, client, message }) => {
        const media = (await msg.download('buffer')) || (msg.quoted && (await msg.quoted.download('buffer')))

        if (msg.typeCheck.isQuotedSticker) {
            await fs.writeFileSync('shanndev.webp', media)

            exec(`ffmpeg -i shanndev.webp shanndev.png`, (err) => {
                fs.unlinkSync('shanndev.webp')
                if (err) return msg.reply('Server dalam perbaikkan')

                let buffer = fs.readFileSync('shanndev.png')
                client.sendMessage(msg.from, { image: buffer, caption: '_Done by SHANNBot_' }, { quoted: message }).catch(() => { return msg.reply('Server dalam perbaikkan') })

                fs.unlinkSync('shanndev.png')
            })
        } else return msg.reply('Send/reply video dengan caption #toimg')
    }
}
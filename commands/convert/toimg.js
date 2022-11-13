const { ICommand } = require('@libs/builders/command')
const { exec, spawn, execSync } = require("child_process")
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
            await fs.writeFileSync('database/src/shanndev.webp', media)

            exec(`ffmpeg -i 'database/src/shanndev.webp' 'database/src/shanndev.png'`, (err) => {
                fs.unlinkSync('database/src/shanndev.webp')
                if (err) return msg.reply('Server dalam perbaikkan')

                let buffer = fs.readFileSync('database/src/shanndev.png')
                client.sendMessage(msg.from, { image: { url: buffer }, caption: '_Done by SHANNBot_' }, { quoted: message }).catch(() => { return msg.reply('Server dalam perbaikkan') })

                fs.unlinkSync('database/src/shanndev.png')
            })
        } else return msg.reply('Send/reply video dengan caption #tovn')
    }
}
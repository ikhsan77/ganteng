const { ICommand } = require('@libs/builders/command')
const { exec } = require('child_process')
const fs = require('fs')
const fileType = require('file-type')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Convert',
    description: '-',
    waitMessage: true,
    callback: async ({ msg, client, message }) => {
        if (msg.typeCheck.isAudio || msg.typeCheck.isQuotedAudio) {
            let media = (await msg.download('buffer')) || (msg.quoted && (await msg.quoted.download('buffer')))
            let type = await fileType.fromBuffer(media)

            let random = Math.floor(Math.random() * 9999999)
            let path = random + '.' + type.ext
            let path2 = random + '.mp3'

            fs.writeFileSync(path, media)

            exec(`ffmpeg -i ${path} -af equalizer=f=54:width_type=o:width=2:g=20 ${path2}`, (err, stderr, stdout) => {
                fs.unlinkSync(path)
                if (err) return msg.reply('server dalam perbaikkan')

                let buff = fs.readFileSync(path2)
                msg.replyAudio(buff)

                fs.unlinkSync(path2)
            })
        } else return msg.reply('reply audio dengan caption #bass')
    }
}
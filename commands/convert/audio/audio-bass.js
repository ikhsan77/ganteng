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
        let media = (await msg.download('buffer')) || (msg.quoted && (await msg.quoted.download('buffer')))
        let type = await fileType.fromBuffer(media)
        let path = `shanndev.${type.ext}`
        let path2 = 'shanndev.mp3'
        let set = '-af equalizer=f=54:width_type=o:width=2:g=20'

        if (msg.typeCheck.isAudio || msg.typeCheck.isQuotedAudio) {
            fs.writeFileSync(path, media)

            exec(`ffmpeg -i ${path} ${set} ${path2}`, (err, stderr, stdout) => {
                fs.unlinkSync(path)
                if (err) return msg.reply('server dalam perbaikkan')

                let buff = fs.readFileSync(path2)
                client.sendMessage(msg.from, { audio: { url: path2 }, mimetype: 'audio/mpeg' }, { quoted: message }).catch(() => {
                    fs.unlinkSync(path2)
                    return msg.reply('terjadi kesalahan')
                })

                fs.unlinkSync(path2)
            })
        } else return msg.reply('reply audio dengan caption #bass')
    }
}
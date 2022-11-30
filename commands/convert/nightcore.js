const { ICommand } = require('@libs/builders/command')
const { exec } = require('child_process')
const fs = require('fs')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Convert',
    description: '-',
    waitMessage: true,
    callback: async ({ msg, client, message }) => {
        let media = (await msg.download('buffer')) || (msg.quoted && (await msg.quoted.download('buffer')))
        let path = 'shanndev.ogg'
        let path2 = 'shanndev.mp3'
        let set = '-filter:a atempo=1.06,asetrate=44100*1.25'

        if (msg.typeCheck.isAudio || msg.typeCheck.isQuotedAudio) {
            fs.writeFileSync(path, media)

            exec(`ffmpeg ${path} ${set} ${path2}`, (err, stderr, stdout) => {
                fs.unlinkSync(path)
                if (err) return msg.reply('server dalam perbaikkan')

                let buff = fs.readFileSync(path2)
                client.sendMessage(msg.from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted: message }).then(() => { fs.unlinkSync(path2) }).catch(() => {
                    fs.unlinkSync(path2)
                    return msg.reply('terjadi kesalahan')
                })
            })
        } else return msg.reply('reply audio dengan caption #bass')
    }
}
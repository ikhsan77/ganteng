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
            let path = `shanndev.${type.ext}`
            let path2 = 'shanndev.mp3'
            let set = '-filter:a atempo=1.06,asetrate=44100*1.25'

            if (type.ext !== 'opus') return msg.reply('reply vn dengan caption ini')
            fs.writeFileSync(path, media)

            exec(`ffmpeg -i ${path} ${set} ${path2}`, (err, stderr, stdout) => {
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
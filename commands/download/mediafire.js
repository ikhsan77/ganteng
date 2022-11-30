const { ICommand } = require('@libs/builders/command')
const axios = require('axios').default
const x = require('caliph-api')

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['mediafiredl'],
    category: 'Download',
    description: 'Downloader Mediafire',
    minArgs: 1,
    expectedArgs: '<link>',
    example: '{prefix}{command} https://www.mediafire.com/file/xxxx',
    callback: async ({ msg, args }) => {
        let { result } = await x.downloader.mediafire(args[0])
        let res = await axios.head(result.link)
        let mime = res.headers['content-type']

        msg.reply(`*SEDANG DIPROSES!*

📍 Nama File : ${result.filename}
📍 Tipe File : ${result.filetype}
📍 Ukuran File : ${result.filesize}
📍 Tanggal Upload: ${result.uploadAt}

*Mohon tunggu, sedang mengirim file*`)

        await msg.replyDocument({ url: result.link }, mime, result.filename).catch(() => { return mime.reply('Link tidak valid') })
    }
}
const { ICommand } = require('@libs/builders/command')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Gabut',
    description: '-',
    minArgs: 1,
    expectedArgs: '<title>',
    example: '{prefix}{command} saya menang ?',
    callback: async ({ msg, fullArgs }) => {
        let bisakah = ['Bisa', 'bisa', 'Coba Saja', 'Pasti Bisa', 'Mungkin Saja', 'Tidak Bisa', 'Tidak Mungkin', 'Coba Ulangi', 'Ngimpi kah?', 'yakin bisa?']
        let random = bisakah[Math.floor(Math.random() * bisakah.length)]
        let jawab = `*Bisakah ${fullArgs}*\n\nJawabannya : ${random}`

        msg.reply(jawab).catch(() => { return msg.reply('terjadi kesalahan') })
    },
}

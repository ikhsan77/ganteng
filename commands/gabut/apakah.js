const { ICommand } = require('@libs/builders/command')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Gabut',
    description: '-',
    minArgs: 1,
    expectedArgs: '<title>',
    example: '{prefix}{command} saya akan menang',
    callback: async ({ msg, fullArgs }) => {
        let apakah = ['Iya', 'Tidak', 'Bisa Jadi', 'Coba Ulangi', 'Mungkin Saja', 'Coba Tanyakan Ayam', 'Iya']
        let random = apakah[Math.floor(Math.random() * apakah.length)]
        let jawab = `*Apakah ${fullArgs}*\n\nJawabannya : ${random}`

        msg.reply(jawab).catch(() => { return msg.reply('terjadi kesalahan') })
    },
}

const { ICommand } = require('@libs/builders/command')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Gabut',
    description: '-',
    minArgs: 1,
    expectedArgs: '<title>',
    example: '{prefix}{command} saya akan menang ?',
    callback: async ({ msg, fullArgs }) => {
        let kapankah = ['Besok', 'Lusa', '1 Menit Lagi', 'Nanti', '4 Hari Lagi', '5 Hari Lagi', '6 Hari Lagi', '1 Minggu Lagi', '2 Minggu Lagi', '3 Minggu Lagi', '1 Bulan Lagi', '2 Bulan Lagi', '3 Bulan Lagi', '4 Bulan Lagi', '5 Bulan Lagi', '6 Bulan Lagi', '1 Tahun Lagi', '2 Tahun Lagi', '3 Tahun Lagi', '4 Tahun Lagi', '5 Tahun Lagi', '6 Tahun Lagi', '1 Abad lagi', '3 Hari Lagi', 'Bulan Depan', 'Nanti', 'Tidak Akan Pernah']
        let random = kapankah[Math.floor(Math.random() * kapankah.length)]
        let jawab = `*Kapan ${fullArgs}*\n\nJawabannya : ${random}`

        msg.reply(jawab).catch(() => { return msg.reply('terjadi kesalahan') })
    },
}
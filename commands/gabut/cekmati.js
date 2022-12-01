const { ICommand } = require('@libs/builders/command')
const axios = require('axios').default

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Gabut',
    description: '-',
    minArgs: 1,
    expectedArgs: '<link>',
    example: '{prefix}{command} nama',
    callback: async ({ msg, fullArgs }) => {
        let { data } = await axios.get(`https://api.agify.io/?name=${fullArgs}`).catch(() => { return msg.reply('terjadi kesalahan') })
        let jawab = (`Nama : ${data.name}\n*Mati Pada Umur :* ${data.age} Tahun.\n\n_Cepet Cepet Tobat Bro_\n_Soalnya Mati ga ada yang tau_`)

        msg.reply(jawab).catch(() => { return msg.reply('terjadi kesalahan') })
    },
}

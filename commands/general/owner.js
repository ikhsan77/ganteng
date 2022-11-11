const { ICommand } = require('@libs/builders/command')
const config = require('@config')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'About',
    description: 'Show owner this bot.',
    callback: async ({ msg }) => {
        return msg.reply(`Perkenalkan saya *Fajar Khairul Ikhsan*, Saya seorang Laki-laki yang suka mengeksplorasi diri sendiri di bidang Teknologi.

Berinovasi dalam memecahkan masalah melalui program kode sangat menyenangkan dan menantang.

*Instagram:* @shannbot.ofc
*Saweria:* https://saweria.co/SHANNBot
*Req Fitur?* https://wa.me/6285781183473`)
    },
}

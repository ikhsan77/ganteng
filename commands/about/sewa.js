const { ICommand } = require('@libs/builders/command')

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['premium'],
    category: 'About',
    description: 'Sewa bot.',
    callback: async ({ msg, message }) => {
        const shannMsg = `*LIST HARGA*
15k/Bulan

*Catatan:*
- Lakukan konfirmasi pembayaran melalui #owner
- Payment Dana/ShopeePay/BCA`

        return msg.replyImage({ url: 'https://i.ibb.co/n17DNS6/20221121-151853.jpg' }, shannMsg)
    },
}

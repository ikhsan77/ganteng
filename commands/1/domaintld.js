const { ICommand } = require('@libs/builders/command')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Store',
    description: 'List Harga Akun Premium',
    callback: async ({ msg }) => {
        let shannMsg = `Ready domain TLD (.com .net .biz .org)
Harga : Rp 65.000

Payment Tersedia: BCA/DANA/SHOPEEPAY/QRIS
Untuk pembelian silahkan kamu bisa langsung chat ke nomor di bawah ini:
wa.me/6285781183473`

        msg.reply(shannMsg)
    },
}

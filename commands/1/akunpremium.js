const { ICommand } = require('@libs/builders/command')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Store',
    description: 'List Harga Akun Premium',
    callback: async ({ msg }) => {
        let shannMsg = `𝙇𝙄𝙎𝙏 𝙃𝘼𝙍𝙂𝘼
        
Youtube Premium
- 4 Bulan (Cust) 8.000
- 4 Bulan (Seller) 10.000

Apple Music
- 3-4 Bulan 15.000

Canva Premium
- 1 Bulan 3.000
- 1 Tahun 10.000

Payment Tersedia: BCA/DANA/SHOPEEPAY/QRIS
Untuk pembelian silahkan kamu bisa langsung chat ke nomor di bawah ini:
wa.me/6285781183473`

        msg.reply(shannMsg)
    },
}

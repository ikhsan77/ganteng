const { ICommand } = require('@libs/builders/command')

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['premium'],
    category: 'About',
    description: 'Sewa bot.',
    callback: async ({ msg, message }) => {
        const shannMsg = `Halo @${msg.senderNumber}

Apa itu premium? yaitu pengguna membayar terlebih dahulu (membeli) untuk dapat mengakses dan memperoleh manfaat dari fitur tertentu.

Premium/sewa juga berarti membantu (Support) Creator dalam mengembangkan bot. Jika kamu ingin upgrade ke user premium, silahkan cek info pembayaran dibawah

𝙋𝙍𝙊𝙈𝙊
=> Rp 5.000 | 1 Bulan

𝙇𝙄𝙎𝙏 𝙃𝘼𝙍𝙂𝘼
=> Rp 5.000 | 1 Hari
=> Rp 8.000 | 1 Minggu
=> Rp 15.000 | 1 Bulan

untuk pembelian kamu bisa langsung melakukan pembayaran melalui link berikut:
=> https://saweria.co/SHANNBot

setelah melakukan pembayaran, kirimkan bukti pembayaran ke #creator dan kirim formulir seperti berikut:
Nama:
Paket:
Nomor WA:

Informasi:
1. Jika ingin sewa, pastikan sudah fiks order dan semua member wajib paham apa itu bot dan bagaimana cara menggunakannya.
2. Jika masa sewa sudah habis, bot tidak dikeluarkan dari group kamu (permanen)
3. Jika kamu sebelumnya membeli paket premium dengan harga promo/diskon, jangan khawatir karna harga promo/diskon bisa diperpanjang dengan harga yg sama dengan harga dibulan pertama`

        return msg.replyWithMentions(shannMsg, [msg.sender], message)
    },
}

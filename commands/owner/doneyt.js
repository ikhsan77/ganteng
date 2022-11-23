const { ICommand } = require('@libs/builders/command')
const knex = require('@database/connection')
const { sleep } = require("@libs/converter/convert")

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Owner',
    description: 'Update list pending youtube premium',
    ownerOnly: true,
    callback: async ({ msg, client }) => {
        let event = await knex('claimyt').where({ status: 'pending' })
        if (!event) return msg.reply('Belum ada yg claim')

        for (var i of event) {
            await sleep(3000)
            await knex('claimyt').where({ email: i.email, status: 'pending' }).first().update('status', 'complete')
                .then(() => {
                    client.sendMessage(i.jid + '@s.whatsapp.net', { image: { url: 'https://telegra.ph/file/af99e1e804a79d444220f.jpg' }, caption: `Hallo @${i.jid} Youtube Premium kamu sudah selesai diproses.\n\nSilahkan cek gmail dan klik *Terima Undangan* seperti gambar di atas, lalu ikuti langkah-langkahnya\n\nIkuti kami terus agar kamu tidak ketinggalan info menarik selanjutnya.\n\nFacebook: https://bit.ly/3S8oic\nInstagram: https://bit.ly/3ezdFOQ\n\nTerimakasih.`, mentions: [i.jid + '@s.whatsapp.net'] }).catch((err) => { return m.reply('terjadi kesalahan') })
                })
                .catch(() => { return msg.reply('terjadi kesalahan') })
        }

        msg.reply('sukses mengirim pesan ke ' + event.length + ' orang')
    }
}
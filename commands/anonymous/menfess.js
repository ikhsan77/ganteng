const { ICommand } = require('@libs/builders/command')
const knex = require('@database/connection')
const x = require('validasi-nomor-telpon')
const y = require('validator')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Anonymous',
    description: 'Send your secret message',
    privateOnly: true,
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<number>|<pesan>',
    example: '{prefix}{command} 62xxxx|halo',
    callback: async ({ msg, client, args }) => {
        let users = await knex('users').where({ user_jid: msg.senderNumber }).first()
        let file = (await msg.download('buffer')) || (msg.quoted && (await msg.quoted.download('buffer')))
        let mon = args.join(' ')
        let m1 = mon.split('|')[0]
        let m2 = mon.split('|')[1]

        if (!m2) return msg.reply(`cth: #menfess 6282xxxxx|pesan`)

        let hpNya = await x.validasiNomor(m1)
        if (hpNya === 'awali dengan 62') return msg.reply('pastikan nomor hp berawalan 62')

        let isHp = await y.isNumeric(m1, 'ar')
        if (!isHp) return msg.reply(`nomor tujuan salah, pastikan tidak ada simbol dan spasi pada nomor tujuan`)

        let mq1 = m1 + '@s.whatsapp.net'
        let pjtxt = `Hi saya Bot, seseorang Kirim Pesan Untuk Kamu\n\nIsi Pesan:\n${m2}\n\n_*Geser ke kanan untuk membalas >>>*_`

        await knex('menfess').insert({ room_a: msg.senderNumber, room_b: m1, message: m2, status: true }).then(async () => {
            if (users.user_premium) {
                if (msg.typeCheck.isImage || msg.typeCheck.isQuotedImage) {
                    return client.sendMessage(mq1, { image: file, caption: pjtxt }).then(() => { return msg.reply('Berhasil mengirim pesan.') }).catch(() => { return msg.reply('gagal mengirim pesan') })
                } else if (msg.typeCheck.isVideo || msg.typeCheck.isQuotedVideo) {
                    return client.sendMessage(mq1, { video: file, caption: pjtxt }).then(() => { return msg.reply('Berhasil mengirim pesan.') }).catch(() => { return msg.reply('gagal mengirim pesan') })
                } else if (msg.typeCheck.isAudio || msg.typeCheck.isQuotedAudio) {
                    let msgNya = await client.sendMessage(mq1, { audio: file })
                    return client.sendMessage(mq1, { text: pjtxt }, { quoted: msgNya }).then(() => { return msg.reply('Berhasil mengirim pesan.') }).catch(() => { return msg.reply('gagal mengirim pesan') })
                } else if (msg.typeCheck.isSticker || msg.typeCheck.isQuotedSticker) {
                    let msgNya = await client.sendMessage(mq1, { sticker: file })
                    return client.sendMessage(mq1, { text: pjtxt }, { quoted: msgNya }).then(() => { return msg.reply('Berhasil mengirim pesan.') }).catch(() => { return msg.reply('gagal mengirim pesan') })
                } else if (msg.typeCheck.isContact || msg.typeCheck.isQuotedContact) {
                    let msgNya = await client.sendMessage(mq1, { contacts: { displayName: msg.quoted.message.contactMessage.displayName, contacts: [{ vcard: msg.quoted.message.contactMessage.vcard }] } })
                    return client.sendMessage(mq1, { text: pjtxt }, { quoted: msgNya }).then(() => { return msg.reply('Berhasil mengirim pesan.') }).catch(() => { return msg.reply('gagal mengirim pesan') })
                } else {
                    return client.sendMessage(mq1, { text: pjtxt }).then(() => { return msg.reply('Berhasil mengirim pesan.') }).catch(() => { return msg.reply('gagal mengirim pesan') })
                }
            } else if (!users.user_premium) {
                return client.sendMessage(mq1, { text: pjtxt }).then(() => { return msg.replyImage({ url: 'https://i.ibb.co/3YZCYw6/20221115-221911-0000.png' }, 'Berhasil mengirim pesan.\n\nIngin mengirim Media ke orang yang kamu suka ? Ayo upgrade ke premium agar bisa mengirim pesan media ke orang yang kamu suka!') }).catch(() => { return msg.reply('gagal mengirim pesan') })
            } else {
                msg.reply('?')
            }
        }).catch(() => { return msg.reply('gagal mengirim pesan') })

    }
}
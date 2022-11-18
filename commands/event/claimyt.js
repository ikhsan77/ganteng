const { ICommand } = require('@libs/builders/command')
const knex = require('@database/connection')
const validator = require('validator')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Event',
    description: 'Claim Free Youtube Premium',
    privateOnly: true,
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<email>',
    example: '{prefix}{command} emailkamu@gmail.com',
    callback: async ({ msg, client, fullArgs }) => {
        let check = await validator.isEmail(fullArgs)
        if (!check) return msg.reply('Email tidak valid')

        let mailValid = ['gmail.com']
        if (!mailValid.includes(fullArgs.split('@')[1])) return msg.reply('Email tidak valid')

        let mailInvalid = ['emailkamu@gmail.com', '12@gmail.com', 'emailku@gmail.com', 'email@gmail.com']
        if (mailInvalid.includes(fullArgs)) return msg.reply('Email tidak valid')

        let eventSender = await knex('claimyt').where({ jid: msg.senderNumber, status: 'pending' }).first()
        if (eventSender) return msg.reply('Kamu sudah pernah claim di event kali ini.')

        let eventEmail = await knex('claimyt').where({ email: fullArgs, status: 'pending' }).first()
        if (eventEmail) return msg.reply('Kamu sudah pernah claim di event kali ini.')

        let event = await knex('claimyt').where({ status: 'pending' })
        if (event.length === 10) return msg.reply('Event sudah selesai, silahkan kembali lagi besok')

        await knex('claimyt').insert({ jid: msg.senderNumber, email: fullArgs, status: 'pending' })
            .then(() => {
                let shannMsg = `Halo @${msg.senderNumber}, kamu berhasil claim.
   
𝙀𝙢𝙖𝙞𝙡 : ${fullArgs}
𝙎𝙩𝙖𝙩𝙪𝙨 : 𝙋𝙚𝙣𝙙𝙞𝙣𝙜

𝙔𝙤𝙪𝙩𝙪𝙗𝙚 𝙋𝙧𝙚𝙢𝙞𝙪𝙢 kamu akan segera diproses otomatis oleh 𝘽𝙊𝙏, proses mungkin membutuhkan waktu maksimal 1 hari.

Setelah 𝙔𝙤𝙪𝙩𝙪𝙗𝙚 𝙋𝙧𝙚𝙢𝙞𝙪𝙢 kamu selesai diproses, kamu akan mendapatkan notif lagi dari 𝘽𝙊𝙏.

𝙄𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢: @𝙨𝙝𝙖𝙣𝙣𝙗𝙤𝙩.𝙤𝙛𝙘
𝙁𝙖𝙘𝙚𝙗𝙤𝙤𝙠: 𝙁𝙖𝙟𝙖𝙧 𝙆𝙝𝙖𝙞𝙧𝙪𝙡 𝙄𝙠𝙝𝙨𝙖𝙣
𝙎𝙖𝙬𝙚𝙧𝙞𝙖: https://saweria.co/shannbot`
                client.sendMessage(msg.from, { text: shannMsg, mentions: [msg.sender] })
            })
            .catch(() => { return msg.reply('Error database, silahkan hubungi admin') })
    }
}
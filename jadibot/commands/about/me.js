const { ICommand } = require('@jadibot/libs/builders/command')
const users = require('@jadibot/database/services/users')
const x = require('ms')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'About',
    description: 'Show your stats.',
    callback: async ({ msg, message }) => {
        const user = await users.findOne(msg.senderNumber)
        const shannMsg = `Halo @${msg.senderNumber}

⦿ Number : ${user.user_jid}
⦿ Status : ${user.user_premium ? 'Premium' : 'Free'}${user.user_premium ? '\n⦿ Expired : ' + x(user.user_premium_end - Date.now(), { long: true }) : ''}
⦿ Registered : ${user.user_create_at} ${user.user_premium ? '\n\n_Terimakasih sudah berlanggalan premium di SHANNBot_' : '\n\n_Ingin bisa akses semua fitur dan juga add bot ke group kamu ? #sewa_'}`

        return msg.replyWithMentions(shannMsg, [msg.from], message)
    },
}

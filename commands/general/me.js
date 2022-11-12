const { ICommand } = require('@libs/builders/command')
const users = require('@database/services/users')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'About',
    description: 'Show your stats.',
    callback: async ({ msg }) => {
        const user = await users.findOne(msg.senderNumber)
        return msg.reply(`
User Number : ${user.user_jid}
User Limit : ${user.user_limit}
User Level : Lv. ${user.user_level}
User Exp : ${user.user_exp} XP
User Premium : ${user.user_premium ? 'Yes' : 'No'}
User Registered At : ${user.user_create_at}
`)
    },
}

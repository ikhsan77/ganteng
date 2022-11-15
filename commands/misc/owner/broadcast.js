const { ICommand } = require('@libs/builders/command')
const knex = require('@database/connection')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Owner',
    description: 'Broadcast message',
    ownerOnly: true,
    waitMessage: true,
    callback: async ({ msg, client, fullArgs }) => {
        let users = await knex('users')
        if (!users) return msg.reply('Database kosong')

        for (var i of users) {
            await client.sendMessage(i.user_jid + '@s.whatsapp.net', { text: fullArgs })
        }

        msg.reply('Berhasil mengirim pesan ke ' + users.length + ' user')
    },
}

const { ICommand } = require('@libs/builders/command')
const knex = require('@database/connection')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Premium',
    description: 'Join group by link.',
    premiumOnly: true,
    minArgs: 1,
    expectedArgs: '<link>',
    example: '{prefix}{command} https://chat.whatsapp.com/xxx',
    callback: async ({ msg, client, args }) => {
        let user = await knex('users').where({ user_jid: msg.senderNumber }).first()
        if (!user) return msg.reply('Nomor kamu belum terdaftar di database')
        if (user.group_id !== '-' && user.group_id2 !== '-') return msg.reply('Limit kamu menambahkan bot ke group sudah habis.')

        let id = await client.groupGetInviteInfo(args[0].replace('https://chat.whatsapp.com/', ''))
        if (user.group_id === '-') {
            client.groupAcceptInvite(args[0].replace('https://chat.whatsapp.com/', '')).then(async () => {
                await knex('users').where({ user_jid: user.user_jid }).first().update('group_id', id.id).then(() => {
                    return msg.reply('Join success.')
                }).catch(() => { return msg.reply('Failed') })
            }).catch(() => { return msg.reply('Failed') })
        } else if (user.group_id !== '-' && user.group_id2 === '-') {
            client.groupAcceptInvite(args[0].replace('https://chat.whatsapp.com/', '')).then(async () => {
                await knex('users').where({ user_jid: user.user_jid }).first().update('group_id2', id.id).then(() => {
                    return msg.reply('Join success.')
                }).catch(() => { return msg.reply('Failed') })
            }).catch(() => { return msg.reply('Failed') })
        } else return msg.reply('Limit kamu menambahkan bot ke group sudah habis.')
    },
}

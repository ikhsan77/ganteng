const { ICommand } = require('@libs/builders/command')
const knex = require('@database/connection')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Group',
    description: 'Add participants group',
    adminOnly: true,
    groupOnly: true,
    callback: async ({ msg, client }) => {
        let m1 = await knex('users').where({ group_id: msg.from }).first()
        let m2 = await knex('users').where({ group_id2: msg.from }).first()

        if (m1) {
            await knex('users').where({ group_id: msg.from }).first().update('group_id', '-').then(async () => {
                client.groupLeave(msg.from)
            }).catch(() => { return msg.reply('failed...') })
        } else if (m2) {
            await knex('users').where({ group_id2: msg.from }).first().update('group_id2', '-').then(async () => {
                client.groupLeave(msg.from)
            }).catch(() => { return msg.reply('failed...') })
        } else return msg.reply('failed...')
    },
}

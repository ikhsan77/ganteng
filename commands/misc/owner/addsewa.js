const { ICommand } = require('@libs/builders/command')
const moment = require('moment-timezone')
const config = require('@config')
const users = require('@database/services/users')
const knex = require('@database/connection')
const x = require('ms')
const z = require('convert-string-to-number')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Owner',
    description: 'Add premium user',
    ownerOnly: true,
    minArgs: 2,
    expectedArgs: '<number> <date>',
    example: '{prefix}{command} 62xxxx',
    callback: async ({ msg, client, args }) => {
        let db = await users.findOne(args[0])
        if (!db) return msg.reply('data tidak ditemukan')
        if (db.user_premium) {
            knex('users').where({ user_jid: args[0] }).update('user_premium_end', db.user_premium_end + x(args[1])).then((a) => {
                msg.reply('done')
            })
        } else if (!db.user_premium) {
            knex('users').where({ user_jid: args[0] }).update('user_premium', true)
                .then(async () => {
                    knex('users').where({ user_jid: args[0] }).update('user_premium_end', x(args[1]) + Date.now()).then((a) => {
                        msg.reply('done')
                    })
                })
        } else return msg.reply('?')
    },
}

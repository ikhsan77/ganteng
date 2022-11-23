const { ICommand } = require('@libs/builders/command')
const moment = require('moment-timezone')
const config = require('@config')
const users = require('@database/services/users')
const knex = require('@database/connection')
const x = require('ms')
const { convertStringToNumber } = require('convert-string-to-number')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Owner',
    description: 'Delete premium user',
    ownerOnly: true,
    minArgs: 1,
    expectedArgs: '<number>',
    example: '{prefix}{command} 62xxxx',
    callback: async ({ msg, client, args }) => {
        let db = await users.findOne(args[0])
        if (!db) return msg.reply('data tidak ditemukan')

        if (db.user_premium) {
            knex('users').where({ user_jid: args[0] }).update('user_premium', false)
                .then(async () => {
                    knex('users').where({ user_jid: args[0] }).update('user_premium_end', 0).then((a) => {
                        msg.reply('done')
                        client.sendMessage(args[0] + '@s.whatsapp.net', { text: '```Premium kamu sudah habis```' })
                    })
                })
        } else return msg.reply('data tidak ditemukan')
    },
}

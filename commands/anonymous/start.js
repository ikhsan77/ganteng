const { ICommand } = require('@libs/builders/command')
const knex = require('@database/connection')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Anonymous',
    description: 'Send your secret message',
    privateOnly: true,
    callback: async ({ msg, client }) => {
        let users = await knex('anonymous').where({ room_a: msg.from, status: 'chatting' }).first()
        let finds = await knex('anonymous').where({ room_b: msg.from, status: 'chatting' }).first()

        if (users) return msg.reply('Kamu sedang berada dalam sesi anonymous')
        if (finds) return msg.reply('Kamu sedang berada dalam sesi anonymous')

        let kosong = await knex('anonymous').where({ room_b: 'kosong', status: 'chatting' }).first()
        if (kosong) {
            await knex('anonymous').where({ room_b: 'kosong', status: 'chatting' }).first().update('room_b', msg.from)
                .then(() => {
                    msg.reply('```Partner ditemukan```')
                    return client.sendMessage(kosong.room_a, { text: '```Partner ditemukan```' })
                }).catch(() => { return msg.reply('Terjadi kesalahan') })
        } else if (!kosong) {
            await knex('anonymous').insert({ room_a: msg.from, room_b: 'kosong', status: 'chatting' }).then(() => { return msg.reply('```Mohon tunggu, sedang mencari partner```') }).catch(() => { return msg.reply('Terjadi kesalahan') })
        }
    }
}
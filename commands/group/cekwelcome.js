const { ICommand } = require('@libs/builders/command')
const knex = require('@database/connection')
const config = require('@config')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Group',
    description: 'Welcome Message',
    adminOnly: true,
    groupOnly: true,
    callback: async ({ msg, client, message, args, prefix, command }) => {
        let m1 = await knex('welcome').where({ group_id: msg.from }).first()
        if (!m1) return msg.reply('Group tidak terdaftar')

        if (args.length > 0) {
            if (args[0] === 'shannOn') {
                if (m1.status === 1) return msg.reply('Welcome berhasil dinyalakan')
                await knex('welcome').where({ group_id: msg.from }).first().update('status', 1).then(() => { return msg.reply('Welcome berhasil dinyalakan') }).catch(() => { return msg.reply('Welcome gagal dinyalakan') })
            } else if (args[0] === 'shannOff') {
                if (m1.status === 0) return msg.reply('Welcome berhasil dimatikan')
                await knex('welcome').where({ group_id: msg.from }).first().update('status', 0).then(() => { return msg.reply('Welcome berhasil dimatikan') }).catch(() => { return msg.reply('Welcome gagal dimatikan') })
            }

            return
        }

        let shannMsg = `ππππΎπππ πππππΌππ\n\nβ¦Ώ Type : ${m1.type}\nβ¦Ώ Status : ${(m1.status === 1) ? 'Aktif' : 'Non Aktif'}\nβ¦Ώ Message :\n${m1.message.format({ user: '@' + msg.senderNumber })}`
        if (m1.type === 'text' || m1.type === 'ppuser' || m1.type === 'ppgrup' || m1.type === 'ppgroup') {
            return client.sendMessage(msg.from, {
                text: shannMsg,
                footer: `Β© ${config.botName}`,
                buttons: [
                    { type: 1, buttonText: { displayText: 'ππΌππππΌπ' }, buttonId: prefix + command + ' shannOff' },
                    { type: 1, buttonText: { displayText: 'πππΌππΌππΌπ' }, buttonId: prefix + command + ' shannOn' },
                ],
                mentions: [msg.sender],
            })
        } else if (m1.type === 'image') {
            return client.sendMessage(msg.from, {
                image: { url: m1.media },
                caption: shannMsg,
                footer: `Β© ${config.botName}`,
                buttons: [
                    { type: 1, buttonText: { displayText: 'ππΌππππΌπ' }, buttonId: prefix + command + ' shannOff' },
                    { type: 1, buttonText: { displayText: 'πππΌππΌππΌπ' }, buttonId: prefix + command + ' shannOn' },
                ],
                mentions: [msg.sender],
            })
        } else if (m1.type === 'video') {
            return client.sendMessage(msg.from, {
                video: { url: m1.media },
                caption: shannMsg,
                footer: `Β© ${config.botName}`,
                buttons: [
                    { type: 1, buttonText: { displayText: 'ππΌππππΌπ' }, buttonId: prefix + command + ' shannOff' },
                    { type: 1, buttonText: { displayText: 'πππΌππΌππΌπ' }, buttonId: prefix + command + ' shannOn' },
                ],
                mentions: [msg.sender],
            })
        }
    },
}

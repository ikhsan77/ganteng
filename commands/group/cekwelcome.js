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

        let shannMsg = `𝙒𝙀𝙇𝘾𝙊𝙈𝙀 𝙈𝙀𝙎𝙎𝘼𝙂𝙀\n\n⦿ Type : ${m1.type}\n⦿ Status : ${(m1.status === 1) ? 'Aktif' : 'Non Aktif'}\n⦿ Message :\n${m1.message.format({ user: '@' + msg.senderNumber })}`
        if (m1.type === 'text' || m1.type === 'ppuser' || m1.type === 'ppgrup' || m1.type === 'ppgroup') {
            return client.sendMessage(msg.from, {
                text: shannMsg,
                footer: `© ${config.botName}`,
                buttons: [
                    { type: 1, buttonText: { displayText: '𝙈𝘼𝙏𝙄𝙆𝘼𝙉' }, buttonId: prefix + command + ' shannOff' },
                    { type: 1, buttonText: { displayText: '𝙉𝙔𝘼𝙇𝘼𝙆𝘼𝙉' }, buttonId: prefix + command + ' shannOn' },
                ],
                mentions: [msg.sender],
            })
        } else if (m1.type === 'image') {
            return client.sendMessage(msg.from, {
                image: { url: m1.media },
                caption: shannMsg,
                footer: `© ${config.botName}`,
                buttons: [
                    { type: 1, buttonText: { displayText: '𝙈𝘼𝙏𝙄𝙆𝘼𝙉' }, buttonId: prefix + command + ' shannOff' },
                    { type: 1, buttonText: { displayText: '𝙉𝙔𝘼𝙇𝘼𝙆𝘼𝙉' }, buttonId: prefix + command + ' shannOn' },
                ],
                mentions: [msg.sender],
            })
        } else if (m1.type === 'video') {
            return client.sendMessage(msg.from, {
                video: { url: m1.media },
                caption: shannMsg,
                footer: `© ${config.botName}`,
                buttons: [
                    { type: 1, buttonText: { displayText: '𝙈𝘼𝙏𝙄𝙆𝘼𝙉' }, buttonId: prefix + command + ' shannOff' },
                    { type: 1, buttonText: { displayText: '𝙉𝙔𝘼𝙇𝘼𝙆𝘼𝙉' }, buttonId: prefix + command + ' shannOn' },
                ],
                mentions: [msg.sender],
            })
        }
    },
}

const { ICommand } = require('@jadibot/libs/builders/command')
const knex = require('@jadibot/database/connection')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Group',
    description: 'Antilink Message',
    adminOnly: true,
    groupOnly: true,
    callback: async ({ msg, client, args, prefix, command, shannMe }) => {
        const config = require(`@jadibot/config-${shannMe}.json`)

        let m1 = await knex('antilink').where({ group_id: msg.from }).first()
        if (!m1) return msg.reply('Group tidak terdaftar')

        if (args.length > 0) {
            if (args[0] === 'shannOn') {
                if (m1.status === 1) return msg.reply('Antilink berhasil dinyalakan')
                await knex('antilink').where({ group_id: msg.from }).first().update('status', 1).then(() => { return msg.reply('Antilink berhasil dinyalakan') }).catch(() => { return msg.reply('Antilink gagal dinyalakan') })
            } else if (args[0] === 'shannOff') {
                if (m1.status === 0) return msg.reply('Antilink berhasil dimatikan')
                await knex('antilink').where({ group_id: msg.from }).first().update('status', 0).then(() => { return msg.reply('Antilink berhasil dimatikan') }).catch(() => { return msg.reply('Antilink gagal dimatikan') })
            }

            return
        }

        let shannMsg = `𝘼𝙉𝙏𝙄𝙇𝙄𝙉𝙆 𝙈𝙀𝙎𝙎𝘼𝙂𝙀\n\n⦿ Type : ${m1.type}\n⦿ Status : ${(m1.status === 1) ? 'Aktif' : 'Non Aktif'}\n⦿ Message :\n${m1.message.format({ user: '@' + msg.senderNumber })}`
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

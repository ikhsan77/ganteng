const { ICommand } = require('@libs/builders/command')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Group',
    description: '-',
    groupOnly: true,
    adminOnly: true,
    waitMessage: true,
    callback: async ({ msg, client, fullArgs }) => {
        let participants = msg.isGroup ? await (await client.groupMetadata(msg.from)).participants.map(a => a.id) : '-'
        await client.sendMessage(msg.from, { text: fullArgs ? fullArgs : '', mentions: participants }).catch(() => { return msg.reply('Terjadi kesalahan') })
    }
}
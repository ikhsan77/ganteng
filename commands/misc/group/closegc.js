const { ICommand } = require('@libs/builders/command')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Group',
    description: 'Close group',
    adminOnly: true,
    groupOnly: true,
    callback: async ({ msg, client }) => {
        await client.groupSettingUpdate(m.chat, 'announcement').then((res) => msg.reply('done')).catch((err) => msg.reply('terjadi kesalahan, silahkan hubungi #creator'))
    },
}

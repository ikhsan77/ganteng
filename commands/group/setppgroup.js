const { ICommand } = require('@libs/builders/command')

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['setppgrup', 'setppgc'],
    category: 'Group',
    description: '-',
    groupOnly: true,
    adminOnly: true,
    waitMessage: true,
    callback: async ({ msg, client }) => {
        const file = (await msg.download('buffer')) || (msg.quoted && (await msg.quoted.download('buffer')))

        if (msg.typeCheck.isImage || msg.typeCheck.isQuotedImage) return await client.updateProfilePicture(msg.from, file).then(() => { return msg.reply('Update success.') }).catch(() => { return msg.reply('Update failed.') })
        else return msg.reply('send/reply image dengan caption #setppgrup')
    }
}
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
    minArgs: 1,
    expectedArgs: '<name>',
    example: '{prefix}{command} Nama Group',
    callback: async ({ msg, client, fullArgs }) => {
        await client.groupUpdateSubject(msg.from, fullArgs)
            .then(() => { return msg.reply('Update success.') })
            .catch(() => { return msg.reply('Update failed.') })
    }
}
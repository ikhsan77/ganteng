const { ICommand } = require('@libs/builders/command')
const moment = require('moment-timezone')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Group',
    description: 'Add participants group',
    adminOnly: true,
    groupOnly: true,
    minArgs: 1,
    expectedArgs: '<link>',
    example: '{prefix}{command} @user',
    callback: async ({ msg, client, args }) => {
        let users = msg.quoted ? msg.quoted.sender : args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        await client.groupParticipantsUpdate(msg.from, [users], 'remove').then(() => { return msg.reply('done') }).catch(() => { return msg.reply('failed') })
    },
}

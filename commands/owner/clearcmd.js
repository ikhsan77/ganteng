const { ICommand } = require('@libs/builders/command')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Owner',
    description: 'Check list pending youtube premium',
    ownerOnly: true,
    callback: async ({ msg }) => {
        console.clear()
        msg.reply('ok')
    }
}
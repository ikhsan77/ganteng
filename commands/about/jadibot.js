const { ICommand } = require('@libs/builders/command')
const { jadibot } = require('@libs/myfunc/jadibot')

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['ohayo'],
    premiumOnly: true,
    callback: async ({ msg, client }) => {
        await jadibot(msg, client)
    },
}

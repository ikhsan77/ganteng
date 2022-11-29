const { ICommand } = require('@libs/builders/command')
const { jadibot } = require('@libs/myfunc/jadibot')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Premium',
    description: 'Join group by link.',
    privateOnly: true,
    premiumOnly: true,
    callback: async ({ msg, client }) => {
        await jadibot(msg, client)
    },
}

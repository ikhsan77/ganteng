const { ICommand } = require('@jadibot/libs/builders/command')

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['creator'],
    category: 'About',
    description: 'Show owner this bot.',
    callback: async ({ msg, shannMe }) => {
        const config = require(`@jadibot/config-${shannMe}.json`)

        return msg.reply(config.ownerMessage)
    },
}
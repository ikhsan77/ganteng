const { ICommand } = require('@jadibot/libs/builders/command')
const fs = require('fs')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Owner',
    description: 'Join group by link.',
    ownerOnly: true,
    minArgs: 1,
    expectedArgs: '<link>',
    example: '{prefix}{command} halo saya owner',
    callback: async ({ msg, shannMe, fullArgs }) => {
        const config = require(`@jadibot/config-${shannMe}.json`)

        config.ownerMessage = fullArgs
        fs.writeFileSync(`jadibot/config-${shannMe}.json`, JSON.stringify(config))

        msg.reply('done')
    },
}

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
    example: '{prefix}{command} Fajar|shanndev',
    callback: async ({ msg, shannMe, fullArgs }) => {
        const config = require(`@jadibot/config-${shannMe}.json`)
        let [packname, author] = fullArgs.split('|')
        if (!packname || !author) return msg.reply('cth: #setexif Fajar|shanndev')

        config.packname = packname
        config.author = author
        fs.writeFileSync(`jadibot/config-${shannMe}.json`, JSON.stringify(config))

        msg.reply('done')
    },
}

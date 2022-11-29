const { ICommand } = require('@libs/builders/command')
const users = require('@database/services/users')
const { jadibot } = require('@libs/myfunc/jadibot')

/**
 * @type { ICommand }
 */
module.exports = {
    callback: async ({ msg, message }) => {
        await jadibot(msg)
    }
}

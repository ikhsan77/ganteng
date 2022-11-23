const { ICommand } = require('@libs/builders/command')
const knex = require('@database/connection')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Owner',
    description: 'Check list pending youtube premium',
    ownerOnly: true,
    callback: async ({ msg }) => {
        let event = await knex('claimyt').where({ status: 'pending' })
        if (!event) return msg.reply('Belum ada yg claim')

        let shannMsg = `[ 𝙇𝙞𝙨𝙩 𝙋𝙚𝙣𝙙𝙞𝙣𝙜 ]`
        let obj = []
        for (var i of event) {
            shannMsg += `\n\nEmail : ${i.email}`
            shannMsg += `\nNomor : @${i.jid}`
            shannMsg += `\nStatus : ${i.status}`

            obj.push(i.jid + '@s.whatsapp.net')
        }

        msg.replyWithMentions(shannMsg, obj)
    }
}
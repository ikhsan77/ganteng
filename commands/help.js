const { ICommand } = require('@libs/builders/command')
const { listCommands, commands } = require('@libs/constants/command')
const { timeFormat } = require('@libs/utils')
const moment = require('moment-timezone')
const config = require('@config')

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['menu'],
    callback: async ({ msg, client, message, prefix }) => {
        let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
        let ucapanWaktu = "Selamat " + dt.charAt(0).toUpperCase() + dt.slice(1)
        var text = `Hi ${msg.pushName || `@${msg.senderNumber}`}, ${ucapanWaktu}`

        text += `\n\nšš¢š§ šš”šš¢`
        text += `\nā¦æ Fitur : ${commands.size} Active`
        text += `\nā¦æ Group : https://bit.ly/3E0CRYv`
        text += `\nā¦æ Owner : https://wa.me/6285781183473`
        text += `\nā¦æ Runtime : ${timeFormat(process.uptime())}`

        for (var title in listCommands) {
            text += `\n\n*${title.toUpperCase()}*`
            for (var i of listCommands[title]) {
                text += `\nā¦æ ${prefix + i}`
            }
        }

        return client.sendMessage(msg.from, {
            image: { url: 'https://i.ibb.co/yVhzrjj/20221029-131404.jpg' },
            caption: text,
            footer: `Ā© ${config.botName}`,
            buttons: [
                { type: 1, buttonText: { displayText: 'šš„ššš§š¢š„' }, buttonId: prefix + 'owner' },
            ],
            mentions: [msg.sender],
        })
    },
}

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

        text += `\n\n𝗕𝗢𝗧 𝗜𝗡𝗙𝗢`
        text += `\n⦿ Fitur : ${commands.size} Active`
        text += `\n⦿ Group : https://bit.ly/3E0CRYv`
        text += `\n⦿ Owner : https://wa.me/6285781183473`
        text += `\n⦿ Runtime : ${timeFormat(process.uptime())}`

        for (var title in listCommands) {
            text += `\n\n*${title.toUpperCase()}*`
            for (var i of listCommands[title]) {
                text += `\n⦿ ${prefix + i}`
            }
        }

        return client.sendMessage(msg.from, {
            image: { url: 'https://i.ibb.co/yVhzrjj/20221029-131404.jpg' },
            caption: text,
            footer: `© ${config.botName}`,
            buttons: [
                { type: 1, buttonText: { displayText: '𝗖𝗥𝗘𝗔𝗧𝗢𝗥' }, buttonId: prefix + 'owner' },
            ],
            mentions: [msg.sender],
        })
    },
}

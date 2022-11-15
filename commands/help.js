const { ICommand } = require('@libs/builders/command')
const { listCommands, commands } = require('@libs/constants/command')
const { timeFormat } = require('@libs/utils')
const moment = require('moment-timezone')
const config = require('@config')
const i18n = require('i18n')
const message = require('@libs/handlers/message')

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['menu'],
    callback: async ({ msg, client, args, prefix }) => {
        if (args.length > 0) {
            if (args[0] === 'listmenu') {
                var shannMsg = ``
                for (var title in listCommands) {
                    shannMsg += `╭────✎「 ${title} 」`
                    for (var i of listCommands[title]) {
                        shannMsg += `\n│• #${i}`
                    }
                    shannMsg += `\n╰─────────❍\n`
                }
                shannMsg += `\n#help <command>, untuk mengetahui penjelasan tentang cara penggunaannya.`

                return client.sendMessage(msg.from, { text: shannMsg })
            }

            /**
             * @type { ICommand }
             */
            let command = commands.get(args[0]) || commands.find((v) => v?.aliases?.includes(args[0]))
            if (command) {
                let text = `Halo @${msg.senderNumber}\n\n`
                text += `*⦿ Command :* ${args[0]}\n`
                text += `*⦿ Alias :* ${command?.aliases?.join(', ') || '-'}\n`
                text += `*⦿ Category :* ${command.category}\n`
                text += `*⦿ Description :* ${command.description}\n`
                text += `*⦿ Example :* ${command?.example?.format({ prefix, command: args[0] }) || `${prefix}${args[0]}`}`
                if (command?.groupOnly && command?.adminOnly) text += `\n\nCommand ini hanya dapat digunakan di dalam Group dan Admin Group.`
                if (command?.groupOnly && !command?.adminOnly) text += `\n\nCommand ini hanya dapat digunakan di dalam Group.`
                if (!command?.groupOnly && command?.adminOnly) text += `\n\nCommand ini hanya dapat digunakan oleh Admin Group.`
                if (command?.privateOnly) text += `\n\nCommand ini hanya dapat digunakan di Private Chat`
                if (command?.premiumOnly) text += `\n\nCommand ini hanya dapat digunakan oleh pengguna Premium`
                if (command?.ownerOnly) text += `\n\nCommand ini hanya dapat digunakan oleh Owner`

                return client.sendMessage(msg.from, { text: text.trim(), mentions: [msg.sender] })
            } else {
                return msg.reply('Command not found')
            }
        }

        let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
        let ucapanWaktu = "Selamat " + dt.charAt(0).toUpperCase() + dt.slice(1)
        var text =
            `Hi ${msg.pushName || `@${msg.senderNumber}`}, ${ucapanWaktu}

𝙄𝙉𝙁𝙊 𝘽𝙊𝙏
⦿ Fitur : ${commands.size} Active
⦿ Group : https://bit.ly/3E0CRYv
⦿ Owner : https://wa.me/6285781183473
⦿ Runtime : ${timeFormat(process.uptime())}

𝘾𝙊𝙈𝙈𝘼𝙉𝘿𝙎
⦿ #sewa
⦿ #creator

"Resiko terlalu dispam adalah bot akan mengalami delay/pending, apabila terjadi harap beri jeda hingga kembali normal"

"Beberapa perintah terdapat penjelasan, silahkan ketik #help <command> untuk melihat penjelasannya"`

        return client.sendMessage(msg.from, {
            image: { url: "https://i.ibb.co/yVhzrjj/20221029-131404.jpg" },
            caption: text,
            footer: `© ${config.botName}`,
            templateButtons: [
                { index: 1, quickReplyButton: { displayText: '📖List Menu', id: prefix + 'help listmenu' } },
                { index: 2, quickReplyButton: { displayText: '❗Creator', id: prefix + 'owner' } },
            ],
            viewOnce: true,
            mentions: [msg.sender],
        })
    },
}

const { ICommand } = require('@libs/builders/command')
const { listCommands, commands } = require('@libs/constants/command')
const { timeFormat } = require('@libs/utils')
const moment = require('moment-timezone')
const config = require('@config')
const i18n = require('i18n')

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
                let text = `*➪ Command :* ${args[0]}\n`
                text += `*➪ Alias :* ${command?.aliases?.join(', ') || '-'}\n`
                text += `*➪ Category :* ${command.category}\n`
                if (command?.groupOnly) {
                    text += `*➪ Group Only :* Yes\n`
                }
                if (command?.adminOnly) {
                    text += `*➪ Admin Only :* Yes\n`
                }
                if (command?.privateOnly) {
                    text += `*➪ Private Only :* Yes\n`
                }
                if (command?.premiumOnly) {
                    text += `*➪ Premium Only :* Yes\n`
                }
                if (command?.ownerOnly) {
                    text += `*➪ Owner Only :* Yes\n`
                }
                text += `*➪ Description :* ${command.description}\n`
                text += `*➪ Example :* ${command?.example?.format({ prefix, command: args[0] }) || `${prefix}${args[0]}`}`
                return client.sendMessage(msg.from, {
                    text: text.trim(),
                    templateButtons: [
                        {
                            urlButton: {
                                displayText: 'Copy',
                                url: `https://www.whatsapp.com/otp/copy/${prefix}${args[0]}`,
                            },
                        },
                    ],
                    viewOnce: true,
                })
            } else {
                return msg.reply(i18n.__('command.not_found', { command: args[0] }))
            }
        }

        let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
        let ucapanWaktu = "Selamat " + dt.charAt(0).toUpperCase() + dt.slice(1)
        var text =
            `Hi ${msg.pushName || `@${msg.senderNumber}`}, ${ucapanWaktu}
            
"Sistem otomatis (Whatsapp Bot) yang dapat membantu untuk melakukan sesuatu, mencari dan mendapatkan data atau informasi hanya dengan melalui Whatsapp"

"Resiko terlalu dispam adalah bot akan mengalami delay/pending, apabila terjadi harap beri jeda hingga kembali normal"

*Total command:* 
=> ${commands.size} Aktif

*Bot telah aktif selama*
=> ${timeFormat(process.uptime())}

*Group Official*
=> https://bit.ly/3E0CRYv

*Ingin invite bot ini ke group kamu?*
=> #sewa

*Apabila menemukan error, ada pertanyaan, request fitur*
=> #creator

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

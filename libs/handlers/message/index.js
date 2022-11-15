const { getContentType, MessageUpdateType, WAMessage, WASocket } = require('@adiwajshing/baileys')
const { commands } = require('@libs/constants/command')
const { ICommand } = require('@libs/builders/command')
const { serialize } = require('@libs/utils/serialize')
const { cooldown } = require('@libs/utils/cooldown')
const knex = require('@database/connection')
const users = require('@database/services/users')
const moment = require('moment-timezone')
const config = require('@config')
const chalk = require('chalk')
const i18n = require('i18n')

/**
 *
 * @param { WASocket } client
 * @param { { messages: WAMessage[], type: MessageUpdateType } } param1
 */
module.exports = async (client, { messages, type }) => {
    const message = messages[0]
    if (message.key && message.key.remoteJid === 'status@broadcast') return
    if (!message.message) return

    message.type = getContentType(message.message)
    let body =
        message.message?.conversation ||
        message.message[message.type]?.text ||
        message.message[message.type]?.caption ||
        message.message?.listResponseMessage?.singleSelectReply?.selectedRowId ||
        message.message?.buttonsResponseMessage?.selectedButtonId ||
        message.message?.templateButtonReplyMessage?.selectedId ||
        null
    const isCommand = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^@*&.+-,©^\/]/.test(body)
    client.readMessages([message.key])
    if (message.type === 'protocolMessage' || message.type === 'senderKeyDistributionMessage' || !message.type) return

    const msg = await serialize(message, client)
    if (msg.responseId) {
        msg.body = msg.responseId
    }

    let userPrem = await knex('users').where({ user_premium: true }).first()
    if (userPrem) {
        if (userPrem.user_premium_end <= Date.now()) {
            await knex('users').where({ user_jid: userPrem.user_jid }).update('user_premium', false).then(async () => {
                await knex('users').where({ user_jid: userPrem.user_jid }).update('user_premium_end', 0).then(() => {
                    client.sendMessage(userPrem.user_jid + '@s.whatsapp.net', { text: '```Premium kamu sudah habis```' })
                })
            })
        }
    }

    let userAnom = await knex('anonymous').where({ room_a: msg.from, status: 'chatting' }).first()
    let findAnom = await knex('anonymous').where({ room_b: msg.from, status: 'chatting' }).first()
    if (msg.body !== msg.body[0] + 'skip' && msg.body !== msg.body[0] + 'next' && msg.body !== msg.body[0] + 'leave' && msg.body !== msg.body[0] + 'start') {
        if (userAnom && !findAnom) {
            if (userAnom.room_b !== 'kosong') await client.sendMessage(userAnom.room_b, { text: msg.body })
        } else if (!userAnom && findAnom) {
            await client.sendMessage(findAnom.room_a, { text: msg.body })
        }
    }

    let userMenfess = await knex('menfess').where({ room_b: msg.senderNumber, status: true }).first()
    if (userMenfess && msg.quoted && !msg.isGroup) {
        await knex('menfess').where({ room_b: msg.senderNumber, status: true }).first().update('status', false).then(async (deremol) => {
            let pjtxt = `Kamu mendapat balasan dari\n@${msg.senderNumber}\n\nPesan Kamu:\n${userMenfess.message}\n\nBalasan:\n${msg.body}`
            let file = (await msg.download('buffer')) || (msg.quoted && (await msg.quoted.download('buffer')))

            if (msg.typeCheck.isImage || msg.typeCheck.isQuotedImage) {
                return client.sendMessage(userMenfess.room_a + '@s.whatsapp.net', { image: file, caption: pjtxt, mentions: [msg.sender] }).then(() => { return msg.reply('berhasil mengirim pesan balasan\n\n_tertarik mencoba? ketik #menfess_') }).catch(() => { return msg.reply('gagal mengirim pesan') })
            } else if (msg.typeCheck.isVideo || msg.typeCheck.isQuotedVideo) {
                return client.sendMessage(userMenfess.room_a + '@s.whatsapp.net', { video: file, caption: pjtxt, mentions: [msg.sender] }).then(() => { return msg.reply('berhasil mengirim pesan balasan\n\n_tertarik mencoba? ketik #menfess_') }).catch(() => { return msg.reply('gagal mengirim pesan') })
            } else if (msg.typeCheck.isAudio || msg.typeCheck.isQuotedAudio) {
                let msgNya = await client.sendMessage(userMenfess.room_a + '@s.whatsapp.net', { audio: file })
                return client.sendMessage(userMenfess.room_a + '@s.whatsapp.net', { text: pjtxt, mentions: [msg.sender] }, { quoted: msgNya }).then(() => { return msg.reply('berhasil mengirim pesan balasan\n\n_tertarik mencoba? ketik #menfess_') }).catch(() => { return msg.reply('gagal mengirim pesan') })
            } else if (msg.typeCheck.isSticker || msg.typeCheck.isQuotedSticker) {
                let msgNya = await client.sendMessage(userMenfess.room_a + '@s.whatsapp.net', { sticker: file })
                return client.sendMessage(userMenfess.room_a + '@s.whatsapp.net', { text: pjtxt, mentions: [msg.sender] }, { quoted: msgNya }).then(() => { return msg.reply('berhasil mengirim pesan balasan\n\n_tertarik mencoba? ketik #menfess_') }).catch(() => { return msg.reply('gagal mengirim pesan') })
            } else if (msg.typeCheck.isContact || msg.typeCheck.isQuotedContact) {
                let msgNya = await client.sendMessage(userMenfess.room_a + '@s.whatsapp.net', { contacts: { displayName: msg.quoted.message.contactMessage.displayName, contacts: [{ vcard: msg.quoted.message.contactMessage.vcard }] } })
                return client.sendMessage(userMenfess.room_a + '@s.whatsapp.net', { text: pjtxt, mentions: [msg.sender] }, { quoted: msgNya }).then(() => { return msg.reply('berhasil mengirim pesan balasan\n\n_tertarik mencoba? ketik #menfess_') }).catch(() => { return msg.reply('gagal mengirim pesan') })
            } else {
                return client.sendMessage(userMenfess.room_a + '@s.whatsapp.net', { text: pjtxt, mentions: [msg.sender] }).then(() => { return msg.reply('berhasil mengirim pesan balasan\n\n_tertarik mencoba? ketik #menfess_') }).catch(() => { return msg.reply('gagal mengirim pesan') })
            }
        })

        return
    }

    if (!isCommand) return

    const prefix = isCommand ? msg.body[0] : null
    const args = msg.body?.trim()?.split(/ +/)?.slice(1)
    const command = isCommand ? msg.body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase() : msg.body
    const fullArgs = msg.body?.replace(command, '')?.slice(1)?.trim() || null

    /**
     * @type { ICommand }
     */
    const getCommand = commands.get(command) || commands.find((v) => v?.aliases && v?.aliases?.includes(command))
    if (getCommand) {
        let user = await users.findOne(msg.senderNumber)
        if (!user) {
            await users.create(msg.senderNumber)
            user = await users.findOne(msg.senderNumber)
        }
        i18n.setLocale(user.user_language)

        if (user.user_limit === 0) {
            return msg.reply(i18n.__('message.limit_run_out'))
        }

        const command_log = [chalk.whiteBright('├'), chalk.keyword('aqua')(`[ ${msg.isGroup ? ' GROUP ' : 'PRIVATE'} ]`), msg.body.substr(0, 50).replace(/\n/g, ''), chalk.greenBright('from'), chalk.yellow(msg.senderNumber)]
        if (msg.isGroup) {
            command_log.push(chalk.greenBright('in'))
            command_log.push(chalk.yellow(msg.groupMetadata.subject))
        }
        console.log(...command_log)

        if (getCommand.ownerOnly && !config.ownerNumber.includes(msg.senderNumber)) {
            return msg.reply(i18n.__('message.owner_only'))
        }

        if (getCommand.premiumOnly && !user.user_premium && !config.ownerNumber.includes(msg.senderNumber)) {
            return msg.reply(i18n.__('message.premium_only'))
        }

        if (getCommand.groupOnly && !msg.isGroup) {
            return msg.reply(i18n.__('message.group_only'))
        }

        if (
            getCommand.groupOnly &&
            getCommand.adminOnly &&
            !msg.groupMetadata.participants
                .filter((v) => v.admin)
                .map((v) => v.id)
                .includes(msg.senderNumber + '@s.whatsapp.net')
        ) {
            return msg.reply(i18n.__('message.admin_only'))
        }

        if (getCommand.privateOnly && msg.isGroup) {
            return msg.reply(i18n.__('message.private_only'))
        }

        if (getCommand.minArgs && getCommand.minArgs > args.length) {
            var text = `*Example :* ${getCommand.example}`
            return msg.reply(text.format({ prefix, command, argument: getCommand.expectedArgs }))
        }

        if (getCommand.cooldown) {
            const cooldownBuilder = `${msg.senderNumber}-${command}`
            if (cooldown.get(cooldownBuilder) && cooldown.get(cooldownBuilder) > moment()) {
                const duration = moment.duration(cooldown.get(cooldownBuilder).diff(moment()))
                return msg.reply(i18n.__('message.cooldown', { cooldown: Math.round(duration.asSeconds()) }))
            }
            if (!cooldown.get(cooldownBuilder) || (cooldown.get(cooldownBuilder) && cooldown.get(cooldownBuilder) < moment())) {
                cooldown.set(cooldownBuilder, moment().add(moment.duration(getCommand.cooldown)))
                setTimeout(() => cooldown.delete(cooldownBuilder), getCommand.cooldown)
            }
        }

        if (getCommand.waitMessage) {
            if (typeof getCommand.waitMessage === 'string') {
                await msg.reply(getCommand.waitMessage)
            } else {
                await msg.reply(i18n.__('wait'))
            }
        }

        return getCommand.callback({ client, message, msg, command, prefix, args, fullArgs })
    }
}

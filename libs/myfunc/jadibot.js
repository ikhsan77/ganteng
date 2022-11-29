const { default: WASocket, fetchLatestBaileysVersion, useSingleFileAuthState, DisconnectReason } = require('@adiwajshing/baileys')
const { Utility } = require('@libs/utils/utility')
const logger = require('@libs/utils/logger')
const { messageHandler } = require('@libs/handlers')
const { Boom } = require('@hapi/boom')
const Pino = require('pino')
const knex = require('@database/connection')
const qrcode = require('qrcode')
const fs = require('fs')
const { existsSync } = require('fs')
const store = require('@store')

existsSync('./store/baileys_stores.json') && store.readFromFile('./store/baileys_stores.json')
setInterval(() => {
    store.writeToFile('./store/baileys_stores.json')
}, 60_000)

const utility = new Utility()

const jadibot = async (msg) => {
    const connects = async () => {
        const { state, saveCreds } = await useSingleFileAuthState(`session/${msg.senderNumber}-session.json`)
        const { version, isLatest } = await fetchLatestBaileysVersion()

        const client = WASocket({
            printQRInTerminal: true,
            auth: state,
            logger: Pino({ level: 'silent' }),
            browser: ['shanndev', 'Safari', '1.0'],
            version,
        })

        store.bind(client.ev)

        client.ev.on('creds.update', saveCreds)
        client.ev.on('connection.update', async (up) => {
            const { lastDisconnect, connection, qr } = up

            if (qr) {
                let gambar = await qrcode.toDataURL(qr, { scale: 8 })
                let buffer = new Buffer.from(gambar.replace('data:image/png;base64,', ''), 'base64')
                msg.replyImage(buffer, 'Please scanning QR Code to connect')
            }

            if (connection) {
                msg.reply(`Connection Status: ${connection}`)
            }

            if (connection === 'close') {
                let reason = new Boom(lastDisconnect.error).output.statusCode
                if (reason === DisconnectReason.connectionClosed) {
                    msg.reply('Connection closed, reconnecting....')
                    connects()
                } else if (reason === DisconnectReason.connectionLost) {
                    connects()
                    msg.reply('Connection Lost from Server, reconnecting...')
                } else if (reason === DisconnectReason.restartRequired) {
                    msg.reply('Restart Required, Restarting...')
                    connects()
                } else if (reason === DisconnectReason.timedOut) {
                    connects()
                    msg.reply('Connection TimedOut, Reconnecting...')
                } else {
                    fs.unlinkSync(`session/${msg.senderNumber}-session.json`)
                    client.end()
                }
            }
        })

        // messages.upsert
        client.ev.on('messages.upsert', ({ messages, type }) => {
            if (type !== 'notify') return
            messageHandler(client, { messages, type })
        })

        client.ev.on('group-participants.update', async (anu) => {
            try {
                let participants = anu.participants
                let dbWelcome = await knex('welcome').where({ group_id: anu.id }).first()
                if (!dbWelcome) await knex('welcome').insert({ group_id: anu.id })

                let dbLeave = await knex('leave').where({ group_id: anu.id }).first()
                if (!dbLeave) await knex('leave').insert({ group_id: anu.id })

                for (let num of participants) {
                    try {
                        ppuser = await client.profilePictureUrl(num, 'image')
                    } catch {
                        ppuser = 'https://i.ibb.co/yVhzrjj/20221029-131404.jpg'
                    }

                    try {
                        ppgroup = await client.profilePictureUrl(anu.id, 'image')
                    } catch {
                        ppgroup = 'https://i.ibb.co/yVhzrjj/20221029-131404.jpg'
                    }

                    if (anu.action == 'add') {
                        if (dbWelcome.type === 'text' && dbWelcome.status === 1) {
                            client.sendMessage(anu.id, { text: dbWelcome.message.format({ user: '@' + num.split('@')[0] }), mentions: [num] })
                        } else if (dbWelcome.type === 'image' && dbWelcome.status === 1) {
                            client.sendMessage(anu.id, { image: { url: dbWelcome.media }, caption: dbWelcome.message.format({ user: '@' + num.split('@')[0] }), mentions: [num] })
                        } else if (dbWelcome.type === 'video' && dbWelcome.status === 1) {
                            client.sendMessage(anu.id, { video: { url: dbWelcome.media }, caption: dbWelcome.message.format({ user: '@' + num.split('@')[0] }), mentions: [num] })
                        } else if (dbWelcome.type === 'ppuser' && dbWelcome.status === 1) {
                            client.sendMessage(anu.id, { image: { url: ppuser }, caption: dbWelcome.message.format({ user: '@' + num.split('@')[0] }), mentions: [num] })
                        } else if (dbWelcome.type === 'ppgrup' && dbWelcome.status === 1) {
                            client.sendMessage(anu.id, { image: { url: ppgroup }, caption: dbWelcome.message.format({ user: '@' + num.split('@')[0] }), mentions: [num] })
                        }
                    } else if (anu.action == 'remove') {
                        if (dbLeave.type === 'text' && dbLeave.status === 1) {
                            client.sendMessage(anu.id, { text: dbLeave.message.format({ user: '@' + num.split('@')[0] }), mentions: [num] })
                        } else if (dbLeave.type === 'image' && dbLeave.status === 1) {
                            client.sendMessage(anu.id, { image: { url: dbLeave.media }, caption: dbLeave.message.format({ user: '@' + num.split('@')[0] }), mentions: [num] })
                        } else if (dbLeave.type === 'video' && dbLeave.status === 1) {
                            client.sendMessage(anu.id, { video: { url: dbLeave.media }, caption: dbLeave.message.format({ user: '@' + num.split('@')[0] }), mentions: [num] })
                        } else if (dbLeave.type === 'ppuser' && dbLeave.status === 1) {
                            client.sendMessage(anu.id, { image: { url: ppuser }, caption: dbLeave.message.format({ user: '@' + num.split('@')[0] }), mentions: [num] })
                        } else if (dbLeave.type === 'ppgrup' && dbLeave.status === 1) {
                            client.sendMessage(anu.id, { image: { url: ppgroup }, caption: dbLeave.message.format({ user: '@' + num.split('@')[0] }), mentions: [num] })
                        }
                    }
                }
            } catch (err) {
                msg.reply(err)
            }
        })
    }

    connects()
}

module.exports = { jadibot }
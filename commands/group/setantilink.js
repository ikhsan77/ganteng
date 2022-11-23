const { ICommand } = require('@libs/builders/command')
const knex = require('@database/connection')
const { TelegraPh, UploadFileUgu } = require('@libs/converter/upload')
const fs = require('fs')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Group',
    description: 'Set Antilink group',
    adminOnly: true,
    groupOnly: true,
    minArgs: 1,
    expectedArgs: '<type>|<message>',
    example: '{prefix}{command} <text/image/ppuser/ppgrup/video>|si {user} kirim link',
    callback: async ({ msg, fullArgs }) => {
        let [type, message] = fullArgs.split('|')
        if (!type) return msg.reply('*Example:* image|si {user} kirim link')
        if (!message) return msg.reply('*Example:* image|si {user} kirim link')

        if (type === 'text' || type === 'ppuser' || type === 'ppgrup') {
            let group = await knex('antilink').where({ group_id: msg.from }).first()
            if (!group) {
                await knex('antilink').insert({ group_id: msg.from, type, message }).then(() => { return msg.reply('Message antilink berhasil diperbarui') }).catch(() => { return msg.reply('Message antilink gagal diperbarui') })
            } else if (group) {
                await knex('antilink').where({ group_id: group.group_id }).first().update('type', type).then(async () => {
                    await knex('antilink').where({ group_id: group.group_id }).first().update('message', message).then(async () => { return msg.reply('Message antilink berhasil diperbarui') }).catch(() => { return msg.reply('Message antilink gagal diperbarui') })
                }).catch(() => { return msg.reply('Message antilink gagal diperbarui') })
            }
        } else if (type === 'image') {
            if (msg.typeCheck.isImage || msg.typeCheck.isQuotedImage) {
                let file = (await msg.download('buffer')) || (msg.quoted && (await msg.quoted.download('buffer')))
                let medias = 'shanndev.jpg'

                await fs.writeFileSync(medias, file)
                let media = await TelegraPh(medias)
                if (!media) return msg.reply('Server dalam perbaikkan')

                let group = await knex('antilink').where({ group_id: msg.from }).first()
                if (!group) {
                    await knex('antilink').insert({ group_id: msg.from, type, media, message }).then(() => { return msg.reply('Message antilink berhasil diperbarui') }).catch(() => { return msg.reply('Message antilink gagal diperbarui') })
                } else if (group) {
                    await knex('antilink').where({ group_id: group.group_id }).first().update('type', type).then(async () => {
                        await knex('antilink').where({ group_id: group.group_id }).first().update('media', media).then(async () => {
                            await knex('antilink').where({ group_id: group.group_id }).first().update('message', message).then(async () => { return msg.reply('Message antilink berhasil diperbarui') }).catch(() => { return msg.reply('Message antilink gagal diperbarui') })
                        }).catch(() => { return msg.reply('Message antilink gagal diperbarui') })
                    }).catch(() => { return msg.reply('Message antilink gagal diperbarui') })
                }
            }
        } else if (type === 'video') {
            if (msg.typeCheck.isVideo || msg.typeCheck.isQuotedVideo) {
                let file = (await msg.download('buffer')) || (msg.quoted && (await msg.quoted.download('buffer')))
                let medias = 'shanndev.mp4'

                await fs.writeFileSync(medias, file)
                let media = await UploadFileUgu(medias)
                if (!media) return msg.reply('Server dalam perbaikkan')

                let group = await knex('antilink').where({ group_id: msg.from }).first()
                if (!group) {
                    await knex('antilink').insert({ group_id: msg.from, type, media: media.url, message }).then(() => { return msg.reply('Message antilink berhasil diperbarui') }).catch(() => { return msg.reply('Message antilink gagal diperbarui') })
                } else if (group) {
                    await knex('antilink').where({ group_id: group.group_id }).first().update('type', type).then(async () => {
                        await knex('antilink').where({ group_id: group.group_id }).first().update('media', media.url).then(async () => {
                            await knex('antilink').where({ group_id: group.group_id }).first().update('message', message).then(async () => { return msg.reply('Message antilink berhasil diperbarui') }).catch(() => { return msg.reply('Message antilink gagal diperbarui') })
                        }).catch(() => { return msg.reply('Message antilink gagal diperbarui') })
                    }).catch(() => { return msg.reply('Message antilink gagal diperbarui') })
                }
            }
        }
    },
}

const { ICommand } = require('@libs/builders/command')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Owner',
    description: '-',
    ownerOnly: true,
    cooldown: 60 * 1000,
    callback: async ({ msg, client }) => {
        let getGroups = await client.groupFetchAllParticipating()
        let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
        let anu = groups.map(v => v.id)
        if (!anu) return msg.reply('tidak ada Group')

        for (var i of anu) await client.groupLeave(i).catch(() => { return msg.reply('Terjadi kesalahan') })
        msg.reply('Berhasil keluar dari ' + anu.length + ' Group')
    },
}

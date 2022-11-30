const { ICommand } = require('@libs/builders/command')
const axios = require('axios').default
const { apikey } = require('@config')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Search',
    description: '-',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<title>',
    example: '{prefix}{command} clash of clans',
    callback: async ({ msg, client, fullArgs }) => {
        let { data } = await axios.get('https://api.lolhuman.xyz/api/moddroid?apikey={apikey}&query={query}'.format({ apikey, query: fullArgs })).catch(() => { return msg.reply('data tidak tersedia') })
        if (!data.result[0]) return msg.reply('data tidak tersedia')

        let shannMsg = `「 SUKSES MENDAPATKAN DATA 」`
        for (let i of data.result) {
            shannMsg += `\n\n──────────────────────\n\nName: ${i.name}\nLink: https://moddroid.co${i.link}`
        }

        msg.replyImage({ url: data.result[0].icon }, shannMsg).catch(() => { return msg.reply('terjadi kesalahan') })
    },
}

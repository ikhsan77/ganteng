const { ICommand } = require('@libs/builders/command')
const axios = require('axios').default
const config = require('@config')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Search',
    description: '-',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<title>',
    example: '{prefix}{command} Angin Pujaan Hujan - Payung Teduh',
    callback: async ({ msg, fullArgs }) => {
        let { data } = await axios.get('https://api.lolhuman.xyz/api/jooxplay?apikey={apikey}&query={query}'.format({ apikey: config.apikey, query: fullArgs })).catch(() => { return msg.reply('lagu tidak ditemukan') })
        if (data.status !== 200) return msg.reply('Song not found')

        msg.replyAudio({ url: data.result.audio[0].link }).catch(() => { return msg.reply('Terjadi kesalahan') })
    },
}

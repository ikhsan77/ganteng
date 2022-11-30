const { ICommand } = require('@libs/builders/command')
const axios = require('axios').default
const { apikey } = require('@config')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Search',
    description: 'Instagram Stalking...',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<username>',
    example: '{prefix}{command} shannbot.ofc',
    callback: async ({ msg, client, fullArgs }) => {
        let { data } = await axios.get('https://api.lolhuman.xyz/api/stalkig/{username}?apikey={apikey}'.format({ username: fullArgs, apikey })).catch(() => { return msg.reply('username tidak ditemukan') })
        if (data.status !== 200) return msg.reply(data.message)

        let shannMsg = `[ *${data.result.fullname}* ]

📍 Username : ${data.result.username ? data.result.username : '-'}
📍 Followers : ${data.result.followers ? data.result.followers : '0'}
📍 Following : ${data.result.following ? data.result.following : '0'}
📍 Jumlah Postingan : ${data.result.posts ? data.result.posts : '0'}

${data.result.bio ? data.result.bio : 'Tidak ada bio'}`

        msg.replyImage({ url: data.result.photo_profile }, shannMsg).catch(() => { return msg.reply('terjadi kesalahan') })
    },
}

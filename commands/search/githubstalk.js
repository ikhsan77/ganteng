const { ICommand } = require('@libs/builders/command')
const axios = require('axios').default
const { apikey } = require('@config')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Search',
    description: 'github Stalking...',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<username>',
    example: '{prefix}{command} shannbot.ofc',
    callback: async ({ msg, client, fullArgs }) => {
        let { data } = await axios.get('https://api.lolhuman.xyz/api/github/{username}?apikey={apikey}'.format({ username: fullArgs, apikey })).catch(() => { return msg.reply('Server dalam perbaikkan') })
        if (!data) return msg.reply('Server dalam perbaikkan')
        if (data.status !== 200) return msg.reply(data.message)

        let shannMsg = `[ *${data.result.name}* ]

📍 Email : ${data.result.email ? data.result.email : '0'}
📍 Lokasi : ${data.result.location ? data.result.location : '0'}
📍 Company : ${data.result.company ? data.result.company : '0'}
📍 Followers : ${data.result.followers ? data.result.followers : '0'}
📍 Following : ${data.result.following ? data.result.following : '0'}
📍 Repositori : ${data.result.public_repos ? data.result.public_repos : '0'}

${data.result.bio ? data.result.bio : 'Tidak ada bio'}`

        msg.replyImage({ url: data.result.avatar }, shannMsg).catch(() => { return msg.reply('terjadi kesalahan') })
    },
}

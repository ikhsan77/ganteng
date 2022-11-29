const { ICommand } = require('@jadibot/libs/builders/command')
const axios = require('axios').default
const { apikey } = require('@config')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Search',
    description: 'twitter Stalking...',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<username>',
    example: '{prefix}{command} shannbot.ofc',
    callback: async ({ msg, fullArgs }) => {
        let { data } = await axios.get('https://api.lolhuman.xyz/api/twitter/{username}?apikey={apikey}'.format({ username: fullArgs, apikey })).catch(() => { return msg.reply('Server dalam perbaikkan') })
        if (!data) return msg.reply('Server dalam perbaikkan')
        if (data.status !== 200) return msg.reply(data.message)

        let shannMsg = `[ *${data.result.screen_name}* ]

📍 Tweet : ${data.result.tweet ? data.result.tweet : '0'}
📍 Username : ${data.result.name ? data.result.name : '0'}
📍 Followers : ${data.result.followers ? data.result.followers : '0'}
📍 Following : ${data.result.following ? data.result.following : '0'}
📍 Bergabung : ${data.result.joined ? data.result.joined : '0'}

${data.result.description ? data.result.description : 'Tidak ada deskripsi'}`

        msg.replyImage({ url: data.result.profile_picture }, shannMsg).catch(() => { return msg.reply('terjadi kesalahan') })
    },
}

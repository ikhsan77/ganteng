const { ICommand } = require('@libs/builders/command')
const i18n = require('i18n')

const _collection = new Map()

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'game',
    description: 'Game tebak bendera, guest and get exp.',
    callback: async ({ msg }) => {
        if (_collection.get(msg.from)) {
            return msg.reply(i18n.__('game.finish_last_first'), _collection.get(msg.from))
        }

        const tebakbendera = require('@libs/utils/scrapper/game/tebakbendera.json')
        const data = tebakbendera[Math.floor(Math.random() * tebakbendera.length)]
        let question = await msg.replyImage({ url: data.img }, 'gambar di atas menunjukkan bendera dari negara...\n\nTime 60 seconds!')

        _collection.set(msg.from, question)

        msg.createMessageCollector({
            filter: data.name.toLowerCase(),
            max: 1,
        })
            .on('collect', (msg) => {
                let xp = Math.floor(Math.random() * (999 - 1) + 1)
                msg.reply(i18n.__('game.right_answer', { xp }))
            })
            .on('end', (res) => {
                _collection.delete(msg.from)
                if (res == 'timeout') {
                    msg.reply(i18n.__('game.timeout_answer', { answer: data.name }), question)
                }
            })
    },
}

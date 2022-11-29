const { ICommand } = require('@jadibot/libs/builders/command')
const i18n = require('i18n')

const _collection = new Map()

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Game',
    description: 'Game caklontong, guest and get exp.',
    callback: async ({ msg }) => {
        if (_collection.get(msg.from)) {
            return msg.reply(i18n.__('game.finish_last_first'), _collection.get(msg.from))
        }

        const caklontong = require('@libs/utils/scrapper/game/caklontong.json')
        const result = caklontong[Math.floor(Math.random() * caklontong.length)]
        let question = await msg.reply(result.soal + '\n\nTime 60 seconds!')

        _collection.set(msg.from, question)

        msg.createMessageCollector({
            filter: result.jawaban.toLowerCase(),
            max: 1,
        })
            .on('collect', (msg) => {
                let xp = Math.floor(Math.random() * (999 - 1) + 1)
                msg.reply(i18n.__('game.right_answer', { xp }))
            })
            .on('end', (res) => {
                _collection.delete(msg.from)
                if (res == 'timeout') {
                    msg.reply(i18n.__('game.timeout_answer', { answer: result.jawaban }), question)
                }
            })
    },
}

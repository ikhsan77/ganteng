const { ICommand } = require('@jadibot/libs/builders/command')
const i18n = require('i18n')

const _collection = new Map()

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Game',
    description: 'Game tebak kalimat, guest and get exp.',
    callback: async ({ msg }) => {
        if (_collection.get(msg.from)) {
            return msg.reply(i18n.__('game.finish_last_first'), _collection.get(msg.from))
        }

        const tebakkalimat = require('@libs/utils/scrapper/game/tebakkalimat.json')
        const result = tebakkalimat[Math.floor(Math.random() * tebakkalimat.length)]
        let question = await msg.reply(`Soal: ${result.soal}\n\nTime 60 seconds!`)

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

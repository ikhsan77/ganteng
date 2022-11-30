const { ICommand } = require('@libs/builders/command')
const family100 = require('@database/db/game/family100.json')
const i18n = require('i18n')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Game',
    description: '-',
    callback: async ({ msg }) => {
        if (`family100-${msg.from}` in family100) return msg.reply(i18n.__('game.finish_last_first'), _collection.get(msg.from))

        let result = require('@libs/utils/scrapper/game/family100.json')
        let random = result[Math.floor(Math.random() * result.length)]
        let hasil = `*Jawablah Pertanyaan Berikut :*\n${random.soal}\n\nTerdapat *${random.jawaban.length}* Jawaban ${random.jawaban.find(v => v.includes(' ')) ? `(beberapa Jawaban Terdapat Spasi)` : ''}`.trim()

        family100[`family100-${msg.from}`] = { pesan: await msg.reply(hasil), ...random, terjawab: Array.from(random.jawaban, () => false) }
    },
}

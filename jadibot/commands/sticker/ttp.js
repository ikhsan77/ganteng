const { ICommand } = require('@jadibot/libs/builders/command')
const Canvas = require('canvas')
const canvasGif = require('canvas-gif')
const { writeExifImg } = require('@libs/converter/exif')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Sticker',
    description: 'Sticker maker',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<text>',
    example: '{prefix}{command} shannbot',
    callback: async ({ msg, client, message, fullArgs }) => {
        Canvas.registerFont(`libs/font/font3.ttf`, { family: 'SF-Pro' })
        let length = fullArgs.length

        var font = 90
        if (length > 12) font = 68
        if (length > 15) font = 58
        if (length > 18) font = 55
        if (length > 19) font = 50
        if (length > 22) font = 48
        if (length > 24) font = 38
        if (length > 27) font = 35
        if (length > 30) font = 30
        if (length > 35) font = 26
        if (length > 39) font = 25
        if (length > 40) font = 20
        if (length > 49) font = 10

        var ttp = {}
        ttp.create = Canvas.createCanvas(576, 576)
        ttp.context = ttp.create.getContext('2d')
        ttp.context.font = `${font}px SF-Pro`
        ttp.context.strokeStyle = 'black'
        ttp.context.lineWidth = 3
        ttp.context.textAlign = 'center'
        ttp.context.strokeText(fullArgs, 290, 300)
        ttp.context.fillStyle = 'white'
        ttp.context.fillText(fullArgs, 290, 300)

        let buff = await writeExifImg(ttp.create.toBuffer(), { packname: 'Fajarara', author: '@shannbot.ofc' })
        client.sendMessage(msg.from, { sticker: { url: buff } }).catch(() => { return m.reply('terjadi kesalahan saat mengirim media') })
    }
}
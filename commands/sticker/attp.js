const { ICommand } = require('@libs/builders/command')
const Canvas = require('canvas')
const canvasGif = require('canvas-gif')
const { writeExifVid } = require('@libs/converter/exif')
const config = require('@config')

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
        const file = "libs/canvas/attp.gif"
        let length = fullArgs.length

        var font = 120
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

        Canvas.registerFont(`libs/font/font1.ttf`, { family: 'SF-Pro' })
        canvasGif(file, (ctx, width, height, totalFrames, currentFrame) => {
            var couler = ["#ff0000", "#ffe100", "#33ff00", "#00ffcc", "#0033ff", "#9500ff", "#ff00ff"]
            let jadi = couler[Math.floor(Math.random() * couler.length)]

            function drawStroked(text, x, y) {
                ctx.font = `${font}px SF-Pro`
                ctx.strokeStyle = 'black'
                ctx.lineWidth = 3
                ctx.textAlign = 'center'
                ctx.strokeText(text, x, y)
                ctx.fillStyle = jadi
                ctx.fillText(text, x, y)
            }

            drawStroked(fullArgs, 290, 300)
        }, { coalesce: false, delay: 0, repeat: 0, algorithm: 'neuquant', optimiser: false, fps: 7, quality: 1 })
            .then(async (buffer) => {
                let buff = await writeExifVid(buffer, { packname: 'Fajarara', author: '@shannbot.ofc' })
                client.sendMessage(msg.from, { sticker: { url: buff }, packname: 'Fajarara', author: '@shannbot.ofc' }, { quoted: message })
            })
            .catch((err) => { return msg.reply('terjadi kesalahan saat memuat media') })
    }
}
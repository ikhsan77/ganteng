const { ICommand } = require("@libs/builders/command")
const { Upscaler, canvas } = require("upscalejs")
const fs = require('fs')
const { TelegraPh } = require('@libs/converter/upload')

const upscaler = new Upscaler({
    base: "node_modules/upscalejs/dist/"
})

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['remini', 'hd'],
    category: 'Convert',
    description: 'Resizing Image',
    premiumOnly: true,
    waitMessage: true,
    callback: async ({ msg, client, message }) => {
        const file = (await msg.download('buffer')) || (msg.quoted && (await msg.quoted.download('buffer')))
        const input = 'database/src/shanndev.jpg'
        const output = 'database/src/shanndevs.jpg'
        await fs.writeFileSync(input, file)

        const upscale = async (input) => {
            const img = await canvas.loadImage(input)
            const result = await upscaler.upscale(img)
            const upscale_canvas = canvas.createCanvas(result.width, result.height)

            upscale_canvas.getContext("2d").putImageData(result, 0, 0)

            const jpeg_stream = upscale_canvas.toBuffer()
            return jpeg_stream
        }

        let p = await upscale(input)
        await fs.unlinkSync(input)

        await fs.writeFileSync(output, p)

        client.sendMessage(msg.from, { image: { url: output }, caption: 'image/jpeg' })
    }
}
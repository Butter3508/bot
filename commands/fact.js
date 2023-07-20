const mineflayer = require('mineflayer')
const { facts, colorCodes } = require('../config.json')

module.exports = {
    name: 'fact',
    description: 'Đưa ra một sự thật nổ não :exploding_head:',
    /**
     * 
     * @param {mineflayer.Bot} bot 
     * @param {String} user 
     * @param {String} msg 
     * @param {String[]} args 
     */
    async run(bot, user, msg, args) {
        let randomFact = facts[Math.floor(Math.random() * facts.length)];
        let randomColor = `&${colorCodes[Math.floor(Math.random() * colorCodes.length)]}`
        bot.chat(`${randomColor}${randomFact}`)
    }
}
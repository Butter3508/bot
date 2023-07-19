const mineflayer = require('mineflayer')

module.exports = {
    name: 'ping',
    description: '',
    /**
     * 
     * @param {mineflayer.Bot} bot 
     * @param {String} user 
     * @param {String} msg 
     * @param {String[]} args 
     */
    async run(bot, user, msg, args) {
        let playerPing = bot.players[user].ping;
        bot.whisper(user, `Ping của bạn hiện tại là: ${playerPing}ms`)
    }
}
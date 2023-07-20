const mineflayer = require('mineflayer')

module.exports = {
    name: 'tps',
    description: 'Xem TPS (ticks per second) của server',
    /**
     * 
     * @param {mineflayer.Bot} bot 
     * @param {String} user 
     * @param {String} msg 
     * @param {String[]} args 
     */
    async run(bot, user, msg, args) {
        const str = bot.tablist.footer.toString();
        let tpsStr = str.trim().substring(16, str.indexOf(' tps'))

        let tps = tpsStr == 'Perfect' ? 20 : Number(tpsStr);

        if (tps >= 19) {
            bot.chat(`&bTPS (tablist): &a${tps}`)
        } else if (tps >= 10) {
            bot.chat(`&bTPS (tablist): &e${tps}`)
        } else if (tps >= 5) {
            bot.chat(`&bTPS (tablist): &c${tps}`)
        } else if (tps >= 0.35) {
            bot.chat(`&bTPS (tablist): &4${tps}`)
        } else {
            bot.chat(`&bTPS (tablist): &d${tps}`)
        }

    }
}
const mineflayer = require('mineflayer')

module.exports = {
    name: 'eval',
    description: 'Admin-Only',
    admin: true,
    /**
     * 
     * @param {mineflayer.Bot} bot 
     * @param {String} user 
     * @param {String} msg 
     * @param {String[]} args 
     */
    async run(bot, user, msg, args) {
        if (!args[0]) return
        let str = eval(args.join(' '));
        bot.whisper(user, str);
    }
}
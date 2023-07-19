require('dotenv').config();
const Discord = require('discord.js');
const mineflayer = require('mineflayer');
const tps = require('mineflayer-tps')(mineflayer);
const fs = require('fs')
const env = process.env
const { messages } = require('./config.json')
const deathEvent = require('mineflayer-death-event')

const client = new Discord.Client({
    intents: 34315,
    allowedMentions: {
        repliedUser: false,
        parse: true
    }
});

const config = {
    ip: env.mc_ip,
    username: env.mc_username,
    pin: env.mc_pin,
    token: env.discord_token,
    id: env.discord_channel
}

/**
 * 
 * @param {Discord.Client} client 
 */
function run(client) {

    const bot = mineflayer.createBot({
        host: config.ip,
        username: config.username,
        version: '1.16.5',
        hideErrors: true
    });

    bot.loadPlugin(tps)
    bot.loadPlugin(deathEvent)
    bot.commands = [];

    fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
    .forEach(file => {
        const pull = require(`./commands/${file}`);
        if (pull.name) {
            bot.commands.push(pull);
        }
    })

    bot.on('end', (r) => {
        if (r.trim() == 'Under maintenance.') {
            setTimeout(() => run(client), 10 * 60 * 1000);
        } else {
            setTimeout(() => run(client), 10000);
        }
    });

    bot.on('error', () => {
        setTimeout(() => run(client), 10000);
    });

    bot.on('windowOpen', (window) => {
        window.requiresConfirmation = false;
        const pin = config.pin.split(' ').map(Number);

        if (window.slots.length >= 45) {
            bot.simpleClick.leftMouse(pin[0])
            bot.simpleClick.leftMouse(pin[1])
            bot.simpleClick.leftMouse(pin[2])
            bot.simpleClick.leftMouse(pin[3])    
        }

        if (window.slots.length >= 62) {
            bot.simpleClick.leftMouse(13)
        }
    });

    bot.on('messagestr', async(msg) => {
        console.log(msg)
        if (msg.trim() == '') return;
        if (msg.trim() == 'dùng lệnh/anarchyvn để vào server Anarchy.') {
            bot.chat('/anarchyvn')
        }
        if (msg.trim() == 'Server chính đang bảo trì. Xin hãy chờ đợi!') {
            bot.end('Under maintenance.')
        }
    });

    bot.on('spawn', () => {
        let randomChat = messages[Math.floor(Math.random() * messages.length)];
        bot.chat(randomChat)
    })

    bot.on('chat', async(user, msg) => {
        const channel = await client.channels.cache.get(config.id);
        if (!channel) return;

        const embed = new Discord.MessageEmbed()
            .setColor('#f836ff')
            .setAuthor({
                name: user,
                iconURL: `http://cravatar.eu/avatar/${user}/16.png`,
                url: `https://namemc.com/search?q=${user}`
            })
            .setDescription(msg);
        
        await channel.send({ embeds: [embed] });

    })

    bot.on('chat', async(user, msg) => {
        const prefix = '!';
        if (!msg.startsWith(prefix)) return;
        const args = msg.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        const command = await bot.commands.find(c => c.name == cmd);
        if (command) { command.run(bot, user, msg, args) }
    })

    client.on('messageCreate', async(msg) => {
        if (msg.channel.id !== config.id) return;
        if (msg.author.bot) return;

        if (msg.content.startsWith('/')) {
            msg.react('👍');
            await bot.chat(msg.content);
        } else {
            msg.react('👍');
            await bot.chat(`[${msg.author.tag}] ${msg.content}`)
        }
    })

    bot.on('playerDeath', (data) => {
        console.log(data)
    })    
}

client.once('ready', () => {
    console.log('Đã đăng nhập Discord');
    client.user.setActivity('tung4402', { type: 'LISTENING' });
    run(client)
});

client.login(config.token);

require('./server')();
const { text } = require('stream/consumers');
const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
//bot.start((ctx) => console.log(ctx.message));
let languser;
const engl = 'Факин бич инглишь!';
const russ = 'Йобаний кацап. Слава Україні!';
//if (ctx.message.from.language_code == ru) {languser = russ} else if (ctx.message.from.language_code == en) {languser = engl}
bot.start((ctx) => ctx.reply(`Саламчик, ${ctx.message.from.first_name + " " + ctx.message.from.last_name}!`));


bot.hears(text, (ctx) => ctx.reply('Fuck you bitch!'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
//bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
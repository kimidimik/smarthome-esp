const { text } = require('stream/consumers');
const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
//bot.start((ctx) => console.log(ctx.message));
let languser;

bot.start((ctx) => { // так мы сделали полноценную функцию с телом
  let message = ''

  if (ctx.message.from.language_code == 'ru') {
    message = 'Йобаний кацап. Слава Україні!';  
  } else {
    message = 'Факин бич инглишь!';
  }
  // ctx.reply(`Саламчик, ${ctx.message.from.first_name + " " + ctx.message.from.last_name}!`);
  ctx.reply(`Привет ${ctx.message.from.first_name + " " + ctx.message.from.last_name}! ${message}`);
})


bot.hears(text, (ctx) => ctx.reply('Fuck you bitch!'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
//bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
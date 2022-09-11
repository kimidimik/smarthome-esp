const mqtt = require('mqtt')
const { text } = require('stream/consumers')
const { Telegraf } = require('telegraf')
require('dotenv').config()

let lastData = null

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => {
  ctx.reply(`Привет, ${ctx.message.from.first_name}!`)
})

bot.help((ctx) => ctx.reply('Отправь что-то чтобы получить температуру'))
bot.hears(text, (ctx) => {
  if (lastData) {
    console.log('lastData', lastData)
    ctx.reply(`Температура: ${lastData.Temperature}°C, влажность: ${lastData.Humidity}%`)
  } else {
    ctx.reply('Пока нет данных')
  }
})

bot.launch()

const client = mqtt.connect(process.env.MQTT_HOST, {
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASS
})

client.on('connect', function () {
  console.log('Connected to MQTT broker')
  client.subscribe('#')
  client.on('message', function (topic, message) {
    try {
      const msg = JSON.parse(message.toString())
      if (!topic.endsWith('/SENSOR')) return
      console.log(topic)
      console.log(msg.DHT11)
      lastData = msg.DHT11
    } catch (e) {
    }
  })
})

process.once('SIGINT', () => {
  bot.stop('SIGINT')
  client.end()
})

process.once('SIGTERM', () => {
  bot.stop('SIGTERM')
  client.end()
})

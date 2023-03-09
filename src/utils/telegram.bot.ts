import axios from 'axios'
import { getDolarBluePrice } from './index'
import { Context, Telegraf, Markup } from 'telegraf';
import { saveChat } from './utils'
import { Customer } from '../models';
import { CHAT_TYPE, iCustomer } from '../@types'
interface CTX extends Context {
  clientId?: string
  myOtherProp?: number
}

const loggerMiddelware = () => async (ctx: any, next: any) => {
  const t = ctx.myProp
  await saveChat({
    botInfo: ctx.botInfo,
    chat: ctx.message,
    type: CHAT_TYPE.TELEGRAM,
  })
  return next()
}

export interface TelegramBotConstructor {
  clientId: string
}

export class TelegramBot {
  private bot: any
  private clientId: string
  private token: string
  private TELEGRAM_API: string

  constructor({ clientId }: TelegramBotConstructor) {
    this.clientId = clientId
    this.token = clientId
    this.TELEGRAM_API = `https://api.telegram.org/bot${this.token}`
    this.bot = new Telegraf(this.token)
    this.bot.use(Telegraf.log())
  }

  // @getters
  // @methods
  public async start() {
    const customer = await this._getCustomerByBootClientId(this.clientId)
    if (!customer) {
      console.log('No customer found or customer is inactive')
      return
    }
    
    this.bot.use(loggerMiddelware())
    this.bot.start((ctx: any) => {
      const { startPayload } = ctx
      // console.log(ctx.from)
      // console.log(ctx.chat)
      // console.log(ctx.message)
      
      if (startPayload) return ctx.reply(`Deep link payload: ${startPayload}`)

      ctx.reply('Welcome')
    })

    // events listeners
    this.bot.help((ctx: any) => {
      ctx.reply('Send me a sticker')
    })
    this.bot.on('sticker', (ctx: any) => {
      ctx.reply('👍')
    })
    
    this.bot.hears('botonera', (ctx: any) => {
      const { from } = ctx
      const chat = ctx.chat
      ctx.reply(
        'Botones',
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'SI 😎', callback_data: 'my_fancy_event_1' }],
              [{ text: 'NO 👥', callback_data: 'my_fancy_event_2' }],
            ],
          },
        }
      )
    })
    this.bot.command('/botonera', async (ctx: any) => {
      return await ctx.reply(
        'Custom buttons keyboard',
        Markup.keyboard([
          ['🔍 Search', '😎 Popular'], // Row1 with 2 buttons
          ['☸ Setting', '📞 Feedback'], // Row2 with 2 buttons
          ['📢 Ads', '⭐️ Rate us', '👥 Share'], // Row3 with 3 buttons
        ])
          .oneTime()
          .resize()
      )
    })

    // commands
    this.bot.command('start', async (ctx: any) => {
      const message = `Bien, para comenzara a operar necesito ingreses tu token de acceso🔑.
      ingresa /token=TU_TOKEN_DE_ACCESO`
      return await ctx.reply(message)
    })
    this.bot.command('hola', async (ctx: any) => {
      const { from } = ctx
      const { first_name: firstName, username } = from
      const  message = `Hola ${ firstName || username }, 
      soy un bot 🤖 trader, estoy en desarrollo. 
      🚀 Pronto tendrás más novedades...`
      return await ctx.reply(message)
    })
    this.bot.command('token', async (ctx: any) => {
      const  message = `🔑 Ingresa tu token de acceso a la plataforma, debería ser algo parecido a esto XXErgW222NohksffsadZrN2055PKxbl_bot.
      Si todavía no tenes tu token de accesso, registrate primero para obtenerlo.`
      return await ctx.reply(message)
    })
    this.bot.command('sent', async (ctx: any) => {
      const { from, message } = ctx
      const token = message?.text?.split('=')[1]

      const  replyMessage = `🔑 ✅ ¡Token recibido y validado! Ahora puedes comenzar a operar.`
      return await ctx.reply(replyMessage)
    })
    this.bot.command('dolarblue', async (ctx: any) => {
      const price = await this.getDolarBluePrice()
      const message = `💵 Cotización dólar blue en este momento: $ ${ price }`
      return await ctx.reply(message)
    })

    // launch bot
    this.bot.launch()

    // Enable graceful stop
    process.once('SIGINT', () => this.bot.stop('SIGINT'))
    process.once('SIGTERM', () => this.bot.stop('SIGTERM'))
  }
  private async _getCustomerByBootClientId(botClientId: string) {
    if (!botClientId)
      return null
    const customer = await Customer.findOne({
      telegram_bot_client_id: botClientId
    })
    // TODO check if customer is active
    return customer
  }
  public async sendMessage(
    { message, chatId }:
    { message: string, chatId: string }) {
    try {
      if (!chatId || !message)
        throw new Error('Invalid chatId or message')
      
      return await axios.post(`${this.TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: message,
        reply_markup: {
          inline_keyboard: [
            [{text: 'SI', callback_data: 'my_fancy_event_1'}],
            [{text: 'NO', callback_data: 'my_fancy_event_2'}],
          ]
        }
      })
    } catch (error) {
      console.error(error)
    }
  }
  public async getDolarBluePrice() {
    return await getDolarBluePrice()
  }
}

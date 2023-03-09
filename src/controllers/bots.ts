/* eslint-disable no-console */
import { Express } from 'express'
import { DataBase } from '../db/database'
import { WhatssAppBot, TelegramBot, Task } from '../utils'
const { TELEGRAM_TOKEN, TELEGRAM_TOKEN2 } = process.env

export const startBots = async (app: Express, dbInstance: any) => {
  const db = dbInstance || await DataBase.start()
  app.set('db', db)

  // TODO: load all bots from DB
  const telegramBot = new TelegramBot({
    clientId: TELEGRAM_TOKEN || ''
  })
  telegramBot.start()
  const telegramBot2 = new TelegramBot({
    clientId: TELEGRAM_TOKEN2 || ''
  })
  telegramBot2.start()
  console.log('🟢 Telegram Bots are ready!')
  
  
  const store = await db?.getMongooseStore()
  // TODO: load all bots from DB
  const whatsAppBot = new WhatssAppBot({
    store,
    clientId: '549' + '2254620036'
  })
  await whatsAppBot.start()
  console.log('🟢 WhatsApp Bots are ready!')

  // // bot.sendMessage({ clientId: '5492254620036', message: 'Hola Bigote!' })
  // const contacts = await bot.getContacts()

  // const businessContacts =  await bot.getBusinessContacts()
  // const blockedContacts =  await bot.getBlockedContacts()
  // const filtered =  await bot.getFilteredContacsByName('UADE')


  // actions can't take parameters
  const action = async() => {
    whatsAppBot.sendMessage({ clientId: '5492254620036', message: 'Hola Bigote! ' + new Date().toISOString() })
    await telegramBot.sendMessage({
      chatId: '1266264139',
      message: 'Hola Bigote! ' + new Date().toISOString()
    })
  }

  const task = new Task({
    expression: '* * * * * *', //'0 30 6 * * *',
    action,
    options: {
      name: 'test-task-1',
      scheduled: false,
      timeZone: 'America/Argentina/Buenos_Aires'
    }
  })

  task.printFrequency()
  task.start()

  setTimeout(() => {
    task?.stop()
  }, 2000)
}


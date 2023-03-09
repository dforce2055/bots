/* eslint-disable no-console */
import { Express } from 'express'
import { DataBase } from '../db/database'
import { WhatssAppBot, TelegramBot, Task } from '../utils'
import { Customer } from '../models'
const {
  TELEGRAM_TOKEN,
  TELEGRAM_TOKEN2,
  PHONE,
  PHONE2,
} = process.env

const addCustomers = async () => {
  try {
    const customer = new Customer({
      name: 'Bigote',
      email: 'deperez2055@gmail.com',
      phone: PHONE,
      telegram_bot_client_id: TELEGRAM_TOKEN,
      whatsapp_bot_client_id: PHONE
    })
    const customer2 = new Customer({
      name: 'Open House Padel Pinamar',
      email: 'openhouse@gmail.com',
      phone: PHONE2,
      telegram_bot_client_id: TELEGRAM_TOKEN2,
      whatsapp_bot_client_id: PHONE2
    })
    await customer.save()
    await customer2.save()
    console.log('🟢 Customers added to Data Base!')
  } catch (error) {
    console.log('🟢 Customers already in Data Base!')
  }
}

export const startBots = async (app: Express, dbInstance: any) => {
  const db = dbInstance || await DataBase.start()
  app.set('db', db)
  // add customers if you needed
  // await addCustomers()

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
  const action = async () => {
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


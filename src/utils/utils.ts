/* eslint-disable no-console */
import axios from 'axios'
const { writeJson, readJson } = require('fs-extra')
import { TelegramChat, WhatsAppChat } from '../models'

import {
  BotInfo,
  CHAT_TYPE,
  iTelegramChat,
  iWhatsAppChat,
} from '../@types'

export const getDolarBluePrice = async () => {
  try {
    const { JWT_DOLAR_BLUE } = process.env
    const config = {
      method: 'get',
      url: 'https://www.safetime.com.ar/api/dolar/currentprice',
      headers: { 
        'Authorization': `Bearer ${JWT_DOLAR_BLUE}`
      }
    }
    const response = await axios(config)
    const { data } = response
    const { price } = data
    return price
  } catch (error) {
    console.log(error)
    return 0
  }
}

export const appendNewChat = async (
  { path, chat, filename }:
  { path?: string, chat: string, filename: string }
) => {
  try {
    path = path || `./public/data/${ filename }.json`
    const dataReaded = await readJson(path)
    const data = [...dataReaded, chat]

    await writeJson(path, data)
    console.log('Data written successfully!')
  } catch (error) {
    console.log(error)
  }
}
export const saveChat = async (
  { chat, type, botInfo }:
    {
      chat: iTelegramChat | iWhatsAppChat,
      type: CHAT_TYPE,
      botInfo?: BotInfo
    }): Promise<boolean> => {
  try {

    if(type === CHAT_TYPE.TELEGRAM)
      await TelegramChat.create({
        bot_info: botInfo,
        ...chat
      })

    if (type === CHAT_TYPE.WHATSAPP) {
      // remove _data from chat object
      const { _data, ...newChat} = chat as iWhatsAppChat
      await WhatsAppChat.create({ 
        bot_info: botInfo,
        ...chat
      })
    }
    
    console.log('Data save successfully!')
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
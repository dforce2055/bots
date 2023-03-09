/* eslint-disable no-console */
// docs: https://wwebjs.dev/guide/
// https://docs.wwebjs.dev/index.html
import { Chat, Client, Contact, RemoteAuth } from 'whatsapp-web.js'
import * as qrcode from 'qrcode-terminal'
import { saveChat } from './utils'
import { CHAT_TYPE } from '../@types'

export interface WhatssAppBotConstructor {
  store: any,
  clientId: string
}
export class WhatssAppBot {
  private bot: any
  client: Client | undefined
  clientId: string
  contacts: Contact[] | undefined
  chats: Chat[] | undefined

  constructor({ store, clientId }: WhatssAppBotConstructor) {
    this.clientId = clientId || '549' + '2254620036'
    this.bot = new Client({
      authStrategy: new RemoteAuth({
        clientId: clientId,
        store: store,
        backupSyncIntervalMs: 60000 // 60000ms = 1 minute 300000
      })
    })
  }

  public async start() {
    // events listeners
    this.bot.on('qr', (qr: string) => {
      qrcode.generate(qr, {small: true})
    })

    // Save session values to the file upon successful auth
    this.bot.on('authenticated', async (session: any) => {
      console.log('Saving session...')
      // await store.save({ session: clientId })
    })

    this.bot.on('remote_session_saved', () => {
      console.log('Remote session saved!!!')
    })
    
    this.bot.on('ready', async() => {
      console.log('Client is ready!')
      const chatId = this.clientId + '@c.us'
      await this.bot?.sendMessage(chatId, '¡Bot ACTIVO!🦾🤖')
    })
    
    this.bot.on('message', async (message: any) => {
      await saveChat({
        chat: message,
        type: CHAT_TYPE.WHATSAPP
      })
      if(message.body === '!ping')
        message.reply('pong')
  
      if(message.body.toLowerCase() === 'hola')
        this.bot?.sendMessage(message.from, 'Hola soy un Bot!🦾🤖')
    })

    await this.bot?.initialize()
  }

  async getClient() {
    return this.client
  }
  async sendMessage({ clientId, message }: { clientId: string, message: string }) {
    if (!message || !clientId)
      return 'Invalid message or clientId'

    const chatId = clientId + '@c.us'
    return await this.client?.sendMessage(chatId, message)
  }
  async getContacts(): Promise<Contact[]> {
    if (!this.contacts)
      this.contacts = await this.client?.getContacts()
    
    return this.contacts || []
  }
  async getBusinessContacts(): Promise<Contact[]>  {
    if (!this.contacts)
      this.contacts = await this.client?.getContacts()
    
    const businessContacts = this.contacts?.filter(contact => contact.isBusiness)
    return businessContacts || []
  }
  async getBlockedContacts(): Promise<Contact[]>  {
    if (!this.contacts)
      this.contacts = await this.client?.getContacts()
    
    const blockedContacts = this.contacts?.filter(contact => contact.isBlocked)
    return blockedContacts || []
  }
  async getFilteredContacsByName(name: string): Promise<Contact[]>  {
    if (!this.contacts)
      this.contacts = await this.client?.getContacts()
    
    const contacts = this.contacts?.filter(contact => contact.name?.includes(name))
    return contacts || []
  }
  async getChats(): Promise<Chat[]> {
    if (!this.chats)
      this.chats = await this.client?.getChats()
    
    return this.chats || []
  }
  async logout() {
    return this.client?.logout()
  }
}


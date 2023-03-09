export * from './customer'
export * from './telegram'
export * from './whatsapp'
export * from './user'
import { Request } from 'express'

export interface IRequest extends Request {
  requestTimestamp?: string
}

export interface DummyObject {
  id: number|string
  title: string
  category: string
  description: string
}

export enum CHAT_TYPE {
  TELEGRAM = 'telegram',
  WHATSAPP = 'whatsapp'
}
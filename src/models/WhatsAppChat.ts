import { Schema, model } from 'mongoose'
import {
  iWhatsAppChat,
  ID,
} from '../@types'

const IDSchema = new Schema<ID>({
  fromMe: { type: Boolean, required: false },
  remote: { type: String, required: false },
  id: { type: String, required: false },
  _serialized: { type: String, required: false },
})


const WhatssAppChatSchema = new Schema<iWhatsAppChat>({
  id: IDSchema,
  ack: { type: Number, required: false },
  hasMedia: { type: Boolean, required: false },
  body: { type: String, required: false },
  type: { type: String, required: false },
  timestamp: { type: Number, required: false },
  from: { type: String, required: false },
  to: { type: String, required: false },
  deviceType: { type: String, required: false },
  isForwarded: { type: Boolean, required: false },
  forwardingScore: { type: Number, required: false },
  isStatus: { type: Boolean, required: false },
  isStarred: { type: Boolean, required: false },
  broadcast: { type: Boolean, required: false },
  fromMe: { type: Boolean, required: false },
  hasQuotedMsg: { type: Boolean, required: false },
  vCards: [
    { type: Array, required: false }
  ],
  mentionedIds: [
    { type: Array, required: false }
  ],
  isGif: { type: Boolean, required: false },
  isEphemeral: { type: Boolean, required: false },
  links: [
    { type: Array, required: false }
  ],
})

export const WhatsAppChat = model<iWhatsAppChat>('WhatsAppChat', WhatssAppChatSchema)

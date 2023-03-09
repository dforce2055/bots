import { Schema, model } from 'mongoose'
import {
  BotInfo,
  Chat,
  Entity,
  From,
  iTelegramChat,
} from '../@types'

const BotInfoSchema = new Schema<BotInfo>({
  id: { type: Number, required: false },
  client_id: { type: Number, required: false },
  is_bot: { type: Boolean, required: false },
  first_name: { type: String, required: false },
  username: { type: String, required: false },
  can_read_all_group_messages: { type: Boolean, required: false },
  supports_inline_queries: { type: Boolean, required: false },
})

const ChatSchema = new Schema<Chat>({
  id: { type: Number, required: false },
  first_name: { type: String, required: false },
  username: { type: String, required: false },
  type: { type: String, required: false },
})

const EntitySchema = new Schema<Entity>({
  offset: { type: Number, required: false },
  length: { type: Number, required: false },
  type: { type: String, required: false },
})

const FromSchema = new Schema<From>({
  id: { type: Number, required: false },
  is_bot: { type: Boolean, required: false },
  first_name: { type: String, required: false },
  username: { type: String, required: false },
  language_code: { type: String, required: false },
})

const telegramChatSchema = new Schema<iTelegramChat>({
  bot_info: BotInfoSchema,
  message_id: { type: Number, required: false },
  from: FromSchema,
  chat: ChatSchema,
  date: { type: Number, required: false },
  text: { type: String, required: false },
  entities: [EntitySchema],
})

export const TelegramChat = model<iTelegramChat>('TelegramChat', telegramChatSchema)

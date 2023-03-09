import { Schema, model } from 'mongoose'
import {
  iCustomer,
} from '../@types'

const CustomerSchema = new Schema<iCustomer>({
  name: { type: String, required: false },
  email: { type: String, required: true, index: true, unique: true },
  phone: { type: String, required: true },
  telegram_bot_client_id: { type: String, required: false, index: true, unique: true },
  whatsapp_bot_client_id: { type: String, required: false, index: true, unique: true },
})



export const Customer = model<iCustomer>('Customer', CustomerSchema)

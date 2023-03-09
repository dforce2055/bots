/* eslint-disable no-console */
import * as dotenv from 'dotenv'
dotenv.config()
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose')

export class DataBase {
  mongooseStore: any | undefined
  #mongoose: any | undefined

  private constructor(
    mongooseStore: any | undefined,
    mongoose: any | undefined
  ) {
    this.mongooseStore = mongooseStore
    this.#mongoose = mongoose
  }
  
  static async start() {
    try {
      mongoose.set('strictQuery', false)
      await mongoose.connect(process.env['MONGO_URI'], {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      // loggin session on DataBase
      console.log('Data Base connection successful')
      const mongooseStore = await new MongoStore({ mongoose: mongoose })
      return new DataBase(mongooseStore, mongoose)
    } catch (err) {
      console.error('Data Base connection error')
      console.log(err)
    }
  }

  async getMongooseStore() {
    return this.mongooseStore
  }
}
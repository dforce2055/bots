import express from 'express'
import path from 'path'
import * as dotenv from 'dotenv'
// https://www.npmjs.com/package/morgan
// https://expressjs.com/en/resources/middleware/morgan.html
import logger from 'morgan'
import { DataBase } from './db/database'
import { startBots } from './controllers/bots'
import { loadApiEndpoints } from './routes'
import swaggerUi from 'swagger-ui-express'
import { Customer } from './models'
import { uuid } from 'uuidv4'
// Create Express server
// https://expressjs.com/en/resources/middleware/cors.html
import cors from 'cors'
dotenv.config()
const { TELEGRAM_TOKEN, TELEGRAM_TOKEN2 } = process.env

const app = express()

// Express configuration
const loggerConfig = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]'
app.set('env', process.env.NODE_ENV || 'development')
app.set('port', process.env.PORT || 3000)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(logger(loggerConfig))


app.use(
  express.static(
    path.join(__dirname, '../public'),
    { maxAge: 31557600000 }
  )
)

app.use(
  '/api/v1/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  })
)

// load routes
loadApiEndpoints(app)

const addCustomers = async () => { 
  try {
    const customer = new Customer({
      name: 'Bigote',
      email: 'deperez2055@gmail.com',
      phone: '549225459620036',
      telegram_bot_client_id: TELEGRAM_TOKEN,
      whatsapp_bot_client_id: '549225459620036'
    })
    const customer2 = new Customer({
      name: 'Open House Padel Pinamar',
      email: 'openhouse@gmail.com',
      phone: '5492254611686',
      telegram_bot_client_id: TELEGRAM_TOKEN2,
      whatsapp_bot_client_id: '5492254611686'
    })
    await customer.save()
    await customer2.save()
    console.log('🟢 Customers added to Data Base!')
  } catch (error) {
    console.log('🟢 Customers already in Data Base!')
  }
}

DataBase.start()
  .then(async (dbInstance) => {
    await addCustomers()
    await startBots(app, dbInstance)
  })

export default app

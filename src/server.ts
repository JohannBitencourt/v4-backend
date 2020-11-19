import 'dotenv/config'
import 'reflect-metadata'
import './database/connect'
import express from 'express'
import cors from 'cors'
import routes from './routes'

import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'

const app = express()
const PORT = process.env.PORT || 3000
const URL = process.env.URL || '0.0.0.0'


async function bootstrap (): Promise<void> {
  app.use(cors())
  app.use(express.json())
  app.use(routes)

  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  app.listen(3000, () => console.log(
    `Server started at ${URL}:${PORT} 
  `)
  )
}
bootstrap()

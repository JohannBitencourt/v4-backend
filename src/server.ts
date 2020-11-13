import 'dotenv/config'
import 'reflect-metadata'
import './database/connect'
import express from 'express'
import routes from './routes'

import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'

const app = express()
const PORT = process.env.PORT || 3000
const URL = process.env.URL || 'http//localhost'

async function bootstrap (): Promise<void> {
  app.use(express.json())
  app.use(routes)

  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  app.listen(3000, () => console.log(
    `Server started at ${URL}:${PORT} 
  `)
  )
}
bootstrap()

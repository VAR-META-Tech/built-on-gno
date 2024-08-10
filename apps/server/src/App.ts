import express from 'express'
import { Routes } from './decorator/routes'
import { logger } from './utils/logger'
import { connection } from './databases/connection'
import cors from 'cors'
import bodyParser from 'body-parser'
const { NODE_ENV, PORT } = process.env

class App {
  private app: express.Application
  private env: string
  private port: string | number

  constructor(routes: Routes[]) {
    this.app = express()
    this.env = NODE_ENV || 'development'
    this.port = PORT || 3001

    this.initializeMiddlewares()
    this.initializeRoutes(routes)
    this.initializeDatabases()
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`)
      logger.info(`======= ENV: ${this.env} =======`)
      logger.info(`🚀 App listening on the port ${this.port}`)
      logger.info(`=================================`)
    })
  }

  public getServer() {
    return this.app
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use(route.path, route.router)
    })
  }

  private initializeDatabases() {
    connection.initialize()
  }

  private initializeMiddlewares() {
    this.app.use(
      cors({
        origin: (origin, callback) => {
          return callback(null, true)
        },
      }),
    )
    this.app.use(express.json({ limit: '50mb' }))
    this.app.use(express.urlencoded({ limit: '50mb', extended: true }))
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(bodyParser.json())
  }
}

export default App

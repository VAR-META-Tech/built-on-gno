import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { router } from './routes'
import { connection } from './database/connection'
import 'reflect-metadata'
import { crawlCron } from './crons/crawl/cron'

async function main() {
  const port = process.env.PORT || 3001
  const app = express()
  app.use(cors())

  await connection.initialize()

  crawlCron.start()

  app.use('/api', router)

  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`)
  })
}

main()

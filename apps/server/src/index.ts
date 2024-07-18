import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { router } from './routes'
import 'reflect-metadata'
import { connection } from './databases/connection'
async function main() {
  const port = process.env.PORT || 3001
  const app = express()
  app.use(cors())

  await connection.initialize()

  app.use('/api', router)

  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`)
  })
}

main()
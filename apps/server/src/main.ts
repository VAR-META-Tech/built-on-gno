import { classificationCase } from './crons/crawl/utils/classificationCase'
import { pullStringArray } from './crons/crawl/utils/pullStringArray'

import * as fs from 'fs'
import { connection } from './database/connection'
import { handleCase } from './crons/crawl/utils/handleCase'

async function main() {
  await connection.initialize()
  console.log('start')

  const stdout = fs.readFileSync('note.txt', { encoding: 'utf-8' })

  const fileChange = pullStringArray(stdout)

  if (fileChange.length !== 0) {
    const caseData = await classificationCase(fileChange)

    handleCase(caseData)
  }
}

main()

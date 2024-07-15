import { exec } from 'child_process'
import { pullStringArray } from './utils/pullStringArray'
import { classificationCase } from './utils/classificationCase'

export function crawlJob() {
  const path = `${__dirname}/shell.sh`
  exec(`bash ${path}`, async (error, stdout, stderr) => {
    const fileChange = pullStringArray(stdout)

    if (fileChange.length !== 0) {
      const caseData = await classificationCase(fileChange)

      console.log(caseData)
    }
  })
}

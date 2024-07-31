import 'dotenv/config'
import { exec } from 'child_process'

const token = process.env.GITHUB_TOKEN
const owner = process.env.GITHUB_OWNER
const repo = process.env.GITHUB_REPO

function fsGithubRequest(path: string): string {
  const request = `curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${token}" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/${owner}/${repo}/contents${path}?ref=demo`

  return request
}

function handleDirRaw(output: string): Array<string> {
  const array = JSON.parse(output)

  const data = array.map((element) => element.name)
  return data
}

function handleFileRaw(output: string) {
  const dataObject = JSON.parse(output)
  const data = Buffer.from(dataObject.content, 'base64').toString()
  return data
}

export class fsWrapper {
  // path is the path from /
  static readdir(path: string): Promise<Array<string>> {
    return new Promise((res, rej) => {
      const request = fsGithubRequest(path)
      exec(request, (error, stdout, stderr) => {
        const dir = handleDirRaw(stdout)
        res(dir)
      })
    })
  }

  static readFile(path: string): Promise<string> {
    return new Promise((res, rej) => {
      const request = fsGithubRequest(path)
      exec(request, (error, stdout, stderr) => {
        res(handleFileRaw(stdout))
      })
    })
  }
}

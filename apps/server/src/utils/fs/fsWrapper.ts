import 'dotenv/config'
import { logger } from '../logger'

const token = process.env.GITHUB_TOKEN
const owner = process.env.GITHUB_OWNER
const repo = process.env.GITHUB_REPO
const branch = process.env.GITHUB_BRANCH

async function fsGithubRequest(path: string): Promise<string> {
  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents${path}?ref=${branch}`
    const options = {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
    const data = await fetch(url, options)
    const result = await data.json()
    if (!data.ok) {
      throw result?.message ?? 'Error when working with github'
    }
    return JSON.stringify(result)
  } catch (error) {
    logger.info('Error when call github' + error)
    throw error
  }
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
  static async readdir(path: string): Promise<Array<string>> {
    try {
      const data = await fsGithubRequest(path)
      return handleDirRaw(data)
    } catch (error) {
      throw error
    }
  }

  static async readFile(path: string): Promise<string> {
    try {
      const data = await fsGithubRequest(path)
      return handleFileRaw(data)
    } catch (error) {
      throw error
    }
  }

  static async checkFileExist(path: string): Promise<boolean> {
    try {
      await fsGithubRequest(path)
      return true
    } catch (error) {
      return false
    }
  }
}

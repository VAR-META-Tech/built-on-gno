import * as fs from 'fs/promises'

export class fsWrapper {
  static async readdir(path: string): Promise<Array<string>> {
    const dir = await fs.readdir(path)

    return dir
  }
}

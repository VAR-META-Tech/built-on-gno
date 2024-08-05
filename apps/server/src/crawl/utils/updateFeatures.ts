import { fsWrapper } from '@/utils/fs/fsWrapper'

export async function updateFeatures(filePath: string) {
  // ex of filePath: /projects/...
  const dataRaw = await fsWrapper.readFile(filePath)
  const datas = JSON.parse(dataRaw)
}

import { connection } from '@/databases/connection'
import { Socials } from '@/databases/entities/Socials'
import { SocialJSON } from '@/shared/schema/SocialJSON'
import { fsWrapper } from '@/utils/fs/fsWrapper'

export async function creatorSocial() {
  const dataRaw = await fsWrapper.readFile('/projects/socials.json')
  const datas: Array<SocialJSON> = JSON.parse(dataRaw)

  const socials: Array<Socials> = []

  datas.forEach((data) => {
    const social = new Socials()
    social.name = data.name
    social.code = data.code
    social.iconUrl = data.icon_url

    socials.push(social)
  })

  connection
    .getRepository(Socials)
    .save(socials)
    .catch((error) => console.log('Create base socials error'))
}

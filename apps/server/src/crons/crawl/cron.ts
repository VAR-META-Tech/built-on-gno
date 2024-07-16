import { CronJob } from 'cron'
import { crawlJob } from './job'

const crawlCron = CronJob.from({
  cronTime: '*/10 * * * * *',
  onTick: function () {},
  start: false,
  timeZone: 'Asia/Ho_Chi_Minh',
})

export { crawlCron }

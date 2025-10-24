import { CronJob } from 'cron';

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {
  //* aun que no esta definido como publico se infiere que es publico a menos que se defina como private
  static createJob(cronTime: CronTime, onTick: OnTick): CronJob {
    const job = new CronJob(cronTime, onTick, null, true, 'America/Los_Angeles');
    job.start();
    return job;
  }
}

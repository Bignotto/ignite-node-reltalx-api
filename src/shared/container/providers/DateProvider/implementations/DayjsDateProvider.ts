import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  hourDiff(start_date: Date, end_date: Date): number {
    return dayjs(this.toUtc(start_date)).diff(this.toUtc(end_date), "hours");
  }

  toUtc(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  addHours(date: Date, hours = 1): Date {
    return dayjs(date).add(hours, "hour").toDate();
  }

  now(): Date {
    return dayjs().toDate();
  }
}

export { DayjsDateProvider };

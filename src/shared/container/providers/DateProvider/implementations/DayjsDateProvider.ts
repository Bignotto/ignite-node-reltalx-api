import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  now(): Date {
    return dayjs().toDate();
  }

  toUtc(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  hourDiff(start_date: Date, end_date: Date): number {
    return dayjs(this.toUtc(end_date)).diff(this.toUtc(start_date), "hours");
  }

  addHours(date: Date, hours = 1): Date {
    return dayjs(date).add(hours, "hour").toDate();
  }

  daysDiff(start_date: Date, end_date: Date): number {
    return dayjs(this.toUtc(end_date)).diff(this.toUtc(start_date), "days");
  }

  addDays(date: Date, days = 1): Date {
    return dayjs(date).add(days, "days").toDate();
  }

  isExpired(date: Date): boolean {
    return dayjs(date).isBefore(new Date(), "h");
  }
}

export { DayjsDateProvider };

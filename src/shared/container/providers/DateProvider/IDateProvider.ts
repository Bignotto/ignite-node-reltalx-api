interface IDateProvider {
  hourDiff(start_date: Date, end_date: Date): number;
  toUtc(date: Date): string;
  now(): Date;
  addHours(date: Date, hours?: number): Date;
}

export { IDateProvider };

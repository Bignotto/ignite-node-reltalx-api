import { DayjsDateProvider } from "./DayjsDateProvider";

let dateProvider: DayjsDateProvider;

describe("Date Provider", () => {
  beforeAll(() => {
    dateProvider = new DayjsDateProvider();
  });

  it("should calculate hours diff correctly", () => {
    const start_time = new Date(2021, 1, 25, 10, 15);
    const end_time = new Date(2021, 1, 25, 13, 15);
    const end_time_2 = new Date(2021, 1, 26, 13, 15);

    expect(dateProvider.hourDiff(start_time, end_time)).toBe(3);
    expect(dateProvider.hourDiff(start_time, end_time_2)).toBe(27);
  });

  it("should calculate days diff correctly", () => {
    const start_time = new Date(2021, 1, 20, 10, 15);
    const end_time = new Date(2021, 1, 25, 13, 15);
    const end_time_2 = new Date(2021, 1, 27, 18, 15);

    expect(dateProvider.daysDiff(start_time, end_time)).toBe(5);
    expect(dateProvider.daysDiff(start_time, end_time_2)).toBe(7);
  });
});

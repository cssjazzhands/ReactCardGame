import { formatDate, formatLaunchAge } from "utils/utils";

describe("formatDate", () => {
  it("formats a well-known date correctly", () => {
    expect(formatDate("1969-07-20")).toBe("July 20, 1969");
  });

  it("formats another date correctly", () => {
    expect(formatDate("2021-12-25")).toBe("December 25, 2021");
  });

  it("formats a modern date correctly", () => {
    expect(formatDate("2024-10-14")).toBe("October 14, 2024");
  });
});

describe("formatLaunchAge", () => {
  const REF = new Date("2026-05-27T12:00:00");

  it("returns 'X yrs ago' for a far-past date", () => {
    const result = formatLaunchAge("1969-07-16", REF);
    expect(result).toMatch(/^\d+ yrs? ago$/);
    expect(result).toContain("56");
  });

  it("returns 'in X days' for a future date", () => {
    const result = formatLaunchAge("2026-09-01", REF);
    expect(result).toMatch(/^in \d+ days?$/);
  });

  it("returns 'in 1 day' singular for exactly one day ahead", () => {
    const result = formatLaunchAge("2026-05-28", REF);
    expect(result).toBe("in 1 day");
  });

  it("returns 'X days ago' for a recent past date within the same year", () => {
    const result = formatLaunchAge("2026-05-01", REF);
    expect(result).toMatch(/^\d+ days? ago$/);
    expect(result).toContain("26");
  });

  it("uses current date when no refDate is supplied", () => {
    const result = formatLaunchAge("1990-04-24");
    expect(result).toMatch(/ago$/);
  });
});

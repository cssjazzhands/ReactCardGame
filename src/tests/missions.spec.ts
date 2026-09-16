import { getMissionsByStatus, getMissionStats } from "utils/utils";
import { MISSIONS } from "utils/missions-data";

describe("MISSIONS data integrity", () => {
  it("has at least one mission", () => {
    expect(MISSIONS.length).toBeGreaterThan(0);
  });

  it("all missions have required fields", () => {
    for (const m of MISSIONS) {
      expect(m.id).toBeTruthy();
      expect(m.name).toBeTruthy();
      expect(m.status).toBeTruthy();
      expect(m.launchDate).toBeTruthy();
      expect(m.target).toBeTruthy();
      expect(m.description).toBeTruthy();
    }
  });

  it("all status values are valid", () => {
    const validStatuses: MissionStatus[] = ["active", "completed", "planned"];
    for (const m of MISSIONS) {
      expect(validStatuses).toContain(m.status);
    }
  });

  it("all launch dates are valid YYYY-MM-DD strings", () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    for (const m of MISSIONS) {
      expect(m.launchDate).toMatch(dateRegex);
      expect(new Date(m.launchDate).toString()).not.toBe("Invalid Date");
    }
  });

  it("all IDs are unique", () => {
    const ids = MISSIONS.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("includes at least one mission of each status", () => {
    const statuses = new Set(MISSIONS.map((m) => m.status));
    expect(statuses.has("active")).toBe(true);
    expect(statuses.has("completed")).toBe(true);
    expect(statuses.has("planned")).toBe(true);
  });
});

describe("getMissionsByStatus", () => {
  it("returns only missions matching the given status", () => {
    const active = getMissionsByStatus(MISSIONS, "active");
    expect(active.every((m) => m.status === "active")).toBe(true);
    expect(active.length).toBeGreaterThan(0);
  });

  it("filters completed missions correctly", () => {
    const completed = getMissionsByStatus(MISSIONS, "completed");
    expect(completed.every((m) => m.status === "completed")).toBe(true);
    expect(completed.length).toBeGreaterThan(0);
  });

  it("returns an empty array when no missions match", () => {
    expect(getMissionsByStatus([], "active")).toHaveLength(0);
  });

  it("active + completed + planned counts sum to total", () => {
    const total = MISSIONS.length;
    const active = getMissionsByStatus(MISSIONS, "active").length;
    const completed = getMissionsByStatus(MISSIONS, "completed").length;
    const planned = getMissionsByStatus(MISSIONS, "planned").length;
    expect(active + completed + planned).toBe(total);
  });
});

describe("getMissionStats", () => {
  it("total equals the number of missions passed", () => {
    const stats = getMissionStats(MISSIONS);
    expect(stats.total).toBe(MISSIONS.length);
  });

  it("active + completed + planned equals total", () => {
    const stats = getMissionStats(MISSIONS);
    expect(stats.active + stats.completed + stats.planned).toBe(stats.total);
  });

  it("returns all zeros for an empty array", () => {
    expect(getMissionStats([])).toEqual({ total: 0, active: 0, completed: 0, planned: 0 });
  });

  it("correctly counts a hand-crafted list", () => {
    const list: MissionType[] = [
      {
        id: "a",
        name: "A",
        status: "active",
        launchDate: "2020-01-01",
        target: "Mars",
        description: "x",
      },
      {
        id: "b",
        name: "B",
        status: "active",
        launchDate: "2021-01-01",
        target: "Moon",
        description: "x",
      },
      {
        id: "c",
        name: "C",
        status: "completed",
        launchDate: "2000-01-01",
        target: "Sun",
        description: "x",
      },
      {
        id: "d",
        name: "D",
        status: "planned",
        launchDate: "2030-01-01",
        target: "Venus",
        description: "x",
      },
    ];
    expect(getMissionStats(list)).toEqual({ total: 4, active: 2, completed: 1, planned: 1 });
  });
});

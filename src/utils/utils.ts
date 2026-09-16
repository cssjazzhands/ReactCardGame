export function commonExample(): void {
  console.log("common example output");
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getMissionsByStatus(missions: MissionType[], status: MissionStatus): MissionType[] {
  return missions.filter((m) => m.status === status);
}

export function getMissionStats(missions: MissionType[]): MissionStats {
  return {
    total: missions.length,
    active: missions.filter((m) => m.status === "active").length,
    completed: missions.filter((m) => m.status === "completed").length,
    planned: missions.filter((m) => m.status === "planned").length,
  };
}

export function formatLaunchAge(launchDateStr: string, refDate?: Date): string {
  const launch = new Date(launchDateStr + "T00:00:00");
  const now = refDate ?? new Date();
  const diffMs = now.getTime() - launch.getTime();

  if (diffMs < 0) {
    const days = Math.ceil(Math.abs(diffMs) / (1000 * 60 * 60 * 24));
    return `in ${days} day${days !== 1 ? "s" : ""}`;
  }

  const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));
  if (years >= 1) {
    return `${years} yr${years !== 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return `${days} day${days !== 1 ? "s" : ""} ago`;
}

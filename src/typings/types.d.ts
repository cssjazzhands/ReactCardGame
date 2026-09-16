type RespExampleType = {
  id: number;
  version: string;
  envVal: string;
};

type MissionStatus = "active" | "completed" | "planned";

type MissionType = {
  id: string;
  name: string;
  status: MissionStatus;
  launchDate: string;
  target: string;
  description: string;
};

type MissionStats = {
  total: number;
  active: number;
  completed: number;
  planned: number;
};

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

type CritterRarity = "common" | "uncommon" | "rare" | "ultra-rare" | "legendary";

type CritterStatsMap = {
  [K in keyof typeof CritterRarity]: number;
};

type CritterRarityFilters = {
  total: number;
} & CritterStatsMap;

type CritterIdentity = {
  id: string;
  fieldName: string;
  latinName: string;
  rarity: CritterRarity;
  tags: string[];
}

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

type CritterRarity = "Common" | "Uncommon" | "Rare" | "Ultra Rare" | "Legendary";

type CritterStatsMap = {
  [K in keyof typeof CritterRarity]: number;
};

type CritterRarityStats = {
  total: number;
} & CritterStatsMap;

type CritterType = {
  id: string;
  fieldName: string;
  latinName: string;
  rarity: CritterRarity;
  imageURL: string;
  tags: string[];
}

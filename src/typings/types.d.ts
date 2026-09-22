type RespExampleType = {
  id: number;
  version: string;
  envVal: string;
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

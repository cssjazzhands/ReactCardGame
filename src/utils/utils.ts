import { CRITTERS } from "./critters-data";

export function getCritterStats(critters: CritterIdentity[], rarities: CritterRarity[]): CritterRarityFilters {
  const statMap: CritterRarityFilters = rarities.reduce((acc, rarity) => {
    acc[rarity] = 0;
    return acc;
  }, { total: 0 } as CritterRarityFilters);

  critters.forEach((critter) => {
    statMap[critter.rarity]++;
    statMap.total++;
  });
  return statMap;
}

function generateRandomCritter(): CritterIdentity {
  return CRITTERS[Math.floor(Math.random() * CRITTERS.length)];
}

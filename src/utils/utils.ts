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


export function getRandomItems<T>(arr: T[], count: number = 3): T[] {
  // Guard clause if the array is smaller than the requested count
  if (arr.length <= count) return [...arr];
  if (arr.length <= 0) return [];

  const result: T[] = [];
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    result.push(arr[randomIndex]);
  }

  return result;
}

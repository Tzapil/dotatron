import { Heroes, HeroMatchup, HeroBenchmarks, HeroItemTimings, HeroItems, HeroStats } from "./types";
import { baseApiURL } from '../const';

export async function fetchHeroes(): Promise<Heroes[]> {
    const response = await fetch(`${baseApiURL}/heroes`);
    const answer = await response.json();
    return answer as Heroes[];
}

export async function fetchHeroesStats(): Promise<HeroStats[]> {
    const response = await fetch(`${baseApiURL}/heroStats`);
    const answer = await response.json();
    return answer as HeroStats[];
}

// heroId = 0 = antimage
// heroId = 8 = juggernaut
export async function fetchHeroMatchapsById(heroId: number): Promise<HeroMatchup[]> {
    const response = await fetch(`${baseApiURL}/heroes/${heroId}/matchups`);
    const answer = await response.json();
    return answer as HeroMatchup[];
}

export async function fetchHeroBenchmarksById(heroId: number): Promise<HeroBenchmarks> {
    const response = await fetch(`${baseApiURL}/benchmarks?hero_id=${heroId}`);
    const answer = await response.json();
    return answer as HeroBenchmarks;
}

export async function fetchHeroItemsTimingsById(heroId: number): Promise<HeroItemTimings[]> {
    const response = await fetch(`${baseApiURL}/scenarios/itemTimings?hero_id=${heroId}`);
    const answer = await response.json();
    return answer as HeroItemTimings[];
}

export async function fetchHeroItemsById(heroId: number): Promise<HeroItems> {
    const response = await fetch(`${baseApiURL}/heroes/${heroId}/itemPopularity`);
    const answer = await response.json();
    return answer as HeroItems;
}

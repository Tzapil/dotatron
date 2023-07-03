import { Heroes, HeroMatchup, HeroBenchmarks, HeroItemTimings } from "./types";

const baseURL = 'https://api.opendota.com/api';

export async function fetchHeroes(): Promise<Heroes[]> {
    const response = await fetch(`${baseURL}/heroes`);
    const answer = await response.json();
    return answer as Heroes[];
}

// heroId = 0 = antimage
export async function fetchHeroMatchapsById(heroId: number): Promise<HeroMatchup[]> {
    const response = await fetch(`${baseURL}/heroes/${heroId}/matchups`);
    const answer = await response.json();
    return answer as HeroMatchup[];
}

export async function fetchHeroBenchmarksById(heroId: number): Promise<HeroBenchmarks> {
    const response = await fetch(`${baseURL}/benchmarks?hero_id=${heroId}`);
    const answer = await response.json();
    return answer as HeroBenchmarks;
}

export async function fetchHeroItemsTimingsById(heroId: number): Promise<HeroItemTimings[]> {
    const response = await fetch(`${baseURL}/scenarios/itemTimings?hero_id=${heroId}`);
    const answer = await response.json();
    return answer as HeroItemTimings[];
}

export async function fetchHeroItemsById(heroId: number): Promise<HeroItemTimings[]> {
    const response = await fetch(`${baseURL}/scenarios/itemTimings?hero_id=${heroId}`);
    const answer = await response.json();
    return answer as HeroItemTimings[];
}

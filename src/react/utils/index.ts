import { HeroStats } from "../api/types";

export function findHero(id: number, heroes: HeroStats[]) {
    return heroes.find((hero: HeroStats) => hero.id === id);
}

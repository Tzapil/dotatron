import { HeroStats } from "../api/types";
import { HeroData } from '../reducers/dota';

export function findHero(id: number, heroes: Record<number, HeroData>) {
    return heroes[id];
}

import {
    createSlice,
    createAsyncThunk,
    PayloadAction
} from '@reduxjs/toolkit';
import type { RootState } from '.';  
import {
    fetchHeroes,
    fetchHeroesStats,
    fetchHeroMatchapsById,
    fetchHeroBenchmarksById,
    fetchHeroItemsById,
    fetchHeroItemsTimingsById
} from '../api';
import {
    Heroes,
    HeroStats,
    HeroItems,
    HeroMatchup,
    HeroBenchmarks,
    HeroItemTimings
} from '../api/types';

import { DOTA_STAB } from '../const';

export interface HeroExtra {
    hero_matchups: HeroMatchup[];
    benchmarks: HeroBenchmarks | null;
    items: HeroItems | null;
    items_timings: HeroItemTimings[];
    loaded: boolean;
};

export interface HeroData {
    main: HeroStats | null;
    extra: HeroExtra;
};

// Define a type for the slice state
export interface DotaState {
    heroes: Record<number, HeroData>;
    heroesLoaded: boolean;
    gpm: number;
    gold: number;
    exp: number;
    expected_gold: number;
    expected_exp: number;
    last_hits: number;
    information_fetching: boolean;
};

// Define the initial state using that type
const initialState: DotaState = //DOTA_STAB as unknown as DotaState;
{
    heroes: {},
    heroesLoaded: false,
    gpm: 0,
    gold: 0,
    exp: 0,
    expected_gold: 0,
    expected_exp: 0,
    last_hits: 0,
    information_fetching: false
};

export const fetchHeroesStatsThunk = createAsyncThunk(
    'dota/UPDATE_HEROES_STATS',
    async () => {
        return await fetchHeroesStats();
    },
    {
        condition: (_, { getState, extra }) => {
            // TODO any
            const dota = (getState() as any).dota as DotaState;
            // Не делаем повторные запросы
            if (dota.heroesLoaded) {
                return false;
            }
        },
    }
);

export const fetchHeroByIdThunk = createAsyncThunk(
    'dota/UPDATE_HERO',
    async (heroId: number = 0) => {
        const promise = Promise.all([
            fetchHeroMatchapsById(heroId),
            fetchHeroItemsTimingsById(heroId),
            fetchHeroItemsById(heroId),
            fetchHeroBenchmarksById(heroId)
        ]);
        return await promise;
    },
    {
        condition: (heroId, { getState, extra }) => {
            // TODO any
            const dota = (getState() as any).dota as DotaState;
            // Не делаем повторные запросы
            console.log('CHECK CONDITION');
            console.log(dota.heroes[heroId], dota.heroes[heroId]?.extra?.loaded)
            if (dota.heroes[heroId]?.extra?.loaded) {
                return false;
            }
            // TODO Save fetch status
            // if (fetchStatus === 'fulfilled' || fetchStatus === 'loading') {
            //     // Already fetched or in progress, don't need to re-fetch
            //     return false
            // }
        },
    }
);

export const fetchHeroMatchupsByIdThunk = createAsyncThunk(
    'dota/UPDATE_INFORMATION_MATCHUP',
    async (heroId: number = 0) => {
        const data = await fetchHeroMatchapsById(heroId);
        return data;
    }
);

export const fetchHeroBenchmarksByIdThunk = createAsyncThunk(
    'dota/UPDATE_INFORMATION_BENCHMARKS',
    async (heroId: number = 0) => {
        return await fetchHeroBenchmarksById(heroId);
    }
);

export const fetchHeroItemsByIdThunk = createAsyncThunk(
    'dota/UPDATE_INFORMATION_ITEMS',
    async (heroId: number = 0) => {
        return await fetchHeroItemsById(heroId);
    }
);

export const fetchHeroItemsTimingsByIdThunk = createAsyncThunk(
    'dota/UPDATE_INFORMATION_ITEMS_TIMINGS',
    async (heroId: number = 0) => {
        const data = await fetchHeroItemsTimingsById(heroId);
        return data;
    }
);

export const dotaSlice = createSlice({
    name: 'dota',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        CHANGE_GPM: (state, action: PayloadAction<number>) => {
            state.gpm = action.payload;
        },
        CHANGE_EXP: (state, action: PayloadAction<number>) => {
            state.exp = action.payload;
        },
        CHANGE_LAST_HIT: (state, action: PayloadAction<number>) => {
            state.last_hits = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchHeroesStatsThunk.fulfilled, (state, action) => {
                const heroes = action.payload;
                state.heroesLoaded = true;
                state.heroes = heroes.reduce((acc: Record<number, HeroData>, hero: HeroStats) => {
                    acc[hero.id] = {
                        main: hero,
                        extra: {
                            hero_matchups: [],
                            benchmarks: null,
                            items: null,
                            items_timings: [],
                            loaded: false,
                        },
                    };
                    return acc;
                }, {} as Record<number, HeroData>);
            })
            .addCase(fetchHeroMatchupsByIdThunk.fulfilled, (state, action) => {
                const heroId = action.meta.arg;
                state.heroes[heroId].extra.hero_matchups = action.payload;
            })
            .addCase(fetchHeroBenchmarksByIdThunk.fulfilled, (state, action) => {
                const heroId = action.meta.arg;
                state.heroes[heroId].extra.benchmarks = action.payload;
            })
            .addCase(fetchHeroItemsByIdThunk.fulfilled, (state, action) => {
                const heroId = action.meta.arg;
                state.heroes[heroId].extra.items = action.payload;
            })
            .addCase(fetchHeroItemsTimingsByIdThunk.fulfilled, (state, action) => {
                const heroId = action.meta.arg;
                state.heroes[heroId].extra.items_timings = action.payload;
            })
            .addCase(fetchHeroByIdThunk.fulfilled, (state, action) => {
                const heroId = action.meta.arg;
                const [hero_matchups, items_timings, items, benchmarks] = action.payload;
                state.heroes[heroId].extra = {
                    hero_matchups,
                    benchmarks,
                    items,
                    items_timings,
                    loaded: true
                };
            });
    },
});

export const { CHANGE_GPM, CHANGE_EXP, CHANGE_LAST_HIT } = dotaSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGold = (state: RootState) => state.dota.gold;
export const selectExp = (state: RootState) => state.dota.exp;
export const selectLastHits = (state: RootState) => state.dota.last_hits;
export const selectGMP = (state: RootState) => state.dota.gpm;
// export const selectHeroMatchups = (state: RootState) => state.dota.hero_matchups;
export const selectHeroes = (state: RootState) => state.dota.heroes;
export const selectHeroesStats = (state: RootState) => state.dota.heroes;
// export const selectBenchmarks = (state: RootState) => state.dota.benchmarks;
// export const selectItems = (state: RootState) => state.dota.items;
// export const selectItemsTimings = (state: RootState) => state.dota.items_timings;

export default dotaSlice.reducer;

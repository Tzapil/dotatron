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

// Define a type for the slice state
export interface DotaState {
    heroes: Heroes[];
    heroes_stats: HeroStats[];
    hero_matchups: HeroMatchup[];
    benchmarks: HeroBenchmarks | null;
    items: HeroItems | null;
    items_timings: HeroItemTimings[];
    gpm: number;
    gold: number;
    exp: number;
    expected_gold: number;
    expected_exp: number;
    last_hits: number;
    information_fetching: boolean;
};

// Define the initial state using that type
const initialState: DotaState = DOTA_STAB as unknown as DotaState;
// {
//     heroes: [],
//     heroes_stats: [],
//     hero_matchups: [],
//     benchmarks: null,
//     items_timings: [],
//     items: null,
//     gpm: 0,
//     gold: 0,
//     exp: 0,
//     expected_gold: 0,
//     expected_exp: 0,
//     last_hits: 0,
//     information_fetching: false
// };

export const fetchHeroesThunk = createAsyncThunk(
    'dota/UPDATE_HEROES',
    async () => {
        return await fetchHeroes();
    }
);

export const fetchHeroesStatsThunk = createAsyncThunk(
    'dota/UPDATE_HEROES_STATS',
    async () => {
        return await fetchHeroesStats();
    }
);

export const fetchHeroMatchupsByIdThunk = createAsyncThunk(
    'dota/UPDATE_INFORMATION_MATCHUP',
    async (heroId: number = 0) => {
        const data = await fetchHeroMatchapsById(heroId);
        return data
            .map(item => ({
                ...item,
                winrate: Math.floor(Number(item.wins) / Number(item.games_played) * 100),
            }))
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

        // Фильтруем сразу. Игр с предметом в базе > 20 и винрейт > 50%
        // TODO сортировать по таймингам?
        return data
            .map(item => ({
                ...item,
                wins: Number(item.wins),
                games: Number(item.games),
                winrate: Math.floor(Number(item.wins) / Number(item.games) * 100),
            }))
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
            .addCase(fetchHeroesThunk.fulfilled, (state, action) => {
                state.heroes = action.payload;
            })
            .addCase(fetchHeroesStatsThunk.fulfilled, (state, action) => {
                state.heroes_stats = action.payload;
            })
            .addCase(fetchHeroMatchupsByIdThunk.fulfilled, (state, action) => {
                state.hero_matchups = action.payload;
            })
            .addCase(fetchHeroBenchmarksByIdThunk.fulfilled, (state, action) => {
                state.benchmarks = action.payload;
            })
            .addCase(fetchHeroItemsByIdThunk.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(fetchHeroItemsTimingsByIdThunk.fulfilled, (state, action) => {
                state.items_timings = action.payload;
            });
    },
});

export const { CHANGE_GPM, CHANGE_EXP, CHANGE_LAST_HIT } = dotaSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGold = (state: RootState) => state.dota.gold;
export const selectExp = (state: RootState) => state.dota.exp;
export const selectLastHits = (state: RootState) => state.dota.last_hits;
export const selectGMP = (state: RootState) => state.dota.gpm;
export const selectHeroMatchups = (state: RootState) => state.dota.hero_matchups;
export const selectHeroes = (state: RootState) => state.dota.heroes;
export const selectHeroesStats = (state: RootState) => state.dota.heroes_stats;
export const selectBenchmarks = (state: RootState) => state.dota.benchmarks;
export const selectItems = (state: RootState) => state.dota.items;
export const selectItemsTimings = (state: RootState) => state.dota.items_timings;

export default dotaSlice.reducer;

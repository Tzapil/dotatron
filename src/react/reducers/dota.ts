import {
    createSlice,
    createAsyncThunk,
    PayloadAction
} from '@reduxjs/toolkit';
import type { RootState } from '.';  
import { fetchHeroes, fetchHeroMatchapsById, fetchHeroBenchmarksById, fetchHeroItemsById } from '../api';
import { Heroes, HeroMatchup, HeroBenchmarks, HeroItemTimings } from '../api/types';

// Define a type for the slice state
export interface DotaState {
    heroes: Heroes[];
    hero_matchups: HeroMatchup[];
    benchmarks: HeroBenchmarks | null;
    items: HeroItemTimings[] | null;
    gpm: number;
    gold: number;
    exp: number;
    expected_gold: number;
    expected_exp: number;
    last_hits: number;
    information_fetching: boolean;
};

// Define the initial state using that type
const initialState: DotaState = {
    heroes: [],
    hero_matchups: [],
    benchmarks: null,
    items: null,
    gpm: 0,
    gold: 0,
    exp: 0,
    expected_gold: 0,
    expected_exp: 0,
    last_hits: 0,
    information_fetching: false
};

export const fetchHeroesThunk = createAsyncThunk(
    'dota/UPDATE_HEROES',
    async () => {
        return await fetchHeroes();
    }
);

export const fetchHeroMatchupsByIdThunk = createAsyncThunk(
    'dota/UPDATE_INFORMATION_MATCHUP',
    async (heroId: number = 0) => {
        return await fetchHeroMatchapsById(heroId);
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
            .addCase(fetchHeroMatchupsByIdThunk.fulfilled, (state, action) => {
                state.hero_matchups = action.payload;
            })
            .addCase(fetchHeroesThunk.fulfilled, (state, action) => {
                state.heroes = action.payload;
            })
            .addCase(fetchHeroBenchmarksByIdThunk.fulfilled, (state, action) => {
                state.benchmarks = action.payload;
            })
            .addCase(fetchHeroItemsByIdThunk.fulfilled, (state, action) => {
                state.items = action.payload;
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
export const selectBenchmarks = (state: RootState) => state.dota.benchmarks;
export const selectItems = (state: RootState) => state.dota.items;

export default dotaSlice.reducer;

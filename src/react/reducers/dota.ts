import {
    createSlice,
    createAsyncThunk,
    PayloadAction
} from '@reduxjs/toolkit';
import type { RootState } from '.';  

// Define a type for the slice state
export interface DotaState {
    heroes: Object[];
    hero: Object;
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
    hero: {},
    gpm: 0,
    gold: 0,
    exp: 0,
    expected_gold: 0,
    expected_exp: 0,
    last_hits: 0,
    information_fetching: false
};

export const fetchHeroes = createAsyncThunk(
    'dota/UPDATE_HEROES',
    async () => {
        const response = await fetch(`https://api.opendota.com/api/heroes`);
        const answer = await response.json();
        return answer;
    }
);

export const fetchHeroById = createAsyncThunk(
    'dota/UPDATE_INFORMATION',
    async (heroId: number = 0) => {
        // heroId = 0 = antimage
        const response = await fetch(`https://api.opendota.com/api/heroes/${heroId}/matchups`);
        console.log('REQUEST', response);
        const answer = await response.json();
        return answer;
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
        // FETCH_INFORMATION: (state, _: PayloadAction<number>) => {
        //     state.information_fetching = true;
        // },
        // UPDATE_INFORMATION: (state, action: PayloadAction<number>) => {
        //     state.information_fetching = false;
        //     state.gpm = action.payload;
        // }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchHeroById.fulfilled, (state, action) => {
                state.hero = action.payload;
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroes = action.payload;
            });
    },
});

export const { CHANGE_GPM, CHANGE_EXP, CHANGE_LAST_HIT } = dotaSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGold = (state: RootState) => state.dota.gold;
export const selectExp = (state: RootState) => state.dota.exp;
export const selectLastHits = (state: RootState) => state.dota.last_hits;
export const selectGMP = (state: RootState) => state.dota.gpm;
export const selectHero = (state: RootState) => state.dota.hero;
export const selectHeroes = (state: RootState) => state.dota.heroes;

export default dotaSlice.reducer;

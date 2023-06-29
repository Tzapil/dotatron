import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import type { RootState } from '.';

// Define a type for the slice state
export interface DotaState {
    gold: number;
    exp: number;
    expected_gold: number;
    expected_exp: number;
    last_hits: number;
};

// Define the initial state using that type
const initialState: DotaState = {
    gold: 0,
    exp: 0,
    expected_gold: 0,
    expected_exp: 0,
    last_hits: 0
};

export const dotaSlice = createSlice({
    name: 'dota',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        changeGold: (state, action: PayloadAction<number>) => {
            state.gold = action.payload;
        },
        changeExp: (state, action: PayloadAction<number>) => {
            state.exp = action.payload;
        },
        changeLastHit: (state, action: PayloadAction<number>) => {
            state.last_hits = action.payload;
        },
    }
});

export const { changeGold, changeExp, changeLastHit } = dotaSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGold = (state: RootState) => state.dota.gold;
export const selectExp = (state: RootState) => state.dota.exp;
export const selectLastHits = (state: RootState) => state.dota.last_hits;

export default dotaSlice.reducer;

import { combineReducers } from 'redux';
import dotaReducer from './dota';

const rootReducer = combineReducers({
    dota: dotaReducer,
});

export default rootReducer;
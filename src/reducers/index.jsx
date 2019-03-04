import { clickReducer } from './clickReducer';
import { searchReducer } from './searchReducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  clickState: clickReducer,
  searchState: searchReducer
});

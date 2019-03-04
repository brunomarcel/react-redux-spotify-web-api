import {
  FETCH_SEARCH,
  FETCH_SEARCH_SUCCESS,
  FETCH_SEARCH_ERROR,
  UNAUTHORIZED
} from '../actions/actionTypes'

const initialState = {
  searchValue: '',
  fetching: false,
  list: [],
  unauthorized: false
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case UNAUTHORIZED:
      return {
        ...state,
        unauthorized: action.unauthorized,
        fetching: false
      };
    case FETCH_SEARCH:
      return {
        ...state,
        fetching: action.fetching
      };
    case FETCH_SEARCH_SUCCESS:
      return {
        ...state,
        list: action.list,
        fetching: false
      };
    default:
      return state;
  }
};

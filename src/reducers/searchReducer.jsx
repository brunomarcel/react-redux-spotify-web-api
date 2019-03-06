import {
  FETCH_SEARCH,
  FETCH_SEARCH_SUCCESS,
  UNAUTHORIZED,
  FETCH_ALBUM_SUCCESS,
  FETCH_SEARCH_ERROR
} from '../actions/actionTypes'

const initialState = {
  searchValue: '',
  fetching: false,
  unauthorized: false,
  list: {},
  album: {},
  error: false
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
      Object.assign(initialState.list, action.list)
      return {
        ...state,
        list: initialState.list,
        fetching: false,
        error: false
      };
    case FETCH_SEARCH_ERROR:
      return {
        ...state,
        fetching: false,
        error: true
      };
    case FETCH_ALBUM_SUCCESS:
      return {
        ...state,
        album: action.album
      };
    default:
      return state;
  }
};

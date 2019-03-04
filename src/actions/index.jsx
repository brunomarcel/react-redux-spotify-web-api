import axios from 'axios'
import {
  CLICK_UPDATE_VALUE,
  FETCH_SEARCH,
  FETCH_SEARCH_SUCCESS,
  UNAUTHORIZED
} from './actionTypes'

export function clickButton() {
  return (dispatch) => {
    return dispatch(test('dasjhk'))
  }
}

export const unauthorizedToken = (flag) => ({
  type: UNAUTHORIZED,
  unauthorized: flag
})

export function search(value) {
  return (dispatch) => {
    dispatch(searchList(true))
    const spotifyURI = `https://api.spotify.com/v1/search?q=${value}&type=album,track&offset=10&limit=10`
    const accessToken = localStorage.getItem('accessToken')
    const config = {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    };
    axios.get(spotifyURI, config)
      .then(res => {
        return dispatch(searchListSuccess(res))
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          dispatch(unauthorizedToken(true))
        }
      })
  }
}

export const searchList = (flag) => ({
  type: FETCH_SEARCH,
  fetching: flag
})

export const searchListSuccess = (list) => ({
  type: FETCH_SEARCH_SUCCESS,
  list: list
})

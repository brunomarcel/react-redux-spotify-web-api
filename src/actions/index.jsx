import axios from 'axios'
import {
  FETCH_SEARCH,
  FETCH_SEARCH_SUCCESS,
  UNAUTHORIZED,
  FETCH_ALBUM_SUCCESS,
  FETCH_SEARCH_ERROR
} from './actionTypes'

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
        if (res.data.albums.items.length && res.data.tracks.items.length) {
          const list = {
            'albums': res.data.albums.items,
            'tracks': res.data.tracks.items
          }
          localStorage.setItem('list', JSON.stringify({
            [value]: list
          }))
          localStorage.setItem('lastSearch', value)
          return dispatch(searchListSuccess(
            {
              [value]: list
            })
          )
        } else {
          dispatch(searchListError())
        }
      })
      .catch(function (error) {
        if (error.response && error.response.status === 401) {
          dispatch(unauthorizedToken(true))
        } else {
          dispatch(searchListError())
        }
      })
  }
}

export function fetchAlbum(id) {
  return (dispatch) => {
    const spotifyURI = `https://api.spotify.com/v1/albums/${id}`
    const accessToken = localStorage.getItem('accessToken')
    const config = {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    };
    axios.get(spotifyURI, config)
      .then(res => {
        return dispatch(fetchAlbumSuccess(res.data))
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

export const searchListError = () => ({
  type: FETCH_SEARCH_ERROR
})

export const fetchAlbumSuccess = (album) => ({
  type: FETCH_ALBUM_SUCCESS,
  album: album
})
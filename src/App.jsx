import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import {
  search,
  unauthorizedToken,
  searchListSuccess
} from './actions'
import './App.scss'

// Components
import Header from './components/Header'
import List from './components/List'

class App extends Component {

  state = {
    inputValue: '',
    inputToken: '',
    lastSearch: ''
  }
  search = ''

  // Handle change input search
  inputChange = event => {
    this.setState({
      inputValue: event.target.value
    })
    clearTimeout(this.search)
    this.search = setTimeout(() => {
      if (this.state.inputValue.length > 1 && !this.props.list[this.state.inputValue]) {
        this.props.search(this.state.inputValue)
      }
      if (this.state.inputValue.length > 1) {
        this.setState({
          lastSearch: this.state.inputValue
        })
      }
    }, 1000)
  }

  // User input token
  inputTokenChange = event => {
    localStorage.setItem('accessToken', event.target.value)
    this.props.unauthorizedToken(false)
    this.setState({
      inputToken: event.target.value
    })
    if (this.state.inputValue.length > 2) {
      this.props.search(this.state.inputValue)
    }
  }

  componentWillMount() {
    const _lastSearch = localStorage.getItem('lastSearch')
    if (_lastSearch) {
      if (!this.props.list[_lastSearch]) {
        const list = JSON.parse(localStorage.getItem('list'))
        if (list) {
          this.props.searchListSuccess(list)
        }
      }
      this.setState({
        lastSearch: _lastSearch
      })
    }
  }

  render() {
    const {
      fetching,
      list,
      unauthorized,
      error
    } = this.props
    const {
      inputValue,
      lastSearch
    } = this.state

    const spinner = (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" ng-attr-r="{{config.radius}}" ng-attr-stroke="{{config.base}}" fill="none" r="30" stroke="#161616" strokeWidth="10"></circle><circle cx="50" cy="50" ng-attr-r="{{config.radius}}" ng-attr-stroke="{{config.stroke}}" ng-attr-stroke-width="{{config.innerWidth}}" ng-attr-stroke-linecap="{{config.linecap}}" fill="none" r="30" stroke="#00eb6e" strokeWidth="10" strokeLinecap="square" transform="rotate(41.5087 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;180 50 50;720 50 50" keyTimes="0;0.5;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform><animate attributeName="stroke-dasharray" calcMode="linear" values="18.84955592153876 169.64600329384882;94.2477796076938 94.24777960769377;18.84955592153876 169.64600329384882" keyTimes="0;0.5;1" dur="1" begin="0s" repeatCount="indefinite"></animate></circle></svg>
    )
    const searching = fetching ? spinner : '';

    let unauthorizedContent = ''
    let unauthorizedText = ''
    let accessToken = localStorage.getItem('accessToken')

    if (unauthorized || accessToken === null) {

      unauthorizedText = accessToken ? 'Seu token expirou, insira outro' : 'Insira o token'

      unauthorizedContent = (
        <div className='unauthorized text-center'>
          <label className='unauthorized-label'>
            <span className='unauthorized-text color-lightGray font-24'>{unauthorizedText}</span>
            <input onChange={this.inputTokenChange} className='unauthorized-input font-18' type="text" />
          </label>
        </div>
      )
    }

    const classPadding = list[lastSearch] ? '' : 'empty'
    const listAlbums = list[lastSearch] && list[lastSearch].albums && list[lastSearch].albums.length ?
      <List title='Álbuns' listItems={list[lastSearch].albums} listClassName='swiper' /> :
      ''

    const listTracks = list[lastSearch] && list[lastSearch].tracks && list[lastSearch].tracks.length ?
      <List title='Músicas' listItems={list[lastSearch].tracks} listClassName='swiper' /> :
      ''

    const notFoud = error ?
      <h2 className='color-lightGray text-center'>Não encontramos álbum ou música</h2> : ''
    
    return (
      <div className={`app ${classPadding}`}>
        <div className="searchHeader">
          <Header />

          <div className='app-searchBox'>
            <input autoComplete='off' onChange={this.inputChange} value={inputValue} id='app-searchBox-input' className='app-searchBox-input color-gray' type='text' placeholder='Busque por artistas, álbuns ou músicas' />
            <label htmlFor='app-searchBox-input' className='app-searchBox-label color-gray'>Busque por artistas, álbuns ou músicas</label>
          </div>
        </div>
        {notFoud}
        <div className="container">
          <span className='spinner'>{searching}</span>
          {listAlbums}
          {listTracks}
        </div>
        {unauthorizedContent}
      </div>
    )
  }
}

App.propTypes = {
  fetching : PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  list: PropTypes.object.isRequired,
  searchValue: PropTypes.string.isRequired,
  unauthorized: PropTypes.bool.isRequired,
  search: PropTypes.func.isRequired,
  searchListSuccess: PropTypes.func.isRequired,
  unauthorizedToken: PropTypes.func.isRequired
}

const mapStateToProps = store => ({
  list: store.searchState.list,
  searchValue: store.searchState.searchValue,
  fetching: store.searchState.fetching,
  unauthorized: store.searchState.unauthorized,
  error: store.searchState.error
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ search, searchListSuccess, unauthorizedToken }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)

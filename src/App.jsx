import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  clickButton,
  search,
  unauthorizedToken
} from './actions'
import axios from 'axios'
import './App.scss'

// Components
import Header from './components/Header'
import List from './components/List'

class App extends Component {

  state = {
    inputValue: '',
    inputToken: ''
  }
  search = ''

  inputChange = event => {
    this.setState({
      inputValue: event.target.value
    })
    clearTimeout(this.search)
    this.search = setTimeout(() => {
      this.props.search(this.state.inputValue)
    }, 1000)
  }

  inputTokenChange = event => {
    this.setState({
      inputToken: event.target.value
    })
  }

  setAccessToken = () => {
    console.log(123)
    localStorage.setItem('accessToken', this.state.inputToken)
    this.props.unauthorizedToken(false)
  }

  render() {

    const {
      newValue,
      fetching,
      list,
      unauthorized
    } = this.props;
    const { inputValue } = this.state;
    const searching = fetching ? 'Buscando' : '';
    console.log(this.props)

    let $unauthorized = ''
    let unauthorizedText = ''
    let accessToken = localStorage.getItem('accessToken')

    if (unauthorized || accessToken === null) {
      
      unauthorizedText = accessToken ? 'Seu token expirou, insira outro' : 'Insira o token'

      $unauthorized = (
        <div className='unauthorized text-center'>
          <label className='unauthorized-label'>
            <span className='unauthorized-text color-lightGray font-24'>{unauthorizedText}</span>
            <input onChange={this.inputTokenChange} className='unauthorized-input font-18' type="text" />
          </label>
          <button disabled={!this.state.inputToken} onClick={this.setAccessToken} className='font-16 unauthorized-save'>Salvar token</button>
        </div>
      )
    }

    return (
      <div className='app'>
        <h1>{newValue}</h1>
        <h1>{searching}</h1>
        <div className="searchHeader">
          <Header />
          <div className='app-searchBox'>
            <input onChange={this.inputChange} value={inputValue} id='app-searchBox-input' className='app-searchBox-input color-gray' type='text' placeholder='Busque por artistas, álbuns ou músicas' />
            <label htmlFor='app-searchBox-input' className='app-searchBox-label color-gray'>Busque por artistas, álbuns ou músicas</label>
          </div>
        </div>
        <div className="container">
          <List title='Álbuns buscados recentemente' listClassName='swiper' />
          <List title='Artistas buscados recentemente' listClassName='swiper' />
          <List title='Resultados encontrados para " "' listClassName='lines' />
        </div>
        {$unauthorized}
      </div>
    )
  }
}

const mapStateToProps = store => ({
  list: store.searchState.list,
  searchValue: store.searchState.searchValue,
  fetching: store.searchState.fetching,
  unauthorized: store.searchState.unauthorized
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clickButton, search, unauthorizedToken }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);

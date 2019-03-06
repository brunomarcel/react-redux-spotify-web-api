import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  unauthorizedToken,
  fetchAlbum,
  fetchAlbumSuccess
} from '../../actions'

// Components
import Header from '../Header'
import Item from '../Item'

class Album extends Component {

  state = {
    inputToken: ''
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.fetchAlbum(this.props.match.params.id)
    }
  }

  componentWillUnmount() {
    this.props.fetchAlbumSuccess({})
  }

  // User input token
  inputTokenChange = event => {
    localStorage.setItem('accessToken', event.target.value)
    this.props.unauthorizedToken(false)
    this.setState({
      inputToken: event.target.value
    })
    if (this.props.match.params.id) {
      this.props.fetchAlbum(this.props.match.params.id)
    }
  }

  // convert ms to minute:seconds
  convertMS = milliseconds => {
    let minute, seconds
    seconds = Math.floor(milliseconds / 1000)
    minute = Math.floor(seconds / 60)
    seconds = seconds % 60
    minute = minute % 60
    seconds = seconds.toString().length === 1 ? '0' + seconds : seconds
    return `${minute}:${seconds}`
  }

  // play pause music
  playPreview = (id) => {
    let stopEl = document.querySelector('.played')
    if (stopEl) {
      stopEl.pause()
      stopEl.classList.remove('played')
    }
    let el = document.getElementById(id)
    el.classList.add('played')
    el.play()
  }

  render() {

    const {
      album,
      unauthorized
    } = this.props;

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
        </div>
      )
    }

    let tracks, item
    if (album && album.tracks) {
      tracks = album.tracks.items.map(a =>
        <li key={a.id} className='album-list-item color-lightGray font-12'>
          <button className='button-play color-lightGray' onClick={() => {this.playPreview(a.id)}}>
            {a.track_number}. {a.name}
          </button>
          <span>{this.convertMS(a.duration_ms)}</span>
          <audio className='preview' id={a.id} src={a.preview_url}>
            <p>Seu nevegador não suporta o elemento audio.</p>
          </audio>
        </li>
      )
      item = <Item itemClassName='single' name={album.name} artist={album.artists[0].name} thumb={album.images[1].url} />
    }

    return (
      <div className="album">
        <Header />
        <div className="container">
          <Link className='back color-lightGray' to='/'>←	voltar</Link>
          <div className="album-content">
            {item}
            <ul className='album-list'>
              {tracks}
            </ul>
          </div>
        </div>
        {$unauthorized}
      </div>
    )
  }
}

Album.propTypes = {
  album: PropTypes.object.isRequired,
  unauthorized: PropTypes.bool.isRequired,
  unauthorizedToken: PropTypes.func.isRequired,
  fetchAlbum: PropTypes.func.isRequired,
  fetchAlbumSuccess: PropTypes.func.isRequired
}

const mapStateToProps = store => ({
  album: store.searchState.album,
  unauthorized: store.searchState.unauthorized
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ unauthorizedToken, fetchAlbum, fetchAlbumSuccess }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Album)

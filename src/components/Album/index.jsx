import React, { Component } from 'react';
import './style.scss'

// Components
import Header from '../Header'
import Item from '../Item'

class Album extends Component {

  render() {

    const tracks = Array.from({ length: 12 }, (v, k) =>
      <li key={k + 1} className='album-list-item color-lightGray font-12'>{k + 1}. Nome da faixa <span>3:23</span></li>
    )

    return (
      <div className="album">
        <Header />
        <div className="container">
          <div className="album-content">
            <Item itemClassName='single' />
            <ul className='album-list'>
              {tracks}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Album

import React from 'react';
import './style.scss'

const Item = (props) => (
  <span className={`item item-${props.itemClassName}`}>
    <img className='item-thumb' src='https://via.placeholder.com/170' />
    <p className='font-14 color-lightGray'>
      Nome do álbum<br />
      <span className='font-14 color-gray'>Nome do artista</span>
    </p>
  </span>
)

export default Item

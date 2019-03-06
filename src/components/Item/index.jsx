import React from 'react';
import PropTypes from 'prop-types'

const Item = (props) => {

  // play pause music
  const playPreview = (id) => {
    let stopEl = document.querySelector('.played')
    if (stopEl) {
      stopEl.pause()
      stopEl.classList.remove('played')
    }
    let el = document.getElementById(id)
    el.classList.add('played')
    el.play()
  }

  let button
  if (props.player) {
    button = (
      <button className='play' disabled={props.disabled} onClick={() => {playPreview(props.listId)}}>
        ▶
      </button>
    )
  }
  return (
    (
      <span className={`item item-${props.itemClassName}`}>
        <img className='item-thumb' src={props.thumb} />
        {button}
        <p className='font-14 color-lightGray'>
          {props.name}<br />
          <span className='font-14 color-gray'>{props.artist}</span>
        </p>
      </span>
    )
  )
}

Item.propTypes = {
  artist: PropTypes.string.isRequired,
  itemClassName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired
}

export default Item

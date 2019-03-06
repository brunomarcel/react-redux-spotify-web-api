import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// Components
import Item from '../Item'

const List = (props) => {

  let lists
  if (props.title === 'Álbuns') {
    lists = props.listItems.map(l => {
      return (
        <li key={l.id} className='list-item text-center'>
          <Link className='list-item-link' to={`/album/${l.id}`}>
            <Item itemClassName={props.listClassName} name={l.name} artist={l.artists[0].name} thumb={l.images[1].url} />
          </Link>
        </li>
      )
    })
  }
  if (props.title === 'Músicas') {
    lists = props.listItems.map(l => {
      const disabled = l.preview_url ? false : true
      return (
        <li key={l.id} className='list-item text-center'>
          <Item itemClassName={props.listClassName} disabled={disabled} player='true' listId={l.id} name={l.name} artist={l.artists[0].name} thumb={l.album.images[1].url} />
          <audio className='preview' id={l.id} src={l.preview_url}>
            <p>Seu nevegador não suporta o elemento audio.</p>
          </audio>
        </li>
      )
    })
  }

  return (
    <div>
      <h2 className='list-title color-lightGray font-18'>{props.title}</h2>
      <ul className={`list list-${props.listClassName}`}>
        {lists}
      </ul>
    </div>
  )
}

List.propTypes = {
  listClassName: PropTypes.string.isRequired,
  listItems: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
}

export default List

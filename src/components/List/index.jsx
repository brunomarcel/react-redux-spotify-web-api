import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

// Components
import Item from '../Item'

const List = (props) => (
  <div>
    <h2 className='list-title color-lightGray font-18'>{props.title}</h2>
    <ul className={`list list-${props.listClassName}`}>
      <li className='list-item text-center'>
        <Link className='list-item-link' to='/album'>
          <Item itemClassName={props.listClassName} />
        </Link>
      </li>
      <li className='list-item text-center'>
        <Link className='list-item-link' to='/album'>
          <Item itemClassName={props.listClassName} />
        </Link>
      </li>
      <li className='list-item text-center'>
        <Link className='list-item-link' to='/album'>
          <Item itemClassName={props.listClassName} />
        </Link>
      </li>
      <li className='list-item text-center'>
        <Link className='list-item-link' to='/album'>
          <Item itemClassName={props.listClassName} />
        </Link>
      </li>
      <li className='list-item text-center'>
        <Link className='list-item-link' to='/album'>
          <Item itemClassName={props.listClassName} />
        </Link>
      </li>
      <li className='list-item text-center'>
        <Link className='list-item-link' to='/album'>
          <Item itemClassName={props.listClassName} />
        </Link>
      </li>
    </ul>
  </div>
)

export default List

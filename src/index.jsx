import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { Store } from './store';

// Components
import App from './App'
import Album from './components/Album'

ReactDOM.render(
  <Provider store={Store}>
    <Router>
      <div>
        <Route path="/" exact={true} component={App} />
        <Route path="/album" component={Album} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)

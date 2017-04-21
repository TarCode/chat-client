import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import * as actions from './actions'
import AppTemplate from './components/AppTemplate'
import Base from './components/Base'
import Login from './components/Login'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
store.dispatch(actions.getLocation())
render(
  <Provider store= {store}>
    <Router history={history}>
      <Route path='/' component={AppTemplate}>
        <IndexRoute component={Home}/>
        <Route path='/login' component={Login}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)

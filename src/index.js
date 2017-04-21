import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import * as actions from './actions'
import Base from './components/Base'
import Login from './components/Login'
import EditGroup from './components/EditGroup'
import SetPassword from './components/SetPassword'
import Chat from './components/Chat'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
store.dispatch(actions.getUsers())
render(
  <Provider store= {store}>
    <Router history={history}>
      <Route path='/' component={Base}>
        <IndexRoute component={Chat}/>
        <Route path='/edit-group' component={EditGroup}/>
      </Route>
      <Route path='/login' component={Login}/>
      <Route path='/set-password' component={SetPassword}/>
    </Router>
  </Provider>,
  document.getElementById('main')
)

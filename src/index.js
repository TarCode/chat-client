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
render(
  <Provider store= {store}>
    <Router history={history}>
      <Route path='/' component={Base}>
        <IndexRoute component={() => <h3>No chats selected</h3>}/>
        <Route path='/edit-group/:groupId' component={EditGroup}/>
        <Route path="/chat/:groupId" component={Chat}/>
      </Route>
      <Route path='/login' component={Login}/>
      <Route path='/set-password' component={SetPassword}/>
    </Router>
  </Provider>,
  document.getElementById('main')
)

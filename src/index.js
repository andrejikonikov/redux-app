import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import MockAdapter from 'axios-mock-adapter'

import reducers from './reducers'
import App from './App'

import './index.sass'

const mock = new MockAdapter(axios)

const mocks = [{
  path: '/person',
  response: {
    val1 : "asd",
    val2 : "fgh",
  }
}, {
  path: '/facility',
  response: {
    val3 : 2,
    val4 : 3,
  }
}, {
  path: '/exposure',
  response: {
    val5 : "vbn",
  }
}]

mocks.forEach(({ path, response }) => {
  mock.onGet(new RegExp(`${path}/*`)).reply(200, response)
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const client = axios.create({
  baseURL: 'http://fubar.com/',
  responseType: 'json',
})

let store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(axiosMiddleware(client))),
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
)

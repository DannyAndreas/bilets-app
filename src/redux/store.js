import { createStore, applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'

import rootReducer from './reducer/rootReducer'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store

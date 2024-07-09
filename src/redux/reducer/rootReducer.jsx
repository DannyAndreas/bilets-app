/* eslint-disable indent */
import { combineReducers } from 'redux'

import sortReducer from './sortReducer'
import filtersReducer from './filtersReducer'
import ticketReducer from './ticketReducer'
import searchIdReducer from './searchIdReducer'

const rootReducer = combineReducers({
  sort: sortReducer,
  filters: filtersReducer,
  searchId: searchIdReducer,
  tickets: ticketReducer
})

export default rootReducer

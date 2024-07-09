/* eslint-disable indent */
// filtersReducer.js
import { TOGGLE_CHECKBOX, RESET_CHECKBOXES } from '../actions/actions'

const initialState = {
  all: true,
  noStops: true,
  oneStop: true,
  twoStops: true,
  threeStops: true
}

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CHECKBOX:
      if (action.payload === 'all') {
        const newState = Object.keys(state).reduce((acc, key) => {
          acc[key] = !state.all
          return acc
        }, {})
        return newState
      } else {
        const newState = { ...state, [action.payload]: !state[action.payload] }
        const allFiltersChecked = Object.keys(newState)
          .filter((key) => key !== 'all')
          .every((key) => newState[key])
        newState.all = allFiltersChecked
        return newState
      }
    case RESET_CHECKBOXES:
      return initialState
    default:
      return state
  }
}

export default filtersReducer

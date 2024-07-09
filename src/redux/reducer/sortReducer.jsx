/* eslint-disable indent */

import { SET_SORT_TYPE } from '../actions/actions'

const initialState = {
  sortType: '1' // Значение по умолчанию, соответствует 'САМЫЙ ДЕШЁВЫЙ'
}

const sortReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SORT_TYPE:
      return {
        ...state,
        sortType: action.payload
      }
    default:
      return state
  }
}

export default sortReducer

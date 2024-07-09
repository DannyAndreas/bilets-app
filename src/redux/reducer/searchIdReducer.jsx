/* eslint-disable indent */
const initialState = {
  searchId: null,
  loading: false,
  error: null
}

export const searchIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SEARCH_ID_SUCCESS':
      return { ...state, searchId: action.payload, loading: false }
    case 'GET_SEARCH_ID_FAILURE':
      return { ...state, error: action.error, loading: false }
    default:
      return state
  }
}

export default searchIdReducer

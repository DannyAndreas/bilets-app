const initialState = {
  logos: {},
  loading: false,
  error: null
}

const logosReducer = (state = initialState, action) => {
  const { logoUrl } = action.payload
  switch (action.type) {
    case 'FETCH_LOGOS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      }
    case 'FETCH_LOGOS_SUCCESS':
      return {
        ...state,
        loading: false,
        logos: {
          ...state.logos,
          [action.logoId]: logoUrl
        },
        error: null
      }
    case 'FETCH_LOGOS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}

export default logosReducer

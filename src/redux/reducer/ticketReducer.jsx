/* eslint-disable indent */
const initialState = {
  tickets: [],
  loading: false,
  error: null,
  stop: false
}

const ticketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TICKETS_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_TICKETS_SUCCESS':
      return {
        ...state,
        tickets: [...state.tickets, ...action.payload], // Объедините старые и новые билеты
        loading: false,
        stop: action.stop // Обновите состояние stop в соответствии с ответом API
      }
    case 'FETCH_TICKETS_FAILURE':
      return { ...state, error: action.error, loading: false }
    default:
      return state
  }
}

export default ticketsReducer

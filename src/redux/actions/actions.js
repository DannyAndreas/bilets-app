// actions.js

export const SET_SORT_TYPE = 'SET_SORT_TYPE' // sort action

export const setSortType = (sortType) => {
  return {
    type: SET_SORT_TYPE,
    payload: sortType
  }
}

export const TOGGLE_CHECKBOX = 'TOGGLE_CHECKBOX' //cheackbox actions
export const RESET_CHECKBOXES = 'RESET_CHECKBOXES'

export const toggleCheckbox = (name) => {
  return {
    type: TOGGLE_CHECKBOX,
    payload: name
  }
}

export const resetCheckboxes = () => {
  return {
    type: RESET_CHECKBOXES
  }
}

export const getSearchId = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://aviasales-test-api.kata.academy/search')
      const data = await response.json()
      dispatch({ type: 'GET_SEARCH_ID_SUCCESS', payload: data.searchId })
    } catch (error) {
      console.error('Ошибка при получении searchId:', error)
      dispatch({ type: 'GET_SEARCH_ID_FAILURE', error })
    }
  }
}
export const fetchTickets = (searchId, delay = 1000) => {
  return async (dispatch) => {
    try {
      const url = `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
      const response = await fetch(url)

      if (response.status === 500) {
        console.error('Ошибка сервера: 500 Internal Server Error')
        // Задержка перед повторным запросом
        setTimeout(() => dispatch(fetchTickets(searchId)), 5000) // задержка в 5 секунд
        return
      }

      const data = await response.json()
      dispatch({ type: 'FETCH_TICKETS_SUCCESS', payload: data.tickets, stop: data.stop })

      // Если stop ещё не true, продолжаем запрашивать билеты
      if (!data.stop) {
        setTimeout(() => dispatch(fetchTickets(searchId, delay)), delay)
      }
    } catch (error) {
      console.error('Ошибка при получении билетов:', error)
      dispatch({ type: 'FETCH_TICKETS_FAILURE', error })
    }
  }
}

export const getLogoFromCdn = (logo) => {
  return async (dispatch) => {
    try {
      const url = `https://pics.avs.io/200/200/${logo}.png`
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Сетевой ответ был не ok.')
      }
      const blob = await response.blob()
      const logoUrl = URL.createObjectURL(blob)
      dispatch({ type: 'FETCH_LOGOS_SUCCESS', payload: { logoUrl } })
    } catch (error) {
      console.error('Ошибка при получении логотипа:', error)
      dispatch({ type: 'FETCH_LOGOS_FAILURE', error: error.message })
    }
  }
}

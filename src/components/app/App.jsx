import React, { useEffect, useState } from 'react'
import { parseISO, addMinutes, format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'

import { getSearchId, fetchTickets } from '../../redux/actions/actions'
import Header from '../header/Header'
import TabsFiltred from '../TabsFiltred/TabsFiltred'
import Ticket from '../Ticket/Ticket'
import Filter from '../filter/Filter'

import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const searchId = useSelector((state) => state.searchId.searchId)

  useEffect(() => {
    dispatch(getSearchId())
  }, [dispatch])

  const tickets = useSelector((state) => state.tickets.tickets)
  useEffect(() => {
    if (searchId) {
      dispatch(fetchTickets(searchId))
    }
  }, [dispatch, searchId])

  const filters = useSelector((state) => state.filters)

  const filterTickets = (tickets, filters) => {
    return tickets.filter((ticket) => {
      const stopsCount = ticket.segments[0].stops.length
      if (filters.all) return true
      if (filters.noStops && stopsCount === 0) return true
      if (filters.oneStop && stopsCount === 1) return true
      if (filters.twoStops && stopsCount === 2) return true
      if (filters.threeStops && stopsCount === 3) return true
      return false
    })
  }
  const filteredTickets = filterTickets(tickets, filters)

  // форматируем дату в формат 18 30
  const formatDate = (date) => {
    const isoDateString = date
    const parsedDate = parseISO(isoDateString)
    return format(parsedDate, 'HH:mm')
  }

  // считаем время прилета
  const calculateArrivalTime = (departureTimeIsoString, durationInMinutes) => {
    const departureTime = parseISO(departureTimeIsoString)
    const arrivalTime = addMinutes(departureTime, durationInMinutes)
    return format(arrivalTime, 'HH:mm')
  }
  //форматируем 1234 минут в 3 ч 20 м
  const formatDuration = (durationInMinutes) => {
    const hours = Math.floor(durationInMinutes / 60)
    const minutes = durationInMinutes % 60
    return `${hours} ч ${minutes} м`
  }
  const createKeyFromTicket = (ticket) => {
    const { origin, destination, date, flight_number, departure_time } = ticket.segments[0]
    return `${origin}-${destination}-${date}-${flight_number}-${departure_time}`
  }
  const createTicketsComponents = (tickets) => {
    return tickets.map((ticket) => (
      <Ticket
        key={createKeyFromTicket(ticket)}
        price={ticket.price}
        logo={ticket.carrier}
        segments={ticket.segments.length}
        departureCity={ticket.segments[0].origin}
        arrivalCity={ticket.segments[0].destination}
        flightStartTime={formatDate(ticket.segments[0].date)}
        flightEndTime={calculateArrivalTime(ticket.segments[0].date, ticket.segments[0].duration)}
        flightTime={formatDuration(ticket.segments[0].duration)}
        stops={ticket.segments[0].stops.length}
        stopsName={ticket.segments[0].stops}
        backDepartureCity={ticket.segments[1].origin}
        backArrivalCity={ticket.segments[1].destination}
        backFlightStartTime={formatDate(ticket.segments[1].date)}
        backFlightEndTime={calculateArrivalTime(ticket.segments[1].date, ticket.segments[1].duration)}
        backFlightTime={formatDuration(ticket.segments[1].duration)}
        backStops={ticket.segments[1].stops.length}
        backStopsName={ticket.segments[1].stops}
      />
    ))
  }
  const calculateOptimality = (ticket, priceWeight, timeWeight) => {
    const totalTime = ticket.segments.reduce((total, segment) => total + segment.duration, 0)
    return priceWeight * ticket.price + timeWeight * totalTime
  }
  const sortTicketsByOptimality = (tickets, priceWeight, timeWeight) => {
    return tickets.sort((a, b) => {
      const optimalityA = calculateOptimality(a, priceWeight, timeWeight)
      const optimalityB = calculateOptimality(b, priceWeight, timeWeight)
      return optimalityA - optimalityB
    })
  }

  const sortTickets = (tickets, sortType) => {
    switch (sortType) {
      case '1': // САМЫЙ ДЕШЁВЫЙ
        return [...tickets].sort((a, b) => a.price - b.price)
      case '2': // САМЫЙ БЫСТРЫЙ
        return [...tickets].sort((a, b) => a.segments[0].duration - b.segments[0].duration)
      case '3': // ОПТИМАЛЬНЫЙ
        return sortTicketsByOptimality(tickets, 0.5, 0.5)
      default:
        return tickets
    }
  }
  const sortType = useSelector((state) => state.sort.sortType)

  const sortedTickets = sortTickets(filteredTickets, sortType)
  const [visibleTicketsCount, setVisibleTicketsCount] = useState(5)

  const showMoreTickets = () => {
    setVisibleTicketsCount((prevCount) => prevCount + 5)
  }
  const ticketsToShow = sortedTickets.slice(0, visibleTicketsCount)
  const tabItems = [
    {
      label: 'САМЫЙ ДЕШЁВЫЙ',
      key: '1',
      children: createTicketsComponents(ticketsToShow)
    },
    {
      label: 'САМЫЙ БЫСТРЫЙ',
      key: '2',
      children: createTicketsComponents(ticketsToShow)
    },
    {
      label: 'ОПТИМАЛЬНЫЙ',
      key: '3',
      children: createTicketsComponents(ticketsToShow)
    }
  ]
  const isTicketsAvailable = filteredTickets.length > 0
  return (
    <>
      <Header />
      <div className="container">
        {isTicketsAvailable ? (
          <div className="tabs-and-button-container">
            <TabsFiltred items={tabItems} onSortChange={sortTickets} />
            <button className="load-more-button" onClick={showMoreTickets}>
              Показать еше 5 билетов
            </button>
          </div>
        ) : (
          <div className="tabs-and-button-container">
            <TabsFiltred items={tabItems} />

            <div className="no-tickets-message">Рейсов, подходящих под заданные фильтры, не найдено</div>
          </div>
        )}
        <Filter />
      </div>
    </>
  )
}

export default App

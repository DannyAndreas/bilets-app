import React from 'react'
import './Ticket.css' // Предполагается, что стили определены в файле Ticket.css

const renderStops = (stops) => {
  switch (stops) {
    case 0:
      return 'Без пересадок'
    case 1:
      return '1 пересадка'
    case 2:
      return '2 пересадки'
    case 3:
      return '3 пересадки'
    default:
      return `${stops} пересадки`
  }
}
const takeLogoFromCDN = (logo) => {
  return `https://pics.avs.io/200/200/${logo}.svg`
}
const Ticket = ({
  price,
  logo,
  departureCity,
  arrivalCity,
  flightTime,
  flightStartTime,
  flightEndTime,
  stops,
  stopsName,
  backDepartureCity,
  backArrivalCity,
  backFlightStartTime,
  backFlightEndTime,
  backFlightTime,
  backStops,
  backStopsName
}) => {
  return (
    <div className="ticket">
      <header className="ticket-header">
        <span className="price">{price} ₽</span>
        <img src={takeLogoFromCDN(logo)} alt="Логотип авиакомпании" className="airline-logo" />
      </header>
      <div className="info">
        <div className="route">
          <div className="grayFont">
            <span>{departureCity}</span> → <span>{arrivalCity}</span>
          </div>
          <div className="blackFont">
            {' '}
            <span>
              {flightStartTime} - {flightEndTime}{' '}
            </span>
          </div>
        </div>
        <div className="length">
          <div className="grayFont">
            <span>В ПУТИ</span>
          </div>
          <div className="blackFont">
            <span>{flightTime}</span>
          </div>
        </div>
        <div className="stops">
          <div className="grayFont">
            <span>{renderStops(stops)}</span>
          </div>
          <div className="blackFont">
            <span>{stopsName.join(', ')}</span>
          </div>
        </div>
      </div>
      <div className="info">
        <div className="route">
          <div className="grayFont">
            <span>{backDepartureCity}</span> → <span>{backArrivalCity}</span>
          </div>
          <div className="blackFont">
            {' '}
            <span>
              {backFlightStartTime} - {backFlightEndTime}{' '}
            </span>
          </div>
        </div>
        <div className="length">
          <div className="grayFont">
            <span>В ПУТИ</span>
          </div>
          <div className="blackFont">
            <span>{backFlightTime}</span>
          </div>
        </div>
        <div className="stops">
          <div className="grayFont">
            <span>{renderStops(backStops)}</span>
          </div>
          <div className="blackFont">
            <span>{backStopsName.join(', ')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ticket

import React from 'react'
import { useSelector } from 'react-redux'
import './LoadingIndicator.css'
const LoadingIndicator = () => {
  // Получаем состояние stop из Redux store
  const stop = useSelector((state) => state.tickets.stop)

  // Если stop еще не true, показываем индикатор загрузки
  if (!stop) {
    return <div className="loader">Ищем билеты...</div>
  }

  // Когда все билеты загружены, индикатор не отображается
  return null
}
export default LoadingIndicator

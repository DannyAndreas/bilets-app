import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { toggleCheckbox } from '../../redux/actions/actions'
import './Filter.css'

const Filter = () => {
  const dispatch = useDispatch()
  const checkedState = useSelector((state) => state.filters)

  const handleCheckboxChange = (event) => {
    const { name } = event.target
    dispatch(toggleCheckbox(name))
  }
  return (
    <div className="filter-container">
      <p className="filter-containner_title">КОЛИЧЕСТВО ПЕРЕСАДОК</p>
      <label className={`filter-label ${checkedState.all ? 'checked' : ''}`}>
        <input
          className="input-checkbox"
          type="checkbox"
          name="all"
          value="all"
          checked={checkedState.all}
          onChange={handleCheckboxChange}
        />
        <span className="filter-label_title">Все</span>
      </label>
      <label className={`filter-label ${checkedState.noStops ? 'checked' : ''}`}>
        <input
          className="input-checkbox"
          type="checkbox"
          name="noStops"
          value="no-stops"
          checked={checkedState.noStops}
          onChange={handleCheckboxChange}
        />
        <span className="filter-label_title">Без пересадок</span>
      </label>
      <label className={`filter-label ${checkedState.oneStop ? 'checked' : ''}`}>
        <input
          className="input-checkbox"
          type="checkbox"
          name="oneStop"
          value="one-stop"
          checked={checkedState.oneStop}
          onChange={handleCheckboxChange}
        />
        <span className="filter-label_title">1 пересадка</span>
      </label>
      <label className={`filter-label ${checkedState.twoStops ? 'checked' : ''}`}>
        <input
          className="input-checkbox"
          type="checkbox"
          name="twoStops"
          value="two-stops"
          checked={checkedState.twoStops}
          onChange={handleCheckboxChange}
        />
        <span className="filter-label_title">2 пересадки</span>
      </label>
      <label className={`filter-label ${checkedState.threeStops ? 'checked' : ''}`}>
        <input
          className="input-checkbox"
          type="checkbox"
          name="threeStops"
          value="three-stops"
          checked={checkedState.threeStops}
          onChange={handleCheckboxChange}
        />
        <span className="filter-label_title">3 пересадки</span>
      </label>
    </div>
  )
}

export default Filter

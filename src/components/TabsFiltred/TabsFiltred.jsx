// TabsFiltred.jsx
import React, { useState } from 'react'
import { Radio } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { setSortType } from '../../redux/actions/actions'
import './TabsFiltred.css'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'

const TabsFiltred = ({ items, onSortChange }) => {
  const dispatch = useDispatch()
  const sortType = useSelector((state) => state.sort.sortType)
  const [selectedTab, setSelectedTab] = useState(sortType)

  const handleChange = (e) => {
    const newSortType = e.target.value
    setSelectedTab(newSortType)
    dispatch(setSortType(newSortType))
    onSortChange(newSortType)
  }

  const radioButtons = items.map((tabItem) => (
    <Radio.Button key={tabItem.key} value={tabItem.key}>
      {tabItem.label}
    </Radio.Button>
  ))

  const selectedContent = items.find((tabItem) => tabItem.key === selectedTab)?.children

  return (
    <>
      <Radio.Group value={selectedTab} onChange={handleChange}>
        {radioButtons}
      </Radio.Group>
      <LoadingIndicator />
      <div className="tickets">{selectedContent}</div>
    </>
  )
}

export default TabsFiltred

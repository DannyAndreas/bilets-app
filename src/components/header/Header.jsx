import React from 'react'

import './Header.css'
import Logo from '../ui/Logo/Logo.svg'
const Header = () => {
  return (
    <header className="header">
      <img src={Logo} alt="Логотип Aviasales" className="logo" />
    </header>
  )
}

export default Header

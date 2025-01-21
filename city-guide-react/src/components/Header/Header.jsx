import { NavLink } from 'react-router-dom'

import '../Header/Header.scss'

import Logo from './logo.webp'

function Header() {
  return (
    <div>
      <header className="header">
        <div className="container">
          <nav className="header__menu">
            <NavLink to="/">
              <img className="header__logo" src={Logo} alt="logo"></img>
            </NavLink>
            <li>
              <NavLink className="header__text" to="/">
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink className="header__text" to="/contacts">
                Контакты
              </NavLink>
            </li>
            <li>
              <NavLink className="header__text" to="/attractions">
                Достопримечательности
              </NavLink>
            </li>
          </nav>
        </div>
      </header>
    </div>
  )
}

export default Header
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './BurgerMenu.scss';

const BurgerMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div
        className={`burger-menu ${isModalOpen ? 'burger-menu--open' : ''}`}
        onClick={toggleModal}
      >
        <div className="burger-menu__icon">
          <div className="burger-menu__line"></div>
          <div className="burger-menu__line"></div>
          <div className="burger-menu__line"></div>
        </div>
      </div>

      {isModalOpen && (
        <div className="burger-menu__overlay" onClick={toggleModal}>
          <div className="burger-menu__content" onClick={(event) => event.stopPropagation()}>
            <NavLink className="burger-menu__link" to="/" onClick={toggleModal}>
              Главная
            </NavLink>
            <NavLink className="burger-menu__link" to="/contacts" onClick={toggleModal}>
              Контакты
            </NavLink>
            <NavLink className="burger-menu__link" to="/attractions" onClick={toggleModal}>
              Достопримечательности
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default BurgerMenu;
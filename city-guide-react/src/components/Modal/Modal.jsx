import React from 'react'
import './Modal.scss'

const Modal = ({ active, setActive }) => {
  return (
    <div
      className={active ? 'modal active' : 'modal'}
      onClick={() => setActive(false)}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h1>Заявка</h1>
        <form>
          <div className="modal__group">
            <p for="name">Ваше имя:</p>
            <input type="text" id="name" name="name" required></input>
          </div>
          <div className="modal__group">
            <p for="email">Ваш email:</p>
            <input type="email" id="email" name="email" required></input>
          </div>
          <div className="modal__group">
            <p for="subject">Тема обращения:</p>
            <input type="text" id="subject" name="subject" required></input>
          </div>
          <div className="modal__group">
            <p for="message">Описание проблемы:</p>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button className="modal__button" type="submit">
            Отправить заявку
          </button>
        </form>
      </div>
    </div>
  )
}

export default Modal
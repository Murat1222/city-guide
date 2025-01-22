import React, { useState } from 'react'
import './contact.scss'
import Modal from '../../components/Modal/Modal'


function Contact() {
  const [modalActive, setModalActive] = useState(false)
  return (
    <main className="main__contact">
      <div className="container">
        <div className="main__contact-block">
          <p className="main__contact__txt-contact">
            Вы попали на страницу контактов! Мы стремимся обеспечить вам
            максимально комфортное и беспроблемное использование наших услуг.
            Если у вас возникли вопросы, проблемы или вам нужна помощь,
            пожалуйста, воспользуйтесь кнопкой "Связаться с нами"
          </p>
          <button id="open-modal-btn" className="main__contact__btn" onClick={() => setModalActive(true)}>
            Связаться с нами
          </button>
        </div>
      </div>
      <Modal active={modalActive} setActive={setModalActive}/>
    </main>
  )
}

export default Contact

import './Reviews.scss'
import React from 'react'

function Reviews() {
  return (
    <div className='reviews'>
      <h2 className='reviews__title'>Отзывы</h2>
      <form className='review-form'>
        <input className='review-form__input' type='text' placeholder='Введите имя' required maxLength={12}></input>
        <textarea className='review-form__textarea' placeholder='Введите коментарий' required maxLength={150}></textarea>
        <input className='review-form__input' type="text" placeholder='Введите email'></input>
        <button className='review-form__submit' type='submit'>Отправить</button>
      </form>
      <div className='reviews__list'></div>
    </div>
  )
}

export default Reviews
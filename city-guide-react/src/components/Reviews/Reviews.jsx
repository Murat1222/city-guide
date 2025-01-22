import React, { useState, useEffect } from 'react'
import './Reviews.scss'

function Reviews({ attractionId }) {
  const [reviews, setReviews] = useState([])
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [email, setEmail] = useState('')

  const apiUrl = 'https://6734e04a5995834c8a9132b6.mockapi.io/reviews'
  const correctPinCode = '9999'

  useEffect(() => {
    fetch(`${apiUrl}?attractionId=${attractionId}`)
      .then(response => response.json())
      .then(data => setReviews(Array.isArray(data) ? data : []))
      .catch(() => alert('Ошибка при загрузке отзывов'))
  }, [attractionId])

  const handleSubmit = (event) => {
    event.preventDefault()

    const newReview = {
      name,
      comment,
      email,
      attractionId
    }

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newReview)
    })
      .then(response => response.json())
      .then(review => {
        setReviews([review, ...reviews])
        setName('')
        setComment('')
        setEmail('')
      })
      .catch(() => alert('Ошибка при отправке отзыва'))
  }

  const handleDelete = (reviewId) => {
    const pin = prompt('Введите пин-код для удаления отзыва')
    if (pin === correctPinCode) {
      fetch(`${apiUrl}/${reviewId}`, {
        method: 'DELETE'
      })
        .then(() => {
          setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId))
        })
        .catch(() => alert('Ошибка при удалении отзыва'))
    }
  }

  return (
    <div className="reviews">
      <h2 className="reviews__title">Отзывы</h2>
      <form className="review-form" onSubmit={handleSubmit}>
        <input
          className="review-form__input"
          type="text"
          placeholder="Введите имя"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          maxLength={12}
        />
        <textarea
          className="review-form__textarea"
          placeholder="Введите комментарий"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          required
          maxLength={150}
        />
        <input
          className="review-form__input"
          type="email"
          placeholder="Введите email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button className="review-form__submit" type="submit">
          Отправить
        </button>
      </form>
      <div className="reviews__list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review-block">
              <h3 className="review-block__name">{review.name}</h3>
              <p className="review-block__comment">{review.comment}</p>
              <button
                className="review-block__delete"
                onClick={() => handleDelete(review.id)}
              >
                Х
              </button>
            </div>
          ))
        ) : (
          <p>Нет отзывов для этой достопримечательности.</p>
        )}
      </div>
    </div>
  )
}

export default Reviews
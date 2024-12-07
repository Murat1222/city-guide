const getAttractionCardElement = (data) => {
  const {
    title: titleText,
    fullDescription: fullDescriptionText,
    extraImage: imageSourceExtra,
    image: imageSource,
    mapLink: map,
  } = data;

  const mainBlock = document.createElement('div');
  const imagesBlock = document.createElement('div');
  const textsBlock = document.createElement('div');
  const mapBlock = document.createElement('div');
  const title = document.createElement('h2');
  const fullDescription = document.createElement('p');
  const image = document.createElement('img');
  const extraImage = document.createElement('img');
  const mapLink = document.createElement('iframe');

  mainBlock.className = 'main__block';
  imagesBlock.className = 'main__block-images';
  textsBlock.className = 'main__block-texts';
  mapBlock.className = 'main__block-map';
  title.className = 'main__block-texts-title';
  title.textContent = titleText;
  fullDescription.className = 'main__block-texts-text';
  fullDescription.textContent = fullDescriptionText;
  image.className = 'main__block-images-image';
  image.alt = 'Основное изображение';
  image.src = imageSource;
  extraImage.className = 'main__block-images-image';
  extraImage.alt = 'Дополнительное изображение';
  extraImage.src = imageSourceExtra;
  mapLink.className = 'main__block-map-iframe';
  mapLink.src = map;

  imagesBlock.append(image, extraImage);
  textsBlock.append(title, fullDescription);
  mapBlock.append(mapLink);
  mainBlock.append(imagesBlock, textsBlock, mapBlock);

  const reviewsBlock = document.createElement('div');
  const reviewsTitle = document.createElement('h3');
  const reviewsForm = document.createElement('form');
  const nameInput = document.createElement('input');
  const commentInput = document.createElement('textarea');
  const ratingInput = document.createElement('select');
  const defaultOption = document.createElement('option');

  ratingInput.required = true;
  ratingInput.className = 'main__block-reviews-form-rating';
  reviewsBlock.className = 'main__block-reviews';
  reviewsTitle.textContent = 'Отзывы';
  reviewsForm.className = 'main__block-reviews-form';
  nameInput.type = 'text';
  nameInput.placeholder = 'Ваше имя';
  nameInput.required = true;
  nameInput.className = 'main__block-reviews-form-name';
  commentInput.placeholder = 'Ваш комментарий';
  commentInput.required = true;
  commentInput.className = 'main__block-reviews-form-comment';
  defaultOption.value = '';
  defaultOption.textContent = 'Выберите рейтинг';
  defaultOption.disabled = true;
  defaultOption.selected = true;

  reviewsBlock.append(reviewsTitle);
  ratingInput.append(defaultOption);
  
  for (let i = 1; i <= 5; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    ratingInput.append(option);
  }
  
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Оставить отзыв';
  submitButton.className = 'main__block-reviews-form-submit';
  
  reviewsForm.append(nameInput, commentInput, ratingInput, submitButton);
  reviewsBlock.append(reviewsForm);
  
  const reviewsList = document.createElement('div');
  reviewsList.className = 'main__block-reviews-list';
  reviewsBlock.append(reviewsList);
  
  mainBlock.append(reviewsBlock);
  
  const loadReviews = () => {
    reviewsList.innerHTML = '';
    fetch(`https://6734e04a5995834c8a9132b6.mockapi.io/reviews?attractionId=${data.id}`)
      .then((response) => response.json())
      .then((reviews) => {
        reviews.forEach((review) => {
          const reviewItem = document.createElement('div');
          reviewItem.className = 'main__block-reviews-list-item';
  
          const reviewName = document.createElement('p');
          reviewName.textContent = `Имя: ${review.name}`;
          reviewName.className = 'main__block-reviews-list-name';
  
          const reviewComment = document.createElement('p');
          reviewComment.textContent = `Комментарий: ${review.comment}`;
          reviewComment.className = 'main__block-reviews-list-comment';
  
          const reviewRating = document.createElement('p');
          reviewRating.textContent = `Рейтинг: ${review.rating}`;
          reviewRating.className = 'main__block-reviews-list-rating';
  
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Удалить';
          deleteButton.className = 'main__block-reviews-list-delete';
          deleteButton.addEventListener('click', () => {
            fetch(`https://6734e04a5995834c8a9132b6.mockapi.io/reviews/${review.id}`, {
              method: 'DELETE',
            })
              .then(() => {
                loadReviews();
              });
          });
  
          reviewItem.append(reviewName, reviewComment, reviewRating, deleteButton);
          reviewsList.append(reviewItem);
        });
      });
  };
  
  loadReviews();
  
  reviewsForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();
    const rating = ratingInput.value;
  
    if (name && comment && rating) {
      fetch('https://6734e04a5995834c8a9132b6.mockapi.io/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          comment,
          rating,
          attractionId: data.id,
        }),
      })
        .then(() => {
          loadReviews();
          reviewsForm.reset();
        });
    }
  });
  
  return mainBlock;
};

const fetchAttractionData = (id) => {
  return fetch(`https://6734e04a5995834c8a9132b6.mockapi.io/attractions/${id}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 404) throw new Error('404, Ничего не найдено');
        if (response.status === 500) throw new Error('500, Внутренняя ошибка сервера');

        throw new Error(response.status);
      }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const attractionId = urlParams.get('id');

  if (attractionId) {
    fetchAttractionData(attractionId)
      .then(data => {
        const attractionElement = getAttractionCardElement(data);
        document.querySelector('.main').append(attractionElement);
      })
      .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Не удалось загрузить данные о достопримечательности.';
        document.querySelector('.main').append(errorMessage);
      });
  } else {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'ID достопримечательности не указан.';
    document.querySelector('.main').append(errorMessage);
  }
});
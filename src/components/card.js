// Функция для создания карточки
export const createCard = (card, handleImageClick, handleCardLikeToggle, handleCardDelete, currentUserId) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardNode = cardTemplate.querySelector('.card').cloneNode(true);
  
  const cardImage = cardNode.querySelector('.card__image');
  const cardTitle = cardNode.querySelector('.card__title');
  const cardLikeButton = cardNode.querySelector('.card__like-button');
  const cardLikesCount = cardNode.querySelector('.card__like-count');
  const deleteCardButton = cardNode.querySelector('.card__delete-button');

  // Установка значений для карточки
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardLikesCount.textContent = card.likes.length;

  // Проверяем, лайкнул ли пользователь карточку
  const hasMyLike = card.likes.some(user => user._id === currentUserId);
  if (hasMyLike) {
      cardLikeButton.classList.add('card__like-button_is-active');
  }

  // Обновляем количество лайков
  const updateLikes = (newLikes) => {
      card.likes = newLikes;
      cardLikesCount.textContent = newLikes.length;
      
      const newHasMyLike = newLikes.some(user => user._id === currentUserId);
      newHasMyLike
          ? cardLikeButton.classList.add('card__like-button_is-active')
          : cardLikeButton.classList.remove('card__like-button_is-active');
  };

  // Добавляем слушатели событий
  cardImage.addEventListener('click', handleImageClick);

  cardLikeButton.addEventListener('click', (evt) => {
      const isLiked = cardLikeButton.classList.contains('card__like-button_is-active');
      handleCardLikeToggle(card._id, evt, updateLikes, isLiked);
  });

  // Проверяем, принадлежит ли карточка текущему пользователю
  if (card.owner._id === currentUserId) {
      deleteCardButton.addEventListener('click', (evt) => handleCardDelete(card._id, evt));
  } else {
      deleteCardButton.remove();
  }

  return cardNode;
};
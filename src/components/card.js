import { initialCards } from '../scripts/cards';

const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
function createCard(data, handleDeleteCard, handleLikeCard, handleImageClick) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = data.link;
  cardImage.alt = data.name;

  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = data.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', handleDeleteCard);

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', handleLikeCard);

  cardImage.addEventListener('click', handleImageClick);

  return cardElement;
}

// Функция удаления карточки
function handleDeleteCard(event) {
  event.target.closest('.card').remove();
}

// Функция лайка карточки
function handleLikeCard(event) {
  const likeButton = event.target;
  likeButton.classList.toggle('card__like-button_is-active');
}

export{initialCards, createCard, handleDeleteCard, handleLikeCard};
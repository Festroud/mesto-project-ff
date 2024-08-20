// @todo: Темплейт карточки


// @todo: DOM узлы

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(data, handleDeleteCard) {
  const cardElement = cardTemplate.cloneNode(true);
  
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = data.link;
  cardImage.alt = data.name;
  
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = data.name;
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', handleDeleteCard);
  return cardElement;
}

// @todo: Функция удаления карточки

function handleDeleteCard(event) {
  event.target.closest('.card').remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function(cardData) {
  const cardElement = createCard(cardData, handleDeleteCard);
  placesList.appendChild(cardElement);
});



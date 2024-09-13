// DOM узлы
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

// Элементы попапа для просмотра изображения
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupPicture = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

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

  cardImage.addEventListener('click', handleImageClick); // Обработка клика по изображению

  return cardElement;
}

// Функция удаления карточки
function handleDeleteCard(event) {
  event.target.closest('.card').remove();
}

// Функция лайка карточки
function handleLikeCard(event) {
  const likeButton = event.target;
  likeButton.classList.toggle('card__like-button_is-active'); // Переключение класса
}

// Функция открытия изображения в попапе
function handleImageClick(event) {
  const imageSrc = event.target.src;
  const imageAlt = event.target.alt;

  imagePopupPicture.src = imageSrc;
  imagePopupPicture.alt = imageAlt;
  imagePopupCaption.textContent = imageAlt;

  openPopup(imagePopup); // Открываем попап с изображением
}

// Вывод карточек на страницу
initialCards.forEach(function(cardData) {
  const cardElement = createCard(cardData, handleDeleteCard, handleLikeCard, handleImageClick);
  placesList.appendChild(cardElement);
});

// Получаем все попапы и кнопки
const popups = document.querySelectorAll('.popup');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

// Открытие попапа
function openPopup(popup) {
  popup.classList.remove('popup_is-animated');
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  popup.classList.add('popup_is-animated');
  document.removeEventListener('keydown', closePopupOnEsc);
}

// Закрытие попапа по нажатию Esc
function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Закрытие попапа при клике на оверлей
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

// Открытие модальных окон
editButton.addEventListener('click', () => {
  const editPopup = document.querySelector('.popup_type_edit');
  
  // Предзаполняем поля текущими значениями
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  
  openPopup(editPopup);
});

addButton.addEventListener('click', () => {
  const newCardPopup = document.querySelector('.popup_type_new-card');
  openPopup(newCardPopup);
});

// Закрытие модальных окон по кнопке
closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closePopup(popup);
  });
});

// Находим элементы на странице, куда будут подставляться новые значения
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Находим форму редактирования профиля в DOM и поля формы
const editProfileForm = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');

// Обработчик отправки формы редактирования профиля
function handleEditProfileSubmit(evt) {
  evt.preventDefault(); // Отключаем стандартное поведение формы
  
  // Получаем значения полей формы
  const newName = nameInput.value;
  const newDescription = jobInput.value;
  
  // Обновляем информацию на странице
  profileName.textContent = newName;
  profileDescription.textContent = newDescription;
  
  // Закрываем попап после сохранения
  closePopup(document.querySelector('.popup_type_edit'));
}

// Прикрепляем обработчик события submit к форме редактирования профиля
editProfileForm.addEventListener('submit', handleEditProfileSubmit);

// Находим форму добавления новой карточки в DOM и поля формы
const newCardForm = document.querySelector('.popup__form[name="new-place"]');
const cardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = newCardForm.querySelector('.popup__input_type_url');

// Обработчик отправки формы добавления карточки
function handleNewCardSubmit(evt) {
  evt.preventDefault(); // Отключаем стандартное поведение формы
  
  // Получаем значения полей формы
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;
  
  // Создаем новую карточку
  const newCardData = {
    name: cardName,
    link: cardLink
  };
  const newCardElement = createCard(newCardData, handleDeleteCard, handleLikeCard, handleImageClick);
  
  // Добавляем новую карточку в начало списка
  placesList.prepend(newCardElement);
  
  // Закрываем попап и очищаем форму после сохранения
  closePopup(document.querySelector('.popup_type_new-card'));
  newCardForm.reset();
}

// Прикрепляем обработчик события submit к форме добавления новой карточки
newCardForm.addEventListener('submit', handleNewCardSubmit);

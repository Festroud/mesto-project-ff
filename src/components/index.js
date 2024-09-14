import '../pages/index.css';
import { initialCards, createCard, handleDeleteCard, handleLikeCard } from "./cards";
import '../images/avatar.jpg';
import { closePopup, openPopup, initModalHandlers } from "./modal";

// DOM узлы
const placesList = document.querySelector('.places__list');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupPicture = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfileForm = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');
const newCardForm = document.querySelector('.popup__form[name="new-place"]');
const cardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = newCardForm.querySelector('.popup__input_type_url');

// Функция открытия изображения в попапе
function handleImageClick(event) {
  const imageSrc = event.target.src;
  const imageAlt = event.target.alt;

  imagePopupPicture.src = imageSrc;
  imagePopupPicture.alt = imageAlt;
  imagePopupCaption.textContent = imageAlt;

  openPopup(imagePopup);
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

// Обработчик отправки формы редактирования профиля
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  
  // Получаем значения полей формы
  const newName = nameInput.value;
  const newDescription = jobInput.value;
  
  // Обновляем информацию на странице
  profileName.textContent = newName;
  profileDescription.textContent = newDescription;
  
  // Закрываем попап после сохранения
  closePopup(document.querySelector('.popup_type_edit'));
}

// Обработчик отправки формы добавления карточки
function handleNewCardSubmit(evt) {
  evt.preventDefault();
  
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;
  
  const newCardData = {
    name: cardName,
    link: cardLink
  };
  const newCardElement = createCard(newCardData, handleDeleteCard, handleLikeCard, handleImageClick);
  placesList.prepend(newCardElement);
  closePopup(document.querySelector('.popup_type_new-card'));
  newCardForm.reset();
}
// Вывод карточек на страницу
initialCards.forEach(function(cardData) {
  const cardElement = createCard(cardData, handleDeleteCard, handleLikeCard, handleImageClick);
  placesList.appendChild(cardElement);
});
// Закрытие попапа при клике на оверлей
document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

// Инициализация обработчиков для модальных окон
initModalHandlers(editButton, addButton, closeButtons, nameInput, profileName, jobInput, profileDescription);

// Прикрепляем обработчики событий к формам
editProfileForm.addEventListener('submit', handleEditProfileSubmit);
newCardForm.addEventListener('submit', handleNewCardSubmit);

// Добавляем обработчик для закрытия попапов по нажатию Esc
document.addEventListener('keydown', closePopupOnEsc);

import '../pages/index.css';
import { initialCards } from "./cards";
import { createCard, handleDeleteCard, handleLikeCard } from "../components/card";
import '../images/avatar.jpg';
import { closePopup, openPopup, initModalHandlers } from "../components/modal";

// DOM узлы
const cardsContainer = document.querySelector('.places__list');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupPicture = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfileForm = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');
const newCardForm = document.querySelector('.popup__form[name="new-place"]');
const cardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = newCardForm.querySelector('.popup__input_type_url');

// Константы для попапов
const popups = document.querySelectorAll('.popup');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');

// Функция открытия изображения в попапе
function handleImageClick(event) {
    const imageSrc = event.target.src;
    const imageAlt = event.target.alt;

    imagePopupPicture.src = imageSrc;
    imagePopupPicture.alt = imageAlt;
    imagePopupCaption.textContent = imageAlt;

    openPopup(imagePopup);
}

// Функция для вывода карточек на страницу
function renderCard(cardData) {
    const cardElement = createCard(cardData, handleDeleteCard, handleLikeCard, handleImageClick);
    cardsContainer.appendChild(cardElement);
}

// Обработчик отправки формы редактирования профиля
function handleEditProfileSubmit(evt) {
    evt.preventDefault();

    const newName = nameInput.value;
    const newDescription = jobInput.value;

    profileName.textContent = newName;
    profileDescription.textContent = newDescription;

    closePopup(editPopup);  // Использование переменной editPopup
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
    cardsContainer.prepend(newCardElement);

    closePopup(newCardPopup);  // Использование переменной newCardPopup
    newCardForm.reset();
}

// Инициализация обработчиков для модальных окон
function initModals() {
    // Открытие попапов
    editButton.addEventListener('click', () => {
        nameInput.value = profileName.textContent;
        jobInput.value = profileDescription.textContent;
        openPopup(editPopup);  // Использование переменной editPopup
    });

    addButton.addEventListener('click', () => {
        openPopup(newCardPopup);  // переменная newCardPopup
    });
    initModalHandlers(popups); // Передаем массив попапов
}

// Инициализация
initialCards.forEach(renderCard);
initModals();

editProfileForm.addEventListener('submit', handleEditProfileSubmit);
newCardForm.addEventListener('submit', handleNewCardSubmit);

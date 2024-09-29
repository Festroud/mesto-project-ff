import  '../pages/index.css';
import  { createCard } from  "../components/card";
import  { closePopup, openPopup, initModalHandlers } from  "../components/modal";
import  { clearValidation, enableValidation } from  '../components/validation';
import  * as API from  '../components/api';  // Импорт API

// DOM узлы
const  cardsContainer = document.querySelector('.places__list');
const  imagePopup = document.querySelector('.popup_type_image');
const  imagePopupPicture = imagePopup.querySelector('.popup__image');
const  imagePopupCaption = imagePopup.querySelector('.popup__caption');
const  editButton = document.querySelector('.profile__edit-button');
const  addButton = document.querySelector('.profile__add-button');
const  profileName = document.querySelector('.profile__title');
const  profileDescription = document.querySelector('.profile__description');
const  editProfileForm = document.querySelector('.popup__form[name="edit-profile"]');
const  nameInput = editProfileForm.querySelector('.popup__input_type_name');
const  jobInput = editProfileForm.querySelector('.popup__input_type_description');
const  newCardForm = document.querySelector('.popup__form[name="new-place"]');
const  cardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const  cardLinkInput = newCardForm.querySelector('.popup__input_type_url');
const  editAvatarForm = document.querySelector('.popup__form[name="edit-avatar"]');
const  avatarLinkInput = editAvatarForm.querySelector('.popup__input_type_url');

// Константы для попапов
const  popups = document.querySelectorAll('.popup');
const  editPopup = document.querySelector('.popup_type_edit');
const  newCardPopup = document.querySelector('.popup_type_new-card');
const  avatarPopup = document.querySelector('.popup_type_edit-avatar');
const  profileImage = document.querySelector('.profile__image');
let  currentUserId = null;

// Валидация
const  validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    disabledButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
};

// Установка состояния загрузки
const  setLoadingStatus = isLoading => {
  const  popup = document.querySelector('.popup_is-opened');
  if  (popup) {
    const  button = popup.querySelector('.popup__button');
    button.disabled = isLoading;
    button.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
  }
};

// Открытие изображения в попапе
function  handleImageClick(event) {
  const  imageSrc = event.target.src;
  const  imageAlt = event.target.alt;

  imagePopupPicture.src = imageSrc;
  imagePopupPicture.alt = imageAlt;
  imagePopupCaption.textContent = imageAlt;

  openPopup(imagePopup);
}

// Удаление карточки
function  handleDeleteCard(cardId, evt) {
  const  confirmDelete = confirm('Вы уверены, что хотите удалить эту карточку?');
  if  (!confirmDelete)  return;

  API.deleteCard(cardId)
    .then(() => {
      const  cardElement = evt.target.closest('.card');
      if  (cardElement) {
        cardElement.remove();
      }
    })
    .catch(err => console.error(`Ошибка: ${err}`));
}
// Обработка лайков
function  handleCardLikeToggle(cardId, evt, updateLikes, isLiked) {
  if  (isLiked) {
    API.unlikeCard(cardId)
      .then(card => {
        updateLikes(card.likes);
      })
      .catch(err => console.error(err));
  } else {
    API.likeCard(cardId)
      .then(card => {
        updateLikes(card.likes);
      })
      .catch(err => console.error(err));
  }
}

// Функция для вывода карточек на страницу
function  renderCard(cardData, prepend = false) {
  const  cardElement = createCard(cardData, handleImageClick, handleCardLikeToggle, handleDeleteCard, currentUserId);
  if  (prepend) {
    cardsContainer.prepend(cardElement);  // Добавление карточки в начало
  } else {
    cardsContainer.append(cardElement);  // Используется при загрузке карточек
  }
}

// Обработчик отправки формы добавления карточки
function  handleNewCardSubmit(evt) {
  evt.preventDefault();
  setLoadingStatus(true);
  const  cardName = cardNameInput.value;
  const  cardLink = cardLinkInput.value;

  API.addCard(cardName, cardLink)
    .then((newCard) => {
      renderCard(newCard, true);
      closePopup(newCardPopup);
      newCardForm.reset();
      clearValidation(newCardForm, validationConfig);
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => setLoadingStatus(false));
}

// Обработчик отправки формы редактирования профиля
function  handleEditProfileSubmit(evt) {
  evt.preventDefault();

  setLoadingStatus(true);

  const  newName = nameInput.value;
  const  newDescription = jobInput.value;

  API.updateUserInfo(newName, newDescription)
    .then((updatedUser) => {
      profileName.textContent = updatedUser.name;
      profileDescription.textContent = updatedUser.about;
      closePopup(editPopup);
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => setLoadingStatus(false));
}

// Обработчик отправки формы редактирования аватара
function  handleEditAvatarSubmit(evt) {
  evt.preventDefault();

  setLoadingStatus(true);

  const  avatarUrl = avatarLinkInput.value;

  API.updateAvatar(avatarUrl)
    .then((updatedUser) => {
      profileImage.style.backgroundImage = `url('${updatedUser.avatar}')`;
      closePopup(avatarPopup);
      editAvatarForm.reset();
      clearValidation(editAvatarForm, validationConfig);
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => setLoadingStatus(false));
}

// Функция для начальных API запросов
const  initialAPIRequests = () => {
  API.getUserInfo()
    .then(data => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      profileImage.style.backgroundImage = `url('${data.avatar}')`;
      currentUserId = data._id;
    })
    .then(() => {
      return  API.getInitialCards();
    })
    .then(cards => {
      cards.forEach(card => renderCard(card));  // Добавляем карточки на страницу при загрузке
    })
    .catch(err => console.error(err));
};

// Инициализация обработчиков для модальных окон
function  initModals() {
  editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(editPopup);
    clearValidation(editProfileForm, validationConfig);
  });

  addButton.addEventListener('click', () => {
    openPopup(newCardPopup);
    clearValidation(newCardForm, validationConfig);
  });

  profileImage.addEventListener('click', () => {
    openPopup(avatarPopup);
    clearValidation(editAvatarForm, validationConfig);
  });

  initModalHandlers(popups);
}

// Инициализация
initModals();
editProfileForm.addEventListener('submit', handleEditProfileSubmit);
newCardForm.addEventListener('submit', handleNewCardSubmit);
editAvatarForm.addEventListener('submit', handleEditAvatarSubmit);  // Добавляем обработчик для формы редактирования аватара
enableValidation(validationConfig);

// Выполнение начальных API запросов
initialAPIRequests();

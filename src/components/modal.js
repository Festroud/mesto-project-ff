// Функция для открытия модального окна
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handlePopupOnEsc);
}

// Функция для закрытия модального окна
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handlePopupOnEsc);
}

// Функция для инициализации обработчиков событий
export function initModalHandlers(popups) {
  popups.forEach(popup => {
    const closeButton = popup.querySelector('.popup__close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        closePopup(popup);
      });
    }
    popup.addEventListener('click', (evt) => {
      if (evt.target === popup) {
        closePopup(popup);
      }
    });
  });
}

// Закрытие попапа по нажатию клавиши Esc
function handlePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

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
export function initModalHandlers() {
  // Находим все модальные окна
  const modals = document.querySelectorAll('.popup');

  modals.forEach(modal => {
    // Находим кнопку закрытия попапа
    const closeButton = modal.querySelector('.popup__close');

    // Вешаем обработчик закрытия на кнопку
    closeButton.addEventListener('click', () => {
      closePopup(modal);
    });

    // Вешаем обработчик закрытия на оверлей
    modal.addEventListener('click', (evt) => {
      if (evt.target === modal) {
        closePopup(modal);
      }
    });
  });
}

// Закрытие попапа по нажатии клавиши Esc
function handlePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

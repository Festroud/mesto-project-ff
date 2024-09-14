// // Функция для открытия модального окна
export function openPopup(popup) {
    popup.classList.remove('popup_is-animated');
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupOnEsc);
  }
  
  // Функция для закрытия модального окна
  export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    popup.classList.add('popup_is-animated');
    document.removeEventListener('keydown', closePopupOnEsc);
  }
  
  // Функция для инициализации обработчиков событий
  export function initModalHandlers(editButton, addButton, closeButtons, nameInput, profileName, jobInput, profileDescription) {
    // Открытие попапов
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
  }
  
  // Закрытие попапа при клике на оверлей
  function closePopupOnOverlayClick(evt) {
    const popup = evt.target.closest('.popup');
    if (popup && evt.target === popup) {
      closePopup(popup);
    }
  }
  
  // Закрытие попапа по нажатии клавиши Esc
  function closePopupOnEsc(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) {
        closePopup(openedPopup);
      }
    }
  }
  
  // Добавляем обработчики для клика на оверлей и нажатия клавиши Esc
  document.addEventListener('mousedown', closePopupOnOverlayClick);
  document.addEventListener('keydown', closePopupOnEsc);
  
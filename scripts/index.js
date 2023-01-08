// переменные
// Вынесем все необходимые для валидации элементы формы в обьект конфиг

const validationConfig = {
  formSelector: '.popup__forma',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  activeButtonClass: 'popup__btn-save_valid',
  inactiveButtonClass: 'popup__btn-save_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

// переменные для формы открытия popupProfile
const popupProfileOpen = document.querySelector(".profile__button-edit");
const popups = document.querySelectorAll('.popup')
const buttonsPopupClose = document.querySelectorAll(".popup__btn-close");
const popupProfile = document.querySelector(".popup_profile");
const formPopupProfile = popupProfile.querySelector(".popup__forma");
const namePopupInput = formPopupProfile.querySelector(".popup__input_type_name");
const profPopupInput = formPopupProfile.querySelector(".popup__input_type_prof");
const nameProfile = document.querySelector(".profile__info-title");
const infoProfile = document.querySelector(".profile__info-subtitle");
// переменные для формы открытия popupImage
const popupImgView = document.querySelector(".popup_img-view");
const elementImgView = popupImgView.querySelector(".popup__image");
// найдем input для ввода данных
const formAdd = document.querySelector(".popup__forma-add");
const inputAddName = formAdd.querySelector(".popup__input_add_name");
const inputAddLink = formAdd.querySelector(".popup__input_add_link");
// переменные для формы открытия popupAdd
const popupAddOpen = document.querySelector(".profile__button-add");
const popupAdd = document.querySelector(".popup_add");
const formPopupAdd = popupAdd.querySelector(".popup__forma");
//находим контейнер elements
const templateElement = document.querySelector("#template-element");
//находим elements
const cardsContainer = document.querySelector(".elements");

// функции
// функция для открытия всех popup

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

// функция для закрытия popup 
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc)
}

// обработчик оверлея
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
  })
})

// закрытие по кнопке esc
function closePopupEsc (evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened);
  }
}

//сохранение данных из формы и закрытие
function handleSubmitFormProfileCard (event) {
  event.preventDefault();
  nameProfile.textContent = namePopupInput.value;
  infoProfile.textContent = profPopupInput.value;
  closePopup(popupProfile);
}

//форма для элементов и удаление элемента и работа элементов карточки
const createCard = (link, name) => {
  const elementCard = templateElement.content
    .querySelector(".element")
    .cloneNode(true);
  const elementImg = elementCard.querySelector(".element__img");
  elementImg.src = link;
  elementImg.alt = 'фото' + ' ' + name
  elementCard.querySelector(".element__info-text").textContent = name;

  //работа кнопки delete
  elementCard
    .querySelector(".element__delete")
    .addEventListener("click", () => {
      elementCard.remove();
    });

  //работа лайка
  elementCard
    .querySelector(".element__info-heart")
    .addEventListener("click", (event) => {
      event.target.classList.toggle("element__info-heart_active");
    });

  //oткрытие image
  elementImg.addEventListener("click", function () {
    openPopup(popupImgView);
    popupImgView.querySelector(".popup__caption").textContent = name;
    elementImgView.src = link;
    elementImgView.alt = 'фото' + ' ' + name;
  });

  return elementCard;

};

//функция которая добавляет в контейнер cardsContainer элементы html
const renderCard = (link, name) => {
  cardsContainer.prepend(createCard(link, name));
};

//перебор элементов массива методом forEach
initialCards.forEach((val) => {
  renderCard(val.link, val.name);
});

//функция сохранения данных
const handleSubmitFormAddCard = (event) => {
  event.preventDefault();
  renderCard(inputAddLink.value, inputAddName.value);
  inputAddLink.value = "";
  inputAddName.value = "";
  closePopup(popupAdd);
};

//события
//события на кнопку открытия popup
popupAddOpen.addEventListener("click", () => {
  openPopup(popupAdd);
  enableValidation(validationConfig);
});

popupProfileOpen.addEventListener('click', () => {
  namePopupInput.value = nameProfile.textContent;
  profPopupInput.value = infoProfile.textContent;
  enableValidation(validationConfig);
  openPopup(popupProfile);
});
  
//закрытие всех popup по клику на крестик

buttonsPopupClose.forEach(function(item) {
    item.addEventListener('click', function (e) {
       const parentModal = this.closest('.popup'); //используем микробиблиотеку closest
       closePopup(parentModal);
    });
 });

//события на отправку формы
formPopupProfile.addEventListener("submit", handleSubmitFormProfileCard);

formAdd.addEventListener("submit", handleSubmitFormAddCard);




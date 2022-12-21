// переменные
// переменные для формы открытия popupProfile
const PopupProfileOpen = document.querySelector(".profile__button-edit");
const ButtonsPopupClose = document.querySelectorAll(".popup__btn-close");
const popupProfile = document.querySelector(".popup_profile");
const formPopup = popupProfile.querySelector(".popup__forma");
const namePopupInput = formPopup.querySelector(".popup__input_type_name");
const profPopupInput = formPopup.querySelector(".popup__input_type_prof");
const nameProfile = document.querySelector(".profile__info-title");
const profProfile = document.querySelector(".profile__info-subtitle");
// переменные для формы открытия popupImage
const popupImgView = document.querySelector(".popup_img-view");
// найдем input для ввода данных
const formAdd = document.querySelector(".popup__forma-add");
const inputAddName = formAdd.querySelector(".popup__input_add_name");
const inputAddLink = formAdd.querySelector(".popup__input_add_link");
// переменные для формы открытия popupAdd
const PopupAddOpen = document.querySelector(".profile__button-add");
const popupAdd = document.querySelector(".popup_add");
const formPopupAdd = popupAdd.querySelector(".popup__forma");
//находим контейнер elements
const cardsContainer = document.querySelector(".elements");
const templateElement = document.querySelector("#template-element");

// функции
// функция для открытия всех popup
function openPopup(event) {
  if (event.target.className === 'profile__button-add') popupAdd.classList.add("popup_opened")
  else if (event.target.className === 'profile__button-edit') popupProfile.classList.add("popup_opened")
}

// функция для закрытия popup
function closePopup(popup) {
  const parentModal = popup.target.closest(".popup"); //используем микробиблиотеку closest
  parentModal.classList.remove("popup_opened");
}

//сохранение данных из формы и закрытие
function savePopupProfile(popup) {
  popup.preventDefault();
  nameProfile.textContent = namePopupInput.value;
  profProfile.textContent = profPopupInput.value;
  closePopup(popup);
}


//PopupProfileOpen.addEventListener("click", openPopap(popup));
  //namePopupInput.value = nameProfile.textContent;
  //profPopupInput.value = profProfile.textContent;
//);



//форма для элементов и удаление элемента и работа элементов карточки
const createCard = (link, name) => {
  const elementCard = templateElement.content
    .querySelector(".element")
    .cloneNode(true);
  elementCard.querySelector(".element__img").src = link;
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
  const elementImg = elementCard.querySelector(".element__img");
  elementImg.addEventListener("click", function () {
    popupImgView.classList.add("popup_opened");
    popupImgView.querySelector(".popup__image").src = link;
    popupImgView.querySelector(".popup__caption").textContent = name;
  });

  return elementCard;
};

//функция которая добавляет в контейнер cardsContainer элементы html
const renderCard = (link, name) => {
  cardsContainer.prepend(createCard(link, name));
};


//перебор элементов массива методом forEach
initialCards.forEach((val, i) => {
  renderCard(val.link, val.name);
});


//функция сохранения данных
const saveAdd = (event) => {
  event.preventDefault();
  //nameAdd.textContent = inputAddName.value;
  //imgAdd.src = inputAddLink.value;
  renderCard(inputAddLink.value, inputAddName.value);
  inputAddLink.value = "";
  inputAddName.value = "";
  closePopup(event);
};

//события
//события на кнопку открытия popup
PopupAddOpen.addEventListener("click", openPopup);
PopupProfileOpen.addEventListener("click", openPopup);

//закрытие всех popup по клику на крестик
ButtonsPopupClose.forEach(function (popup) {
  popup.addEventListener("click", closePopup);
}); 

//события на отправку формы
formPopup.addEventListener("submit", savePopupProfile);

formAdd.addEventListener("submit", saveAdd);





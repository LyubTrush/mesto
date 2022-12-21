
const PopupProfileOpen = document.querySelector(".profile__button-edit");
const ButtonsPopupClose = document.querySelectorAll(".popup__btn-close");
const popupProfile = document.querySelector(".popup_profile");
const formPopup = popupProfile.querySelector(".popup__forma");
const namePopupInput = formPopup.querySelector(".popup__input_type_name");
const profPopupInput = formPopup.querySelector(".popup__input_type_prof");
const nameProfile = document.querySelector(".profile__info-title");
const profProfile = document.querySelector(".profile__info-subtitle");
const popupImgView = document.querySelector(".popup_img-view");


PopupProfileOpen.addEventListener("click", function () {
  popupProfile.classList.add("popup_opened");
  namePopupInput.value = nameProfile.textContent;
  profPopupInput.value = profProfile.textContent;
});

function close() {
  popupProfile.classList.remove("popup_opened");
  popupAdd.classList.remove("popup_opened");
}

//закрытие всех popup по клику на крестик
ButtonsPopupClose.forEach(function (popup) {
  popup.addEventListener("click", function (e) {
    const parentModal = this.closest(".popup"); //используем микробиблиотеку closest
    parentModal.classList.remove("popup_opened");
  });
}); // end foreach
function savePopup(popup) {
  popup.preventDefault();
  nameProfile.textContent = namePopupInput.value;
  profProfile.textContent = profPopupInput.value;
  close();
}

formPopup.addEventListener("submit", savePopup);

//1. 6 карточек из коробки

//находим контейнер elements
const cardsContainer = document.querySelector(".elements");
const templateElement = document.querySelector("#template-element");

//создаем форму для элементов и удаление элемента
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

//найдем input для ввода данных
const formaAdd = document.querySelector(".popup__forma-add");
const inputAddName = formaAdd.querySelector(".popup__input_add_name");
const inputAddLink = formaAdd.querySelector(".popup__input_add_link");

//функция сохранения данных
const saveAdd = (event) => {
  event.preventDefault();
  //nameAdd.textContent = inputAddName.value;
  //imgAdd.src = inputAddLink.value;
  renderCard(inputAddLink.value, inputAddName.value);
  inputAddLink.value = "";
  inputAddName.value = "";
  close();
};
formaAdd.addEventListener("submit", saveAdd);

// форма открытия popup
const PopupAddOpen = document.querySelector(".profile__button-add");
const popupAdd = document.querySelector(".popup_add");
const formPopupAdd = popupAdd.querySelector(".popup__forma");

PopupAddOpen.addEventListener("click", function () {
  popupAdd.classList.add("popup_opened");
});

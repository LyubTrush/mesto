import { Card } from "../scripts/Сard.js";
import { FormValidator } from "../scripts/FormValidator.js";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import initialCards from "../scripts/cards.js";
import './index.css';

// переменные
// Вынесем все необходимые для валидации элементы формы в обьект конфиг

const validationConfig = {
  formSelector: ".popup__forma",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn-save",
  activeButtonClass: "popup__btn-save_valid",
  inactiveButtonClass: "popup__btn-save_invalid",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

// переменные для формы открытия popupProfile
const popupProfileOpen = document.querySelector(".profile__button-edit");
const popups = document.querySelectorAll(".popup");
const buttonsPopupClose = document.querySelectorAll(".popup__btn-close");
const popupProfile = document.querySelector(".popup_profile");
const formPopupProfile = popupProfile.querySelector(".popup__forma");
const namePopupInput = formPopupProfile.querySelector(
  ".popup__input_type_name"
);
const profPopupInput = formPopupProfile.querySelector(
  ".popup__input_type_prof"
);
const nameProfile = document.querySelector(".profile__info-title");
const infoProfile = document.querySelector(".profile__info-subtitle");

// переменные для формы открытия popupImage
const popupImgView = document.querySelector(".popup_img-view");
const elementImgView = popupImgView.querySelector(".popup__image");
const popupCaption = popupImgView.querySelector(".popup__caption");

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

//функция создает карточку
const createCard = (link, name) => {
  const elementCard = new Card(name, link, templateElement, (name, link) => {
    popupViewImage.open(name, link);
  });
  const element = elementCard.generateCard();

  return element;
};

//создание экземпляра класса Section (получает разметку через функцию-колбэк и вставляет её в контейнер.

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardsList.addItem(createCard(item.link, item.name));
    },
  },
  ".elements"
);
cardsList.rendererItems();

//class UserInfo
const userInfo = new UserInfo({
  nameUser: ".profile__info-title",
  jobUser: ".profile__info-subtitle",
});
console.log(userInfo.getUserInfo());
//работа попапа редактирования профиля
const popupUser = new PopupWithForm({
  selector: ".popup_profile",
  handleFormSubmit: () => {
    userInfo.setUserInfo(namePopupInput.value, profPopupInput.value);

    //nameProfile.textContent = namePopupInput.value;
    // infoProfile.textContent = profPopupInput.value;
    popupUser.close();
  },
});

popupUser.setEventListeners();

//работа попапа добавления фото
const popupCard = new PopupWithForm({
  selector: ".popup_add",
  handleFormSubmit: () => {
    //event.preventDefault();
    cardsList.addItem(createCard(inputAddLink.value, inputAddName.value));
    //cardsList.addItem(createCard(item.link, item.name));
    popupCard.close();
  },
});
popupCard.setEventListeners();
//renderCard(inputAddLink.value, inputAddName.value);
//formAdd.reset();
//popupCard.setEventListeners();

// работа попап с фото
const popupViewImage = new PopupWithImage(".popup_img-view");

popupViewImage.setEventListeners();

//события

//события на кнопку открытия popup
popupAddOpen.addEventListener("click", () => {
  popupCard.open();
  userInfo.getUserInfo();
});

popupProfileOpen.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  namePopupInput.value = info.name;
  profPopupInput.value = info.job;

  //popupUser.setEventListeners(userInfo.setUserInfo(info))

  console.log(info);
  popupUser.open();
});

//вызов функции валидации
// форма профиля
const validateFormsProfile = new FormValidator(
  validationConfig,
  formPopupProfile
);
validateFormsProfile.enableValidation();

// форма добавления фото
const validateFormsAdd = new FormValidator(validationConfig, formAdd);
validateFormsAdd.enableValidation();

// Старый код

/*
//функция которая добавляет в контейнер cardsContainer элементы html(renderer)
const renderCard = (link, name) => {
  cardsContainer.prepend(createCard(link, name));
};*/
/*
//перебор элементов массива методом forEach
initialCards.forEach((val) => {
  renderCard(val.link, val.name);
});*/
/*
//функция сохранения данных
const handleSubmitFormAddCard = (event) => {
  event.preventDefault();
  renderCard(inputAddLink.value, inputAddName.value);
  formAdd.reset();
  closePopup(popupAdd);
};
*/
/*
//закрытие всех popup по клику на крестик

buttonsPopupClose.forEach(function (item) {
  item.addEventListener("click", function (e) {
    const parentModal = this.closest(".popup"); //используем микробиблиотеку closest
    closePopup(parentModal);
  });
});

//события на отправку формы
formPopupProfile.addEventListener("submit", handleSubmitFormProfileCard);

formAdd.addEventListener("submit", handleSubmitFormAddCard);
*/

// функции
// функция для открытия всех popup
/*
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}

// функция для закрытия popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
}*/
/*функция открытия фото
function handleOpenImage(name, link) {
  openPopup(popupImgView);
  popupCaption.textContent = name;
  elementImgView.src = link;
  elementImgView.alt = "фото" + " " + name;
}
// обработчик оверлея /*
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
  });
}); 

// закрытие по кнопке esc
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

//сохранение данных из формы и закрытие
function handleSubmitFormProfileCard(event) {
  event.preventDefault();
  nameProfile.textContent = namePopupInput.value;
  infoProfile.textContent = profPopupInput.value;
  closePopup(popupProfile);
}*/

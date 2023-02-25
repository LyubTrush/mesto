import { Card } from "../components/Сard.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import initialCards from "../utils/cards.js";
import './index.css';

import {
  validationConfig,
  popupProfileOpen,
  popupProfile,
  formPopupProfile,
  namePopupInput,
  profPopupInput,
  popupImgView,
  formAdd,
  inputAddName,
  inputAddLink,
  popupAddOpen,
  popupAdd,
  templateElement,
} from "../utils/constants.js"

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

//работа попапа редактирования профиля
const popupUser = new PopupWithForm({
  selector: ".popup_profile",
  handleFormSubmit: (input) => {
    userInfo.setUserInfo(input.username, input.job);

  
    popupUser.close();
  },
});

popupUser.setEventListeners();

//работа попапа добавления фото
const popupCard = new PopupWithForm({
  selector: ".popup_add",
  handleFormSubmit: (input) => {
    cardsList.addItem(createCard(input.link, input.title));
    popupCard.close();
  },
});
popupCard.setEventListeners();


// работа попап с фото
const popupViewImage = new PopupWithImage(".popup_img-view");

popupViewImage.setEventListeners();

//события

//события на кнопку открытия popup
popupAddOpen.addEventListener("click", () => {
  popupCard.open();
  validateFormsAdd.toggleButtonState();
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

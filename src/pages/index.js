import { Card } from "../components/Сard.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
//import initialCards from "../utils/cards.js";
import Api from "../components/Api.js";
import "./index.css";

import {
  validationConfig,
  popupAvatarOpen,
  popupImageDelete,
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
  formAvatar,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60/",
  headers: {
    authorization: "07ee7a40-2dda-43a0-8aeb-c95180da94fb",
    "Content-Type": "application/json",
  },
});

//current user ID
let currentUserId = null;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, user]) => {
    userInfo.setUserInfo(user);
    currentUserId = user._id;
    cardsList.rendererItems(cards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

//работа подтверждения удаления попапа
const popupDeleteCard = new PopupWithConfirm({
  selector: ".popup_delete-photo",
  handleConfirmation: (card) => {
    api
      .deleteCard(card.getId())
      .then(() => {
        card.deleteCard();
        popupDeleteCard.close();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  },
});
popupDeleteCard.setEventListeners();

//функция создает карточку
const createCard = (item) => {
  const elementCard = new Card({
    item,
    user: currentUserId,
    templateElement: templateElement,
    handleCardClick: (name, link) => {
      popupViewImage.open(name, link);
    },
    handleDelete: () => {
      popupDeleteCard.open(elementCard);
    },
    handleLikes: (cardId, flag) => {
      api
        .likeResolve(cardId, flag)
        .then((cardData) => elementCard.setLikes(cardData))
        .catch((err) => console.log(`Ошибка: ${err}`));
    },
  });
  const element = elementCard.generateCard();
  return element;
};

//создание экземпляра класса Section получает разметку через функцию-колбэк и вставляет её в контейнер.

const cardsList = new Section(
  {
    renderer: (item) => {
      cardsList.addItemServer(createCard(item));
    },
  },
  ".elements"
);

//class UserInfo
const userInfo = new UserInfo({
  nameUser: ".profile__info-title",
  jobUser: ".profile__info-subtitle",
  avatarUser: ".profile__avatar-image",
});

//работа попапа редактирования профиля
const popupUser = new PopupWithForm({
  selector: ".popup_profile",
  handleFormSubmit: (input) => {
    popupUser.isLoading(true);
    api
      .setProfileData(input)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        popupUser.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupUser.isLoading(false)
      })
  },
});

popupUser.setEventListeners();

//работа попапа добавления фото
const popupCard = new PopupWithForm({
  selector: ".popup_add",
  handleFormSubmit: (input) => {
    popupCard.isLoading(true);
    api
      .addCard(input)
      .then((input) => {
        cardsList.addItem(createCard(input));
        popupCard.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupCard.isLoading(false);
      });
  },
});
popupCard.setEventListeners();

// работа попапа редактирования аватара
const popupAvatar = new PopupWithForm({
  selector: ".popup_avatar",
  handleFormSubmit: (input) => {
    popupAvatar.isLoading(true);
    api
      .setAvatar(input)
      .then((userData) => {
        userInfo.setUserAvatar(userData.avatar);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupAvatar.isLoading(false)
      })
  },
});
popupAvatar.setEventListeners();

// работа попапа - увеличить фото
const popupViewImage = new PopupWithImage(".popup_img-view");
popupViewImage.setEventListeners();

//события

//события на кнопку открытия popup
popupAvatarOpen.addEventListener("click", () => {
  popupAvatar.open();
  validateFormsAvatar.toggleButtonState();
});

popupAddOpen.addEventListener("click", () => {
  popupCard.open();
  validateFormsAdd.toggleButtonState();
});

popupProfileOpen.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  namePopupInput.value = info.name;
  profPopupInput.value = info.job;
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

//форма добавления аватара
const validateFormsAvatar = new FormValidator(validationConfig, formAvatar);
validateFormsAvatar.enableValidation();
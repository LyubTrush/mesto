// все необходимые для валидации элементы формы в обьект конфиг

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
const popupProfile = document.querySelector(".popup_profile");
const formPopupProfile = popupProfile.querySelector(".popup__forma");
const namePopupInput = formPopupProfile.querySelector(
  ".popup__input_type_name"
);
const profPopupInput = formPopupProfile.querySelector(
  ".popup__input_type_prof"
);

// переменные для формы открытия popupImage
const popupImgView = document.querySelector(".popup_img-view");

// найдем input для ввода данных
const formAdd = document.querySelector(".popup__forma-add");
const inputAddName = formAdd.querySelector(".popup__input_add_name");
const inputAddLink = formAdd.querySelector(".popup__input_add_link");

// переменные для формы открытия popupAdd
const popupAddOpen = document.querySelector(".profile__button-add");
const popupAdd = document.querySelector(".popup_add");

//находим контейнер elements
const templateElement = document.querySelector("#template-element");

export {
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
};

//const popups = document.querySelectorAll(".popup");
//const buttonsPopupClose = document.querySelectorAll(".popup__btn-close");
//const nameProfile = document.querySelector(".profile__info-title");
//const infoProfile = document.querySelector(".profile__info-subtitle");
//const elementImgView = popupImgView.querySelector(".popup__image");
//const popupCaption = popupImgView.querySelector(".popup__caption");
//const formPopupAdd = popupAdd.querySelector(".popup__forma");
//находим elements
//const cardsContainer = document.querySelector(".elements");

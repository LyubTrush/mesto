/*Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса 
PopupWithForm должен не только добавлять 
обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
Для каждого попапа создавайте свой экземпляр класса PopupWithForm.*/

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ selector, handleFormSubmit }) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._formPopup = this._popup.querySelector(".popup__forma");
    this._inputList = this._formPopup.querySelectorAll(".popup__input");
    this._buttonSave = this._formPopup.querySelector(".popup__btn-save");
  }
  //собирает данные всех полей формы.
  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.id] = input.value;
      console.log("gdgf" + input.id + " " + input.value);
    });
    console.log(this._inputValues);
    return this._inputValues;
  }

  //Перезаписывает родительский метод setEventListeners, устанавливает слушатели/добавлять обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._formPopup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
  //Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();
    this._formPopup.reset();
  }
}

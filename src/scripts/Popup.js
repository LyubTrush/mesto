/*Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
Принимает в конструктор единственный параметр — селектор попапа.
Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. 
Модальное окно также закрывается при клике на затемнённую область вокруг формы. */

export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._buttonClosePopup = this._popup.querySelector('.popup__btn-close');
    this._escapeClose = this._handleEscClose.bind(this);
  }

  //открытие
  open() {
   this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._escapeClose);
  }

  //закрытие
  close() {
   this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._escapeClose)
  }

  // приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
        this.close();
      }
  }

  // публичный метод setEventListeners, который добавляет слушатель клика по иконке закрытия попапа. 
  setEventListeners() {
    this._buttonClosePopup.addEventListener('click', () => {
         this.close();
     });
  }
}

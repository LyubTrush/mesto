/*Преобразуйте класс Card
Свяжите класс Card c попапом. Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick. Эта функция должна открывать попап с картинкой при клике на карточку.*/


export class Card {
  //принимает в конструктор её данные и селектор её template-элемента
  constructor(name, link, templateElement, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateElement = templateElement;
    this._handleCardClick = handleCardClick;

    //this._templateSelector = templateSelector;
  }

  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = this._templateElement.content
      .querySelector(".element")
      .cloneNode(true);
    // вернём DOM-элемент карточки
    return cardElement;
  }
  // Запишем разметку в приватное поле _element.
  // Так у других элементов появится доступ к ней.
  generateCard() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector(".element__img");
    this._image.src = this._link;
    this._image.alt = "фото" + " " + this._name;
    this._element.querySelector(".element__info-text").textContent = this._name;

    this._likeButton = this._element.querySelector(".element__info-heart");
    this._deleteButton = this._element.querySelector(".element__delete");
    this._setListeners();

    return this._element;
  }
  
  // Навешиваем слушатели
  _setListeners() {
    //delete
    this._deleteButton.addEventListener("click", () => {
      this._deleteCard();
    });
    //like
    this._likeButton.addEventListener("click", () => {
      this._likeCard();
    });
    //open image
    this._image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  // Удаление карточки
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // Лайк карточки
  _likeCard() {
    this._likeButton.classList.toggle("element__info-heart_active");
  }
}
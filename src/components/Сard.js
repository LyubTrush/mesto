/*Преобразуйте класс Card
Свяжите класс Card c попапом. Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick. Эта функция должна открывать попап с картинкой при клике на карточку.*/


export class Card {
  //принимает в конструктор её данные и селектор её template-элемента
  constructor({item: {name, link, owner, _id, likes}, user, templateElement, handleCardClick, handleDelete, handleLikes}) {
    this._name = name;
    this._link = link;
    this._owner = owner;
    this._cardId = _id;
    this._likes = likes;
    this._curUser = user;
    this._templateElement = templateElement;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._handleLikes = handleLikes;
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
    if (this._likes.some((like) => like._id === this._curUser)) this._likeButton.classList.add("element__info-heart_active");

    this._likeCounter = this._element.querySelector(".element__like-count");    
    this._likeCounter.textContent = this._likes.length

    if (this._curUser === this._owner._id) { this._deleteButton = this._element.querySelector(".element__delete") }
    else this._element.querySelector(".element__delete").remove();

    this._setListeners();

    return this._element;
  }
  
  // Навешиваем слушатели
  _setListeners() {
    //delete
    if (this._deleteButton) { this._deleteButton.addEventListener("click", () => {
      this._handleDelete(this);
    }) };
    //like
    this._likeButton.addEventListener("click", () => {
      if(this._likeButton.classList.contains("element__info-heart_active")) {
        this._handleLikes(this._cardId, "del");   
      } else  {
        this._handleLikes(this._cardId, "set");
      }
     
    });
    //open image
    this._image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  // Удаление карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  getId() {
    return this._cardId;
  }

  // Обработка лайков
  setLikes(cardData) {
    this._likes = cardData.likes;
    this._likeCounter.textContent = this._likes.length;
    this._likeButton.classList.toggle("element__info-heart_active");
  }

}
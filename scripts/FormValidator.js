/* селекторы и классы формы
  formSelector
  inputSelector
  submitButtonSelector
  activeButtonClass
  inactiveButtonClass
  inputErrorClass
  errorClass*/

export class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._activeButtonClass = config.activeButtonClass;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }


  //включает валидаццию формы
  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  // функция делает неактивной кнопку или активной
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  // функция проверяет инпуты - валидны или нет
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  //checkInputValidity — проверяет валидность поля, внутри вызывает showInputError или hideInputError.
  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._hideInputError(inputElement);
    } else {
      // Если проходит, скроем
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }

  //showInputError — показывает элемент ошибки
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._inputErrorClass);
  }

  //hideInputError — скрывает элемент ошибки;
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
    inputElement.classList.remove(this._inputErrorClass);
  }

  }

/*Создайте класс FormValidator, который настраивает валидацию полей формы:
принимает в конструктор объект настроек с селекторами и классами формы;
принимает вторым параметром элемент той формы, которая валидируется;
имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
имеет публичный метод enableValidation, который включает валидацию формы.
Для каждой проверяемой формы создайте экземпляр класса FormValidator.*/











 // функция сбрасывает кнопку субмита при открытии
  /*disableSubmitButton() {
    console.log ('ger')
    this._buttonElement.classList.add(this._inactiveButtonClass)
    this._buttonElement = true;
}*/

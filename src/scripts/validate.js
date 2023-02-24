//showInputError — показывает элемент ошибки

function showInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.add(config.errorClass);
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
}

//hideInputError — скрывает элемент ошибки;
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
  inputElement.classList.remove(config.inputErrorClass);
}

//checkInputValidity — проверяет валидность поля, внутри вызывает showInputError или hideInputError.
function checkInputValidity(formElement, inputElement, config) {
  if (inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    hideInputError(formElement, inputElement, config);
  } else {
    // Если проходит, скроем
    showInputError(formElement, inputElement, config);
  }
}

// функция проверяет инпуты - валидны или нет
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}
// функция делает неактивной кнопку или активной
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement, config) {
  // находим список импутов
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  // находим кнопки
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

function enableValidation(config) {
  //получаем список форм методом глобального объекта array.from
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

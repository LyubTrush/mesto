!function(e){"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=this,o=(t.document||t.ownerDocument).querySelectorAll(e),n=0;o[n]&&o[n]!==t;)++n;return Boolean(o[n])}),"function"!=typeof e.closest&&(e.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window.Element.prototype);

const openPopupProfile = document.querySelector('.profile__button-edit');
const closePopup = document.querySelectorAll('.popup__btn-close');
const popupProfile = document.querySelector('.popup__profile');
const formaPopup = popupProfile.querySelector('.popup__forma');
const namePopupInput = formaPopup.querySelector('.popup__input_type_name');
const profPopupInput = formaPopup.querySelector('.popup__input_type_prof');
const nameProfile = document.querySelector('.profile__info-title');
const profProfile = document.querySelector('.profile__info-subtitle');

const popupImgView = document.querySelector('.popup__img-view');

console.log(popupImgView)

openPopupProfile.addEventListener('click', function() {
    popupProfile.classList.add('popup_opened');
    namePopupInput.value = nameProfile.textContent;
    profPopupInput.value = profProfile.textContent;
});

function close() {
    popupProfile.classList.remove('popup_opened');
    popupAdd.classList.remove('popup_opened');
}


//закрытие всех popup по клику на крестик
closePopup.forEach(function(item){
    item.addEventListener('click', function (e) {
       const parentModal = this.closest('.popup'); //используем микробиблиотеку closest
       parentModal.classList.remove('popup_opened');
    });
 }); // end foreach
function save(evt) {
    evt.preventDefault();
    nameProfile.textContent = namePopupInput.value;
    profProfile.textContent = profPopupInput.value;
    close();
}

formaPopup.addEventListener( 'submit', save);

//1. 6 карточек из коробки
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
  //находим контейнер elements
  const elements = document.querySelector('.elements');
  const templateElement = document.querySelector('#template-element');

  //создаем форму для элементов и удаление элемента
  const creatCard = (link, name) => {
   const elementCard = templateElement.content.querySelector('.element').cloneNode(true);
   elementCard.querySelector('.element__img').src = link;
   elementCard.querySelector('.element__info-text').textContent = name;

   //работа кнопки delete
   elementCard.querySelector('.element__delete').addEventListener('click', () => {
   elementCard.remove();
  });

  //работа лайка
  elementCard.querySelector('.element__info-heart').addEventListener('click', (event) => {
  event.target.classList.toggle('element__info-heart_active');
  });

  //oткрытие image
  const elementImg = elementCard.querySelector('.element__img')
  elementImg.addEventListener('click', function() {
    popupImgView.classList.add('popup_opened');
    popupImgView.querySelector('.popup__image').src = link;
    popupImgView.querySelector('.popup__caption').textContent = name;
    
  });
  return elementCard;
  }

  //функция которая добавляет в контейнер elements элементы html
  const renderCard = (link, name) => {
    elements.prepend(creatCard(link, name))
  }
  //перебор элементов массива методом forEach
  initialCards.forEach((val, i) => {
    renderCard(val.link, val.name);
  })

  //найдем input для ввода данных
  const formaAdd = document.querySelector('.popup__forma-add');
  const inputAddName = formaAdd.querySelector('.popup__input_add_name');
  const inputAddLink = formaAdd.querySelector('.popup__input_add_link');

  //функция сохранения данных
  const saveAdd = (event) => {
  event.preventDefault();
  //nameAdd.textContent = inputAddName.value;
  //imgAdd.src = inputAddLink.value;
  renderCard(inputAddLink.value, inputAddName.value);
  inputAddLink.value = '';
  inputAddName.value = '';
  close();
 }
 formaAdd.addEventListener( 'submit', saveAdd);

  // форма открытия popup
  const openPopupAdd = document.querySelector('.profile__button-add');
  const popupAdd = document.querySelector('.popup__add');
  const formaPopupAdd = popupAdd.querySelector('.popup__forma');

  openPopupAdd.addEventListener('click', function() {
    popupAdd.classList.add('popup_opened');
});




  

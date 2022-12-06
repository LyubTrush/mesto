
let openPopupProfile = document.querySelector('.profile__button-edit');
let closePopupProfile = document.querySelector('.popup__btn-close');
let popupProfile = document.querySelector('.popup');
let formaPopup = popupProfile.querySelector('.popup__forma');
let namePopupInput = formaPopup.querySelector('.popup__name');
let profPopupInput = formaPopup.querySelector('.popup__prof');
let nameProfile = document.querySelector('.profile__info-title');
let profProfile = document.querySelector('.profile__info-subtitle');



openPopupProfile.addEventListener('click', function() {
    popupProfile.classList.add('popup_opened');
    namePopupInput.value = nameProfile.textContent;
    profPopupInput.value = profProfile.textContent;
});
function close() {
    popupProfile.classList.remove('popup_opened');
}
closePopupProfile.addEventListener('click', close); 

function save(evt) {
    evt.preventDefault();
    nameProfile.textContent = namePopupInput.value;
    profProfile.textContent = profPopupInput.value;
    close();
}

formaPopup.addEventListener( 'submit', save);
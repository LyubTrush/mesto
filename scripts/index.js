
let openPopupProfile = document.querySelector('.profile__button-edit');
let closePopupProfile = document.querySelector('.popup__btn-close');
let popupProfile = document.querySelector('.popup');


openPopupProfile.addEventListener('click', function() {
    popupProfile.classList.add('popup__active');
});

closePopupProfile.addEventListener('click', function() {
    popupProfile.classList.remove('popup__active');
});
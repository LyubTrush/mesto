
let openPopupProfile = document.querySelector('.profile__button-edit');
let closePopupProfile = document.querySelector('.popup__btn-close');
let popupProfile = document.querySelector('.popup');
let formaPopup = popupProfile.querySelector('.popup__forma-profile');
let namePopapInput = formaPopup.querySelector('.popup__imput-profile_name');
let profPopupInput = formaPopup.querySelector('.popup__imput-profile_prof');
let savePopupButton = popupProfile.querySelector('.popup__btn-save-profile')
let nameProfile = document.querySelector('.profile__info-title');
let profProfile = document.querySelector('.profile__info-subtitle');



openPopupProfile.addEventListener('click', function() {
    popupProfile.classList.add('popup__active');
    namePopapInput.value = nameProfile.textContent;
    profPopupInput.value = profProfile.textContent;
});

closePopupProfile.addEventListener('click', function() {
    popupProfile.classList.remove('popup__active');
});

function save(evt) {
    evt.preventDefault();
    nameProfile.textContent = namePopapInput.value;
    profProfile.textContent = profPopupInput.value;
    popupProfile.classList.remove('popup__active');
}

savePopupButton.addEventListener( 'click', save);
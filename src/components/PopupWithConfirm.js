import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor({selector, handleConfirmation}) {
        super(selector);        
        this._buttonOk = this._popup.querySelector(".popup__btn-yes");
        this._handleConfirmation = handleConfirmation;
        this._element = null;
    }

    open(element) {
        this._element = element;
        super.open();
    }

    setEventListeners() {
        super.setEventListeners();
        this._buttonOk.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._handleConfirmation(this._element);    
        });
    }
}
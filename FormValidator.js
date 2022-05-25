export default class FormValidator {
  constructor(validatSet, form) {
    this._form = form;
    this._inputSelector = validatSet.inputSelector;
    this._submitButtonSelector = validatSet.submitButtonSelector;
    this._inactiveButtonClass = validatSet.inactiveButtonClass;
    this._inputErrorClass = validatSet.inputErrorClass;
    this._errorClass = validatSet.errorClass;
    this._inputArray = Array.from(
      form.querySelectorAll(validatSet.inputSelector)
    );
    this._submitButton = form.querySelector(validatSet.submitButtonSelector);
  }

  _hasInvalidInput() {
    return this._inputArray.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _activateButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  deactivateButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputArray)) {
      this.deactivateButton();
    } else {
      this._activateButton();
    }
  }
  
  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputArray.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}

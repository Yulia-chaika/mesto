import {popupImage, popupImagePreview, popupImagePreveiwName, openPopup} from './script.js';

export class Card {
  constructor(link, title, selector) {
    this._link = link;
    this._title = title;
    this._selector = selector;
  }
  _selectElementImage() {
    return this._view.querySelector(".element__image");
  }


  _selectElement(selector) {
    this._view = document
      .querySelector(selector)
      .content
      .querySelector(".element")
      .cloneNode(true);
  }
  _deleteElement() {
    this._view.remove();
    this._view = null;
  }
  _activeLike(evt) {
     evt.target.classList.toggle("element__like-button_active");
   }
  _createImagePreview() {
    popupImagePreview.src = this._link;
    popupImagePreveiwName.textContent = this._title;
    popupImagePreview.title = this._title;
    popupImagePreview.alt = this._title;
    openPopup(popupImage);
  }
  getCard() {
    this._selectElement(this._selector);
    this._view.querySelector(".element__title").textContent = this._title;
    this._selectElementImage().src = this._link;
    this._selectElementImage().alt = this._title;
    this._view.querySelector(".element__trash-button").addEventListener("click", () => this._deleteElement());
    this._view.querySelector(".element__like-button").addEventListener("click", this._activeLike);
    this._selectElementImage().addEventListener("click", () => this._createImagePreview());
    return this._view;
  }
}
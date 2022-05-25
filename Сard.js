import {popupImage, popupImagePreview, popupImagePreveiwName, openPopup} from './script.js';

export class Card {
  constructor(link, title, template) {
    this._link = link;
    this._title = title;
    this._template = template;
  }
  _deleteElement() {
    this._view.remove();
  }
  _activeLike(evt) {
     evt.target.classList.toggle("element__like-button_active");
   }
  _createImagePreview() {
    popupImagePreview.src = this._link;
    popupImagePreveiwName.textContent = this._title;
    popupImagePreview.title = this._title;
    popupImagePreview.alt = this._title;
    popupImagePreveiwName.textContent = this._title;
    openPopup(popupImage);
  }
  getCard() {
    this._view = this._template.cloneNode(true).content.querySelector(".element");
    this._view.querySelector(".element__title").textContent = this._title;
    this._view.querySelector(".element__image").src = this._link;
    this._view.querySelector(".element__trash-button").addEventListener("click", () => this._deleteElement());
    this._view.querySelector(".element__like-bar").addEventListener("click", this._activeLike);
    this._view.querySelector(".element__image").addEventListener("click", () => this._createImagePreview());
    return this._view;
  }
}
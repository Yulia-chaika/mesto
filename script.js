import { Card } from "./Сard.js";
import { initialCards } from "./cards.js";
import FormValidator from "./FormValidator.js";
import { formConstants } from "./formConstants.js";

const popupEditProfile = document.querySelector(".popup_style_edit");
const popupFormEditProfile = document.forms.editprofile;
const popupUserName = popupFormEditProfile.querySelector(".popup__input_name");
const popupUserWhois = popupFormEditProfile.querySelector(
  ".popup__input_whois"
);
export const popupImage = document.querySelector(".popup_style_image");
export const popupImagePreview = popupImage.querySelector(".popup__image-size");
export const popupImagePreveiwName =
  popupImage.querySelector(".popup__image-name");
const popupNewMesto = document.querySelector(".popup_style_new-mesto");
const popupFormNewMesto = document.forms.newmesto;
const popupMestoLink = popupFormNewMesto.querySelector(
  ".popup__input_mesto-link"
);
const popupMestoName = popupFormNewMesto.querySelector(
  ".popup__input_mesto-name"
);
const popupAddBtn = document.querySelector(".profile__add-button");
const popupEditBtn = document.querySelector(".profile__edit-button");
const userName = document.querySelector(".profile__name");
const userWhois = document.querySelector(".profile__whois");
const elementList = document.querySelector(".elements"); //получаем template методом QuerySelector
const elementTemplate = document.querySelector("#element"); //получаем содержимое template
const popups = document.querySelectorAll(".popup");

const validatePopupFormEditProfile = new FormValidator(
  formConstants,
  popupFormEditProfile
);
const validatePopupFormNewMesto = new FormValidator(
  formConstants,
  popupFormNewMesto
);

validatePopupFormEditProfile.enableValidation();
validatePopupFormNewMesto.enableValidation();

export function openPopup(opn) {
  opn.classList.add("popup_opened");

  document.addEventListener("keydown", closePopupByEscape);
}

function closePopup(cls) {
  document.removeEventListener("keydown", closePopupByEscape);
  cls.classList.remove("popup_opened");
}

function closeAnyPopup() {
  popups.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup__close-button-image") ||
        evt.target.className === "popup__overlay"
      ) {
        closePopup(popup);
      }
    });
  });
}

closeAnyPopup();

function closePopupByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

initialCards.forEach(function addCard(element) {
  const card = new Card(element.link, element.title, elementTemplate).getCard();

  renderCard(card);
});

function renderCard(card) {
  elementList.prepend(card);
}

function handleNewMestoFormSubmit(evt) {
  evt.preventDefault();
  const listSaveNewMesto = new Card(
    popupMestoLink.value,
    popupMestoName.value,
    elementTemplate
  ).getCard();
  renderCard(listSaveNewMesto);
  popupFormNewMesto.reset();
  new FormValidator(formConstants, popupFormNewMesto).deactivateButton();

  closePopup(popupNewMesto);
}

function copyProfileInfoToPopup() {
  openPopup(popupEditProfile);
  popupUserName.value = userName.textContent;
  popupUserWhois.value = userWhois.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = popupUserName.value; // Так мы можем определить свою логику отправки.
  userWhois.textContent = popupUserWhois.value; // О том, как это делать, расскажем позже.
  closePopup(popupEditProfile);
}

function profileNameTitle() {
  userName.setAttribute("title", popupUserName.value);
}

function profileWhoisTitle() {
  userWhois.setAttribute("title", popupUserWhois.value);
}

userName.addEventListener("mouseover", profileNameTitle);
userWhois.addEventListener("mouseover", profileWhoisTitle);
popupEditBtn.addEventListener("click", copyProfileInfoToPopup); //Откроем Popup редактирования профиля
popupAddBtn.addEventListener("click", () => {
  openPopup(popupNewMesto);
}); //Откроем Popup добавления картинки
popupFormEditProfile.addEventListener("submit", handleProfileFormSubmit);
popupFormNewMesto.addEventListener("submit", handleNewMestoFormSubmit);

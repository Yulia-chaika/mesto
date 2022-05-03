const popupEditProfile = document.querySelector(".popup_style_edit");
const popupFormEditProfile = document.forms.editprofile;
const popupUserName = popupFormEditProfile.querySelector(".popup__input_name");
const popupUserWhois = popupFormEditProfile.querySelector(
  ".popup__input_whois"
);
const popupImage = document.querySelector(".popup_style_image");
const popupImagePreview = popupImage.querySelector(".popup__image-size");
const popupImagePreveiwName = popupImage.querySelector(".popup__image-name");
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
const elementTemplate = document.querySelector("#element").content; //получаем содержимое template
const popups = document.querySelectorAll(".popup");

function openPopup(opn) {
  opn.classList.add("popup_opened");
  const saveBtn = opn.querySelector(".popup__save-button");
  document.addEventListener("keydown", closePopupByEscape);
  inactiveBtn(saveBtn);
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
  popups.forEach((popup) => {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  });
}

function activeLike(evt) {
  evt.target.classList.toggle("element__like-button_active");
}

function deleteElement(evt) {
  evt.target.closest(".element").remove();
}

function getCard(element) {
  const userElementTemplate = elementTemplate.cloneNode(true); //клонируем содержимое тега template
  const elementImage = userElementTemplate.querySelector(".element__image");

  //наполняем содержимым
  elementImage.src = element.link;
  elementImage.alt = "Фото" + " " + element.name;
  elementImage.title = "Фото" + " " + element.name;
  userElementTemplate.querySelector(".element__title").textContent =
    element.name;
  userElementTemplate
    .querySelector(".element__like-button")
    .addEventListener("click", activeLike);
  userElementTemplate
    .querySelector(".element__trash-button")
    .addEventListener("click", deleteElement);
  elementImage.addEventListener("click", createImagePreview);

  function createImagePreview() {
    openPopup(popupImage);

    popupImagePreview.src = element.link;
    popupImagePreview.title = element.name;
    popupImagePreview.alt = element.name;
    popupImagePreveiwName.textContent = element.name;
  }

  return userElementTemplate;
}

function renderCard(userElementTemplate) {
  elementList.prepend(getCard(userElementTemplate));
}

initialCards.forEach(function (element) {
  renderCard(element);
});

function handleNewMestoFormSubmit(evt) {
  const saveNewMesto = {
    name: popupMestoName.value,
    link: popupMestoLink.value,
  };
  renderCard(saveNewMesto);
  closePopup(popupNewMesto);
  popupFormNewMesto.reset();
}

function copyProfileInfoToPopup() {
  openPopup(popupEditProfile);
  popupUserName.value = userName.textContent;
  popupUserWhois.value = userWhois.textContent;
}

function handleProfileFormSubmit(evt) {
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
popupAddBtn.addEventListener("click", () => openPopup(popupNewMesto)); //Откроем Popup добавления картинки
popupFormEditProfile.addEventListener("submit", handleProfileFormSubmit);
popupFormNewMesto.addEventListener("submit", handleNewMestoFormSubmit);

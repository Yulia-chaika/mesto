const initialCards = [ 
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const popupEditProfile = document.querySelector(".popup_style_edit");
const popupFormEditProfile = popupEditProfile.querySelector(".popup__form_edit_profile");
const popupCloseEditProfileBtn = popupEditProfile.querySelector(".popup__close-button_close_edit-profile"); 
const popupUserName = popupEditProfile.querySelector(".popup__text_name");
const popupUserWhois = popupEditProfile.querySelector(".popup__text_whois");
const popupImage = document.querySelector(".popup_style_image");
const popupImagePreview = document.querySelector(".popup__image");
const popupImagePreveiwName = document.querySelector(".popup__image-name");
const popupCloseImage = document.querySelector(".popup__close-button_image"); 
const popupNewMesto = document.querySelector(".popup_style_new-mesto");
const popupNewMestoForm = document.querySelector(".popup__form_new-mesto");
const popupMestoLink = document.querySelector(".popup__text_mesto-link");
const popupMestoName = document.querySelector(".popup__text_mesto-name");
const popupFormNewMesto = popupNewMesto.querySelector(".popup__form_new-mesto");
 const popupCloseNewMestoBtn = popupNewMesto.querySelector(".popup__close-button_new-mesto"); 
const popupAddBtn = document.querySelector(".profile__add-button");
const popupEditBtn = document.querySelector(".profile__edit-button");
const userName = document.querySelector(".profile__name");
const userWhois = document.querySelector(".profile__whois");
const elementList = document.querySelector(".elements"); //получаем template методом QuerySelector
const elementTemplate = document.querySelector("#element").content; //получаем содержимое template



function openPopup(opn) {
  opn.classList.add("popup_opened");
 }

function closePopup(cls) {
  cls.classList.remove("popup_opened");
}

function activeLike(evt) {
  evt.target.classList.toggle("element__like-button_active");
};

function deleteElement(evt) {
  evt.target.closest(".element").remove();
};


function getCard(element) {
  const userElementTemplate = elementTemplate.cloneNode(true); //клонируем содержимое тега template

  //наполняем содержимым
  userElementTemplate.querySelector(".element__image").src = element.link;
  userElementTemplate.querySelector(".element__image").alt = "Фото" + " " + element.name;
  userElementTemplate.querySelector(".element__title").textContent = element.name;
  userElementTemplate.querySelector(".element__like-button").addEventListener("click", activeLike);
  userElementTemplate.querySelector(".element__trash-button").addEventListener("click", deleteElement);
  userElementTemplate.querySelector(".element__image").addEventListener("click", createImagePreview);

  function createImagePreview() {
    openPopup(popupImage);
    
    popupImagePreview.src = element.link;
    popupImagePreveiwName.textContent = element.name;
    
};

return userElementTemplate
  
}

function renderCard(userElementTemplate) {
 
  elementList.prepend(getCard(userElementTemplate))
}

initialCards.forEach(function (element) { 

  renderCard(element); 

}); 

function handleNewMestoFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const saveNewMesto = {
    name: popupMestoName.value,
    link: popupMestoLink.value,
  };
  renderCard(saveNewMesto);
  closePopup(popupNewMesto);
  popupNewMestoForm.reset();
};


function copyProfileInfoToPopup() {
  openPopup(popupEditProfile);
  popupUserName.value = userName.textContent;
  popupUserWhois.value = userWhois.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  userName.textContent = popupUserName.value; // Так мы можем определить свою логику отправки.
  userWhois.textContent = popupUserWhois.value; // О том, как это делать, расскажем позже.
  closePopup(popupEditProfile);
}

function profileNameTitle() {
  userName.setAttribute("title", popupUserName.value);
  userName.style.cursor = "default";
}

function profileWhoisTitle() {
  userWhois.setAttribute("title", popupUserWhois.value);
  userWhois.style.cursor = "default";
}


userName.addEventListener("mouseover", profileNameTitle);
userWhois.addEventListener("mouseover", profileWhoisTitle);
popupEditBtn.addEventListener("click", copyProfileInfoToPopup); //Откроем Popup редактирования профиля
popupAddBtn.addEventListener("click", () => openPopup(popupNewMesto)); //Откроем Popup добавления картинки
popupCloseEditProfileBtn.addEventListener("click", () => closePopup(popupEditProfile)); //Закроем Popup редактирования профиля 
popupCloseNewMestoBtn.addEventListener("click", () => closePopup(popupNewMesto)); //Закроем Popup добавления картинки 
popupCloseImage.addEventListener("click", () => closePopup(popupImage)); 
popupFormEditProfile.addEventListener("submit", handleProfileFormSubmit);
popupFormNewMesto.addEventListener("submit", handleNewMestoFormSubmit);

/* Пробовала, но почему-то не работает. Не разобралась почему. Исправила только класс на .popup__close-button

const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
       if (evt.target.classList.contains(".popup__close-button")) {
          closePopup(popup)
        }
    })
}) */